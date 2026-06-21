"use client";
import React, { useState, useEffect } from 'react';

export default function ApplicationTrackerParablelabs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/applications')
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setApplications(data.applications || []);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const statusColors = {
    Applied: 'bg-primary/10 text-primary border-primary/20',
    Reviewed: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Interview: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Hired: 'bg-secondary/10 text-secondary border-secondary/20',
    Rejected: 'bg-error/10 text-error border-error/20',
  };

  const statusIcons = {
    Applied: 'send', Reviewed: 'visibility', Interview: 'groups',
    Hired: 'check_circle', Rejected: 'cancel',
  };

  const stats = {
    total: applications.length,
    interview: applications.filter(a => a.status === 'Interview').length,
    hired: applications.filter(a => a.status === 'Hired').length,
    pending: applications.filter(a => ['Applied', 'Reviewed'].includes(a.status)).length,
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #0B0D12; color: #e2e2e9; min-height: max(884px, 100dvh); -webkit-font-smoothing: antialiased; }
        .glass-card { background: rgba(22,25,34,0.8); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      ` }} />

      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-4 md:px-8">
        <h1 className="font-headline-md font-bold text-primary">ParableLabs</h1>
        <nav className="hidden md:flex gap-6">
          <a href="/ParablelabsDashboard" className="text-on-surface-variant hover:text-primary font-label-md transition-colors">Dashboard</a>
          <a href="/InternshipMarketplaceParablelabs" className="text-on-surface-variant hover:text-primary font-label-md transition-colors">Browse Internships</a>
        </nav>
      </header>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-4xl mx-auto">
        <section className="mb-10">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Application Tracker</h2>
          <p className="text-on-surface-variant">Track all your real internship applications in one place.</p>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Applied', value: stats.total, icon: 'send', color: 'text-primary' },
            { label: 'In Progress', value: stats.pending, icon: 'pending', color: 'text-yellow-400' },
            { label: 'Interviews', value: stats.interview, icon: 'groups', color: 'text-purple-400' },
            { label: 'Hired', value: stats.hired, icon: 'check_circle', color: 'text-secondary' },
          ].map(stat => (
            <div key={stat.label} className="glass-card rounded-2xl p-5">
              <span className={`material-symbols-outlined ${stat.color} mb-3 block`}>{stat.icon}</span>
              <p className="font-headline-lg text-on-surface font-bold">{stat.value}</p>
              <p className="text-on-surface-variant text-label-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-error mb-4">{error}</p>
            <a href="/LoginParablelabs" className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-label-md">Sign in</a>
          </div>
        ) : applications.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4 block">work_off</span>
            <h3 className="font-headline-md text-on-surface mb-2">No Applications Yet</h3>
            <p className="text-on-surface-variant mb-6">Browse internships and apply to start tracking.</p>
            <a href="/InternshipMarketplaceParablelabs" className="px-6 py-2.5 bg-primary-container text-on-primary-container rounded-xl font-label-md hover:bg-primary transition-all">
              Browse Internships
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-headline-sm text-on-surface">{app.listingTitle}</h3>
                    <span className={`px-3 py-0.5 rounded-full text-label-sm font-bold border flex items-center gap-1 ${statusColors[app.status] || ''}`}>
                      <span className="material-symbols-outlined text-[14px]">{statusIcons[app.status] || 'info'}</span>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-label-md">{app.company}</p>
                  {app.coverLetter && (
                    <p className="text-on-surface-variant text-label-sm mt-2 line-clamp-2 opacity-70">"{app.coverLetter}"</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-on-surface-variant text-label-sm">Applied</p>
                  <p className="font-label-md text-on-surface">{new Date(app.appliedAt).toLocaleDateString()}</p>
                  {app.updatedAt && app.updatedAt !== app.appliedAt && (
                    <p className="text-on-surface-variant text-label-sm mt-1">Updated {new Date(app.updatedAt).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
