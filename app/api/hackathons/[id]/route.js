import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, writeTable, nextId, awardXP, awardBadge, logAuditEvent } from '@/lib/db';

// GET /api/hackathons/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const hackathons = readTable('hackathons');
    const hackathon = hackathons.find(h => h.id === parseInt(id));
    if (!hackathon) return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);

    const registrations = readTable('hackathon_registrations').filter(r => r.hackathonId === hackathon.id);
    const submissions = readTable('hackathon_submissions').filter(s => s.hackathonId === hackathon.id);

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
