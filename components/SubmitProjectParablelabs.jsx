"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitProjectParablelabs() {
  const router = useRouter();
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] = useState('');
  const [form, setForm] = useState({ projectTitle: '', description: '', repoUrl: '', demoUrl: '', techStack: '', teamMembers: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch('/api/hackathons?status=open')
      .then(r => r.json())
      .then(data => {
        const registered = (data.hackathons || []).filter(h => h.isRegistered && !h.hasSubmitted);
        setHackathons(registered);
        if (registered.length > 0) setSelectedHackathon(String(registered[0].id));
      })
      .catch(console.error);
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedHackathon) { setError('Please select a hackathon.'); return; }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/hackathons/${selectedHackathon}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean),
          teamMembers: form.teamMembers.split(',').map(s => s.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(`Project "${form.projectTitle}" submitted! +200 XP earned. 🎉`);
      setForm({ projectTitle: '', description: '', repoUrl: '', demoUrl: '', techStack: '', teamMembers: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #0B0D12; color: #e2e2e9; min-height: max(884px, 100dvh); }
        .glass-card { background: rgba(22,25,34,0.8); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: #6C5CE7 !important; box-shadow: 0 0 0 2px rgba(108,92,231,0.2); }
      ` }} />

      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-4 md:px-8">
        <button onClick={() => router.push('/HackathonsExplorer')} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-label-md hidden md:inline">Back to Hackathons</span>
        </button>
        <h1 className="font-headline-md font-bold text-primary">ParableLabs</h1>
        <div className="w-24" />
      </header>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-2xl mx-auto">
        <section className="mb-8">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Submit Project</h2>
          <p className="text-on-surface-variant">Earn +200 XP for submitting your hackathon project.</p>
        </section>

        {success ? (
          <div className="glass-card rounded-2xl p-10 text-center">
            <span className="material-symbols-outlined text-6xl text-secondary mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <h3 className="font-headline-lg text-on-surface mb-3">Submission Received!</h3>
            <p className="text-secondary font-label-md mb-6">{success}</p>
            <button onClick={() => router.push('/HackathonsExplorer')} className="px-8 py-3 bg-primary-container text-on-primary-container rounded-xl font-label-md hover:bg-primary transition-all">
              View All Hackathons
            </button>
          </div>
        ) : (
          <form className="glass-card rounded-2xl p-8 space-y-6" onSubmit={handleSubmit}>
            {hackathons.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-3 block">event_busy</span>
                <p className="text-on-surface-variant">You need to register for a hackathon before submitting a project.</p>
                <button type="button" onClick={() => router.push('/HackathonsExplorer')} className="mt-4 px-6 py-2.5 bg-primary-container text-on-primary-container rounded-xl font-label-md hover:bg-primary transition-all">
                  Browse Hackathons
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="block text-label-md text-on-surface-variant">Select Hackathon *</label>
                  <select value={selectedHackathon} onChange={e => setSelectedHackathon(e.target.value)} required
                    className="w-full h-12 px-4 bg-[#161922] border border-white/10 rounded-xl text-on-surface text-sm">
                    {hackathons.map(h => <option key={h.id} value={h.id}>{h.title}</option>)}
                  </select>
                </div>

                {[
                  { name: 'projectTitle', label: 'Project Title *', placeholder: 'e.g. AI Resume Optimizer', type: 'input' },
                  { name: 'description', label: 'Project Description *', placeholder: 'What does your project do? What problem does it solve?', type: 'textarea' },
                  { name: 'repoUrl', label: 'GitHub / Repo URL', placeholder: 'https://github.com/...', type: 'input' },
                  { name: 'demoUrl', label: 'Demo URL (optional)', placeholder: 'https://your-demo.vercel.app', type: 'input' },
                  { name: 'techStack', label: 'Tech Stack (comma-separated)', placeholder: 'React, Python, FastAPI, PostgreSQL', type: 'input' },
                  { name: 'teamMembers', label: 'Team Members (comma-separated names)', placeholder: 'Alice, Bob, Charlie', type: 'input' },
                ].map(field => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-label-md text-on-surface-variant">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea name={field.name} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder} required={field.label.includes('*')}
                        className="w-full h-28 px-4 py-3 bg-[#161922] border border-white/10 rounded-xl text-on-surface text-sm resize-none" />
                    ) : (
                      <input name={field.name} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder} required={field.label.includes('*')}
                        className="w-full h-12 px-4 bg-[#161922] border border-white/10 rounded-xl text-on-surface text-sm" />
                    )}
                  </div>
                ))}

                {error && (
                  <div className="p-4 rounded-xl bg-error/10 text-error border border-error/20 text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-primary-container hover:bg-primary text-on-primary-container font-headline-sm rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? 'Submitting...' : 'Submit Project (+200 XP)'}
                  {!loading && <span className="material-symbols-outlined">send</span>}
                </button>
              </>
            )}
          </form>
        )}
      </main>
    </>
  );
}
