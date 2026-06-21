"use client";
import React from 'react';

export default function OnboardingSkillsParablelabs() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #0B0D12;
            color: #e2e2e9;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }

        .glass-card {
            background: rgba(22, 25, 34, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(12px);
        }

        .step-dot.active {
            background-color: #6C5CE7;
            box-shadow: 0 0 12px rgba(108, 92, 231, 0.5);
        }

        .tech-chip {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tech-chip.selected {
            background-color: #6C5CE7;
            color: white;
            border-color: #6C5CE7;
            transform: scale(1.05);
        }

        .tech-chip:not(.selected):hover {
            border-color: rgba(108, 92, 231, 0.5);
            background-color: rgba(108, 92, 231, 0.05);
        }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-onboarding {
            animation: fadeIn 0.6s ease-out forwards;
        }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      


<header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface/80 backdrop-blur-xl border-b border-white/10">
<div className="font-headline-md text-headline-md font-bold text-on-surface">ParableLabs</div>
<div className="w-8 h-8 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center">
<span className="material-symbols-outlined text-[18px]">lock</span>
</div>
</header>

<main className="w-full max-w-[640px] z-10 animate-onboarding mt-16">

<div className="flex justify-center gap-3 mb-10">
<div className="step-dot active w-2.5 h-2.5 rounded-full transition-all duration-300"></div>
<div className="step-dot w-2.5 h-2.5 rounded-full bg-white/10 transition-all duration-300"></div>
<div className="step-dot w-2.5 h-2.5 rounded-full bg-white/10 transition-all duration-300"></div>
</div>
<div className="text-center mb-12">
<h1 className="font-headline-xl text-headline-xl text-on-surface mb-4">Select your stack</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto">
                Choose the technologies you work with to personalize your feed.
            </p>
</div>

<div className="glass-card rounded-xl p-8 md:p-10 mb-10">
<div className="flex flex-wrap justify-center gap-3" id="tag-cloud">

<button className="tech-chip px-6 py-3 rounded-full border border-white/10 bg-white/5 font-label-md text-label-md cursor-pointer" onClick={(e) => { try { toggleChip(e.currentTarget) } catch(err) { console.error(err); } }}>React</button>
<button className="tech-chip px-6 py-3 rounded-full border border-white/10 bg-white/5 font-label-md text-label-md cursor-pointer" onClick={(e) => { try { toggleChip(e.currentTarget) } catch(err) { console.error(err); } }}>Python</button>
<button className="tech-chip px-6 py-3 rounded-full border border-white/10 bg-white/5 font-label-md text-label-md cursor-pointer" onClick={(e) => { try { toggleChip(e.currentTarget) } catch(err) { console.error(err); } }}>ML</button>
<button className="tech-chip px-6 py-3 rounded-full border border-white/10 bg-white/5 font-label-md text-label-md cursor-pointer" onClick={(e) => { try { toggleChip(e.currentTarget) } catch(err) { console.error(err); } }}>Solidity</button>
<button className="tech-chip px-6 py-3 rounded-full border border-white/10 bg-white/5 font-label-md text-label-md cursor-pointer" onClick={(e) => { try { toggleChip(e.currentTarget) } catch(err) { console.error(err); } }}>Node.js</button>
<button className="tech-chip px-6 py-3 rounded-full border border-white/10 bg-white/5 font-label-md text-label-md cursor-pointer" onClick={(e) => { try { toggleChip(e.currentTarget) } catch(err) { console.error(err); } }}>TypeScript</button>
<button className="tech-chip px-6 py-3 rounded-full border border-white/10 bg-white/5 font-label-md text-label-md cursor-pointer" onClick={(e) => { try { toggleChip(e.currentTarget) } catch(err) { console.error(err); } }}>Docker</button>
<button className="tech-chip px-6 py-3 rounded-full border border-white/10 bg-white/5 font-label-md text-label-md cursor-pointer" onClick={(e) => { try { toggleChip(e.currentTarget) } catch(err) { console.error(err); } }}>Kubernetes</button>
<button className="tech-chip px-6 py-3 rounded-full border border-white/10 bg-white/5 font-label-md text-label-md cursor-pointer" onClick={(e) => { try { toggleChip(e.currentTarget) } catch(err) { console.error(err); } }}>AWS</button>
<button className="tech-chip px-6 py-3 rounded-full border border-white/10 bg-white/5 font-label-md text-label-md cursor-pointer" onClick={(e) => { try { toggleChip(e.currentTarget) } catch(err) { console.error(err); } }}>PyTorch</button>
<button className="tech-chip px-6 py-3 rounded-full border border-white/10 bg-white/5 font-label-md text-label-md cursor-pointer" onClick={(e) => { try { toggleChip(e.currentTarget) } catch(err) { console.error(err); } }}>Figma</button>
<button className="tech-chip px-6 py-3 rounded-full border border-white/10 bg-white/5 font-label-md text-label-md cursor-pointer" onClick={(e) => { try { toggleChip(e.currentTarget) } catch(err) { console.error(err); } }}>Tailwind CSS</button>
</div>
</div>

<div className="flex flex-col items-center gap-6">
<button className="w-full md:w-auto md:min-w-[240px] px-8 py-4 bg-primary-container text-on-primary-container rounded-full font-label-md text-label-md font-semibold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary-container/20">
                Next
            </button>
<button className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
                Skip for now
            </button>
</div>
</main>

<div className="hidden lg:block fixed right-10 bottom-10 w-64 h-64 opacity-20">
<div className="w-full h-full relative">
<div className="absolute inset-0 border-2 border-primary-container/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
<div className="absolute inset-4 border border-secondary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
<div className="absolute inset-8 flex items-center justify-center">
<span className="material-symbols-outlined text-primary-container text-4xl">code</span>
</div>
</div>
</div>

    </>
  );
}
