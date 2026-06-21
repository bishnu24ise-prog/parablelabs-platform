import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery, awardXP, logAuditEvent } from '@/lib/db';

// POST /api/projects/[id]/bid
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const projectsRes = await dbQuery('SELECT title, status FROM projects WHERE id = $1', [projectId]);
    if (projectsRes.rows.length === 0) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    const project = projectsRes.rows[0];
    if (project.status !== 'open') return NextResponse.json({ error: 'This project is no longer accepting bids.' }, { status: 400 });

    const bidsRes = await dbQuery('SELECT id FROM project_bids WHERE "projectId" = $1 AND "userId" = $2', [projectId, decoded.userId]);
    if (bidsRes.rows.length > 0) return NextResponse.json({ error: 'You have already submitted a bid for this project.' }, { status: 400 });

    const body = await request.json();
    const { bidAmount, proposal, deliveryDays } = body;
    if (!proposal) return NextResponse.json({ error: 'Proposal is required.' }, { status: 400 });

    const insertRes = await dbQuery(
      `INSERT INTO project_bids ("projectId", "projectTitle", "userId", "userName", "userEmail", "bidAmount", proposal, "deliveryDays", status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [projectId, project.title, decoded.userId, decoded.name, decoded.email, bidAmount || 'Negotiable', proposal, deliveryDays || 'TBD', 'pending']
    );
    const newBid = insertRes.rows[0];

    await awardXP(decoded.userId, 50, `Submitted bid for project: ${project.title}`);

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'SUBMIT_BID', targetType: 'project_bid', targetId: newBid.id,
      details: `Bid on project: ${project.title}` });

    return NextResponse.json({ success: true, message: 'Bid submitted successfully!', bid: newBid });
  } catch (err) {
    console.error('/api/projects/[id]/bid error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
