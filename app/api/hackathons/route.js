import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery, logAuditEvent } from '@/lib/db';

// Seeding handled by migration script

// GET /api/hackathons — list all hackathons
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);

    const hackathonsRes = await dbQuery('SELECT * FROM hackathons');
    const registrationsRes = await dbQuery('SELECT "hackathonId", "userId" FROM hackathon_registrations');
    const registrations = registrationsRes.rows;
    const hackathons = hackathonsRes.rows.map(h => {
       if (typeof h.tags === 'string') {
         try { h.tags = JSON.parse(h.tags); } catch { h.tags = []; }
       }
       return h;
    });

    // Enrich with registration status for logged-in user
    const enriched = hackathons.map(h => ({
      ...h,
      registrationCount: registrations.filter(r => r.hackathonId === h.id).length,
      isRegistered: decoded ? registrations.some(r => r.hackathonId === h.id && r.userId === decoded.userId) : false,
    }));

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const tag = searchParams.get('tag');
    const q = searchParams.get('q');

    let filtered = enriched;
    if (status) filtered = filtered.filter(h => h.status === status);
    if (tag) filtered = filtered.filter(h => h.tags.includes(tag));
    if (q) {
      const ql = q.toLowerCase();
      filtered = filtered.filter(h => h.title.toLowerCase().includes(ql) || h.description.toLowerCase().includes(ql));
    }

    return NextResponse.json({ hackathons: filtered });
  } catch (err) {
    console.error('/api/hackathons GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/hackathons — create a hackathon (Recruiter/Company Admin)
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
    const { title, description, tags, prize, deadline, startDate, endDate, maxTeamSize } = body;
    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
    }

    const tagsJson = JSON.stringify(tags || []);
    const insertRes = await dbQuery(
      `INSERT INTO hackathons (title, organizer, description, tags, prize, status, deadline, "startDate", "endDate", "maxTeamSize", "createdBy") 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [title, decoded.name, description, tagsJson, prize || 'TBD', 'upcoming', deadline, startDate, endDate, maxTeamSize || 4, decoded.userId]
    );
    const newHackathon = insertRes.rows[0];
    if (typeof newHackathon.tags === 'string') {
       try { newHackathon.tags = JSON.parse(newHackathon.tags); } catch { newHackathon.tags = []; }
    }

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'CREATE_HACKATHON', targetType: 'hackathon', targetId: newHackathon.id,
      details: `Created hackathon: ${title}` });

    return NextResponse.json({ success: true, hackathon: newHackathon });
  } catch (err) {
    console.error('/api/hackathons POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
