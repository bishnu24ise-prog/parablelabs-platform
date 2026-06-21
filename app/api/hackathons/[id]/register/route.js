import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery, awardXP, awardBadge, logAuditEvent } from '@/lib/db';

// POST /api/hackathons/[id]/register
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const hackathonId = parseInt(id);

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const hackRes = await dbQuery('SELECT * FROM hackathons WHERE id = $1', [hackathonId]);
    if (hackRes.rows.length === 0) return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });
    const hackathon = hackRes.rows[0];
    if (hackathon.status === 'completed') {
      return NextResponse.json({ error: 'This hackathon has already ended.' }, { status: 400 });
    }

    const regRes = await dbQuery('SELECT id FROM hackathon_registrations WHERE "hackathonId" = $1 AND "userId" = $2', [hackathonId, decoded.userId]);
    if (regRes.rows.length > 0) {
      return NextResponse.json({ error: 'You are already registered for this hackathon.' }, { status: 400 });
    }

    const insertRes = await dbQuery(
      'INSERT INTO hackathon_registrations ("hackathonId", "userId") VALUES ($1, $2) RETURNING *',
      [hackathonId, decoded.userId]
    );
    const newReg = insertRes.rows[0];

    // Award XP + badge
    await awardXP(decoded.userId, 100, `Registered for hackathon: ${hackathon.title}`);
    await awardBadge(decoded.userId, 'hackathon_join');

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'HACKATHON_REGISTER', targetType: 'hackathon', targetId: hackathonId,
      details: `Registered for: ${hackathon.title}` });

    return NextResponse.json({ success: true, message: 'Successfully registered!', registration: newReg });
  } catch (err) {
    console.error('/api/hackathons/[id]/register error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
