import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery, awardXP, awardBadge, logAuditEvent } from '@/lib/db';

// POST /api/hackathons/[id]/submit
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const hackathonId = parseInt(id);

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const hackRes = await dbQuery('SELECT title, status FROM hackathons WHERE id = $1', [hackathonId]);
    if (hackRes.rows.length === 0) return NextResponse.json({ error: 'Hackathon not found' }, { status: 404 });
    const hackathon = hackRes.rows[0];

    const regRes = await dbQuery('SELECT id FROM hackathon_registrations WHERE "hackathonId" = $1 AND "userId" = $2', [hackathonId, decoded.userId]);
    if (regRes.rows.length === 0) {
      return NextResponse.json({ error: 'You must register before submitting.' }, { status: 400 });
    }

    const subRes = await dbQuery('SELECT id FROM hackathon_submissions WHERE "hackathonId" = $1 AND "userId" = $2', [hackathonId, decoded.userId]);
    if (subRes.rows.length > 0) {
      return NextResponse.json({ error: 'You have already submitted a project for this hackathon.' }, { status: 400 });
    }

    const body = await request.json();
    const { projectTitle, description, repoUrl, demoUrl, techStack, teamMembers } = body;
    if (!projectTitle || !description) {
      return NextResponse.json({ error: 'Project title and description are required.' }, { status: 400 });
    }

    const insertRes = await dbQuery(
      `INSERT INTO hackathon_submissions 
      ("hackathonId", "hackathonTitle", "userId", "userName", "projectTitle", description, "repoUrl", "demoUrl", "techStack", "teamMembers", status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [hackathonId, hackathon.title, decoded.userId, decoded.name, projectTitle, description, repoUrl || '', demoUrl || '', JSON.stringify(techStack || []), JSON.stringify(teamMembers || []), 'submitted']
    );
    const newSubmission = insertRes.rows[0];

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
