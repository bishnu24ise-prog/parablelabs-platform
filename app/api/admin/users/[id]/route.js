import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, dbQuery, logAuditEvent } from '@/lib/db';

const VALID_ROLES = ['Student', 'Professional', 'Mentor', 'Recruiter', 'Company Admin', 'Platform Admin'];

// PUT /api/admin/users/[id]/role
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const targetId = parseInt(id);

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (decoded.role !== 'Platform Admin') {
      return NextResponse.json({ error: 'Platform Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { role } = body;
    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}` }, { status: 400 });
    }

    const res = await dbQuery('UPDATE users SET role = $1 WHERE id = $2', [role, targetId]);
    
    // Fetch updated user info for audit
    const userRes = await dbQuery('SELECT id, name, email, role FROM users WHERE id = $1', [targetId]);
    if (userRes.rows.length === 0) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'UPDATE_USER_ROLE', targetType: 'user', targetId: targetId,
      details: `Changed role of ${userRes.rows[0].name} to ${role}` });

    return NextResponse.json({ success: true, user: userRes.rows[0] });
  } catch (err) {
    console.error('/api/admin/users/[id]/role error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/admin/users/[id]
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const targetId = parseInt(id);

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const decoded = verifySession(session?.value);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (decoded.role !== 'Platform Admin') {
      return NextResponse.json({ error: 'Platform Admin access required' }, { status: 403 });
    }
    if (targetId === decoded.userId) {
      return NextResponse.json({ error: 'Cannot delete your own account.' }, { status: 400 });
    }

    const userRes = await dbQuery('SELECT id, name, email FROM users WHERE id = $1', [targetId]);
    if (userRes.rows.length === 0) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    const targetUser = userRes.rows[0];

    await dbQuery('DELETE FROM users WHERE id = $1', [targetId]);

    logAuditEvent({ actorId: decoded.userId, actorName: decoded.name, actorRole: decoded.role,
      action: 'DELETE_USER', targetType: 'user', targetId: targetId,
      details: `Deleted user: ${targetUser.name} (${targetUser.email})` });

    return NextResponse.json({ success: true, message: `User ${targetUser.name} deleted.` });
  } catch (err) {
    console.error('/api/admin/users/[id] DELETE error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
