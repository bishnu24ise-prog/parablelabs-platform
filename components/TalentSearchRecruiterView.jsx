"use client";
import React, { useState, useEffect } from 'react';

export default function TalentSearchRecruiterView() {
  const [talent, setTalent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => { fetchTalent(); }, [roleFilter]);

  async function fetchTalent() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (roleFilter) params.set('role', roleFilter);
      if (skillFilter) params.set('skill', skillFilter);
      const res = await fetch(`/api/talent/search?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTalent(data.talent || []);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  const roleColors = {
    Student: 'text-primary bg-primary/10 border-primary/20',
    Professional: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    Mentor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  };

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
          <a href="/RecruiterPortalParablelabs" className="text-on-surface-variant hover:text-primary font-label-md">Pipeline</a>
          <a href="/CreateJobPostingParablelabs" className="text-on-surface-variant hover:text-primary font-label-md">Post Job</a>
        </nav>
      </header>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
        <section className="mb-8">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Talent Search</h2>
          <p className="text-on-surface-variant">Search and discover real platform users by skills and role.</p>
        </section>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input className="w-full h-11 pl-11 pr-4 glass-card border border-white/10 rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary"
              placeholder="Search by name or email..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchTalent()} />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
            className="h-11 px-4 glass-card border border-white/10 rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary">
            <option value="">All Roles</option>
            {['Student', 'Professional', 'Mentor'].map(r => <option key={r}>{r}</option>)}
          </select>
          <input className="h-11 px-4 glass-card border border-white/10 rounded-xl text-on-surface text-sm focus:outline-none focus:border-primary"
            placeholder="Filter by skill (e.g. React)..." value={skillFilter}
            onChange={e => setSkillFilter(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchTalent()} />
        </div>

        {loading ? (
          <div className="flex justify-center py-32"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : error ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-error mb-2">{error}</p>
            <p className="text-on-surface-variant text-label-md">Recruiter or higher role required to access talent search.</p>
          </div>
        ) : talent.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block">search_off</span>
            <p>No talent found. Users will appear here as they join the platform.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talent.map(user => (
              <div key={user.id} className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                    {user.name?.charAt(0) || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline-sm text-on-surface truncate">{user.name}</p>
                    <p className="text-on-surface-variant text-label-sm">{user.email}</p>
                    <span className={`px-2 py-0.5 rounded text-label-sm font-bold border inline-block mt-1 ${roleColors[user.role] || 'text-on-surface-variant border-white/10'}`}>
                      {user.role}
                    </span>
                  </div>
                </div>

                {user.bio && <p className="text-on-surface-variant text-label-sm line-clamp-2">{user.bio}</p>}
                {user.university && <p className="text-on-surface-variant text-label-sm">🎓 {user.university}</p>}
                {user.company && <p className="text-on-surface-variant text-label-sm">🏢 {user.company}</p>}

                {user.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {user.skills.slice(0, 4).map(s => (
                      <span key={s} className="px-2 py-0.5 bg-primary/10 text-primary text-[11px] rounded border border-primary/20">{s}</span>
                    ))}
                    {user.skills.length > 4 && <span className="px-2 py-0.5 bg-white/5 text-on-surface-variant text-[11px] rounded">+{user.skills.length - 4}</span>}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-white/8 text-label-sm text-on-surface-variant">
                  <span>Level {user.level} · {user.xp} XP</span>
                  <div className="flex gap-3">
                    <span title="Challenges">🏆 {user.challengesSolved}</span>
                    <span title="Hackathons">🎪 {user.hackathonsJoined}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
