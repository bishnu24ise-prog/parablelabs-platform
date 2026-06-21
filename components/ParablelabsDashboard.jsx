"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ParablelabsDashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        
        if (data.authenticated) {
          setUser(data.user);
        } else {
          router.push('/LoginParablelabs');
        }
      } catch (err) {
        console.error('Session fetch failed:', err);
        router.push('/LoginParablelabs');
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [router]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/LoginParablelabs');
      }
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center text-white font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span>Syncing Secure Session...</span>
        </div>
      </div>
    );
  }

  // Extract first name for personal messages
  const firstName = user ? user.name.split(' ')[0] : 'Talent';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #0B0D12;
            color: #e2e2e9;
            font-family: 'Inter', sans-serif;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(22, 25, 34, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(12px);
        }
        .bento-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 24px;
        }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        body {
            min-height: max(884px, 100dvh);
        }
      ` }} />
      
      <header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full">
        <div className="flex items-center gap-4">
          <button className="text-primary dark:text-primary hover:bg-white/5 transition-colors p-2 rounded-lg cursor-pointer" onClick={toggleDrawer}>
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-on-surface">ParableLabs</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 mr-6">
            <a className="text-primary font-bold font-label-md text-label-md" href="#">Home</a>
            <a className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors" href="#">Hackathons</a>
            <a className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors" href="#">AI-Evaluations</a>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden cursor-pointer active:scale-95 duration-150" onClick={toggleDrawer}>
            <img className="w-full h-full object-cover" data-alt="A professional close-up headshot of a talent in a modern studio environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmQuKjgi559YnUa8XmLWQNdkRll9f8Ps60uEoboMmveXmKnlfaFJ9BXjdC7n4jgWkI04Al9v9LidxcDd2LvuGqojmjAUwPpRFb0el7MGYIJKfA6gn6Wx8tqd-cMVMyiKIT8JhYGSeal2YgLCjuRMUT4_qAep6SeAPgMx99vJC38VIqIBLTffoD5ML-zrURSDSElMlcJA-hanPTHOID-eVqcFPoUdm4x94Fk2VZPcQPlclMH3HAya6pWImNE4dOqAPiZGp4ZwGXNAc"/>
          </div>
        </div>
      </header>
      
      {/* Sidebar Navigation Drawer */}
      <div className={`fixed inset-y-0 left-0 w-[280px] bg-surface dark:bg-surface border-r border-white/10 shadow-xl z-[60] transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`} id="nav-drawer">
        <div className="flex flex-col h-full py-6">
          <div className="px-6 mb-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: '\'FILL\' 1'}}>terminal</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-primary truncate max-w-[160px]">{user ? user.name : ''}</h3>
              <p className="text-label-sm text-on-surface-variant font-medium">{user ? `${user.role} User` : ''}</p>
              <span className="text-[10px] text-secondary font-bold uppercase tracking-wider">Verified Profile</span>
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            <a className="flex items-center gap-4 bg-primary-container/10 text-primary border-l-4 border-primary px-4 py-3 transition-all" href="#">
              <span className="material-symbols-outlined">home</span>
              <span className="font-label-md text-label-md">Home</span>
            </a>
            <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-all" href="#">
              <span className="material-symbols-outlined">emoji_events</span>
              <span className="font-label-md text-label-md">Hackathons</span>
            </a>
            <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-all" href="#">
              <span className="material-symbols-outlined">psychology</span>
              <span className="font-label-md text-label-md">AI-Evaluations</span>
            </a>
            <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-all" href="#">
              <span className="material-symbols-outlined">groups</span>
              <span className="font-label-md text-label-md">Talent Pool</span>
            </a>
            <a className="flex items-center gap-4 text-on-surface-variant px-4 py-3 hover:bg-surface-container-high transition-all" href="#">
              <span className="material-symbols-outlined">school</span>
              <span className="font-label-md text-label-md">Mentors</span>
            </a>
          </nav>
          <div className="px-6 mt-auto">
            <button 
              className="w-full py-3 bg-white/5 text-on-surface rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              onClick={handleSignOut}
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-md text-label-md">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
      
      <main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-24">
        
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Welcome back, {user ? user.name : ''}</h2>
              <p className="text-body-lg text-on-surface-variant max-w-2xl">Your technical profile is verified. Keep up the momentum to unlock early access to exclusive bounties and team hackathons.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl flex items-center gap-6 min-w-[280px]">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-surface-container-highest" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="6"></circle>
                  <circle className="text-secondary" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" stroke-dasharray="175.9" stroke-dashoffset="35.2" strokeWidth="6"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-secondary font-bold font-label-md text-label-md">82%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-secondary">
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                  <span className="font-bold text-headline-md font-headline-md">2,450 XP</span>
                </div>
                <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">12 Day Streak</p>
              </div>
            </div>
          </div>
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-8 space-y-10">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-lg text-headline-lg text-on-surface">Active Hackathons</h3>
                <a className="text-primary font-label-md text-label-md flex items-center gap-1" href="#">
                  View All <span className="material-symbols-outlined">chevron_right</span>
                </a>
              </div>
              <div className="flex overflow-x-auto gap-6 hide-scrollbar pb-4 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
                <div className="flex-none w-[320px] md:w-[380px] glass-card rounded-2xl overflow-hidden group">
                  <div className="h-40 relative">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Futuristic winter hacker workshop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVwT9aNGrzhS5rVcRtIx5eBtEntiVcYEjASO_H2K43MoKghUwmqeJH3yrRGzgEcIkAi2uvVS8r1eZVvJoip1mq5poQ1_snpJyJdgtuB7qO2i4RY-t7FJ0LIeGeHyUW7HlBWVLUzkHb-Xiixxeb-uWVJIFi6h3du1J6aTDg8e-BRg3BZj_e-RUQyLPaFqtPh4i6jWsMNb8_uwJ_PKPgSjIaTN0tibJUduzsJ5VnjVjfVlSzjepfiOgqF5Bkv7MflF5brLp15wKBNz8"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Open for Entry</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-headline-md text-headline-md text-on-surface mb-2">Winter AI Builders Hackathon</h4>
                    <p className="text-body-sm text-on-surface-variant mb-6">Build the next generation of autonomous agents using multimodal LLMs.</p>
                    <div className="flex items-center justify-between">
                      <div className="text-label-sm text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span> Dec 15 - 22
                      </div>
                      <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-xl font-bold font-label-md hover:opacity-90 transition-all active:scale-95 cursor-pointer">Apply</button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-none w-[320px] md:w-[380px] glass-card rounded-2xl overflow-hidden group">
                  <div className="h-40 relative">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Global network visualization." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqNmwB6nz2sdOOJkfQwyAFPIQlDjQUn1AgMFq5Hzyu5Usecb0FlYwOiENPbrfdz1scW1C_VQ3QMQTAKU-GuKewiQdhYPu_PMqK9G60h24ahr_m90WfKDBHI9ip7yZK5cHf5jabaWnrz4cOr3K8QMXtrkrl6NoqNsB9cbG1nK6VjE--KpQV0zEXAAYVpUA6kivWwJQhFwohVRJ_j_-CkPJW2BGt5BgRtCMqCpjA7fDyPFilc2EfctNTnZPnVir7xVyYt5xZ3YdY2no"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-secondary/20 text-secondary border border-secondary/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Running</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-headline-md text-headline-md text-on-surface mb-2">Global LLM Benchmarking</h4>
                    <p className="text-body-sm text-on-surface-variant mb-6">Optimize latency and accuracy on edge-compute benchmarks for mobile AI.</p>
                    <div className="flex items-center justify-between">
                      <div className="text-label-sm text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">emoji_events</span> $50,000 Prize
                      </div>
                      <button className="border border-white/10 bg-white/5 text-on-surface px-6 py-2 rounded-xl font-bold font-label-md hover:bg-white/10 transition-all active:scale-95 cursor-pointer">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="font-headline-lg text-headline-lg text-on-surface mb-6">Recommended for You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl border-l-4 border-secondary flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-surface-container rounded-lg p-3">
                        <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: '\'FILL\' 1'}}>biotech</span>
                      </div>
                      <span className="text-secondary font-bold text-[10px] bg-secondary/10 px-2 py-1 rounded uppercase">98% Match</span>
                    </div>
                    <h4 className="font-headline-md text-headline-md text-on-surface">Neural Architecture Intern</h4>
                    <p className="text-body-sm text-on-surface-variant mt-2">DeepMind / Remote</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    <span className="bg-white/5 px-3 py-1 rounded-full text-[11px] text-on-surface-variant">PyTorch</span>
                    <span className="bg-white/5 px-3 py-1 rounded-full text-[11px] text-on-surface-variant">Transformer Optimization</span>
                  </div>
                </div>
                
                <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-surface-container rounded-lg p-3">
                        <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: '\'FILL\' 1'}}>terminal</span>
                      </div>
                      <span className="text-on-surface-variant font-bold text-[10px] bg-white/5 px-2 py-1 rounded uppercase">85% Match</span>
                    </div>
                    <h4 className="font-headline-md text-headline-md text-on-surface">AI Systems Architect</h4>
                    <p className="text-body-sm text-on-surface-variant mt-2">Scale AI / San Francisco</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    <span className="bg-white/5 px-3 py-1 rounded-full text-[11px] text-on-surface-variant">Kubernetes</span>
                    <span className="bg-white/5 px-3 py-1 rounded-full text-[11px] text-on-surface-variant">MLOps</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-[120px]">psychology</span>
              </div>
              <div className="p-8 relative z-10">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">AI Evaluation Progress</h3>
                <p className="text-body-sm text-on-surface-variant mb-6">Your recent benchmarking score is ready for review.</p>
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-headline-xl font-headline-xl text-primary">892</span>
                    <span className="text-label-sm text-secondary font-bold">+12% vs last month</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className="bg-primary h-full rounded-full w-[89%] shadow-[0_0_12px_rgba(108,92,231,0.5)]"></div>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-2 uppercase font-bold tracking-widest">Global Ranking: Top 400</p>
                </div>
                <button className="w-full py-3 bg-primary-container text-on-primary-container rounded-xl font-bold font-label-md flex items-center justify-center gap-2 transition-all hover:shadow-[0_8px_20px_-6px_rgba(108,92,231,0.6)] cursor-pointer">
                  <span className="material-symbols-outlined">bolt</span>
                  Start New Evaluation
                </button>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-2xl">
              <h4 className="font-label-md text-label-md text-on-surface mb-4">Earned Credentials</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="aspect-square rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group hover:bg-secondary/10 transition-colors cursor-help" title="Elite Contributor">
                  <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: '\'FILL\' 1'}}>military_tech</span>
                </div>
                <div className="aspect-square rounded-xl bg-white/5 flex items-center justify-center border border-white/5" title="Fast Learner">
                  <span className="material-symbols-outlined text-primary/60">rocket_launch</span>
                </div>
                <div className="aspect-square rounded-xl bg-white/5 flex items-center justify-center border border-white/5" title="Prompt Engineer">
                  <span className="material-symbols-outlined text-on-surface-variant">forum</span>
                </div>
                <div className="aspect-square rounded-xl bg-white/5 flex items-center justify-center border border-white/5 border-dashed">
                  <span className="material-symbols-outlined text-white/20">add</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-[#161922] to-[#1e1f25]">
              <div className="flex items-center gap-4 mb-4">
                <img className="w-12 h-12 rounded-full border border-primary/30" data-alt="Sarah Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdodiPDRKaBCAdP6mFkZuD6w1cUlMRuwnSgdSrAh-Vc77JotwMgFxNXWdjInTPagL0Mx5SZDlacFZ6Q6uzZPtdl2xE4kZBNDWvbW9DBVKHnYwYGPNqmDJxjWAVGhlmohP2S8qybLlVNA1mXZSjEcWdCd7SWlUbQJ_ITZl96SHitXi0Vi5xWzjA_Jh5hw-IG9IQ5TGZ3km5IRWfWY0SRSw3jsMnHxHgjvPq7Gz-fu7TusNvJs3Q3t_LKNOqs-SLm1E1mrpg9Y_oCj4"/>
                <div>
                  <p className="font-bold text-on-surface">Dr. Sarah Chen</p>
                  <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Senior Mentor • NVIDIA</p>
                </div>
              </div>
              <p className="text-body-sm text-on-surface-variant mb-6">"{firstName}, your recent transformer work looks promising. Want to sync for 15m?"</p>
              <div className="flex gap-3">
                <button className="flex-1 bg-white/5 text-on-surface py-2 rounded-lg font-bold text-label-sm border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">Decline</button>
                <button className="flex-1 bg-primary text-background py-2 rounded-lg font-bold text-label-sm hover:opacity-90 transition-all cursor-pointer">Accept</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Drawer Overlay backdrop */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] transition-opacity duration-300 ${drawerOpen ? 'block' : 'hidden'}`} id="drawer-overlay" onClick={toggleDrawer}></div>
    </>
  );
}
