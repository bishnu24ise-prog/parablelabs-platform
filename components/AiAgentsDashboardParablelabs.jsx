"use client";
import React from 'react';

export default function AiAgentsDashboardParablelabs() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #0B0D12;
            color: #e2e2e9;
            font-family: 'Inter', sans-serif;
        }
        .glass-card {
            background: #161922;
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
            border-color: rgba(108, 92, 231, 0.4);
            transform: translateY(-2px);
            background: #1c1f2b;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .pulse-dot {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
            100% { opacity: 1; transform: scale(1); }
        }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full">
<div className="flex items-center gap-3">
<span className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-bold text-primary dark:text-primary-fixed-dim tracking-tight">ParableLabs</span>
<span className="hidden md:block px-2 py-0.5 rounded border border-white/10 text-[10px] font-bold tracking-widest text-on-surface-variant bg-surface-container uppercase">Admin Console</span>
</div>
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">notifications</button>
<div className="h-8 w-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-white/10 active:scale-95 transition-transform cursor-pointer">
<img className="w-full h-full object-cover" data-alt="A professional headshot of a software engineer for a tech dashboard avatar. The portrait has high-contrast studio lighting with a subtle blue rim light, set against a dark, out-of-focus server room background. The overall aesthetic is sleek, modern, and aligned with a premium dark-mode SaaS interface, emphasizing technical expertise and professional focus." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZeGHNYFmQQDhXXBDyeMxmhftZRMWv93GhgVTGtZLQTU3i2FbbSHTQQhQh4m01WdnkK6sv0cQsWlqaMrTmhD3KS1u7idhVV5JCYgXd7FhlF3NCujVlVM7rf3-MwjtarQ6ebbfMqhPzH-e-C-e8s-qf8B6sXHjMCtQVV9yKHABYUF-SL-86hJQ8MjHnwrvb0k6XGLXUy8axV5NEO6GiW68MBeyMUyffj_R9dNR2n24C1ykfipeoLv8BM1HBFAqQ-uYoZ4L_tg6SHFU"/>
</div>
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">settings</button>
</div>
</header>

<main className="pt-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">

<div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-surface mb-2">Agent Monitoring</h1>
<p className="text-on-surface-variant font-body-md max-w-2xl">Real-time supervision of autonomous system agents. High-density monitoring of trend analysis, recruitment pipelines, and community health.</p>
</div>
<div className="flex gap-2">
<button className="px-4 py-2 rounded-lg bg-surface-container border border-white/10 text-label-md font-label-md hover:bg-surface-container-high transition-all flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">refresh</span>
                    Sync All
                </button>
<button className="px-4 py-2 rounded-lg bg-primary-container text-white text-label-md font-label-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">add</span>
                    Deploy Agent
                </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-12">

<div className="glass-card rounded-xl p-6 flex flex-col justify-between h-full">
<div>
<div className="flex justify-between items-start mb-6">
<div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
<span className="material-symbols-outlined text-primary">analytics</span>
</div>
<div className="flex items-center gap-2 px-2 py-1 rounded-full bg-secondary/10 border border-secondary/20">
<div className="w-1.5 h-1.5 rounded-full bg-secondary pulse-dot"></div>
<span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Active</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Trend Agent</h3>
<p className="font-body-sm text-on-surface-variant leading-relaxed">Tracking 1,240 emerging tech topics, last run 12 min ago</p>
</div>
<div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
<span className="text-[11px] font-medium text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">schedule</span>
                        Last run: 10:42 AM
                    </span>
<a className="text-label-sm font-label-sm text-primary hover:underline flex items-center gap-1" href="#">
                        View logs
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
</a>
</div>
</div>

<div className="glass-card rounded-xl p-6 flex flex-col justify-between h-full">
<div>
<div className="flex justify-between items-start mb-6">
<div className="p-3 rounded-lg bg-tertiary/10 border border-tertiary/20">
<span className="material-symbols-outlined text-tertiary">school</span>
</div>
<div className="flex items-center gap-2 px-2 py-1 rounded-full bg-secondary/10 border border-secondary/20">
<div className="w-1.5 h-1.5 rounded-full bg-secondary pulse-dot"></div>
<span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Active</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Internship Agent</h3>
<p className="font-body-sm text-on-surface-variant leading-relaxed">38 new postings matched today</p>
</div>
<div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
<span className="text-[11px] font-medium text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">schedule</span>
                        Last run: 10:51 AM
                    </span>
