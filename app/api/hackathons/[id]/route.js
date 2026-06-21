import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery } from '@/lib/db';

// GET /api/hackathons/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const hackId = parseInt(id);
    const hackRes = await dbQuery('SELECT * FROM hackathons WHERE id = $1', [hackId]);
    if (hackRes.rows.length === 0) return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });
    const hackathon = hackRes.rows[0];
    if (typeof hackathon.tags === 'string') {
      try { hackathon.tags = JSON.parse(hackathon.tags); } catch { hackathon.tags = []; }
    }

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);

    const regRes = await dbQuery('SELECT "userId" FROM hackathon_registrations WHERE "hackathonId" = $1', [hackId]);
    const subRes = await dbQuery('SELECT "userId" FROM hackathon_submissions WHERE "hackathonId" = $1', [hackId]);
    const registrations = regRes.rows;
    const submissions = subRes.rows;

    return NextResponse.json({
      ...hackathon,
      registrationCount: registrations.length,
      submissionCount: submissions.length,
      isRegistered: decoded ? registrations.some(r => r.userId === decoded.userId) : false,
      hasSubmitted: decoded ? submissions.some(s => s.userId === decoded.userId) : false,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
