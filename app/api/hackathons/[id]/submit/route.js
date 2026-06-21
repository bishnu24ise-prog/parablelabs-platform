import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, writeTable, nextId, awardXP, awardBadge, logAuditEvent } from '@/lib/db';

// POST /api/hackathons/[id]/submit
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

    const registrations = readTable('hackathon_registrations');
    const isRegistered = registrations.some(r => r.hackathonId === hackathonId && r.userId === decoded.userId);
    if (!isRegistered) {
      return NextResponse.json({ error: 'You must register before submitting.' }, { status: 400 });
    }

    const submissions = readTable('hackathon_submissions');
    const alreadySubmitted = submissions.some(s => s.hackathonId === hackathonId && s.userId === decoded.userId);
    if (alreadySubmitted) {
      return NextResponse.json({ error: 'You have already submitted a project for this hackathon.' }, { status: 400 });
    }

    const body = await request.json();
    const { projectTitle, description, repoUrl, demoUrl, techStack, teamMembers } = body;
    if (!projectTitle || !description) {
      return NextResponse.json({ error: 'Project title and description are required.' }, { status: 400 });
    }

    const newSubmission = {
      id: nextId(submissions),
      hackathonId, hackathonTitle: hackathon.title,
      userId: decoded.userId, userName: decoded.name,
      projectTitle, description, repoUrl: repoUrl || '',
      demoUrl: demoUrl || '', techStack: techStack || [],
      teamMembers: teamMembers || [], status: 'submitted',
      submittedAt: new Date().toISOString()
    };
    submissions.push(newSubmission);
    writeTable('hackathon_submissions', submissions);

    // Award XP + badge
    await awardXP(decoded.userId, 200, `Submitted project: ${projectTitle} for ${hackathon.title}`);
    await awardBadge(decoded.userId, 'project_submit');

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'HACKATHON_SUBMIT', targetType: 'hackathon_submission', targetId: newSubmission.id,
      details: `Submitted "${projectTitle}" for: ${hackathon.title}` });

    return NextResponse.json({ success: true, message: 'Project submitted successfully!', submission: newSubmission });
  } catch (err) {
    console.error('/api/hackathons/[id]/submit error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
