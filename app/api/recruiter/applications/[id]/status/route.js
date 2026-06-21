import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery, logAuditEvent } from '@/lib/db';

const VALID_STATUSES = ['Applied', 'Reviewed', 'Interview', 'Rejected', 'Hired'];

// PUT /api/recruiter/applications/[id]/status
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const appId = parseInt(id);

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!['Recruiter', 'Company Admin', 'Platform Admin'].includes(decoded.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { status } = body;
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` }, { status: 400 });
    }

    const appRes = await dbQuery('SELECT status, "userName" FROM applications WHERE id = $1', [appId]);
    if (appRes.rows.length === 0) return NextResponse.json({ error: 'Application not found' }, { status: 404 });

    const oldStatus = appRes.rows[0].status;
    const userName = appRes.rows[0].userName;

    const updateRes = await dbQuery(
      'UPDATE applications SET status = $1, "updatedAt" = NOW(), "updatedBy" = $2 WHERE id = $3 RETURNING *',
      [status, decoded.userId, appId]
    );
    const updatedApplication = updateRes.rows[0];

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'UPDATE_APPLICATION_STATUS', targetType: 'application', targetId: appId,
      details: `Status changed from ${oldStatus} to ${status} for ${userName}` });

    return NextResponse.json({ success: true, application: updatedApplication });
  } catch (err) {
    console.error('/api/recruiter/applications/[id]/status error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
