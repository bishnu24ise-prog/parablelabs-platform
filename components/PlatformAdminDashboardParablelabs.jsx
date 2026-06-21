"use client";
import React, { useState, useEffect } from 'react';

const VALID_ROLES = ['Student', 'Professional', 'Mentor', 'Recruiter', 'Company Admin', 'Platform Admin'];

export default function PlatformAdminDashboardParablelabs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { fetchUsers(); }, []);

  async function fetchUsers() {
    try {
      const res = await fetch('/api/admin/users');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setData(json);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  async function updateRole(userId, role) {
    setUpdatingId(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      await fetchUsers();
    } catch (err) { alert(err.message); }
    finally { setUpdatingId(null); }
  }

  async function deleteUser(userId, name) {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    setDeletingId(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      await fetchUsers();
    } catch (err) { alert(err.message); }
    finally { setDeletingId(null); }
  }

  const roleColors = {
    Student: 'text-primary', Professional: 'text-blue-400', Mentor: 'text-purple-400',
    Recruiter: 'text-yellow-400', 'Company Admin': 'text-orange-400', 'Platform Admin': 'text-secondary',
  };

  const filteredUsers = (data?.users || []).filter(u =>
    !searchQuery || u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #0B0D12; color: #e2e2e9; min-height: max(884px, 100dvh); }
        .glass-card { background: rgba(22,25,34,0.8); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      ` }} />

      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-4 md:px-8">
        <h1 className="font-headline-md font-bold text-primary">ParableLabs — Admin</h1>
        <nav className="hidden md:flex gap-6">
          <a href="/AuditLogPlatformAdmin" className="text-on-surface-variant hover:text-primary font-label-md">Audit Log</a>
          <a href="/UserRoleManagementRbac" className="text-on-surface-variant hover:text-primary font-label-md">RBAC</a>
        </nav>
      </header>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-6xl mx-auto">
        <section className="mb-8">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Platform Admin Dashboard</h2>
          <p className="text-on-surface-variant">Manage all users, roles, and platform activity.</p>
        </section>

        {loading ? (
          <div className="flex justify-center py-32"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : error ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-error mb-2">{error}</p>
            <p className="text-on-surface-variant text-label-md">Platform Admin role required.</p>
          </div>
        ) : data && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
              {Object.entries(data.stats.byRole).map(([role, count]) => (
                <div key={role} className="glass-card rounded-2xl p-4">
                  <p className={`font-headline-lg font-bold ${roleColors[role] || 'text-on-surface'}`}>{count}</p>
                  <p className="text-on-surface-variant text-label-sm">{role}</p>
                </div>
              ))}
            </div>

            {/* User Search + Table */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/8 flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <h3 className="font-headline-md text-on-surface">All Users ({data.stats.total})</h3>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                  <input className="h-10 pl-10 pr-4 bg-[#0B0D12] border border-white/10 rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary w-64"
                    placeholder="Search by name or email..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/8">
                      <th className="text-left px-6 py-3 text-on-surface-variant text-label-sm font-bold uppercase tracking-wider">User</th>
                      <th className="text-left px-6 py-3 text-on-surface-variant text-label-sm font-bold uppercase tracking-wider">Role</th>
                      <th className="text-left px-6 py-3 text-on-surface-variant text-label-sm font-bold uppercase tracking-wider">XP / Level</th>
                      <th className="text-left px-6 py-3 text-on-surface-variant text-label-sm font-bold uppercase tracking-wider">Joined</th>
                      <th className="text-right px-6 py-3 text-on-surface-variant text-label-sm font-bold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-white/3 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                              {user.name?.charAt(0) || '?'}
                            </div>
                            <div>
                              <p className="font-label-md text-on-surface">{user.name}</p>
                              <p className="text-on-surface-variant text-label-sm">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={user.role}
                            onChange={e => updateRole(user.id, e.target.value)}
                            disabled={updatingId === user.id}
                            className={`bg-transparent border border-white/10 rounded-lg px-3 py-1.5 text-label-sm focus:outline-none focus:border-primary cursor-pointer disabled:opacity-50 ${roleColors[user.role] || 'text-on-surface'}`}
                          >
                            {VALID_ROLES.map(r => <option key={r} value={r} className="bg-[#161922] text-white">{r}</option>)}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-secondary font-bold">{user.xp} XP</p>
                          <p className="text-on-surface-variant text-label-sm">Level {user.level}</p>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant text-label-sm">
                          {user.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteUser(user.id, user.name)}
                            disabled={deletingId === user.id}
                            className="px-3 py-1.5 bg-error/10 hover:bg-error/20 text-error border border-error/20 rounded-lg text-label-sm transition-all disabled:opacity-50"
                          >
                            {deletingId === user.id ? '...' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
