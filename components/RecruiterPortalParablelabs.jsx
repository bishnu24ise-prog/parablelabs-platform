"use client";
import React, { useState, useEffect } from 'react';

export default function RecruiterPortalParablelabs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [activeTab, setActiveTab] = useState('Applied');

  useEffect(() => { fetchPipeline(); }, []);

  async function fetchPipeline() {
    try {
      const res = await fetch('/api/recruiter/pipeline');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setData(json);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  async function updateStatus(appId, status) {
    setUpdatingId(appId);
    try {
      const res = await fetch(`/api/recruiter/applications/${appId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      await fetchPipeline();
    } catch (err) { console.error(err); }
    finally { setUpdatingId(null); }
  }

  const statusTabs = ['Applied', 'Reviewed', 'Interview', 'Hired', 'Rejected'];
  const statusColors = {
    Applied: 'bg-primary/10 text-primary border-primary/20',
    Reviewed: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Interview: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Hired: 'bg-secondary/10 text-secondary border-secondary/20',
    Rejected: 'bg-error/10 text-error border-error/20',
  };
  const nextStatus = { Applied: 'Reviewed', Reviewed: 'Interview', Interview: 'Hired' };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #0B0D12; color: #e2e2e9; min-height: max(884px, 100dvh); }
        .glass-card { background: rgba(22,25,34,0.8); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      ` }} />

      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-4 md:px-8">
        <h1 className="font-headline-md font-bold text-primary">ParableLabs</h1>
        <nav className="hidden md:flex gap-6">
          <a href="/ParablelabsDashboard" className="text-on-surface-variant hover:text-primary font-label-md">Dashboard</a>
          <a href="/TalentSearchRecruiterView" className="text-on-surface-variant hover:text-primary font-label-md">Talent Search</a>
          <a href="/CreateJobPostingParablelabs" className="text-on-surface-variant hover:text-primary font-label-md">Post Job</a>
        </nav>
      </header>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
        <section className="mb-8">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Recruiter Portal</h2>
          <p className="text-on-surface-variant">Manage applicant pipeline across your job listings.</p>
        </section>

        {loading ? (
          <div className="flex justify-center py-32"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : error ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-error mb-4">{error}</p>
            <p className="text-on-surface-variant text-label-md">You need a Recruiter or Company Admin role to access this portal.</p>
          </div>
        ) : data && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {statusTabs.map(s => (
                <div key={s} className={`glass-card rounded-2xl p-4 cursor-pointer transition-all ${activeTab === s ? 'border-primary/40 bg-primary/5' : 'hover:border-primary/20'}`}
                  onClick={() => setActiveTab(s)}>
                  <p className="font-headline-lg text-on-surface font-bold">{data.pipeline[s]?.length || 0}</p>
                  <p className={`text-label-sm font-bold ${statusColors[s]?.split(' ')[1] || 'text-on-surface-variant'}`}>{s}</p>
                </div>
              ))}
            </div>

            {/* Pipeline by Status */}
            <div>
              <h3 className="font-headline-md text-on-surface mb-4 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-label-sm font-bold border ${statusColors[activeTab] || ''}`}>{activeTab}</span>
                <span className="text-on-surface-variant font-body-md">— {data.pipeline[activeTab]?.length || 0} applicants</span>
              </h3>

              {data.pipeline[activeTab]?.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-3 block">inbox</span>
                  No applicants in this stage.
                </div>
              ) : (
                <div className="space-y-4">
                  {data.pipeline[activeTab]?.map(app => (
                    <div key={app.id} className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                        {app.userName?.charAt(0) || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-headline-sm text-on-surface">{app.userName}</p>
                        <p className="text-on-surface-variant text-label-md">{app.userEmail} · {app.userRole}</p>
                        <p className="text-on-surface-variant text-label-sm mt-1">Applied to: <span className="text-on-surface">{app.listingTitle}</span></p>
                        {app.coverLetter && <p className="text-on-surface-variant text-label-sm mt-1 line-clamp-1">"{app.coverLetter}"</p>}
                      </div>
                      <div className="flex flex-wrap gap-2 shrink-0">
                        {nextStatus[app.status] && (
                          <button
                            onClick={() => updateStatus(app.id, nextStatus[app.status])}
                            disabled={updatingId === app.id}
                            className="px-4 py-2 bg-primary-container hover:bg-primary text-on-primary-container font-label-sm rounded-xl transition-all disabled:opacity-50"
                          >
                            {updatingId === app.id ? '...' : `→ ${nextStatus[app.status]}`}
                          </button>
                        )}
                        {app.status !== 'Rejected' && app.status !== 'Hired' && (
                          <button
                            onClick={() => updateStatus(app.id, 'Rejected')}
                            disabled={updatingId === app.id}
                            className="px-4 py-2 bg-error/10 hover:bg-error/20 text-error border border-error/20 font-label-sm rounded-xl transition-all disabled:opacity-50"
                          >
                            Reject
                          </button>
                        )}
                        <div className="text-right">
                          <p className="text-on-surface-variant text-label-sm">{new Date(app.appliedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
