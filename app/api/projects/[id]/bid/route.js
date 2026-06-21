import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, writeTable, nextId, awardXP, logAuditEvent } from '@/lib/db';

// POST /api/projects/[id]/bid
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const projects = readTable('projects');
    const project = projects.find(p => p.id === projectId);
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    if (project.status !== 'open') return NextResponse.json({ error: 'This project is no longer accepting bids.' }, { status: 400 });

    const bids = readTable('project_bids');
    const alreadyBid = bids.some(b => b.projectId === projectId && b.userId === decoded.userId);
    if (alreadyBid) return NextResponse.json({ error: 'You have already submitted a bid for this project.' }, { status: 400 });

    const body = await request.json();
    const { bidAmount, proposal, deliveryDays } = body;
    if (!proposal) return NextResponse.json({ error: 'Proposal is required.' }, { status: 400 });

    const newBid = {
      id: nextId(bids), projectId, projectTitle: project.title,
      userId: decoded.userId, userName: decoded.name, userEmail: decoded.email,
      bidAmount: bidAmount || 'Negotiable', proposal, deliveryDays: deliveryDays || 'TBD',
      status: 'pending', submittedAt: new Date().toISOString()
    };
    bids.push(newBid);
    writeTable('project_bids', bids);

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