<a className="text-label-sm font-label-sm text-primary hover:underline flex items-center gap-1" href="#">
                        View logs
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
</a>
</div>
</div>

<div className="glass-card rounded-xl p-6 flex flex-col justify-between h-full">
<div>
<div className="flex justify-between items-start mb-6">
<div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
<span className="material-symbols-outlined text-secondary">person_search</span>
</div>
<div className="flex items-center gap-2 px-2 py-1 rounded-full bg-secondary/10 border border-secondary/20">
<div className="w-1.5 h-1.5 rounded-full bg-secondary pulse-dot"></div>
<span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Active</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Recruitment Agent</h3>
<p className="font-body-sm text-on-surface-variant leading-relaxed">212 talent auto-shortlisted</p>
</div>
<div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
<span className="text-[11px] font-medium text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">schedule</span>
                        Last run: 10:54 AM
                    </span>
<a className="text-label-sm font-label-sm text-primary hover:underline flex items-center gap-1" href="#">
                        View logs
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
</a>
</div>
</div>

<div className="glass-card rounded-xl p-6 flex flex-col justify-between h-full">
<div>
<div className="flex justify-between items-start mb-6">
<div className="p-3 rounded-lg bg-error/10 border border-error/20">
<span className="material-symbols-outlined text-error">campaign</span>
</div>
<div className="flex items-center gap-2 px-2 py-1 rounded-full bg-secondary/10 border border-secondary/20">
<div className="w-1.5 h-1.5 rounded-full bg-secondary pulse-dot"></div>
<span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Active</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Marketing Agent</h3>
<p className="font-body-sm text-on-surface-variant leading-relaxed">4 campaigns scheduled</p>
</div>
<div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
<span className="text-[11px] font-medium text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">schedule</span>
                        Last run: 10:30 AM
                    </span>
<a className="text-label-sm font-label-sm text-primary hover:underline flex items-center gap-1" href="#">
                        View logs
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
</a>
</div>
</div>

<div className="glass-card rounded-xl p-6 flex flex-col justify-between h-full">
<div>
<div className="flex justify-between items-start mb-6">
<div className="p-3 rounded-lg bg-on-primary-fixed-variant/10 border border-on-primary-fixed-variant/20">
<span className="material-symbols-outlined text-on-primary-fixed-variant">forum</span>
</div>
<div className="flex items-center gap-2 px-2 py-1 rounded-full bg-secondary/10 border border-secondary/20">
<div className="w-1.5 h-1.5 rounded-full bg-secondary pulse-dot"></div>
<span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Active</span>
</div>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Community Agent</h3>
<p className="font-body-sm text-on-surface-variant leading-relaxed">17 flagged posts reviewed</p>
</div>
<div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
<span className="text-[11px] font-medium text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">schedule</span>
                        Last run: 10:58 AM
                    </span>
<a className="text-label-sm font-label-sm text-primary hover:underline flex items-center gap-1" href="#">
                        View logs
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
</a>
</div>
</div>

<div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center group hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition-all">
<div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">add_circle</span>
</div>
<span className="font-headline-md text-on-surface-variant group-hover:text-primary transition-colors">Configure Agent</span>
<p className="font-body-sm text-outline mt-1">Deploy a new specialized monitor</p>
</div>
</div>

<section className="glass-card rounded-2xl overflow-hidden mb-24">
<div className="p-6 border-b border-white/5 flex items-center justify-between">
<div>
<h2 className="font-headline-md text-on-surface">Global System Load</h2>
<p className="text-[12px] text-on-surface-variant font-medium">Across all distributed node agents</p>
</div>
<div className="flex gap-4">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-primary"></div>
<span className="text-[10px] font-bold text-outline uppercase tracking-wider">CPU Usage</span>
</div>
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-secondary"></div>
<span className="text-[10px] font-bold text-outline uppercase tracking-wider">API Throughput</span>
</div>
</div>
</div>
<div className="relative h-64 w-full bg-surface-container-lowest p-8 flex items-end gap-2 overflow-hidden">

