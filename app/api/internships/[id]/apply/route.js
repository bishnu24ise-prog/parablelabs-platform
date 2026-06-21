import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery, awardXP, awardBadge, logAuditEvent } from '@/lib/db';

// POST /api/internships/[id]/apply
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const listingId = parseInt(id);

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const listingsRes = await dbQuery('SELECT title, company, status FROM internship_listings WHERE id = $1', [listingId]);
    if (listingsRes.rows.length === 0) return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    const listing = listingsRes.rows[0];
    if (listing.status !== 'open') return NextResponse.json({ error: 'This listing is no longer accepting applications.' }, { status: 400 });

    const appRes = await dbQuery('SELECT id FROM applications WHERE "listingId" = $1 AND "userId" = $2', [listingId, decoded.userId]);
    if (appRes.rows.length > 0) {
      return NextResponse.json({ error: 'You have already applied to this listing.' }, { status: 400 });
    }

    const body = await request.json();
    const { coverLetter, resumeUrl } = body;

    const insertRes = await dbQuery(
      `INSERT INTO applications ("listingId", "listingTitle", company, "userId", "userName", "userEmail", "userRole", "coverLetter", "resumeUrl", status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [listingId, listing.title, listing.company, decoded.userId, decoded.name, decoded.email, decoded.role, coverLetter || '', resumeUrl || '', 'Applied']
    );
    const newApp = insertRes.rows[0];

    // Award XP + badge
    await awardXP(decoded.userId, 75, `Applied to: ${listing.title} at ${listing.company}`);
    await awardBadge(decoded.userId, 'first_apply');

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'APPLY_INTERNSHIP', targetType: 'application', targetId: newApp.id,
      details: `Applied to ${listing.title} at ${listing.company}` });

    return NextResponse.json({ success: true, message: 'Application submitted!', application: newApp });
  } catch (err) {
    console.error('/api/internships/[id]/apply error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
