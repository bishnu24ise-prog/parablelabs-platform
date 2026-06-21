"use client";
import React from 'react';

export default function OnboardingInterestsParablelabs() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(22, 25, 34, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(12px);
        }
        .interest-card:hover {
            border-color: rgba(108, 92, 231, 0.5);
            transform: translateY(-2px);
        }
        .interest-card.active {
            border-color: #6c5ce7;
            background: rgba(108, 92, 231, 0.1);
        }
        .interest-card.active .check-circle {
            background-color: #6c5ce7;
            border-color: #6c5ce7;
        }
        .glow-button {
            box-shadow: 0 0 20px rgba(108, 92, 231, 0.3);
        }
        .progress-dot {
            transition: all 0.3s ease;
        }
        .progress-dot.active {
            width: 32px;
            background-color: #6c5ce7;
        }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 px-margin-mobile md:px-margin-desktop h-16 flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="text-primary font-headline-md font-bold tracking-tight">ParableLabs</span>
</div>
<button className="text-on-surface-variant font-label-md hover:text-on-surface transition-colors">
            Save & Exit
        </button>
</header>

<main className="flex-grow pt-24 pb-12 px-margin-mobile md:px-margin-desktop flex flex-col items-center justify-center max-w-4xl mx-auto w-full">

<nav aria-label="Onboarding Progress" className="flex items-center gap-3 mb-12">
<div className="h-1.5 w-8 rounded-full bg-primary-container/30 progress-dot"></div>
<div className="h-1.5 w-8 rounded-full bg-primary-container/30 progress-dot"></div>
<div className="h-1.5 w-8 rounded-full bg-primary-container progress-dot active"></div>
</nav>

<section className="text-center mb-12">
<h1 className="font-headline-xl text-headline-xl mb-4 md:mb-6 text-on-surface">Your Interests</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
                Help us tailor your dashboard by selecting the paths you're most curious about. You can change these later.
            </p>
</section>

<form className="w-full grid grid-cols-1 md:grid-cols-2 gap-gutter mb-12" id="interests-form">

<label className="interest-card glass-card rounded-xl p-6 cursor-pointer transition-all duration-300 relative group">
<input className="hidden peer" name="interest" type="checkbox" value="hackathons"/>
<div className="flex items-start justify-between mb-4">
<div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-3xl">emoji_events</span>
</div>
<div className="check-circle w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-white text-sm scale-0 transition-transform">check</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md mb-2">Hackathons</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                    Collaborate with elite devs to build MVP solutions in 48-hour high-intensity sprints.
                </p>
</label>

<label className="interest-card glass-card rounded-xl p-6 cursor-pointer transition-all duration-300 relative group">
<input className="hidden peer" name="interest" type="checkbox" value="daily_challenges"/>
<div className="flex items-start justify-between mb-4">
<div className="w-12 h-12 rounded-lg bg-secondary-container/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-3xl">terminal</span>
</div>
<div className="check-circle w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-white text-sm scale-0 transition-transform">check</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md mb-2">Daily Challenges</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                    Sharpen your skills with bite-sized algorithmic and architectural puzzles every 24 hours.
                </p>
</label>

<label className="interest-card glass-card rounded-xl p-6 cursor-pointer transition-all duration-300 relative group">
<input className="hidden peer" name="interest" type="checkbox" value="internships"/>
<div className="flex items-start justify-between mb-4">
<div className="w-12 h-12 rounded-lg bg-tertiary-container/10 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-3xl">school</span>
</div>
<div className="check-circle w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-white text-sm scale-0 transition-transform">check</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md mb-2">Internships</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                    Connect with leading AI labs and tech giants for mentored professional experiences.
                </p>
</label>

<label className="interest-card glass-card rounded-xl p-6 cursor-pointer transition-all duration-300 relative group">
<input className="hidden peer" name="interest" type="checkbox" value="freelance"/>
<div className="flex items-start justify-between mb-4">
<div className="w-12 h-12 rounded-lg bg-primary-fixed-dim/10 flex items-center justify-center text-primary-fixed-dim">
<span className="material-symbols-outlined text-3xl">work</span>
</div>
<div className="check-circle w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center transition-colors">
<span className="material-symbols-outlined text-white text-sm scale-0 transition-transform">check</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md mb-2">Freelance Projects</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                    Monetize your expertise by picking up verified bounty-based engineering tasks.
                </p>
</label>
</form>

<footer className="w-full flex flex-col md:flex-row items-center justify-between gap-6 py-6 border-t border-white/5">
<button className="text-on-surface-variant font-label-md px-6 py-3 hover:text-on-surface transition-colors order-2 md:order-1" type="button">
                Back to Profile
            </button>
<button className="glow-button bg-primary-container text-on-primary-container font-label-md px-12 py-4 rounded-full hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 order-1 md:order-2" id="finish-btn" type="submit">
<span>Finish setup</span>
<span className="material-symbols-outlined text-lg">arrow_forward</span>
</button>
</footer>
</main>

<div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-container/10 blur-[120px] -z-10 rounded-full"></div>
<div className="fixed bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] -z-10 rounded-full"></div>
    </>
  );
}
