"use client";
import React from 'react';

export default function CreateHackathonJudgingCriteria() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            background-color: #0B0D12;
            font-family: 'Inter', sans-serif;
            color: #e2e2e9;
        }
        .step-indicator {
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .glass-card {
            background: rgba(22, 25, 34, 0.8);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        input[type="range"] {
            -webkit-appearance: none;
            background: transparent;
        }
        input[type="range"]::-webkit-slider-runnable-track {
            height: 8px;
            background: #23262F;
            border-radius: 4px;
        }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #6C5CE7;
            margin-top: -6px;
            box-shadow: 0 0 10px rgba(108, 92, 231, 0.4);
            cursor: pointer;
        }
        .toggle-dot {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        input:checked ~ .toggle-dot {
            transform: translateX(100%);
            background-color: #A8FF60;
        }
        input:checked ~ .toggle-bg {
            background-color: rgba(108, 92, 231, 0.4);
        }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-white/10 dark:border-white/10 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed" style={{fontVariationSettings: '\'FILL\' 0'}}>terminal</span>
<span className="font-headline-md text-headline-md-mobile md:text-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight">ParableLabs</span>
</div>
<div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
<img className="w-full h-full object-cover" data-alt="A professional headshot of a software engineer with glasses, soft studio lighting, focused expression, dark neutral background, high resolution photography with a shallow depth of field, cool color temperature." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXtJlK3g7Wb2s17VaMzis_GKjvja9IxrTyiQnf640VCxvBS5n3fgz7H3hs2ECq5wS-iYAhXyWe1gsZZvys9h14Y9IiUC9SDOu6RprwRIWLsXD9_dJA7PmyqUQQWVFZxUjDp-dRT7avrkAJseo1vIjQK_WO2xGGkk7zIWK_9s3uviPfrmauNgQ74rrwpFhwXREXk5mAvgor88R8wUeN5do9QG5kVnq2esbl4MUqwVZPJEPeP_bOMbOrQKuJ9oXHAfUDmJfCzojQb-Q"/>
</div>
</header>

<main className="mt-20 px-margin-mobile flex flex-col gap-8">

<section className="w-full overflow-x-auto no-scrollbar py-2">
<div className="flex items-center gap-4 min-w-max">
<div className="flex items-center gap-2 text-on-surface-variant opacity-60">
<span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">1</span>
<span className="font-label-sm text-label-sm">Basics</span>
</div>
<div className="h-px w-4 bg-white/10"></div>
<div className="flex items-center gap-2 text-on-surface-variant opacity-60">
<span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">2</span>
<span className="font-label-sm text-label-sm">Timeline</span>
</div>
<div className="h-px w-4 bg-white/10"></div>
<div className="flex items-center gap-2 text-on-surface-variant opacity-60">
<span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">3</span>
<span className="font-label-sm text-label-sm">Prizes</span>
</div>
<div className="h-px w-4 bg-white/10"></div>

<div className="flex items-center gap-2 text-primary-container">
<span className="w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center text-[10px] font-bold">4</span>
<span className="font-label-sm text-label-sm font-bold">Judging Criteria</span>
</div>
<div className="h-px w-4 bg-white/10"></div>
<div className="flex items-center gap-2 text-on-surface-variant opacity-40">
<span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">5</span>
<span className="font-label-sm text-label-sm">Publish</span>
</div>
</div>
</section>

<header>
<h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Judging Rubric</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Define how projects will be scored by judges and AI.</p>
</header>

<div className="flex flex-col gap-4">

<div className="glass-card p-4 rounded-xl flex flex-col gap-4">
<div className="flex justify-between items-center">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-tertiary">lightbulb</span>
<span className="font-label-md text-label-md text-on-surface">Innovation</span>
</div>
<span className="text-primary font-bold font-label-md" id="val-innovation">25%</span>
</div>
<input className="w-full slider-row" data-target="val-innovation" max="100" min="0" type="range" value="25"/>
<p className="text-[11px] text-on-surface-variant leading-relaxed">How original and creative is the idea? Does it solve a problem in a new way?</p>
</div>

<div className="glass-card p-4 rounded-xl flex flex-col gap-4">
<div className="flex justify-between items-center">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary">code</span>
<span className="font-label-md text-label-md text-on-surface">Technical Execution</span>
</div>
<span className="text-primary font-bold font-label-md" id="val-tech">35%</span>
</div>
<input className="w-full slider-row" data-target="val-tech" max="100" min="0" type="range" value="35"/>
<p className="text-[11px] text-on-surface-variant leading-relaxed">The complexity of the code, use of AI models, and robustness of the architecture.</p>
</div>

<div className="glass-card p-4 rounded-xl flex flex-col gap-4">
<div className="flex justify-between items-center">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-error">palette</span>
<span className="font-label-md text-label-md text-on-surface">UI/UX</span>
</div>
<span className="text-primary font-bold font-label-md" id="val-uiux">20%</span>
</div>
<input className="w-full slider-row" data-target="val-uiux" max="100" min="0" type="range" value="20"/>
<p className="text-[11px] text-on-surface-variant leading-relaxed">Visual appeal, ease of use, and overall polished feel of the application.</p>
</div>

<div className="glass-card p-4 rounded-xl flex flex-col gap-4">
<div className="flex justify-between items-center">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">rocket_launch</span>
<span className="font-label-md text-label-md text-on-surface">Impact</span>
</div>
<span className="text-primary font-bold font-label-md" id="val-impact">20%</span>
</div>
<input className="w-full slider-row" data-target="val-impact" max="100" min="0" type="range" value="20"/>
<p className="text-[11px] text-on-surface-variant leading-relaxed">Real-world applicability and the potential scale of the project's utility.</p>
</div>
</div>

<div className="flex justify-between items-center glass-card p-4 rounded-xl border-dashed">
<span className="font-label-md text-label-md text-on-surface">Total Weight</span>
<div className="flex items-center gap-2">
<span className="font-headline-md text-headline-md font-bold text-secondary" id="total-weight">100%</span>
<span className="material-symbols-outlined text-secondary" id="weight-status" style={{fontVariationSettings: '\'FILL\' 1'}}>check_circle</span>
</div>
</div>

<div className="flex items-center justify-between glass-card p-5 rounded-2xl bg-primary/5 border-primary/20">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container text-sm">auto_awesome</span>
<span className="font-label-md text-label-md text-on-surface">AI auto-evaluation enabled</span>
</div>
<span className="text-[10px] text-on-surface-variant">Automatically score repositories based on rubric.</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container rounded-full toggle-bg transition-colors peer-focus:outline-none"></div>
<div className="absolute left-1 top-1 bg-on-surface-variant w-4 h-4 rounded-full toggle-dot shadow-md"></div>
</label>
</div>

<div className="flex gap-4 mt-4">
<button className="flex-1 py-4 rounded-xl font-label-md text-label-md border border-white/10 hover:bg-white/5 active:scale-95 transition-all">Back</button>
<button className="flex-[2] py-4 rounded-xl font-label-md text-label-md bg-primary-container text-white shadow-lg shadow-primary-container/20 active:scale-95 transition-all">Continue to Publish</button>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface/90 dark:bg-surface/90 backdrop-blur-lg border-t border-white/10 dark:border-white/10 shadow-lg flex justify-around items-center h-16 px-4 w-full">
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-150">
<span className="material-symbols-outlined">explore</span>
<span className="font-label-sm text-label-sm">Explore</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-150">
<span className="material-symbols-outlined">emoji_events</span>
<span className="font-label-sm text-label-sm">My Hacks</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-150">
<span className="material-symbols-outlined">add_circle</span>
<span className="font-label-sm text-label-sm">Submit</span>
</div>
<div className="flex flex-col items-center justify-center text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10 rounded-xl py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-150">
<span className="material-symbols-outlined" style={{fontVariationSettings: '\'FILL\' 1'}}>dashboard</span>
<span className="font-label-sm text-label-sm">Organize</span>
</div>
</nav>
    </>
  );
}
