"use client";
import React from 'react';

export default function TalentEcosystem() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(22, 25, 34, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(12px);
        }
        .match-glow {
            box-shadow: 0 0 15px rgba(168, 255, 96, 0.2);
        }
        body {
            background-color: #0B0D12;
            color: #e2e2e9;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 4s ease-in-out infinite;
        }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary cursor-pointer md:hidden">menu</span>
<span className="text-headline-md font-headline-md font-bold text-on-surface">ParableLabs</span>
</div>
<div className="hidden md:flex items-center gap-8">
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Home</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Hackathons</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">AI-Evaluations</a>
<a className="font-label-md text-label-md text-primary transition-colors" href="#">Talent Pool</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Mentors</a>
</div>
<div className="flex items-center gap-4">
<div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A professional headshot of a young tech architect with short dark hair and a modern black hoodie, set against a blurred high-tech workspace with soft blue and indigo ambient lighting. The style is clean, modern, and high-fidelity, consistent with a premium SaaS platform aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI4x0xjgJZZ0BwxlaSzrRT_xJQSOnnLL1qalYbb9SHjx6LwKbljh6AEm8Q1g5L04sr-ic_QW5-MTk0AjMkzfECu-DQsVkc5lDnOUb_ju0XXMWQS-sO68hHxoFNWjrGXywkGXwlYct8yviLA1vYOJqhrx666salG-gZWE2d1TRyP4N3pMFmBmzPbxJUb6pRgrFl-Nq2wC0xYBMzRcM2lpU3XnBTjngBumF-vgfoL-uxhKWVoMCYxL1hSoP4Rh_ciNVCx_8L6gyHSug"/>
</div>
</div>
</header>
<div className="flex min-h-screen pt-16">

<aside className="hidden md:flex flex-col h-[calc(100vh-64px)] w-[280px] bg-surface border-r border-white/10 py-6 sticky top-16">
<div className="px-6 mb-8">
<div className="flex items-center gap-3 mb-2">
<div className="w-10 h-10 rounded-xl bg-surface-container-high border border-white/5 flex items-center justify-center">
<img className="w-full h-full rounded-xl object-cover" data-alt="User profile avatar of Alex, a tech professional, in a high-contrast minimalist digital art style. The lighting is moody with purple and indigo highlights reflecting a modern talent environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcCcN0LmmopTdzjEF2NDyc7BbFFKmYrRqxr_E1eSmq0V9hasUFZ722i8CsSEfQc3p3l9rCutxjEvHaBPuQJ8PxDblBEztxAs6ioW741JbQiixqA2Gq76cEr0snUjQkY-RXXLKZcIfaxKTegsklCT4lYblLgVjGst89m94OToaT-5jNBtRhBPRt0n8K_h1H-hAriDrCjbceJUFCb3rpFKvb_LvhxWQvplXmUKzQBRvXHpiB7bWD5PwfW_0bL4Ko5jDJ499jbTZurbY"/>
</div>
<div>
<h4 className="font-headline-md text-headline-md text-on-surface leading-tight">Alex</h4>
<p className="font-label-sm text-label-sm text-on-surface-variant">Level 42 Architect</p>
</div>
</div>
<div className="inline-block px-2 py-0.5 rounded bg-primary-container/20 text-primary font-label-sm text-[10px] uppercase tracking-wider">
                    XP: 2450
                </div>
</div>
<nav className="flex flex-col gap-1">
<a className="flex items-center gap-4 text-on-surface-variant px-6 py-3 hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Home</span>
</a>
<a className="flex items-center gap-4 text-on-surface-variant px-6 py-3 hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">emoji_events</span>
<span className="font-label-md text-label-md">Hackathons</span>
</a>
<a className="flex items-center gap-4 text-on-surface-variant px-6 py-3 hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">psychology</span>
<span className="font-label-md text-label-md">AI-Evaluations</span>
</a>
<a className="flex items-center gap-4 bg-primary-container/10 text-primary border-l-4 border-primary px-6 py-3" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-label-md text-label-md">Talent Pool</span>
</a>
<a className="flex items-center gap-4 text-on-surface-variant px-6 py-3 hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label-md text-label-md">Mentors</span>
</a>
</nav>
</aside>

