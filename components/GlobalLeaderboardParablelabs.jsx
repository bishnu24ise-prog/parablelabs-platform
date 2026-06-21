"use client";
import React, { useState, useEffect } from 'react';

export default function GlobalLeaderboardParablelabs() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gamification/leaderboard')
      .then(r => r.json())
      .then(data => {
        setLeaderboard(data.leaderboard || []);
        setMyRank(data.myRank);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const rankColors = { 1: 'text-yellow-400', 2: 'text-slate-300', 3: 'text-amber-600' };
  const rankBg = { 1: 'bg-yellow-400/10 border-yellow-400/30', 2: 'bg-slate-300/10 border-slate-300/30', 3: 'bg-amber-600/10 border-amber-600/30' };

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
          <a href="/BadgesProgressParablelabs" className="text-on-surface-variant hover:text-primary font-label-md transition-colors">My Badges</a>
        </nav>
      </header>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-4xl mx-auto">
        <section className="mb-10 flex flex-col md:flex-row md:items-end gap-4 justify-between">
          <div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">Global Leaderboard</h2>
            <p className="text-on-surface-variant">Ranked by total XP earned from challenges, hackathons, and applications.</p>
          </div>
          {myRank && (
            <div className="glass-card rounded-2xl px-6 py-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">person</span>
              <div>
                <p className="text-on-surface-variant text-label-sm">Your Rank</p>
                <p className="font-headline-md text-primary">#{myRank}</p>
              </div>
            </div>
          )}
        </section>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-32 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block">leaderboard</span>
            <p>No users on the leaderboard yet. Be the first to earn XP!</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {leaderboard.slice(0, 3).map(user => (
                <div key={user.id} className={`glass-card rounded-2xl p-6 flex flex-col items-center text-center border ${rankBg[user.rank] || ''}`}>
                  <div className={`text-3xl font-black mb-3 ${rankColors[user.rank] || 'text-on-surface'}`}>
                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                  </div>
                  <p className="font-headline-sm text-on-surface">{user.name}</p>
                  <p className="text-on-surface-variant text-label-sm mb-2">{user.role}</p>
                  <p className={`font-headline-md font-bold ${rankColors[user.rank] || 'text-on-surface'}`}>{user.xp} XP</p>
                  <p className="text-on-surface-variant text-label-sm">Level {user.level}</p>
                </div>
              ))}
            </div>

            {/* Full Leaderboard */}
            <div className="space-y-2">
              {leaderboard.map(user => (
                <div key={user.id} className={`glass-card rounded-xl px-5 py-4 flex items-center gap-4 hover:border-primary/30 transition-all ${myRank === user.rank ? 'border-primary/40 bg-primary/5' : ''}`}>
                  <span className={`font-mono font-bold text-lg w-8 text-center ${rankColors[user.rank] || 'text-on-surface-variant'}`}>
                    #{user.rank}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-on-surface truncate">
                      {user.name} {myRank === user.rank && <span className="text-primary text-label-sm">(You)</span>}
                    </p>
                    <p className="text-on-surface-variant text-label-sm">{user.role} · Level {user.level}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-6 text-label-sm text-on-surface-variant">
                    <span title="Challenges Solved">🏆 {user.challengesSolved}</span>
                    <span title="Hackathons">🎪 {user.hackathonsJoined}</span>
                    <span title="Badges">🏅 {user.badgeCount}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-headline-sm text-secondary font-bold">{user.xp}</p>
                    <p className="text-on-surface-variant text-label-sm">XP</p>
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
