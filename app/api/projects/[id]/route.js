import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery } from '@/lib/db';

// GET /api/projects/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const projectsRes = await dbQuery('SELECT * FROM projects WHERE id = $1', [parseInt(id)]);
    if (projectsRes.rows.length === 0) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    const project = projectsRes.rows[0];
    if (typeof project.tags === 'string') {
      try { project.tags = JSON.parse(project.tags); } catch { project.tags = []; }
    }

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);

    const bidsRes = await dbQuery('SELECT * FROM project_bids WHERE "projectId" = $1', [project.id]);
    const bids = bidsRes.rows;

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
