"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InternshipMarketplaceParablelabs() {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [applying, setApplying] = useState(null);
  const [message, setMessage] = useState({ id: null, type: '', text: '' });
  const [coverLetter, setCoverLetter] = useState('');
  const [applyModal, setApplyModal] = useState(null);

  useEffect(() => { fetchListings(); }, []);

  async function fetchListings(q = '') {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      const res = await fetch(`/api/internships?${params}`);
      const data = await res.json();
      setListings(data.listings || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  async function handleApply(listingId) {
    setApplying(listingId);
    setMessage({ id: listingId, type: '', text: '' });
    try {
      const res = await fetch(`/api/internships/${listingId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coverLetter }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage({ id: listingId, type: 'success', text: `Applied! +75 XP earned` });
      setApplyModal(null);
      setCoverLetter('');
      fetchListings();
    } catch (err) {
      setMessage({ id: listingId, type: 'error', text: err.message });
    } finally {
      setApplying(null);
    }
  }

  const filtered = listings.filter(l =>
    !searchQuery ||
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #0B0D12; color: #e2e2e9; min-height: max(884px, 100dvh); -webkit-font-smoothing: antialiased; }
        .glass-card { background: rgba(22,25,34,0.8); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      ` }} />

      {/* Apply Modal */}
      {applyModal && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4" onClick={() => setApplyModal(null)}>
          <div className="glass-card rounded-2xl p-8 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h3 className="font-headline-md text-on-surface mb-2">Apply to {applyModal.title}</h3>
            <p className="text-on-surface-variant text-label-md mb-6">{applyModal.company}</p>
            <label className="block text-label-md text-on-surface-variant mb-2">Cover Letter (optional)</label>
            <textarea
              className="w-full h-32 bg-[#0B0D12] border border-white/10 rounded-xl p-4 text-on-surface text-sm focus:outline-none focus:border-primary resize-none"
              placeholder="Tell them why you're a great fit..."
              value={coverLetter}
              onChange={e => setCoverLetter(e.target.value)}
            />
            {message.id === applyModal.id && message.text && (
              <div className={`mt-4 p-3 rounded-lg text-sm flex items-center gap-2 border ${message.type === 'success' ? 'bg-secondary/10 text-secondary border-secondary/20' : 'bg-error/10 text-error border-error/20'}`}>
                {message.text}
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleApply(applyModal.id)}
                disabled={applying === applyModal.id}
                className="flex-1 py-3 bg-primary-container hover:bg-primary text-on-primary-container font-label-md rounded-xl transition-all disabled:opacity-50"
              >
                {applying === applyModal.id ? 'Submitting...' : 'Submit Application (+75 XP)'}
              </button>
              <button onClick={() => setApplyModal(null)} className="px-5 py-3 glass-card border border-white/10 text-on-surface-variant rounded-xl font-label-md hover:border-primary/40 transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-4 md:px-8">
        <h1 className="font-headline-md font-bold text-primary">ParableLabs</h1>
        <nav className="hidden md:flex gap-6">
          <a href="/ParablelabsDashboard" className="text-on-surface-variant hover:text-primary font-label-md transition-colors">Dashboard</a>
          <a href="/ApplicationTrackerParablelabs" className="text-on-surface-variant hover:text-primary font-label-md transition-colors">My Applications</a>
          <a href="/HackathonsExplorer" className="text-on-surface-variant hover:text-primary font-label-md transition-colors">Hackathons</a>
        </nav>
      </header>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
        <section className="mb-10">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Internship Marketplace</h2>
          <p className="text-on-surface-variant">Real opportunities from real companies. Apply and track your applications.</p>
        </section>

        <div className="relative mb-8">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input
            className="w-full h-12 pl-12 pr-4 glass-card rounded-xl text-on-surface font-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary border border-white/10 transition-all"
            placeholder="Search by role or company..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchListings(searchQuery)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(listing => (
              <div key={listing.id} className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/30 transition-all group">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-headline-md text-on-surface group-hover:text-primary transition-colors">{listing.title}</h3>
                    <p className="text-on-surface-variant font-label-md mt-1">{listing.company}</p>
                  </div>
                  {listing.hasApplied && (
                    <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-label-sm font-bold">Applied ✓</span>
                  )}
                </div>

                <p className="text-on-surface-variant font-body-sm line-clamp-2">{listing.description}</p>

                <div className="flex flex-wrap gap-2">
                  {listing.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-label-sm rounded-lg border border-primary/20">{tag}</span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 text-label-sm">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {listing.location}
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    {listing.duration}
                  </div>
                  <div className="flex items-center gap-2 text-secondary font-bold">
                    <span className="material-symbols-outlined text-[16px]">payments</span>
                    {listing.stipend}
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">group</span>
                    {listing.applicationCount} applicants
                  </div>
                </div>

                {message.id === listing.id && message.text && (
                  <div className={`p-3 rounded-lg text-sm flex items-center gap-2 border ${message.type === 'success' ? 'bg-secondary/10 text-secondary border-secondary/20' : 'bg-error/10 text-error border-error/20'}`}>
                    {message.text}
                  </div>
                )}

                <button
                  onClick={() => listing.hasApplied ? null : setApplyModal(listing)}
                  disabled={listing.hasApplied}
                  className={`w-full py-2.5 font-label-md rounded-xl transition-all active:scale-95 ${listing.hasApplied ? 'bg-secondary/10 text-secondary border border-secondary/20 cursor-default' : 'bg-primary-container hover:bg-primary text-on-primary-container'}`}
                >
                  {listing.hasApplied ? 'Application Submitted' : 'Apply Now (+75 XP)'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
