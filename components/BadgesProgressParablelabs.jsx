"use client";
import React, { useState, useEffect } from 'react';

export default function BadgesProgressParablelabs() {
  const [badgeData, setBadgeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/gamification/badges')
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setBadgeData(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #0B0D12; color: #e2e2e9; min-height: max(884px, 100dvh); -webkit-font-smoothing: antialiased; }
        .glass-card { background: rgba(22,25,34,0.8); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      ` }} />

      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-4 md:px-8">
        <h1 className="font-headline-md font-bold text-primary">ParableLabs</h1>
        <nav className="hidden md:flex gap-6">
          <a href="/ParablelabsDashboard" className="text-on-surface-variant hover:text-primary font-label-md transition-colors">Dashboard</a>
          <a href="/GlobalLeaderboardParablelabs" className="text-on-surface-variant hover:text-primary font-label-md transition-colors">Leaderboard</a>
        </nav>
      </header>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
        <section className="mb-10">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Badges & Progress</h2>
          <p className="text-on-surface-variant">Earn badges by completing challenges, hackathons, and platform milestones.</p>
        </section>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-error">{error}</p>
            <a href="/LoginParablelabs" className="mt-4 inline-block px-6 py-2.5 bg-primary text-on-primary rounded-xl font-label-md">Sign in to track badges</a>
          </div>
        ) : badgeData && (
          <>
            {/* XP Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Total XP', value: badgeData.xp, icon: 'bolt', color: 'text-secondary' },
                { label: 'Level', value: badgeData.level, icon: 'military_tech', color: 'text-primary' },
                { label: 'Earned', value: badgeData.totalEarned, icon: 'workspace_premium', color: 'text-yellow-400' },
                { label: 'Available', value: badgeData.totalAvailable, icon: 'emoji_events', color: 'text-on-surface-variant' },
              ].map(stat => (
                <div key={stat.label} className="glass-card rounded-2xl p-5 flex flex-col items-start">
                  <span className={`material-symbols-outlined ${stat.color} mb-3`}>{stat.icon}</span>
                  <p className="font-headline-lg text-on-surface font-bold">{stat.value}</p>
                  <p className="text-on-surface-variant text-label-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Next XP milestone progress */}
            <div className="glass-card rounded-2xl p-6 mb-10">
              <div className="flex items-center justify-between mb-3">
                <p className="font-label-md text-on-surface">Level {badgeData.level} → {badgeData.level + 1}</p>
                <p className="font-label-sm text-on-surface-variant">{badgeData.xp % 500} / 500 XP</p>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700"
                  style={{ width: `${((badgeData.xp % 500) / 500) * 100}%` }}
                />
              </div>
            </div>

            {/* Badge Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {badgeData.badges.map(badge => (
                <div key={badge.id} className={`glass-card rounded-2xl p-6 transition-all ${badge.earned ? 'border-secondary/30 bg-secondary/5' : 'opacity-60 hover:opacity-80'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${badge.earned ? 'bg-secondary/20 border border-secondary/30' : 'bg-white/5 border border-white/10'}`}>
                      <span className={`material-symbols-outlined text-2xl ${badge.earned ? 'text-secondary' : 'text-on-surface-variant'}`}
                        style={{ fontVariationSettings: badge.earned ? "'FILL' 1" : "'FILL' 0" }}>
                        {badge.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-label-md text-on-surface">{badge.name}</h3>
                        {badge.earned && <span className="text-secondary text-[18px] material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                      </div>
                      <p className="text-on-surface-variant text-label-sm mb-3">{badge.description}</p>
                      {badge.earned ? (
                        <p className="text-secondary text-label-sm">Earned {badge.earnedAt ? new Date(badge.earnedAt).toLocaleDateString() : ''}</p>
                      ) : (
                        <>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-1">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${badge.progressPct}%` }}
                            />
                          </div>
                          <p className="text-on-surface-variant text-label-sm">{badge.progressLabel}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
