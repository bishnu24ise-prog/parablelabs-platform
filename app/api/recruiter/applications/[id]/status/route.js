import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, readTable, writeTable, logAuditEvent } from '@/lib/db';

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

    const applications = readTable('applications');
    const index = applications.findIndex(a => a.id === appId);
    if (index === -1) return NextResponse.json({ error: 'Application not found' }, { status: 404 });

    const oldStatus = applications[index].status;
    applications[index].status = status;
    applications[index].updatedAt = new Date().toISOString();
    applications[index].updatedBy = decoded.userId;
    writeTable('applications', applications);

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'UPDATE_APPLICATION_STATUS', targetType: 'application', targetId: appId,
      details: `Status changed from ${oldStatus} to ${status} for ${applications[index].userName}` });

    return NextResponse.json({ success: true, application: applications[index] });
  } catch (err) {
    console.error('/api/recruiter/applications/[id]/status error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
