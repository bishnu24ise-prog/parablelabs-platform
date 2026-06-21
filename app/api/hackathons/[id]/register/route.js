import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, writeTable, nextId, awardXP, awardBadge, logAuditEvent } from '@/lib/db';

// POST /api/hackathons/[id]/register
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const hackathonId = parseInt(id);

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const hackathons = readTable('hackathons');
    const hackathon = hackathons.find(h => h.id === hackathonId);
    if (!hackathon) return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });
    if (hackathon.status === 'completed') {
      return NextResponse.json({ error: 'This hackathon has already ended.' }, { status: 400 });
    }

    const registrations = readTable('hackathon_registrations');
    const alreadyRegistered = registrations.some(r => r.hackathonId === hackathonId && r.userId === decoded.userId);
    if (alreadyRegistered) {
      return NextResponse.json({ error: 'You are already registered for this hackathon.' }, { status: 400 });
    }

    const newReg = {
      id: nextId(registrations),
      hackathonId, userId: decoded.userId, userName: decoded.name,
      registeredAt: new Date().toISOString()
    };
    registrations.push(newReg);
    writeTable('hackathon_registrations', registrations);

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
