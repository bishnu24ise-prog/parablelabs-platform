import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery, logAuditEvent } from '@/lib/db';

// Seeding handled by migration script

// GET /api/projects
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);

    const projectsRes = await dbQuery('SELECT * FROM projects WHERE status = $1', ['open']);
    const projects = projectsRes.rows.map(p => {
      if (typeof p.tags === 'string') {
        try { p.tags = JSON.parse(p.tags); } catch { p.tags = []; }
      }
      return p;
    });

    let bids = [];
    if (decoded) {
      const bidsRes = await dbQuery('SELECT "projectId" FROM project_bids WHERE "userId" = $1', [decoded.userId]);
      bids = bidsRes.rows;
    }

    const allBidsRes = await dbQuery('SELECT "projectId" FROM project_bids');
    const allBids = allBidsRes.rows;

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const category = searchParams.get('category');

    let filtered = projects.filter(p => p.status === 'open');
    if (q) {
      const ql = q.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(ql) || p.description.toLowerCase().includes(ql));
    }
    if (category) filtered = filtered.filter(p => p.category === category);

    const enriched = filtered.map(p => ({
      ...p,
      bidCount: allBids.filter(b => b.projectId === p.id).length,
      hasBid: decoded ? bids.some(b => b.projectId === p.id) : false,
    }));

    return NextResponse.json({ projects: enriched });
  } catch (err) {
    console.error('/api/projects GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/projects — post a new project
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { title, description, category, budget, duration, tags, requirements } = body;
    if (!title || !description) return NextResponse.json({ error: 'Title and description required' }, { status: 400 });

    const insertRes = await dbQuery(
      `INSERT INTO projects (title, description, category, budget, duration, tags, status, requirements, "postedBy", "postedByName") 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [title, description, category || 'General', budget || 'TBD', duration || 'TBD', JSON.stringify(tags || []), 'open', requirements || '', decoded.userId, decoded.name]
    );
    const newProject = insertRes.rows[0];
    if (typeof newProject.tags === 'string') {
       try { newProject.tags = JSON.parse(newProject.tags); } catch { newProject.tags = []; }
    }

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'CREATE_PROJECT', targetType: 'project', targetId: newProject.id,
      details: `Posted project: ${title}` });

    return NextResponse.json({ success: true, project: newProject });
  } catch (err) {
    console.error('/api/projects POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
