"use client";
import React, { useState, useEffect } from 'react';

export default function AuditLogPlatformAdmin() {
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  useEffect(() => {
    fetch('/api/admin/audit-log')
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setLog(data.log || []);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const actionColors = {
    CREATE_HACKATHON: 'text-primary', HACKATHON_REGISTER: 'text-secondary', HACKATHON_SUBMIT: 'text-secondary',
    APPLY_INTERNSHIP: 'text-purple-400', CREATE_LISTING: 'text-yellow-400', UPDATE_APPLICATION_STATUS: 'text-orange-400',
    UPDATE_USER_ROLE: 'text-error', DELETE_USER: 'text-error', AI_EVALUATION_SUBMIT: 'text-blue-400',
    SUBMIT_BID: 'text-cyan-400', CREATE_PROJECT: 'text-green-400',
  };

  const uniqueActions = [...new Set(log.map(l => l.action))];

  const filtered = log.filter(l => {
    const matchQ = !searchQuery || l.actorName?.toLowerCase().includes(searchQuery.toLowerCase()) || l.details?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchA = !actionFilter || l.action === actionFilter;
    return matchQ && matchA;
  });

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
          <a href="/PlatformAdminDashboardParablelabs" className="text-on-surface-variant hover:text-primary font-label-md">Users</a>
          <a href="/UserRoleManagementRbac" className="text-on-surface-variant hover:text-primary font-label-md">RBAC</a>
        </nav>
      </header>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
        <section className="mb-8">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Audit Log</h2>
          <p className="text-on-surface-variant">All platform actions are recorded here in real-time.</p>
        </section>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input className="w-full h-11 pl-11 pr-4 glass-card border border-white/10 rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary"
              placeholder="Search by actor or description..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <select value={actionFilter} onChange={e => setActionFilter(e.target.value)}
            className="h-11 px-4 glass-card border border-white/10 rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary">
            <option value="">All Actions</option>
            {uniqueActions.map(a => <option key={a} value={a}>{a.replace(/_/g, ' ')}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-32"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : error ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-error mb-2">{error}</p>
            <p className="text-on-surface-variant text-label-md">Platform Admin role required.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block">receipt_long</span>
            <p>{log.length === 0 ? 'No audit events recorded yet. Actions will appear here as users interact with the platform.' : 'No events match your search.'}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(event => (
              <div key={event.id} className="glass-card rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {event.actorName?.charAt(0) || '?'}
                  </div>
                  <div>
                    <p className="font-label-md text-on-surface">{event.actorName}</p>
                    <p className="text-on-surface-variant text-label-sm">{event.actorRole}</p>
                  </div>
                </div>
                <div className="flex-1 min-w-0 md:pl-4 md:border-l md:border-white/8">
                  <span className={`font-mono text-label-sm font-bold ${actionColors[event.action] || 'text-on-surface-variant'}`}>
                    {event.action.replace(/_/g, ' ')}
                  </span>
                  {event.details && <p className="text-on-surface-variant text-label-sm mt-0.5 truncate">{event.details}</p>}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-on-surface-variant text-label-sm">{new Date(event.timestamp).toLocaleDateString()}</p>
                  <p className="text-on-surface-variant text-[11px]">{new Date(event.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
