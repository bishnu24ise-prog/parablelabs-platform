"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateJobPostingParablelabs() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '', company: '', description: '', location: 'Remote', type: 'Internship',
    duration: '', stipend: '', tags: '', requirements: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(`Job posting "${form.title}" created successfully!`);
      setForm({ title: '', company: '', description: '', location: 'Remote', type: 'Internship', duration: '', stipend: '', tags: '', requirements: '' });
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
        <button onClick={() => router.push('/RecruiterPortalParablelabs')} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md">
          <span className="material-symbols-outlined">arrow_back</span>Recruiter Portal
        </button>
        <h1 className="font-headline-md font-bold text-primary">ParableLabs</h1>
        <div className="w-32" />
      </header>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-2xl mx-auto">
        <section className="mb-8">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Create Job Posting</h2>
          <p className="text-on-surface-variant">Post an internship or full-time role to attract talent.</p>
        </section>

        {success ? (
          <div className="glass-card rounded-2xl p-10 text-center">
            <span className="material-symbols-outlined text-6xl text-secondary mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <h3 className="font-headline-lg text-on-surface mb-3">Listing Created!</h3>
            <p className="text-secondary font-label-md mb-6">{success}</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setSuccess('')} className="px-6 py-2.5 bg-primary-container text-on-primary-container rounded-xl font-label-md hover:bg-primary transition-all">Create Another</button>
              <button onClick={() => router.push('/RecruiterPortalParablelabs')} className="px-6 py-2.5 glass-card border border-white/10 text-on-surface rounded-xl font-label-md hover:border-primary/40 transition-all">View Pipeline</button>
            </div>
          </div>
        ) : (
          <form className="glass-card rounded-2xl p-8 space-y-5" onSubmit={handleSubmit}>
            {[
              { name: 'title', label: 'Job Title *', type: 'input', placeholder: 'e.g. Frontend Intern — React' },
              { name: 'company', label: 'Company Name', type: 'input', placeholder: 'Your company name' },
              { name: 'description', label: 'Job Description *', type: 'textarea', placeholder: 'Describe the role, responsibilities, and what makes it exciting...' },
              { name: 'requirements', label: 'Requirements', type: 'textarea', placeholder: 'Required skills, experience, etc.' },
              { name: 'tags', label: 'Skills/Tags (comma-separated)', type: 'input', placeholder: 'React, TypeScript, Node.js' },
              { name: 'stipend', label: 'Stipend / Salary', type: 'input', placeholder: 'e.g. ₹25,000/month' },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-label-md text-on-surface-variant mb-2">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea name={field.name} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder}
                    required={field.label.includes('*')} className="w-full h-28 px-4 py-3 bg-[#161922] border border-white/10 rounded-xl text-on-surface text-sm resize-none" />
                ) : (
                  <input name={field.name} value={form[field.name]} onChange={handleChange} placeholder={field.placeholder}
                    required={field.label.includes('*')} className="w-full h-12 px-4 bg-[#161922] border border-white/10 rounded-xl text-on-surface text-sm" />
                )}
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-label-md text-on-surface-variant mb-2">Location</label>
                <select name="location" value={form.location} onChange={handleChange}
                  className="w-full h-12 px-4 bg-[#161922] border border-white/10 rounded-xl text-on-surface text-sm">
                  {['Remote', 'On-site', 'Hybrid'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-label-md text-on-surface-variant mb-2">Duration</label>
                <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 3 months"
                  className="w-full h-12 px-4 bg-[#161922] border border-white/10 rounded-xl text-on-surface text-sm" />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-error/10 text-error border border-error/20 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>{error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-4 bg-primary-container hover:bg-primary text-on-primary-container font-headline-sm rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? 'Creating...' : 'Create Listing'}
              {!loading && <span className="material-symbols-outlined">add</span>}
            </button>
          </form>
        )}
      </main>
    </>
  );
}