<main className="flex-1 px-4 md:px-margin-desktop py-8 max-w-5xl mx-auto w-full pb-24 md:pb-8">

<section className="mb-12">
<div className="glass-card rounded-xl p-6 md:p-8 relative overflow-hidden">

<div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
<div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
<div className="flex gap-6 items-start">
<div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 border-primary/20 p-1">
<img className="w-full h-full rounded-xl object-cover" data-alt="A portrait of Alex, professional talent, looking forward with confidence. The image is styled as a sleek UI profile photo with clean lines, high-end studio lighting, and a soft dark indigo background to match the professional SaaS platform vibe." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbDLmUiMdjzwTcu6cYzSKPWnTEh2Zt3ia277Tum11gy9jrOzSIZWBEaTe2AiFh07sUxuxbhmygsM0RzRlxOJVy4uD--1ZB-yNhMl6Y6VB7OHE4IRItqNkQmxKpC11DE3dB0_SERBRW0OCXjEBYqc7_jUa6a15wXok9P6hkVRX2dOyKYy5_vGR3K7C7UTn04l5KDnMEWjSlkluojJs0FWSTmm3Y5dNENJxqZ_RcYLYNdxV6sjzYxdp6vamVuCSZ87K49nLgOpUYJNg"/>
</div>
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface mb-1">Welcome back, Alex</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md">Your profile is currently optimized for <span className="text-primary font-semibold">AI Engineering</span> and <span className="text-primary font-semibold">Product Design</span> roles.</p>
<div className="flex flex-wrap gap-2 mt-4">
<span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-label-sm font-label-sm">React</span>
<span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-label-sm font-label-sm">PyTorch</span>
<span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-label-sm font-label-sm">LLMs</span>
<span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-label-sm font-label-sm">Tailwind</span>
</div>
</div>
</div>
<div className="flex flex-col items-center justify-center bg-surface-container rounded-2xl p-6 border border-white/5 min-w-[180px]">
<div className="relative w-24 h-24 flex items-center justify-center">
<svg className="w-full h-full transform -rotate-90">
<circle className="text-white/5" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" strokeWidth="6"></circle>
<circle className="text-secondary match-glow" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" stroke-dasharray="263.89" stroke-dashoffset="21.11" strokeWidth="6"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-headline-lg text-headline-lg text-on-surface">92%</span>
<span className="text-[10px] uppercase font-bold tracking-tighter text-on-surface-variant">Match Score</span>
</div>
</div>
<button className="mt-4 text-primary font-label-md text-label-md hover:underline">Update CV</button>
</div>
</div>
</div>
</section>

<div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
<h2 className="font-headline-md text-headline-md self-start">Recommended for you</h2>
<div className="flex gap-3 w-full md:w-auto">
<div className="relative flex-1 md:w-64">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
<input className="w-full bg-surface-container border border-white/10 rounded-lg pl-10 pr-4 py-2 text-label-md focus:border-primary focus:ring-0 transition-colors" placeholder="Search roles..." type="text"/>
</div>
<button className="flex items-center gap-2 px-4 py-2 bg-surface-container border border-white/10 rounded-lg text-label-md hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-lg">tune</span>
                        Filters
                    </button>
</div>
</div>

<div className="flex flex-col gap-4">

