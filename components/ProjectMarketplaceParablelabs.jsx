"use client";
import React, { useState, useEffect } from 'react';

export default function ProjectMarketplaceParablelabs() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [bidModal, setBidModal] = useState(null);
  const [proposal, setProposal] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ id: null, type: '', text: '' });

  useEffect(() => { fetchProjects(); }, [categoryFilter]);

  async function fetchProjects() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (categoryFilter) params.set('category', categoryFilter);
      if (searchQuery) params.set('q', searchQuery);
      const res = await fetch(`/api/projects?${params}`);
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  async function handleBid() {
    if (!bidModal || !proposal.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/projects/${bidModal.id}/bid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposal, bidAmount: bidAmount || 'Negotiable', deliveryDays: '14' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage({ id: bidModal.id, type: 'success', text: `Bid submitted! +50 XP earned.` });
      setBidModal(null);
      setProposal('');
      setBidAmount('');
      fetchProjects();
    } catch (err) {
      setMessage({ id: bidModal?.id, type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  const categories = ['', 'AI/ML', 'Frontend', 'Backend', 'Web3', 'General'];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #0B0D12; color: #e2e2e9; min-height: max(884px, 100dvh); -webkit-font-smoothing: antialiased; }
        .glass-card { background: rgba(22,25,34,0.8); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      ` }} />

      {/* Bid Modal */}
      {bidModal && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4" onClick={() => setBidModal(null)}>
          <div className="glass-card rounded-2xl p-8 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h3 className="font-headline-md text-on-surface mb-1">Submit a Bid</h3>
            <p className="text-on-surface-variant text-label-md mb-6">{bidModal.title}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-label-md text-on-surface-variant mb-2">Your Bid Amount (₹)</label>
                <input value={bidAmount} onChange={e => setBidAmount(e.target.value)} placeholder="e.g. 18,000" className="w-full h-11 px-4 bg-[#0B0D12] border border-white/10 rounded-xl text-on-surface focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-label-md text-on-surface-variant mb-2">Proposal *</label>
                <textarea value={proposal} onChange={e => setProposal(e.target.value)} placeholder="Describe your approach, experience, and timeline..." className="w-full h-28 p-4 bg-[#0B0D12] border border-white/10 rounded-xl text-on-surface focus:outline-none focus:border-primary text-sm resize-none" />
              </div>
            </div>
            {message.id === bidModal.id && message.text && (
              <div className={`mt-4 p-3 rounded-lg text-sm border flex items-center gap-2 ${message.type === 'success' ? 'bg-secondary/10 text-secondary border-secondary/20' : 'bg-error/10 text-error border-error/20'}`}>
                {message.text}
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <button onClick={handleBid} disabled={submitting || !proposal.trim()} className="flex-1 py-3 bg-primary-container hover:bg-primary text-on-primary-container font-label-md rounded-xl transition-all disabled:opacity-50">
                {submitting ? 'Submitting...' : 'Submit Bid (+50 XP)'}
              </button>
              <button onClick={() => setBidModal(null)} className="px-5 py-3 glass-card border border-white/10 text-on-surface-variant rounded-xl font-label-md">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-4 md:px-8">
        <h1 className="font-headline-md font-bold text-primary">ParableLabs</h1>
        <nav className="hidden md:flex gap-6">
          <a href="/ParablelabsDashboard" className="text-on-surface-variant hover:text-primary font-label-md transition-colors">Dashboard</a>
          <a href="/InternshipMarketplaceParablelabs" className="text-on-surface-variant hover:text-primary font-label-md transition-colors">Internships</a>
        </nav>
      </header>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
        <section className="mb-10 flex flex-col md:flex-row md:items-end gap-4 justify-between">
          <div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Project Marketplace</h2>
            <p className="text-on-surface-variant">Freelance projects posted by companies. Bid to win.</p>
          </div>
        </section>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input className="w-full h-12 pl-12 pr-4 glass-card rounded-xl text-on-surface font-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary border border-white/10"
              placeholder="Search projects..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchProjects()} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCategoryFilter(c)}
                className={`px-4 py-2 rounded-xl font-label-md text-sm border transition-all ${categoryFilter === c ? 'bg-primary text-on-primary border-primary' : 'glass-card text-on-surface-variant border-white/10 hover:border-primary/40'}`}>
                {c || 'All'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-32"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(p => (
              <div key={p.id} className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/30 transition-all group">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-label-sm text-primary font-bold uppercase tracking-wider">{p.category}</span>
                    <h3 className="font-headline-md text-on-surface mt-1 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-on-surface-variant text-label-md">by {p.postedByName}</p>
                  </div>
                  {p.hasBid && <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-label-sm font-bold shrink-0">Bid Sent ✓</span>}
                </div>
                <p className="text-on-surface-variant font-body-sm line-clamp-3">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => <span key={t} className="px-2 py-0.5 bg-primary/10 text-primary text-label-sm rounded border border-primary/20">{t}</span>)}
                </div>
                <div className="grid grid-cols-3 gap-2 text-label-sm pt-2 border-t border-white/8">
                  <div className="flex flex-col gap-1"><span className="text-on-surface-variant">Budget</span><span className="text-secondary font-bold">{p.budget}</span></div>
                  <div className="flex flex-col gap-1"><span className="text-on-surface-variant">Duration</span><span className="text-on-surface">{p.duration}</span></div>
                  <div className="flex flex-col gap-1"><span className="text-on-surface-variant">Bids</span><span className="text-on-surface">{p.bidCount}</span></div>
                </div>
                {message.id === p.id && message.text && (
                  <div className={`p-3 rounded-lg text-sm border flex items-center gap-2 ${message.type === 'success' ? 'bg-secondary/10 text-secondary border-secondary/20' : 'bg-error/10 text-error border-error/20'}`}>{message.text}</div>
                )}
                <button onClick={() => p.hasBid ? null : setBidModal(p)} disabled={p.hasBid}
                  className={`w-full py-2.5 font-label-md rounded-xl transition-all ${p.hasBid ? 'bg-secondary/10 text-secondary border border-secondary/20 cursor-default' : 'bg-primary-container hover:bg-primary text-on-primary-container active:scale-95'}`}>
                  {p.hasBid ? 'Bid Submitted' : 'Place Bid (+50 XP)'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
