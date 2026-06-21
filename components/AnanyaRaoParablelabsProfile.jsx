"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AnanyaRaoParablelabsProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ bio: '', skills: '', github: '', linkedin: '', portfolio: '' });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    fetch('/api/profile')
      .then(r => r.json())
      .then(data => {
        if (data.error) { router.push('/LoginParablelabs'); return; }
        setProfile(data);
        setForm({
          bio: data.bio || '',
          skills: (data.skills || []).join(', '),
          github: data.github || '',
          linkedin: data.linkedin || '',
          portfolio: data.portfolio || '',
        });
      })
      .catch(() => router.push('/LoginParablelabs'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setSaveMsg('');
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bio: form.bio,
          skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
          github: form.github,
          linkedin: form.linkedin,
          portfolio: form.portfolio,
        }),
      });
      if (!res.ok) throw new Error('Save failed');
      // Re-fetch profile
      const r2 = await fetch('/api/profile');
      const updated = await r2.json();
      setProfile(updated);
      setEditing(false);
      setSaveMsg('Profile updated!');
    } catch (err) {
      setSaveMsg(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#6c5ce7] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!profile) return null;

  const xpToNext = 500 - (profile.xp % 500);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #0B0D12; color: #e2e2e9; -webkit-font-smoothing: antialiased; min-height: max(884px, 100dvh); }
        .glass-card { background: rgba(22,25,34,0.8); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        input, textarea { outline: none; }
        input:focus, textarea:focus { border-color: #6C5CE7 !important; box-shadow: 0 0 0 2px rgba(108,92,231,0.2); }
      ` }} />

      <nav className="hidden lg:flex fixed top-0 left-0 w-full h-16 items-center px-8 z-50 bg-surface-dim/80 backdrop-blur-lg border-b border-white/8 justify-between">
        <div className="flex items-center gap-8">
          <span className="font-headline-md font-bold text-primary">ParableLabs</span>
          <div className="flex gap-6">
            {[['Dashboard', '/ParablelabsDashboard'], ['Hackathons', '/HackathonsExplorer'], ['Challenges', '/DailyChallengesFeedParablelabs'], ['Leaderboard', '/GlobalLeaderboardParablelabs']].map(([label, href]) => (
              <a key={label} href={href} className="text-on-surface-variant hover:text-on-surface transition-colors font-label-md">{label}</a>
            ))}
          </div>
        </div>
        <button onClick={() => fetch('/api/auth/logout', { method: 'POST' }).then(() => router.push('/LoginParablelabs'))}
          className="flex items-center gap-2 text-on-surface-variant hover:text-error transition-colors font-label-md">
          <span className="material-symbols-outlined text-[18px]">logout</span>Sign Out
        </button>
      </nav>

      <header className="lg:hidden flex justify-between items-center px-4 h-16 w-full fixed top-0 z-40 bg-surface-dim/80 backdrop-blur-lg border-b border-white/8">
        <a href="/ParablelabsDashboard" className="material-symbols-outlined text-primary">home</a>
        <span className="font-headline-md-mobile font-bold text-primary">ParableLabs</span>
        <span className="material-symbols-outlined text-on-surface-variant">person</span>
      </header>

      <main className="lg:pt-24 pt-20 pb-24 px-4 lg:px-8 max-w-4xl mx-auto">
        {/* Profile Header */}
        <section className="flex flex-col lg:flex-row items-start lg:items-end gap-6 mb-12 relative">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-3xl overflow-hidden border-2 border-primary/30 bg-primary/10 flex items-center justify-center shadow-2xl text-5xl font-black text-primary">
            {profile.name?.charAt(0) || '?'}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="font-headline-xl text-headline-lg lg:text-headline-xl text-on-surface">{profile.name}</h1>
              <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-label-sm">
                Level {profile.level} · {profile.xp} XP
              </span>
            </div>
            <p className="font-body-lg text-on-surface-variant mb-1">{profile.role}</p>
            {profile.bio && <p className="text-on-surface-variant font-body-md max-w-2xl">{profile.bio}</p>}
            {profile.university && <p className="text-on-surface-variant text-label-md">{profile.university}{profile.gradYear ? ` · Class of ${profile.gradYear}` : ''}</p>}
            {profile.company && <p className="text-on-surface-variant text-label-md">{profile.company}{profile.experience ? ` · ${profile.experience} years exp.` : ''}</p>}

            {/* XP Progress */}
            <div className="mt-4 max-w-xs">
              <div className="flex justify-between text-label-sm text-on-surface-variant mb-1">
                <span>Level {profile.level}</span>
                <span>{xpToNext} XP to Level {profile.level + 1}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${((profile.xp % 500) / 500) * 100}%` }} />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <button onClick={() => setEditing(!editing)} className="px-6 py-2.5 bg-primary-container text-on-primary-container font-label-md rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg">
                {editing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
              {profile.github && <a href={profile.github} target="_blank" rel="noopener" className="px-6 py-2.5 bg-white/5 border border-white/10 text-on-surface font-label-md rounded-xl hover:bg-white/10 transition-all">GitHub</a>}
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener" className="px-6 py-2.5 bg-white/5 border border-white/10 text-on-surface font-label-md rounded-xl hover:bg-white/10 transition-all">LinkedIn</a>}
            </div>
          </div>
        </section>

        {/* Edit Form */}
        {editing && (
          <form onSubmit={handleSave} className="glass-card rounded-2xl p-6 mb-10 space-y-4">
            <h2 className="font-headline-md text-on-surface mb-4">Edit Profile</h2>
            {[
              { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell the platform about yourself...' },
              { name: 'skills', label: 'Skills (comma-separated)', type: 'input', placeholder: 'React, Python, ML, Node.js' },
              { name: 'github', label: 'GitHub URL', type: 'input', placeholder: 'https://github.com/username' },
              { name: 'linkedin', label: 'LinkedIn URL', type: 'input', placeholder: 'https://linkedin.com/in/username' },
              { name: 'portfolio', label: 'Portfolio URL', type: 'input', placeholder: 'https://yoursite.com' },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-label-md text-on-surface-variant mb-2">{f.label}</label>
                {f.type === 'textarea'
                  ? <textarea name={f.name} value={form[f.name]} onChange={e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} placeholder={f.placeholder}
                      className="w-full h-24 px-4 py-3 bg-[#161922] border border-white/10 rounded-xl text-on-surface text-sm resize-none" />
                  : <input name={f.name} value={form[f.name]} onChange={e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))} placeholder={f.placeholder}
                      className="w-full h-11 px-4 bg-[#161922] border border-white/10 rounded-xl text-on-surface text-sm" />
                }
              </div>
            ))}
            {saveMsg && <p className="text-secondary text-label-sm">{saveMsg}</p>}
            <button type="submit" disabled={saving} className="px-8 py-3 bg-primary-container text-on-primary-container font-label-md rounded-xl hover:bg-primary transition-all disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}

        {/* Stats Row */}
        <section className="mb-10">
          <div className="flex overflow-x-auto gap-6 pb-4">
            {[
              { label: 'Hackathons Joined', value: profile.stats?.hackathonsJoined ?? 0, icon: 'workspace_premium', color: 'text-primary' },
              { label: 'Challenges Solved', value: profile.stats?.challengesSolved ?? 0, icon: 'code', color: 'text-secondary' },
              { label: 'Projects Submitted', value: profile.stats?.projectsSubmitted ?? 0, icon: 'construction', color: 'text-primary' },
              { label: 'Applications', value: profile.stats?.applicationsSubmitted ?? 0, icon: 'work', color: 'text-purple-400' },
              { label: 'Current Streak', value: `${profile.stats?.currentStreak ?? 0}d`, icon: 'local_fire_department', color: 'text-secondary' },
            ].map(stat => (
              <div key={stat.label} className="min-w-[180px] flex-1 glass-card p-6 rounded-2xl hover:border-primary/40 transition-colors">
                <span className={`material-symbols-outlined ${stat.color} mb-4 block`}>{stat.icon}</span>
                <p className="font-label-sm text-on-surface-variant uppercase mb-1">{stat.label}</p>
                <p className="font-headline-lg text-on-surface">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        {(profile.skills || []).length > 0 && (
          <section className="mb-10">
            <h2 className="font-label-sm text-on-surface-variant uppercase tracking-widest mb-4">Technical Skills</h2>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map(skill => (
                <span key={skill} className="px-4 py-2 glass-card rounded-xl text-on-surface font-label-md flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />{skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
