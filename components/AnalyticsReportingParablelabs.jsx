"use client";
import React from 'react';

export default function AnalyticsReportingParablelabs() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #0B0D12;
            color: #e2e2e9;
            overflow-x: hidden;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(22, 25, 34, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(8px);
        }
        .chart-container {
            position: relative;
            height: 300px;
            width: 100%;
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #0B0D12;
        }
        ::-webkit-scrollbar-thumb {
            background: #474554;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #6c5ce7;
        }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm">
<div className="flex justify-between items-center px-margin-desktop py-4 max-w-container-max mx-auto">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary" data-icon="insights">insights</span>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary tracking-tight">Analytics</h1>
</div>
<div className="hidden md:flex items-center gap-8">
<nav className="flex gap-6">
<a className="font-label-md text-label-md text-primary dark:text-primary border-b-2 border-primary pb-1 cursor-pointer active:scale-95 duration-200" href="#">Dashboard</a>
<a className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest/50 transition-colors cursor-pointer active:scale-95 duration-200" href="#">Analytics</a>
<a className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest/50 transition-colors cursor-pointer active:scale-95 duration-200" href="#">Reports</a>
</nav>
<div className="h-10 w-10 rounded-full bg-primary-container flex items-center justify-center cursor-pointer active:scale-95 duration-200">
<span className="text-white font-bold">AU</span>
</div>
</div>
</div>
</header>

<aside className="h-screen w-[260px] fixed left-0 top-0 z-40 bg-surface-container dark:bg-surface-container border-r border-outline-variant/10 hidden md:flex flex-col gap-unit pt-20 pb-4 px-4">
<div className="px-4 mb-8">
<h2 className="font-headline-md text-headline-md text-primary">Partner Console</h2>
</div>
<nav className="flex flex-col gap-2">
<a className="flex items-center gap-3 px-4 py-3 bg-primary-container/10 text-primary border-l-4 border-primary font-semibold transition-all duration-300 ease-in-out" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-label-md text-label-md">Overview</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 transition-all duration-300 ease-in-out" href="#">
<span className="material-symbols-outlined" data-icon="person_search">person_search</span>
<span className="font-label-md text-label-md">Recruitment</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 transition-all duration-300 ease-in-out" href="#">
<span className="material-symbols-outlined" data-icon="terminal">terminal</span>
<span className="font-label-md text-label-md">Hackathons</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 transition-all duration-300 ease-in-out" href="#">
<span className="material-symbols-outlined" data-icon="groups">groups</span>
<span className="font-label-md text-label-md">Talent Pool</span>
</a>
<div className="mt-auto">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/20 transition-all duration-300 ease-in-out" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-label-md text-label-md">Settings</span>
</a>
</div>
</nav>
</aside>

<main className="md:ml-[260px] pt-24 pb-20 px-margin-mobile md:px-margin-desktop min-h-screen">

<div className="max-w-container-max mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Performance Dashboard</h2>
<p className="text-on-surface-variant font-body-sm">Real-time talent ecosystem insights and hiring metrics.</p>
</div>
<div className="flex items-center gap-3">
<div className="flex items-center bg-surface-container-high px-4 py-2 rounded-lg border border-outline-variant/10 cursor-pointer hover:border-primary/50 transition-all duration-200">
<span className="material-symbols-outlined text-primary mr-2" data-icon="calendar_today">calendar_today</span>
<span className="font-label-md text-label-md">Last 30 Days</span>
<span className="material-symbols-outlined ml-2" data-icon="expand_more">expand_more</span>
</div>
<button className="bg-primary-container text-white px-6 py-2 rounded-lg font-label-md text-label-md hover:brightness-110 transition-all shadow-md active:scale-95">
                    Export Report
                </button>
</div>
</div>

<div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

<section className="md:col-span-7 glass-card p-6 rounded-xl flex flex-col">
<div className="flex justify-between items-start mb-8">
<div>
<h3 className="font-headline-md text-headline-md text-on-surface">Talent Conversion Pipeline</h3>
<p className="text-on-surface-variant text-label-sm uppercase tracking-wider mt-1">Lifecycle Engagement</p>
</div>
<span className="material-symbols-outlined text-secondary" data-icon="info" style={{fontVariationSettings: '\'FILL\' 1'}}>info</span>
</div>
<div className="flex-grow flex flex-col gap-4 py-4">

