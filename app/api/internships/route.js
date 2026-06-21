import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery, logAuditEvent } from '@/lib/db';

// Seeding handled by migration script

// GET /api/internships
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);

    const listingsRes = await dbQuery('SELECT * FROM internship_listings WHERE status = $1', ['open']);
    const listings = listingsRes.rows.map(l => {
      if (typeof l.tags === 'string') {
        try { l.tags = JSON.parse(l.tags); } catch { l.tags = []; }
      }
      return l;
    });

    let applications = [];
    if (decoded) {
      const appRes = await dbQuery('SELECT "listingId" FROM applications WHERE "userId" = $1', [decoded.userId]);
      applications = appRes.rows;
    }

    const allAppsRes = await dbQuery('SELECT "listingId" FROM applications');
    const allApps = allAppsRes.rows;

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const tag = searchParams.get('tag');
    const location = searchParams.get('location');

    let filtered = listings.filter(l => l.status === 'open');
    if (q) {
      const ql = q.toLowerCase();
      filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(ql) ||
        l.company.toLowerCase().includes(ql) ||
        l.description.toLowerCase().includes(ql)
      );
    }
    if (tag) filtered = filtered.filter(l => l.tags.includes(tag));
    if (location) filtered = filtered.filter(l => l.location.toLowerCase().includes(location.toLowerCase()));

    const enriched = filtered.map(l => ({
      ...l,
      applicationCount: allApps.filter(a => a.listingId === l.id).length,
      hasApplied: decoded ? applications.some(a => a.listingId === l.id) : false,
    }));

    return NextResponse.json({ listings: enriched });
  } catch (err) {
    console.error('/api/internships GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/internships — create listing (Recruiter/Company Admin)
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!['Recruiter', 'Company Admin', 'Platform Admin'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { title, company, description, location, type, duration, stipend, tags, requirements } = body;
    if (!title || !description) return NextResponse.json({ error: 'Title and description required' }, { status: 400 });

    const insertRes = await dbQuery(
      `INSERT INTO internship_listings (title, company, description, location, type, duration, stipend, tags, status, requirements, "postedBy") 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [title, company || decoded.name, description, location || 'Remote', type || 'Internship', duration || 'TBD', stipend || 'TBD', JSON.stringify(tags || []), 'open', requirements || '', decoded.userId]
    );
    const newListing = insertRes.rows[0];
    if (typeof newListing.tags === 'string') {
       try { newListing.tags = JSON.parse(newListing.tags); } catch { newListing.tags = []; }
    }

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'CREATE_LISTING', targetType: 'internship', targetId: newListing.id,
      details: `Created listing: ${title}` });

    return NextResponse.json({ success: true, listing: newListing });
  } catch (err) {
    console.error('/api/internships POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