<article className="glass-card rounded-xl p-6 hover:border-primary/40 transition-all group">
<div className="flex flex-col md:flex-row gap-6">
<div className="w-14 h-14 rounded-xl bg-[#1e1f25] border border-white/5 flex items-center justify-center flex-shrink-0">
<img className="w-10 h-10 object-contain" data-alt="A minimalist tech logo for a futuristic AI company called 'NeuralFlow', featuring clean geometric lines in electric blue against a deep black background. High-end SaaS corporate branding style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGIA0wWIzwMfr5e-mJhlv6RdELYczXNdVva-M6QNz9h85E355bvxF8-U1_NmDYFe7x-oqtwklUE63WGl-WJ_QeYb3EA0TehKxPe9UWrKxjYMVUNQkmuJaI111o6BmZKW6sk7gGkvngTjdiJtT_6Sk8LDw6xqjZIv4AFr-ccyhFD_Ix3hMQFr3g51V8ki1sQECGFwltdS_sttd1Lo_koacu4NFZ45cpbJs6tCpQiVI7W5MFvNFLmV84HZdnZXXHd_JQbh8JiQRCGcw"/>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">AI Engineering Intern</h3>
<span className="px-3 py-1 rounded bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest border border-secondary/20">Top 10% Match</span>
</div>
<div className="flex flex-wrap gap-4 text-on-surface-variant font-body-sm text-body-sm mb-4">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">business</span> NeuralFlow AI</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> Remote, San Francisco</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">payments</span> $5,000 / mo</span>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-on-surface-variant uppercase">Paid</span>
<span className="px-2 py-0.5 rounded bg-error/10 border border-error/20 text-[11px] font-medium text-error uppercase">Urgent Hire</span>
<span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-on-surface-variant uppercase">Python</span>
</div>
</div>
<div className="flex md:flex-col gap-3 justify-center md:items-end md:min-w-[140px]">
<button className="flex-1 md:w-full py-2 bg-primary-container text-on-primary-container rounded-lg font-label-md text-label-md hover:bg-primary-container/90 transition-colors active:scale-95 duration-150">Apply Now</button>
<button className="flex-1 md:w-full py-2 bg-white/5 text-on-surface border border-white/10 rounded-lg font-label-md text-label-md hover:bg-white/10 transition-colors">Save</button>
</div>
</div>
</article>

<article className="glass-card rounded-xl p-6 hover:border-primary/40 transition-all group">
<div className="flex flex-col md:flex-row gap-6">
<div className="w-14 h-14 rounded-xl bg-[#1e1f25] border border-white/5 flex items-center justify-center flex-shrink-0">
<img className="w-10 h-10 object-contain" data-alt="A minimalist modern logo for 'Vercel-inspired' software firm called 'PrismaLabs', featuring a bold triangle shape with sharp edges in white on a charcoal background. Professional SaaS branding aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuetDFSfTZWErnJDULSQSBww2DQVi_ftm-LizgdoSBFa0pqcBoMT9zA7d80c0CuboADtvN7VtHDny5M-R0Lb7V1xPND8GukT0eSgs-ZB8bmkEGExwFdNbySytA6aRVkokbpjlNcGg1nIZnI23Ff7FR-VQ1F1qE9tn_u3VzC2Gb0Y7WtJohvn9bWcoixiIoNfjUZyJF6F178LD1UEEqTjxmF3nelJCnIdtGmFDE7xaOxAMlWjHPMM4hTgePyodOYUJOZDOhCoJ6EXw"/>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Junior Frontend Talent</h3>
<span className="px-3 py-1 rounded bg-primary-container/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">85% Match</span>
</div>
<div className="flex flex-wrap gap-4 text-on-surface-variant font-body-sm text-body-sm mb-4">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">business</span> PrismaLabs</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> On-site, London</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">payments</span> £45,000 / yr</span>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-on-surface-variant uppercase">Full-Time</span>
<span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-on-surface-variant uppercase">React</span>
<span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-on-surface-variant uppercase">TypeScript</span>
</div>
</div>
<div className="flex md:flex-col gap-3 justify-center md:items-end md:min-w-[140px]">
<button className="flex-1 md:w-full py-2 bg-primary-container text-on-primary-container rounded-lg font-label-md text-label-md hover:bg-primary-container/90 transition-colors active:scale-95 duration-150">Apply Now</button>
<button className="flex-1 md:w-full py-2 bg-white/5 text-on-surface border border-white/10 rounded-lg font-label-md text-label-md hover:bg-white/10 transition-colors">Save</button>
</div>
</div>
</article>