<div className="relative group">
<div className="bg-primary-container w-full h-12 rounded-lg flex items-center px-4 justify-between relative z-10">
<span className="font-label-md font-bold text-white uppercase">Student Base</span>
<span className="text-white font-headline-md">12,400</span>
</div>
<div className="flex justify-center mt-2">
<div className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-label-sm border border-secondary/30 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="arrow_downward">arrow_downward</span>
                                65% Conversion
                            </div>
</div>
</div>

<div className="relative group mx-auto w-[85%]">
<div className="bg-primary-container/80 w-full h-12 rounded-lg flex items-center px-4 justify-between relative z-10">
<span className="font-label-md font-bold text-white uppercase">Hackathon Participants</span>
<span className="text-white font-headline-md">8,060</span>
</div>
<div className="flex justify-center mt-2">
<div className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-label-sm border border-secondary/30 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="arrow_downward">arrow_downward</span>
                                22% Conversion
                            </div>
</div>
</div>

<div className="relative group mx-auto w-[60%]">
<div className="bg-primary-container/60 w-full h-12 rounded-lg flex items-center px-4 justify-between relative z-10">
<span className="font-label-md font-bold text-white uppercase">Interns</span>
<span className="text-white font-headline-md">1,773</span>
</div>
<div className="flex justify-center mt-2">
<div className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-label-sm border border-secondary/30 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="arrow_downward">arrow_downward</span>
                                15% Conversion
                            </div>
</div>
</div>

<div className="relative group mx-auto w-[35%]">
<div className="bg-primary-container/40 w-full h-12 rounded-lg flex items-center px-4 justify-between relative z-10">
<span className="font-label-md font-bold text-white uppercase">Full-time Hires</span>
<span className="text-white font-headline-md">266</span>
</div>
</div>
</div>
</section>

<section className="md:col-span-5 glass-card p-6 rounded-xl">
<div className="flex justify-between items-start mb-6">
<div>
<h3 className="font-headline-md text-headline-md text-on-surface">Skill Demand: Top 5</h3>
<p className="text-on-surface-variant text-label-sm uppercase mt-1">Trending Stack</p>
</div>
</div>
<div className="space-y-6">

<div className="space-y-2">
<div className="flex justify-between font-label-md">
<span className="text-on-surface">AI/ML</span>
<span className="text-secondary">94%</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-secondary shadow-[0_0_8px_rgba(168,255,96,0.4)] transition-all duration-1000" style={{width: '94%'}}></div>
</div>
</div>

<div className="space-y-2">
<div className="flex justify-between font-label-md">
<span className="text-on-surface">React</span>
<span className="text-primary">82%</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary-container transition-all duration-1000" style={{width: '82%'}}></div>
</div>
</div>

<div className="space-y-2">
<div className="flex justify-between font-label-md">
<span className="text-on-surface">Rust</span>
<span className="text-primary">76%</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary-container transition-all duration-1000" style={{width: '76%'}}></div>
</div>
</div>

<div className="space-y-2">
<div className="flex justify-between font-label-md">
<span className="text-on-surface">Solidity</span>
<span className="text-primary">68%</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary-container transition-all duration-1000" style={{width: '68%'}}></div>
</div>
</div>

<div className="space-y-2">
<div className="flex justify-between font-label-md">
<span className="text-on-surface">Python</span>
<span className="text-primary">61%</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary-container transition-all duration-1000" style={{width: '61%'}}></div>
</div>
</div>
</div>
</section>

<section className="md:col-span-8 glass-card p-6 rounded-xl min-h-[400px] flex flex-col">
<div className="flex justify-between items-center mb-6">
<div>
<h3 className="font-headline-md text-headline-md text-on-surface">Daily Active Users (DAU)</h3>
<p className="text-on-surface-variant text-label-sm uppercase mt-1">30 Day Trend</p>
</div>
<div className="flex items-center gap-2 text-secondary font-label-md">
<span className="material-symbols-outlined" data-icon="trending_up">trending_up</span>
                        +12.4% vs last month
                    </div>
