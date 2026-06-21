"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DailyChallengesFeedParablelabs() {
  const router = useRouter();
  const [challenges, setChallenges] = useState([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/challenges')
      .then(r => r.json())
      .then(data => {
        setChallenges(data.challenges || []);
        setStreak(data.streak || 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const todayChallenge = challenges.find(c => c.isToday);
  const previousChallenges = challenges.filter(c => !c.isToday);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  // Days 0=Sun, 1=Mon..6=Sat; map to Mon-Sun index
  const dayIndex = today === 0 ? 6 : today - 1;

  const difficultyColors = {
    Easy: 'bg-secondary/10 text-secondary border-secondary/20',
    Medium: 'bg-primary/10 text-primary border-primary/20',
    Hard: 'bg-error/10 text-error border-error/20',
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #0B0D12; color: #e2e2e9; -webkit-font-smoothing: antialiased; min-height: max(884px, 100dvh); }
        .glass-panel { background: rgba(22,25,34,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
        .flame-glow { filter: drop-shadow(0 0 4px rgba(136,220,65,0.4)); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      ` }} />

      <aside className="hidden lg:flex flex-col z-50 fixed h-screen w-[260px] left-0 top-0 border-r border-white/8 bg-surface-container-lowest/80 backdrop-blur-xl">
        <div className="p-8">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">ParableLabs</h1>
          <p className="text-on-surface-variant text-label-sm mt-1">Talent Hub</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {[
            { href: '/ParablelabsDashboard', icon: 'dashboard', label: 'Dashboard' },
            { href: '/HackathonsExplorer', icon: 'event', label: 'Hackathons' },
            { href: '#', icon: 'code', label: 'Challenges', active: true },
            { href: '/InternshipMarketplaceParablelabs', icon: 'work', label: 'Internships' },
            { href: '/GlobalLeaderboardParablelabs', icon: 'leaderboard', label: 'Leaderboard' },
          ].map(item => (
            <a key={item.label} href={item.href} className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 cursor-pointer rounded-lg ${item.active ? 'text-primary bg-primary/10 border-l-4 border-primary' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'}`}>
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-md text-label-md">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <header className="lg:hidden flex justify-between items-center px-4 h-16 w-full fixed top-0 z-40 bg-surface-dim/80 backdrop-blur-lg border-b border-white/8">
        <span className="font-headline-md-mobile text-headline-md-mobile font-bold text-primary">ParableLabs</span>
        <a href="/ParablelabsDashboard" className="material-symbols-outlined text-primary">home</a>
      </header>

      <main className="lg:ml-[260px] min-h-screen pt-20 pb-24 lg:pt-8 px-4 md:px-8 max-w-5xl mx-auto">
        {/* Streak Banner */}
        <section className="mb-8">
          <div className="glass-panel p-6 rounded-[16px] relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">
                  {streak > 0 ? `${streak}-day streak 🔥` : 'Start your streak today!'}
                </h2>
                <p className={`font-label-md flex items-center gap-2 ${streak > 0 ? 'text-secondary' : 'text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  {streak > 0 ? "Keep it going — solve today's challenge!" : "Solve a challenge to start your streak"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                {days.map((day, i) => (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <span
                      className={`material-symbols-outlined ${i <= dayIndex && streak > (dayIndex - i) ? 'text-secondary flame-glow' : 'text-white/20'}`}
                      style={{ fontVariationSettings: i <= dayIndex && streak > (dayIndex - i) ? "'FILL' 1" : "'FILL' 0" }}
                    >local_fire_department</span>
                    <span className={`text-[10px] uppercase font-bold ${i === dayIndex ? 'text-secondary' : 'text-on-surface-variant'}`}>{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Today's Featured Challenge */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {todayChallenge && (
              <section className="mb-12">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-[16px] blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="glass-panel p-8 rounded-[16px] relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-label-sm font-bold uppercase tracking-wider border ${difficultyColors[todayChallenge.difficulty] || ''}`}>
                          {todayChallenge.difficulty}
                        </span>
                        <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-label-sm font-bold uppercase tracking-wider border border-secondary/20">
                          +{todayChallenge.xpReward} XP
                        </span>
                        {todayChallenge.completed && (
                          <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-label-sm font-bold uppercase border border-secondary/30">
                            ✓ Completed
                          </span>
                        )}
                      </div>
                      <span className="text-on-surface-variant font-label-sm">Daily Featured</span>
                    </div>
                    <div className="mb-8">
                      <h2 className="font-headline-xl text-on-surface mb-3">{todayChallenge.title}</h2>
                      <p className="text-on-surface-variant text-body-lg max-w-2xl">{todayChallenge.description}</p>
                    </div>
                    <button
                      onClick={() => router.push(`/SolveChallengeParablelabs?id=${todayChallenge.id}`)}
                      className={`w-full md:w-auto px-10 py-4 font-headline-md rounded-xl transition-all flex items-center justify-center gap-2 ${todayChallenge.completed ? 'bg-white/10 text-on-surface-variant cursor-default' : 'bg-primary text-on-primary hover:shadow-[0_0_20px_rgba(108,92,231,0.4)] active:scale-[0.98]'}`}
                    >
                      {todayChallenge.completed ? 'Already Solved' : 'Solve Now'}
                      {!todayChallenge.completed && <span className="material-symbols-outlined">arrow_forward</span>}
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Previous Challenges */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline-lg text-on-surface">Previous Challenges</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {previousChallenges.map(c => (
                  <div
                    key={c.id}
                    onClick={() => !c.completed && router.push(`/SolveChallengeParablelabs?id=${c.id}`)}
                    className={`glass-panel p-5 rounded-[16px] flex flex-col justify-between hover:bg-white/5 transition-colors ${!c.completed ? 'cursor-pointer' : ''} group`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-widest mb-1">{new Date(c.date).toLocaleDateString()}</p>
                        <h4 className="font-headline-md text-on-surface">{c.title}</h4>
                        <p className="text-on-surface-variant text-label-sm mt-1">{c.category}</p>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${c.completed ? 'bg-secondary/10 border-secondary/20' : 'bg-white/5 border-white/10'}`}>
                        <span className={`material-symbols-outlined text-base ${c.completed ? 'text-secondary' : 'text-on-surface-variant'}`}>
                          {c.completed ? 'check' : 'chevron_right'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-on-surface-variant text-label-sm px-2 py-0.5 rounded border ${difficultyColors[c.difficulty] || ''}`}>{c.difficulty}</span>
                      <span className="text-on-surface-variant text-label-sm">+{c.xpReward} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