<article className="glass-card rounded-xl p-6 hover:border-primary/40 transition-all group">
<div className="flex flex-col md:flex-row gap-6">
<div className="w-14 h-14 rounded-xl bg-[#1e1f25] border border-white/5 flex items-center justify-center flex-shrink-0">
<img className="w-10 h-10 object-contain" data-alt="A creative logo for a design-led startup 'CanvasFlow', featuring vibrant brush-stroke patterns within a sleek circular frame. Neon accents of purple and green on a dark grey background. Modern and artistic SaaS feel." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkNEwFmqtw9V_5ONF01skyw8A0bqYjlxkhNTlTq3J-XOWlVHJptn7parzbVhIwUihhbW4aEscg6wu1wgRtjdGrobGr4c3GZpS2NH3eJDKIX8HTGedSq-dRPuBlIgaFEmQT73i3f9Cd3Go6jDxiCw9Am2NVGs2w7Qs-6weu8QRhey2IWzlKcL9DDjiQ7YM6aSHL2d79IjUidUMbq7rbeP444UUEHVByzeEhf3uP3lydCjGESIx4hq1nb6kotVjqmb5_vaKj_0Z9kfM"/>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Product Design Intern</h3>
<span className="px-3 py-1 rounded bg-primary-container/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">78% Match</span>
</div>
<div className="flex flex-wrap gap-4 text-on-surface-variant font-body-sm text-body-sm mb-4">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">business</span> CanvasFlow</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> Hybrid, Berlin</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">payments</span> €2,800 / mo</span>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-on-surface-variant uppercase">Figma</span>
<span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-on-surface-variant uppercase">System Design</span>
</div>
</div>
<div className="flex md:flex-col gap-3 justify-center md:items-end md:min-w-[140px]">
<button className="flex-1 md:w-full py-2 bg-primary-container text-on-primary-container rounded-lg font-label-md text-label-md hover:bg-primary-container/90 transition-colors active:scale-95 duration-150">Apply Now</button>
<button className="flex-1 md:w-full py-2 bg-white/5 text-on-surface border border-white/10 rounded-lg font-label-md text-label-md hover:bg-white/10 transition-colors">Save</button>
</div>
</div>
</article>
</div>

<div className="mt-12 flex justify-center">
<button className="px-8 py-3 rounded-full border border-white/10 text-label-md font-label-md hover:bg-white/5 transition-all flex items-center gap-2">
                    View More Roles
                    <span className="material-symbols-outlined">expand_more</span>
</button>
</div>
</main>
</div>

<footer className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface/90 backdrop-blur-lg border-t border-white/10 flex justify-around items-center h-16 px-4 pb-safe">
<div className="flex flex-col items-center text-on-surface-variant">
<span className="material-symbols-outlined">home</span>
<span className="font-label-sm text-label-sm">Home</span>
</div>
<div className="flex flex-col items-center text-on-surface-variant">
<span className="material-symbols-outlined">terminal</span>
<span className="font-label-sm text-label-sm">Hack</span>
</div>
<div className="flex flex-col items-center text-on-surface-variant">
<span className="material-symbols-outlined">biotech</span>
<span className="font-label-sm text-label-sm">AI</span>
</div>
<div className="flex flex-col items-center text-primary font-bold">
<span className="material-symbols-outlined" style={{fontVariationSettings: '\'FILL\' 1'}}>person_search</span>
<span className="font-label-sm text-label-sm">Talent</span>
</div>
</footer>
    </>
  );
}
