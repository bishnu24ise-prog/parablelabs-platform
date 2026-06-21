"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HackathonsExplorer() {
  const router = useRouter();
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [registeringId, setRegisteringId] = useState(null);
  const [message, setMessage] = useState({ id: null, type: '', text: '' });

  useEffect(() => {
    fetchHackathons();
  }, [statusFilter]);

  async function fetchHackathons() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (searchQuery) params.set('q', searchQuery);
      const res = await fetch(`/api/hackathons?${params}`);
      const data = await res.json();
      setHackathons(data.hackathons || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(hackathonId) {
    setRegisteringId(hackathonId);
    setMessage({ id: hackathonId, type: '', text: '' });
    try {
      const res = await fetch(`/api/hackathons/${hackathonId}/register`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage({ id: hackathonId, type: 'success', text: data.message });
      // Refresh list to update registration status
      fetchHackathons();
    } catch (err) {
      setMessage({ id: hackathonId, type: 'error', text: err.message });
    } finally {
      setRegisteringId(null);
    }
  }

  const filtered = hackathons.filter(h =>
    !searchQuery ||
    h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColors = { open: 'text-secondary border-secondary/20 bg-secondary/10', upcoming: 'text-primary border-primary/20 bg-primary/10', completed: 'text-on-surface-variant border-white/10 bg-white/5' };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0b0d12; }
        ::-webkit-scrollbar-thumb { background: #23262f; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #6c5ce7; }
        .glass-card { background: #161922; border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
        body { min-height: max(884px, 100dvh); background-color: #0B0D12; color: #e2e2e9; }
      ` }} />

      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 h-16 flex justify-between items-center px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-4">
          <h1 className="text-headline-md font-headline-md font-bold text-on-surface">ParableLabs</h1>
        </div>
        <nav className="hidden md:flex gap-6">
          <a className="text-primary font-label-md border-b-2 border-primary pb-1" href="#">Hackathons</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-label-md" href="/DailyChallengesFeedParablelabs">Challenges</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-label-md" href="/InternshipMarketplaceParablelabs">Internships</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors font-label-md" href="/ParablelabsDashboard">Dashboard</a>
        </nav>
        <a href="/ParablelabsDashboard" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-sm">
          <span className="material-symbols-outlined text-[20px]">home</span>
        </a>
      </header>

      <main className="pt-24 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        <section className="mb-10">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Hackathons</h2>
          <p className="text-on-surface-variant font-body-lg">Join competitions, build projects, earn XP and recognition.</p>
        </section>

        {/* Search + Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input
              className="w-full h-12 pl-12 pr-4 glass-card rounded-xl text-on-surface font-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary border border-white/10 transition-all"
              placeholder="Search hackathons..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchHackathons()}
            />
          </div>
          <div className="flex gap-2">
            {['', 'open', 'upcoming', 'completed'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-xl font-label-md text-sm transition-all border ${statusFilter === s ? 'bg-primary text-on-primary border-primary' : 'glass-card text-on-surface-variant border-white/10 hover:border-primary/40'}`}
              >
                {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Hackathon Cards */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block">event_busy</span>
            <p className="font-body-lg">No hackathons found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filtered.map(h => (
              <div key={h.id} className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/30 transition-all group">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`px-3 py-0.5 rounded-full text-label-sm font-bold uppercase tracking-wider border ${statusColors[h.status] || 'text-on-surface-variant border-white/10 bg-white/5'}`}>
                        {h.status}
                      </span>
                      {h.isRegistered && (
                        <span className="px-3 py-0.5 rounded-full text-label-sm font-bold uppercase tracking-wider border text-secondary border-secondary/20 bg-secondary/10">
                          Registered ✓
                        </span>
                      )}
                    </div>
                    <h3 className="font-headline-md text-on-surface group-hover:text-primary transition-colors">{h.title}</h3>
                    <p className="text-on-surface-variant text-label-md mt-1">by {h.organizer}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-secondary font-headline-sm font-bold">{h.prize}</p>
                    <p className="text-on-surface-variant text-label-sm">{h.registrationCount} joined</p>
                  </div>
                </div>

                <p className="text-on-surface-variant font-body-sm line-clamp-2">{h.description}</p>

                <div className="flex flex-wrap gap-2">
                  {h.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-label-sm rounded-lg border border-primary/20">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-label-sm text-on-surface-variant pt-2 border-t border-white/8">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    Deadline: {new Date(h.deadline).toLocaleDateString()}
                  </span>
                  <span>Max {h.maxTeamSize} members</span>
                </div>

                {/* Message per card */}
                {message.id === h.id && message.text && (
                  <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'bg-error/10 text-error border border-error/20'}`}>
                    <span className="material-symbols-outlined text-[18px]">{message.type === 'success' ? 'check_circle' : 'error'}</span>
                    {message.text}
                  </div>
                )}

                <div className="flex gap-3 mt-auto">
                  {h.isRegistered ? (
                    <button
                      onClick={() => router.push('/SubmitProjectParablelabs')}
                      className="flex-1 py-2.5 bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 font-label-md rounded-xl transition-all"
                    >
                      Submit Project
                    </button>
                  ) : h.status === 'completed' ? (
                    <button disabled className="flex-1 py-2.5 bg-white/5 text-on-surface-variant font-label-md rounded-xl cursor-not-allowed">
                      Ended
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegister(h.id)}
                      disabled={registeringId === h.id}
                      className="flex-1 py-2.5 bg-primary-container hover:bg-primary text-on-primary-container font-label-md rounded-xl transition-all active:scale-95 disabled:opacity-50"
                    >
                      {registeringId === h.id ? 'Registering...' : 'Register (+100 XP)'}
                    </button>
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
