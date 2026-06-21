"use client";
import React from 'react';

export default function AiEvaluationResultsParablelabs() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #0B0D12;
            color: #e2e2e9;
            overflow-x: hidden;
        }
        .glass-card {
            background: #161922;
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(8px);
        }
        .radial-progress {
            transform: rotate(-90deg);
        }
        .radial-progress circle {
            fill: none;
            stroke-width: 12;
            stroke-linecap: round;
        }
        .animate-score {
            animation: score-reveal 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes score-reveal {
            from { stroke-dashoffset: 440; }
            to { stroke-dashoffset: 70.4; } /* 440 * (1 - 8.4/10) */
        }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary" style={{fontVariationSettings: '\'FILL\' 1'}}>neurology</span>
<h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-bold text-primary tracking-tight">ParableLabs</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex items-center gap-6 px-6">
<span className="text-primary font-bold">Evaluate</span>
<span className="text-on-surface-variant hover:opacity-80 transition-opacity cursor-pointer">Agents</span>
<span className="text-on-surface-variant hover:opacity-80 transition-opacity cursor-pointer">Stats</span>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container-highest border border-white/10 flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A professional high-fidelity 3D avatar of a tech talent with sleek futuristic glasses, set against a dark atmospheric background with subtle violet neon rim lighting. Minimalist and clean aesthetic consistent with a modern SaaS talent tool." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqTANql1tfiJZ8DIggxxWaskj5iDTbdUd9hUhZj-xUk0uN_R4TGM1NCx1kxMH2kY934exBFpsfNt1eIH7x2rp2-Z4lXa12ZG6s25dwO-sBUrY7ZhThh6Hg2RnXmEivmFJ7jvhlgJsMObBuu3ew35AfjsJkVZiw-H5Ob4EuuoqGaVprepUMB9Cnz1m5ntCfSIaZCOfhXZ7Ok5KkEl9srcfpUFElSrtWbbgNmMutmCtMbcYlYeOqcl6kDObgA433iagniqoRgMRPPm0"/>
</div>
</div>
</header>
<main className="pt-24 pb-32 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">

<section className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-20">
<div className="md:col-span-12 lg:col-span-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/20 mb-6">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span className="text-primary font-label-md text-label-md uppercase tracking-widest">Submission Finalized</span>
</div>
<h2 className="font-headline-xl text-headline-xl mb-4 text-white">Neural Nexus</h2>
<p className="text-on-surface-variant font-body-lg text-body-lg max-w-lg">
                    Advanced AI evaluation of your hackathon submission. Analyzing architecture, performance metrics, and human-centric design patterns.
                </p>
</div>
<div className="md:col-span-12 lg:col-span-7 flex justify-center items-center">
<div className="glass-card p-10 rounded-xl relative overflow-hidden group">

<div className="relative z-10 flex flex-col items-center">
<div className="relative w-64 h-64">
<svg className="w-full h-full radial-progress">
<circle className="text-surface-container-highest" cx="128" cy="128" r="70" stroke="currentColor"></circle>
<circle className="text-primary animate-score" cx="128" cy="128" r="70" stroke="currentColor" stroke-dasharray="440" stroke-dashoffset="440"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-headline-xl text-headline-xl text-white">8.4</span>
<span className="font-label-md text-label-md text-on-surface-variant">/ 10</span>
</div>
</div>
<p className="mt-4 font-headline-md text-headline-md text-secondary">Outstanding Performance</p>
</div>
</div>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-16">

<div className="glass-card p-6 rounded-xl">
<div className="flex justify-between items-end mb-4">
<h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Innovation</h3>
<span className="font-headline-md text-headline-md text-white">9/10</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary-container w-[90%] shadow-[0_0_12px_rgba(108,92,231,0.5)]"></div>
</div>
</div>

<div className="glass-card p-6 rounded-xl">
<div className="flex justify-between items-end mb-4">
<h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Execution</h3>
<span className="font-headline-md text-headline-md text-white">8/10</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary-container w-[80%] shadow-[0_0_12px_rgba(108,92,231,0.5)]"></div>
</div>
</div>

<div className="glass-card p-6 rounded-xl">
<div className="flex justify-between items-end mb-4">
<h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">UI/UX</h3>
<span className="font-headline-md text-headline-md text-white">7/10</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary-container w-[70%] shadow-[0_0_12px_rgba(108,92,231,0.5)]"></div>
</div>
</div>

<div className="glass-card p-6 rounded-xl">
<div className="flex justify-between items-end mb-4">
<h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Impact</h3>
<span className="font-headline-md text-headline-md text-white">9/10</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary-container w-[90%] shadow-[0_0_12px_rgba(108,92,231,0.5)]"></div>
</div>
</div>
</section>

<section className="max-w-3xl mx-auto">
<button className="w-full glass-card p-6 rounded-xl flex items-center justify-between group transition-all hover:border-primary/30" onClick={(e) => { try { toggleFeedback() } catch(err) { console.error(err); } }}>
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">psychology</span>
</div>
<span className="font-headline-md text-headline-md text-white">Why this score?</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-transform duration-300" id="chevron">expand_more</span>
</button>
<div className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out" id="feedback-panel">
<div className="glass-card mt-2 p-8 rounded-xl space-y-6">
<div className="flex gap-4">
<span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
<div>
<p className="font-label-md text-label-md text-secondary uppercase mb-1">Strength</p>
<p className="text-on-surface">Strong use of caching reduced API latency by 40%, demonstrating sophisticated infrastructure awareness.</p>
</div>
</div>
<div className="flex gap-4">
<span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
<div>
<p className="font-label-md text-label-md text-secondary uppercase mb-1">Architecture</p>
<p className="text-on-surface">Excellent architectural modularity allowing for seamless feature expansion and maintenance.</p>
</div>
</div>
<div className="flex gap-4">
<span className="material-symbols-outlined text-error mt-1">error</span>
<div>
<p className="font-label-md text-label-md text-error uppercase mb-1">Opportunity</p>
<p className="text-on-surface">Error handling on edge cases is incomplete; several unhandled promise rejections were identified in stress tests.</p>
</div>
</div>
<div className="flex gap-4">
<span className="material-symbols-outlined text-tertiary mt-1">warning</span>
<div>
<p className="font-label-md text-label-md text-tertiary uppercase mb-1">UI/UX Polish</p>
<p className="text-on-surface">UI accessibility could be improved; contrast ratios in the sidebar navigation do not meet WCAG AA standards.</p>
</div>
</div>
</div>
</div>
</section>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-t border-white/10 flex justify-around items-center h-20 px-margin-mobile pb-safe">
<div className="flex flex-col items-center justify-center text-secondary font-bold">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label-sm text-label-sm">Evaluate</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-sm text-label-sm">Agents</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">monitoring</span>
<span className="font-label-sm text-label-sm">Stats</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">tune</span>
<span className="font-label-sm text-label-sm">Settings</span>
</div>
</nav>

<footer className="mt-20 pb-24 md:pb-12 text-center">
<div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-surface-container border border-white/5">
<span className="material-symbols-outlined text-primary text-sm">verified</span>
<span className="font-label-md text-label-md text-on-surface-variant">Evaluated by ParableLabs AI Agent · v2</span>
</div>
</footer>
    </>
  );
}
