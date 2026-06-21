"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SolveChallengeInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const challengeId = searchParams.get('id') ? parseInt(searchParams.get('id')) : 1;

  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/api/challenges')
      .then(r => r.json())
      .then(data => {
        const found = (data.challenges || []).find(c => c.id === challengeId) || data.challenges?.[0];
        if (found) {
          setChallenge(found);
          setCode(found.starterCode || '');
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [challengeId]);

  async function handleSubmit() {
    if (!code.trim()) return;
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch(`/api/challenges/${challengeId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setResult({ success: false, message: err.message, correct: false, xpAwarded: 0 });
    } finally {
      setSubmitting(false);
    }
  }

  const difficultyColors = { Easy: 'text-secondary', Medium: 'text-primary', Hard: 'text-error' };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #0B0D12; color: #e2e2e9; min-height: max(884px, 100dvh); }
        .glass-panel { background: rgba(22,25,34,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .code-editor { font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace; resize: none; }
      ` }} />

      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-4 md:px-8">
        <button onClick={() => router.push('/DailyChallengesFeedParablelabs')} className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-label-md">Back to Challenges</span>
        </button>
        <h1 className="font-headline-md font-bold text-primary">ParableLabs</h1>
        <div className="w-24" />
      </header>

      <main className="pt-20 pb-12 px-4 md:px-8 max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !challenge ? (
          <div className="text-center py-32 text-on-surface-variant">Challenge not found.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-panel rounded-2xl p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`font-label-sm font-bold uppercase tracking-wider ${difficultyColors[challenge.difficulty] || ''}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-secondary font-label-sm">+{challenge.xpReward} XP</span>
                  <span className="text-on-surface-variant font-label-sm">{challenge.category}</span>
                </div>
                <h2 className="font-headline-lg text-on-surface mb-4">{challenge.title}</h2>
                <p className="text-on-surface-variant font-body-md leading-relaxed">{challenge.description}</p>
              </div>

              {result && (
                <div className={`glass-panel rounded-2xl p-6 border ${result.correct ? 'border-secondary/30' : 'border-primary/20'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`material-symbols-outlined text-3xl ${result.correct ? 'text-secondary' : 'text-primary'}`}>
                      {result.correct ? 'check_circle' : 'info'}
                    </span>
                    <div>
                      <h3 className={`font-headline-md ${result.correct ? 'text-secondary' : 'text-primary'}`}>
                        {result.correct ? 'Correct Solution!' : 'Partial Solution'}
                      </h3>
                      <p className="text-secondary font-label-md">+{result.xpAwarded} XP earned</p>
                    </div>
                  </div>
                  <p className="text-on-surface-variant font-body-sm mb-4">{result.message}</p>
                  {result.correct && (
                    <button onClick={() => router.push('/DailyChallengesFeedParablelabs')} className="px-6 py-2.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-xl font-label-md hover:bg-secondary/20 transition-all">
                      View More Challenges
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="glass-panel rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-on-surface">Code Editor</h3>
                <span className="text-label-sm text-on-surface-variant px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                  {challenge.category}
                </span>
              </div>

              <textarea
                className="code-editor flex-1 min-h-[400px] w-full bg-[#0B0D12] border border-white/10 rounded-xl p-4 text-sm text-on-surface focus:outline-none focus:border-primary transition-all"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="Write your solution here..."
                spellCheck={false}
              />

              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !!result?.correct}
                  className="flex-1 py-3 bg-primary-container hover:bg-primary text-on-primary-container font-label-md rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? 'Evaluating...' : result?.correct ? 'Submitted' : 'Submit Solution'}
                  {!submitting && !result?.correct && <span className="material-symbols-outlined text-[18px]">send</span>}
                </button>
                <button
                  onClick={() => { setCode(challenge.starterCode || ''); setResult(null); }}
                  className="px-4 py-3 glass-panel border border-white/10 hover:border-primary/40 rounded-xl text-on-surface-variant hover:text-primary transition-all font-label-md"
                >
                  Reset
                </button>
              </div>

              <p className="text-on-surface-variant text-label-sm opacity-60">
                Hint: Look for keywords like {challenge.expectedKeywords?.join(', ')}
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default function SolveChallengeParablelabs() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#6c5ce7] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SolveChallengeInner />
    </Suspense>
  );
}