</div>
<div className="flex-grow relative flex items-end justify-between px-2 pb-8 border-b border-outline-variant/20">

<svg className="absolute inset-0 w-full h-full px-2 pt-4 pb-8 overflow-visible" preserveaspectratio="none">
<defs>
<lineargradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#6c5ce7" stopOpacity="0.3"></stop>
<stop offset="100%" stopColor="#6c5ce7" stopOpacity="0"></stop>
</lineargradient>
</defs>

<path d="M0,280 Q50,260 100,240 T200,220 T300,180 T400,200 T500,140 T600,160 T700,100 T800,120 T900,60 T1000,80 L1000,300 L0,300 Z" fill="url(#areaGradient)"></path>
<path d="M0,280 Q50,260 100,240 T200,220 T300,180 T400,200 T500,140 T600,160 T700,100 T800,120 T900,60 T1000,80" fill="none" stroke="#c6bfff" strokeLinecap="round" strokeWidth="3"></path>
</svg>

<div className="absolute bottom-2 left-0 w-full flex justify-between px-2 text-[10px] text-on-surface-variant font-label-sm">
<span>Day 1</span>
<span>Day 7</span>
<span>Day 14</span>
<span>Day 21</span>
<span>Day 30</span>
</div>
</div>
</section>

<section className="md:col-span-4 glass-card p-6 rounded-xl flex flex-col">
<div className="mb-6">
<h3 className="font-headline-md text-headline-md text-on-surface">Hackathon Domains</h3>
<p className="text-on-surface-variant text-label-sm uppercase mt-1">Sector Distribution</p>
</div>
<div className="flex-grow flex items-center justify-center relative">

<div className="relative w-48 h-48 rounded-full border-[20px] border-surface-container-highest flex items-center justify-center">

<div className="absolute inset-[-20px] rounded-full border-[20px] border-primary-container border-r-transparent border-b-transparent border-l-transparent rotate-45"></div>
<div className="absolute inset-[-20px] rounded-full border-[20px] border-secondary border-t-transparent border-l-transparent border-b-transparent rotate-[-30deg]"></div>
<div className="flex flex-col items-center">
<span className="text-headline-lg font-bold text-on-surface">8.2k</span>
<span className="text-label-sm text-on-surface-variant">Participants</span>
</div>
</div>
</div>
<div className="mt-6 grid grid-cols-2 gap-4">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-primary-container"></div>
<span className="text-label-sm text-on-surface-variant">AI (42%)</span>
</div>
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-secondary"></div>
<span className="text-label-sm text-on-surface-variant">Web3 (28%)</span>
</div>
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-tertiary"></div>
<span className="text-label-sm text-on-surface-variant">FinTech (18%)</span>
</div>
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-outline"></div>
<span className="text-label-sm text-on-surface-variant">Cloud (12%)</span>
</div>
</div>
</section>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 md:hidden bg-surface-container/90 dark:bg-surface-container/90 backdrop-blur-lg border-t border-outline-variant/10 shadow-lg flex justify-around items-center h-16 px-margin-mobile">
<div className="flex flex-col items-center gap-1 text-secondary dark:text-secondary touch-manipulation">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
<span className="font-label-sm text-label-sm">Dashboard</span>
</div>
<div className="flex flex-col items-center gap-1 text-on-surface-variant dark:text-on-surface-variant active:bg-surface-bright/10 touch-manipulation">
<span className="material-symbols-outlined" data-icon="filter_alt">filter_alt</span>
<span className="font-label-sm text-label-sm">Funnel</span>
</div>
<div className="flex flex-col items-center gap-1 text-on-surface-variant dark:text-on-surface-variant active:bg-surface-bright/10 touch-manipulation">
<span className="material-symbols-outlined" data-icon="trending_up">trending_up</span>
<span className="font-label-sm text-label-sm">Skills</span>
</div>
<div className="flex flex-col items-center gap-1 text-on-surface-variant dark:text-on-surface-variant active:bg-surface-bright/10 touch-manipulation">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span className="font-label-sm text-label-sm">Profile</span>
</div>
</nav>

    </>
  );
}