<div className="flex-1 bg-primary/20 rounded-t h-[40%] transition-all hover:bg-primary/40"></div>
<div className="flex-1 bg-secondary/20 rounded-t h-[65%] transition-all hover:bg-secondary/40"></div>
<div className="flex-1 bg-primary/20 rounded-t h-[55%] transition-all hover:bg-primary/40"></div>
<div className="flex-1 bg-secondary/20 rounded-t h-[85%] transition-all hover:bg-secondary/40"></div>
<div className="flex-1 bg-primary/20 rounded-t h-[45%] transition-all hover:bg-primary/40"></div>
<div className="flex-1 bg-secondary/20 rounded-t h-[95%] transition-all hover:bg-secondary/40"></div>
<div className="flex-1 bg-primary/20 rounded-t h-[35%] transition-all hover:bg-primary/40"></div>
<div className="flex-1 bg-secondary/20 rounded-t h-[75%] transition-all hover:bg-secondary/40"></div>
<div className="flex-1 bg-primary/20 rounded-t h-[60%] transition-all hover:bg-primary/40"></div>
<div className="flex-1 bg-secondary/20 rounded-t h-[50%] transition-all hover:bg-secondary/40"></div>
<div className="flex-1 bg-primary/20 rounded-t h-[70%] transition-all hover:bg-primary/40"></div>
<div className="flex-1 bg-secondary/20 rounded-t h-[30%] transition-all hover:bg-secondary/40"></div>

<div className="absolute inset-0 opacity-10 pointer-events-none">

</div>
</div>
</section>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-t border-white/10 flex justify-around items-center h-20 px-margin-mobile pb-safe">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label-sm text-label-sm mt-1">Evaluate</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim font-bold transition-colors" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-sm text-label-sm mt-1">Agents</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">monitoring</span>
<span className="font-label-sm text-label-sm mt-1">Stats</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">tune</span>
<span className="font-label-sm text-label-sm mt-1">Settings</span>
</a>
</nav>

<aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest border-r border-white/5 flex-col p-6 overflow-y-auto">
<nav className="space-y-2">
<div className="px-3 py-2 text-[10px] font-bold text-outline uppercase tracking-widest mb-2">Systems</div>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-white/5 transition-all" href="#">
<span className="material-symbols-outlined text-[20px]">analytics</span>
<span className="text-label-md font-label-md">Evaluate</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary border border-primary/10 transition-all font-semibold" href="#">
<span className="material-symbols-outlined text-[20px]">smart_toy</span>
<span className="text-label-md font-label-md">Agents</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-white/5 transition-all" href="#">
<span className="material-symbols-outlined text-[20px]">monitoring</span>
<span className="text-label-md font-label-md">Stats</span>
</a>
<div className="px-3 py-2 text-[10px] font-bold text-outline uppercase tracking-widest mt-6 mb-2">Management</div>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-white/5 transition-all" href="#">
<span className="material-symbols-outlined text-[20px]">tune</span>
<span className="text-label-md font-label-md">Settings</span>
</a>
<a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-white/5 transition-all" href="#">
<span className="material-symbols-outlined text-[20px]">terminal</span>
<span className="text-label-md font-label-md">CLI Tooling</span>
</a>
</nav>
<div className="mt-auto pt-6 border-t border-white/5">
<div className="glass-card p-4 rounded-xl">
<div className="flex items-center gap-3 mb-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="text-label-sm font-label-sm text-on-surface">Node Healthy</span>
</div>
<div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
<div className="bg-secondary h-full w-[92%]"></div>
</div>
<span className="text-[10px] text-outline mt-2 block">92% Uptime (Last 24h)</span>
</div>
</div>
</aside>
    </>
  );
}
