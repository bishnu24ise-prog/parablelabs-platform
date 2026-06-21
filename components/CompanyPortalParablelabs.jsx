"use client";
import React from 'react';

export default function CompanyPortalParablelabs() {
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
            border-radius: 0.75rem;
        }
        .nav-blur {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #111318;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #474554;
            border-radius: 10px;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-outline-variant/10 bg-surface-container/80 nav-blur flex flex-col py-6 z-50">
<div className="px-6 mb-8">
<h1 className="font-headline-lg text-headline-lg font-bold text-primary tracking-tighter">ParableLabs</h1>
<p className="text-[10px] font-label-md text-outline uppercase tracking-widest mt-1">v2.4.0</p>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-3 px-6 py-3 text-primary bg-primary-container/10 border-l-4 border-primary transition-all opacity-90 scale-[0.99]" href="#">
<span className="material-symbols-outlined" style={{fontVariationSettings: '\'FILL\' 1'}}>dashboard</span>
<span className="font-label-md text-label-md">Dashboard</span>
</a>
<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-colors duration-200" href="#">
<span className="material-symbols-outlined">rocket_launch</span>
<span className="font-label-md text-label-md">Hackathons</span>
</a>
<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-colors duration-200" href="#">
<span className="material-symbols-outlined">group</span>
<span className="font-label-md text-label-md">Team Management</span>
</a>
<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-colors duration-200" href="#">
<span className="material-symbols-outlined">monitoring</span>
<span className="font-label-md text-label-md">Analytics</span>
</a>
<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 transition-colors duration-200" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-md text-label-md">Settings</span>
</a>
</nav>
<div className="px-6 mt-auto pt-6 border-t border-outline-variant/10">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A professional studio portrait of a tech executive with a confident expression, set against a dark, moody background with subtle blue and purple lighting accents. The style is modern SaaS corporate photography, focusing on clean lines and a high-end, elite feel for ParableLabs." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD59A715L_VWiVb681cqcGJAdeM7MH8uxwIxhVcyB17u5X4p6yCf03misuTHKigzrbnKfR-P1kRvKHZfXaj1eFZrilmq4JoYmH0M8Sg2QEqjaQi_Xlfi6aV9RoixJoCDepjD7QRTpiQPIA6qB_x_dCtyOcSJO1AiNC-eRa19_s9NkvYUnfKgSrwXSCv3S0bnmwp_0QSNL3UgY1HXaoh-KTgKSHAb3_wVtP4VUfW3-nb0DyqWTP1sR1Unm97xxMZuBVoOv5Pr9PvPbE"/>
</div>
<div>
<p className="font-headline-md text-[14px] text-on-surface font-bold">Parable Admin</p>
<p className="font-body-sm text-[12px] text-on-surface-variant">Enterprise Tier</p>
</div>
</div>
</div>
</aside>

<header className="fixed top-0 right-0 w-[calc(100%-260px)] z-40 bg-surface/80 nav-blur border-b border-outline-variant/10 h-20 flex justify-between items-center px-margin-desktop">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer">menu</span>
<h2 className="font-headline-md text-headline-md font-bold text-on-surface">Company Portal</h2>
</div>
<div className="flex items-center gap-6">
<div className="relative">
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">notifications</span>
<span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full"></span>
</div>
<button className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-label-md text-label-md font-semibold hover:opacity-90 active:scale-95 transition-all">
                Create Hackathon
            </button>
</div>
</header>

<main className="ml-[260px] pt-28 pb-12 px-margin-desktop min-h-screen">

<div className="mb-12">
<h3 className="font-headline-xl text-headline-xl mb-2 text-on-surface">System Performance</h3>
<p className="font-body-lg text-on-surface-variant max-w-2xl">Real-time overview of hackathon engagement, recruitment velocity, and institutional ROI across the ParableLabs ecosystem.</p>
</div>

<div className="grid grid-cols-12 gap-gutter mb-gutter">

<div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-gutter">

<div className="glass-card p-6 flex flex-col justify-between group hover:border-primary/30 transition-all duration-300">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-primary text-3xl">rocket_launch</span>
<span className="text-secondary font-label-sm text-label-sm">+12%</span>
</div>
<div className="mt-8">
<p className="font-label-md text-on-surface-variant uppercase tracking-wider mb-1">Hackathons Hosted</p>
<p className="font-headline-xl text-headline-xl text-on-surface leading-none">4</p>
</div>
</div>

<div className="glass-card p-6 flex flex-col justify-between group hover:border-primary/30 transition-all duration-300">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-primary text-3xl">work</span>
<span className="text-on-surface-variant font-label-sm text-label-sm">Steady</span>
</div>
<div className="mt-8">
<p className="font-label-md text-on-surface-variant uppercase tracking-wider mb-1">Active Job Postings</p>
<p className="font-headline-xl text-headline-xl text-on-surface leading-none">5</p>
</div>
</div>

<div className="glass-card p-6 flex flex-col justify-between group hover:border-primary/30 transition-all duration-300">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-primary text-3xl">person_add</span>
<span className="text-secondary font-label-sm text-label-sm">+4 new</span>
</div>
<div className="mt-8">
<p className="font-label-md text-on-surface-variant uppercase tracking-wider mb-1">Interns Hired</p>
<p className="font-headline-xl text-headline-xl text-on-surface leading-none">17</p>
</div>
</div>
</div>

<div className="col-span-12 lg:col-span-4 glass-card p-8 flex flex-col items-center justify-center relative overflow-hidden">
<div className="absolute inset-0 opacity-10">

</div>
<div className="relative z-10 text-center">
<p className="font-label-md text-on-surface-variant uppercase tracking-widest mb-6">Platform ROI</p>
<div className="relative w-40 h-40 flex items-center justify-center">
<svg className="w-full h-full transform -rotate-90">
<circle className="text-surface-variant" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="8"></circle>
<circle className="text-secondary drop-shadow-[0_0_8px_rgba(136,220,65,0.4)]" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" stroke-dasharray="440" stroke-dashoffset="66" strokeWidth="8"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-headline-xl text-headline-xl text-on-surface leading-none">85<span className="text-headline-md">%</span></span>
</div>
</div>
<p className="font-body-sm text-on-surface-variant mt-4">Performance: <span className="text-secondary font-semibold">Exceptional</span></p>
</div>
</div>
</div>

<div className="grid grid-cols-12 gap-gutter items-stretch">

<div className="col-span-12 xl:col-span-8 glass-card p-8 min-h-[400px] flex flex-col">
<div className="flex justify-between items-center mb-8">
<div>
<h4 className="font-headline-md text-headline-md text-on-surface">Talent growth over last 6 months</h4>
<p className="font-body-sm text-on-surface-variant">Aggregate data across all active recruiting cycles</p>
</div>
<div className="flex gap-2">
<span className="px-3 py-1 bg-surface-variant/30 text-on-surface-variant rounded text-label-sm font-label-sm">Monthly</span>
<span className="px-3 py-1 bg-primary-container text-on-primary-container rounded text-label-sm font-label-sm">Quarterly</span>
</div>
</div>

<div className="flex-1 w-full flex items-end justify-between gap-4 px-4 pb-4">
<div className="flex-1 flex flex-col items-center gap-2 group">
<div className="w-full bg-primary-container/20 rounded-t-lg transition-all duration-500 group-hover:bg-primary-container/40" style={{height: '30%'}}></div>
<span className="text-[10px] font-label-md text-outline uppercase">Jan</span>
</div>
<div className="flex-1 flex flex-col items-center gap-2 group">
<div className="w-full bg-primary-container/20 rounded-t-lg transition-all duration-500 group-hover:bg-primary-container/40" style={{height: '45%'}}></div>
<span className="text-[10px] font-label-md text-outline uppercase">Feb</span>
</div>
<div className="flex-1 flex flex-col items-center gap-2 group">
<div className="w-full bg-primary-container/20 rounded-t-lg transition-all duration-500 group-hover:bg-primary-container/40" style={{height: '38%'}}></div>
<span className="text-[10px] font-label-md text-outline uppercase">Mar</span>
</div>
<div className="flex-1 flex flex-col items-center gap-2 group">
<div className="w-full bg-primary-container/30 rounded-t-lg transition-all duration-500 group-hover:bg-primary-container/50" style={{height: '60%'}}></div>
<span className="text-[10px] font-label-md text-outline uppercase">Apr</span>
</div>
<div className="flex-1 flex flex-col items-center gap-2 group">
<div className="w-full bg-primary-container/40 rounded-t-lg transition-all duration-500 group-hover:bg-primary-container/60" style={{height: '82%'}}></div>
<span className="text-[10px] font-label-md text-outline uppercase">May</span>
</div>
<div className="flex-1 flex flex-col items-center gap-2 group relative">
<div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Peak</div>
<div className="w-full bg-primary rounded-t-lg transition-all duration-500" style={{height: '95%'}}></div>
<span className="text-[10px] font-label-md text-outline uppercase font-bold text-on-surface">Jun</span>
</div>
</div>
</div>

<div className="col-span-12 xl:col-span-4 flex flex-col gap-gutter">
<div className="flex justify-between items-end">
<h4 className="font-headline-md text-headline-md text-on-surface">Upcoming Deadlines</h4>
<a className="text-primary font-label-md text-label-md hover:underline" href="#">View All</a>
</div>
<div className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">

<div className="glass-card p-5 border-l-4 border-error hover:translate-x-1 transition-transform">
<div className="flex justify-between items-start mb-2">
<span className="text-error font-label-sm text-label-sm uppercase tracking-tighter">Urgent</span>
<span className="text-on-surface-variant text-[11px]">in 2 days</span>
</div>
<p className="font-headline-md text-[16px] text-on-surface mb-1">AI Agents Hackathon</p>
<p className="font-body-sm text-on-surface-variant mb-3">Project Submission Phase 1</p>
<div className="flex items-center gap-2">
<div className="h-1.5 flex-1 bg-surface-variant rounded-full overflow-hidden">
<div className="bg-error h-full w-[90%]"></div>
</div>
<span className="text-[10px] font-label-md text-on-surface-variant">90% Full</span>
</div>
</div>

<div className="glass-card p-5 border-l-4 border-secondary hover:translate-x-1 transition-transform">
<div className="flex justify-between items-start mb-2">
<span className="text-secondary font-label-sm text-label-sm uppercase tracking-tighter">Active</span>
<span className="text-on-surface-variant text-[11px]">in 8 days</span>
</div>
<p className="font-headline-md text-[16px] text-on-surface mb-1">Web3 Identity Challenge</p>
<p className="font-body-sm text-on-surface-variant mb-3">Registration Deadline</p>
<div className="flex items-center gap-2">
<div className="h-1.5 flex-1 bg-surface-variant rounded-full overflow-hidden">
<div className="bg-secondary h-full w-[45%]"></div>
</div>
<span className="text-[10px] font-label-md text-on-surface-variant">45% Full</span>
</div>
</div>

<div className="glass-card p-5 border-l-4 border-primary hover:translate-x-1 transition-transform">
<div className="flex justify-between items-start mb-2">
<span className="text-primary font-label-sm text-label-sm uppercase tracking-tighter">Future</span>
<span className="text-on-surface-variant text-[11px]">in 14 days</span>
</div>
<p className="font-headline-md text-[16px] text-on-surface mb-1">Sustainability Sprint</p>
<p className="font-body-sm text-on-surface-variant mb-3">Team Matching Window</p>
<div className="flex items-center gap-2">
<div className="h-1.5 flex-1 bg-surface-variant rounded-full overflow-hidden">
<div className="bg-primary h-full w-[15%]"></div>
</div>
<span className="text-[10px] font-label-md text-on-surface-variant">Open</span>
</div>
</div>

<div className="glass-card p-5 border-l-4 border-outline hover:translate-x-1 transition-transform">
<div className="flex justify-between items-start mb-2">
<span className="text-outline font-label-sm text-label-sm uppercase tracking-tighter">Draft</span>
<span className="text-on-surface-variant text-[11px]">21 days</span>
</div>
<p className="font-headline-md text-[16px] text-on-surface mb-1">Cybersecurity Shield</p>
<p className="font-body-sm text-on-surface-variant mb-3">Internal Review</p>
<div className="flex items-center gap-2">
<div className="h-1.5 flex-1 bg-surface-variant rounded-full overflow-hidden">
<div className="bg-outline h-full w-[5%]"></div>
</div>
<span className="text-[10px] font-label-md text-on-surface-variant">Pending</span>
</div>
</div>
</div>
</div>
</div>

<div className="mt-gutter glass-card p-8 overflow-hidden relative min-h-[200px] flex items-center justify-between">
<div className="relative z-10 max-w-xl">
<h4 className="font-headline-lg text-headline-lg text-on-surface mb-2">Deep Intelligence for the Next Gen.</h4>
<p className="font-body-md text-on-surface-variant">ParableLabs analytics engine processes over 50,000 talent touchpoints daily to provide the most accurate talent acquisition metrics in the industry.</p>
</div>
<div className="w-64 h-64 absolute -right-20 -bottom-20 opacity-20 pointer-events-none">

</div>
</div>
</main>
    </>
  );
}
