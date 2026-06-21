import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, writeTable, nextId, awardXP, logAuditEvent } from '@/lib/db';

// GET /api/projects/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const projects = readTable('projects');
    const project = projects.find(p => p.id === parseInt(id));
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);

    const bids = readTable('project_bids').filter(b => b.projectId === project.id);

    return NextResponse.json({
      ...project,
      bids,
      bidCount: bids.length,
      hasBid: decoded ? bids.some(b => b.userId === decoded.userId) : false,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
