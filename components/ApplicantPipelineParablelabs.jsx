"use client";
import React from 'react';

export default function ApplicantPipelineParablelabs() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #111318;
            color: #e2e2e9;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .kanban-column {
            min-width: 280px;
            max-width: 320px;
        }
        .glass-card {
            background: #161922;
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .glass-card:hover {
            border-color: rgba(108, 92, 231, 0.4);
            transform: translateY(-2px);
        }
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: #33353a;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #474554;
        }
        /* Mobile High Density Scroll */
        @media (max-width: 1024px) {
            .kanban-container {
                padding-bottom: 80px;
            }
        }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<aside className="hidden lg:flex flex-col h-screen fixed left-0 top-0 z-40 w-[260px] bg-surface-container border-r border-outline-variant/10">
<div className="p-6">
<h1 className="font-headline-md text-headline-md font-bold text-primary">ParableLabs</h1>
</div>
<div className="px-4 py-4 flex items-center gap-3 mb-6">
<div className="w-10 h-10 rounded-full overflow-hidden bg-surface-variant">
<img className="w-full h-full object-cover" data-alt="A professional headshot of a modern technical recruiter with a friendly expression. The lighting is crisp and cinematic, with a soft cool-toned background that matches the ParableLabs dark aesthetic. The recruiter wears professional minimalist attire in a high-fidelity SaaS corporate environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGb9CVtQxQLfo-h65oM0i9F9uLSDOjBWXSbnOvurFDK-1hb-yV4TqYRGg_FUFA9Q7M8WZXYX0B5vb0lG28wocn7RcwNLuVI9mempulu6NYyBcA-rciW49nwyULlzdhMsa7q08M_E03p7Q2aEKEAOXP_DkvotYd4Si98I-vC0donBSjPpuxbD50sZN0MoI2kGEMQ6S8LmAo6Fd94Vde_DaH9n3mddQw472cZy-awr0zshENoP6zb4bMvFP6DFp_ZsYhcYIxHVs3vXA"/>
</div>
<div className="flex flex-col overflow-hidden">
<span className="font-body-md text-on-surface font-semibold truncate">Alex Rivers</span>
<span className="text-[12px] text-on-surface-variant truncate">Lead Technical Recruiter</span>
</div>
</div>
<nav className="flex-1 px-2 space-y-1">
<a className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-surface-variant/50 transition-colors rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-body-md">Dashboard</span>
</a>
<a className="flex items-center gap-3 bg-primary-container/20 text-primary border-l-4 border-primary px-4 py-3 rounded-r-lg" href="#">
<span className="material-symbols-outlined" data-icon="work" style={{fontVariationSettings: '\'FILL\' 1'}}>work</span>
<span className="font-body-md">Job Postings</span>
</a>
<a className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-surface-variant/50 transition-colors rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="person_search">person_search</span>
<span className="font-body-md">Talent Search</span>
</a>
<a className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-surface-variant/50 transition-colors rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-body-md">Settings</span>
</a>
</nav>
<div className="p-4 mt-auto">
<div className="bg-surface-variant/30 rounded-xl p-4 border border-outline-variant/10">
<div className="flex justify-between items-center mb-2">
<span className="text-[10px] font-bold uppercase tracking-wider text-secondary">AI Efficiency</span>
<span className="text-[10px] text-on-surface-variant">84%</span>
</div>
<div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
<div className="h-full bg-secondary-fixed w-[84%] shadow-[0_0_8px_rgba(168,255,96,0.4)]"></div>
</div>
</div>
</div>
</aside>

<header className="flex lg:hidden justify-between items-center w-full px-margin-mobile h-16 fixed top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary" data-icon="menu">menu</span>
<span className="font-headline-md text-headline-md font-bold text-primary">ParableLabs</span>
</div>
<div className="w-8 h-8 rounded-full overflow-hidden bg-surface-variant border border-primary/20">
<img className="w-full h-full object-cover" data-alt="Close-up portrait of Alex Rivers, a modern technical recruiter. High-end lighting on a dark UI-consistent background with vibrant accent colors reflecting off their face. Soft bokeh background of a high-tech office environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpKZmBUND5aQYyPwiy39Fn2aKgB045JcmZgcsam30sncKP-Fe_SKa5GrDYvvWzIHoCutlHDnpf_5ZcLB9ba41ELvfhhaptwHBPKXbP7qc-Sa2pJtlxLR93ClDhFIFhJiEs0kApEcMjMbw5-b7npHqZzjubsZG3yEaSn0nGtqAgXWr0m2pexo0LwYE1lL8dkM6nIvDuq6CC-fyF6HHOUMt6pzrE4iuKdMyblD0p-WIKgkqfOd_vz5wk_2gEWAqMbwHrV5k4SWkAO3k"/>
</div>
</header>

<main className="lg:ml-[260px] pt-16 lg:pt-0 min-h-screen">

<div className="px-4 lg:px-10 py-6 lg:py-10 border-b border-outline-variant/5 bg-surface-dim/40">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="text-secondary font-label-md text-label-md">Active Pipeline</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="text-on-surface-variant font-label-md text-label-md">Senior Frontend Engineer</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Talent Pipeline</h2>
</div>
<div className="flex items-center gap-3">
<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high border border-outline-variant/20 hover:bg-surface-variant transition-all text-on-surface font-label-md text-label-md">
<span className="material-symbols-outlined text-[18px]" data-icon="filter_list">filter_list</span>
                        Filter
                    </button>
<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary-container hover:opacity-90 transition-all font-label-md text-label-md shadow-lg shadow-primary-container/20">
<span className="material-symbols-outlined text-[18px]" data-icon="add">add</span>
                        Add Talent
                    </button>
</div>
</div>
</div>

<div className="p-4 lg:p-10 h-[calc(100vh-180px)] overflow-x-auto kanban-container">
<div className="flex gap-6 h-full pb-6">

<div className="kanban-column flex flex-col gap-4">
<div className="flex items-center justify-between px-2">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-widest">New</span>
<span className="bg-surface-container-high text-on-surface-variant text-[10px] px-2 py-0.5 rounded-full border border-outline-variant/20">12</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors" data-icon="more_horiz">more_horiz</span>
</div>
<div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">

<div className="glass-card p-4 rounded-xl flex flex-col gap-3 relative group">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant/10">
<img className="w-full h-full object-cover" data-alt="Portrait of a young diverse tech talent with glasses, smiling confidently against a minimal dark background. The lighting is clean, bright, and professional, emphasizing a modern SaaS aesthetic with subtle indigo tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtVgaEfWD66ogBkuFpvPQQbChiwYlOBAGuWv81b3CzfdSHdKL4HwreXy4_MTiNVMD4C5VYhII1cMxT-zc3dmbxmrZ-prVdlUAuHCTe-ILT92T09L9qrm2rbWB9TpHScL012btzXSrU2P4hrsxuZvjwrY0_lYZGhZv8Hk221v0t4tGYNO08JFPdavTQEknF3Zaa6YwoJhjzPWg-cZcTWfWvpCyYfIGAtH9XA_y6fn6Qf6Cbca2PQN0R-MxAwBvSuchhtaIcTZz6nlQ"/>
</div>
<div className="flex flex-col">
<h4 className="font-body-md text-on-surface font-semibold">Sarah Chen</h4>
<span className="text-[12px] text-on-surface-variant">Full Stack Engineer</span>
</div>
</div>
<div className="flex flex-col items-end gap-1">
<span className="bg-secondary-container/20 text-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded border border-secondary-container/30 uppercase">98% Match</span>
<div className="group/tip relative flex items-center">
<span className="material-symbols-outlined text-secondary text-[16px]" data-icon="verified" style={{fontVariationSettings: '\'FILL\' 1'}}>verified</span>
<div className="absolute bottom-full right-0 mb-2 w-40 p-2 bg-surface-container-highest text-on-surface text-[10px] rounded-lg opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none shadow-xl border border-outline-variant/20">
                                            AI-Recommended: Top 1% of talent based on skill-role alignment.
                                        </div>
</div>
</div>
</div>
<div className="flex flex-wrap gap-2 mt-1">
<span className="bg-surface-variant/50 text-on-surface-variant text-[10px] px-2 py-0.5 rounded">React</span>
<span className="bg-surface-variant/50 text-on-surface-variant text-[10px] px-2 py-0.5 rounded">Node.js</span>
<span className="bg-surface-variant/50 text-on-surface-variant text-[10px] px-2 py-0.5 rounded">AWS</span>
</div>
</div>

<div className="glass-card p-4 rounded-xl flex flex-col gap-3 relative">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant/10">
<img className="w-full h-full object-cover" data-alt="Portrait of a senior talent with a thoughtful expression. Neon lighting accents in purple and blue highlight the professional features. The aesthetic is dark mode, sleek, and focused on high-end tech talent representation." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtYanrJgKNck8iD0HB_zz45dLtEnahmnbAyRKwnZk330Vfv7008e26tFE9NRT36MgliVIWnn6mUI1I577MuA1Lij2tXY6cuzs7Nmn93Zj8gj8A2HWWGeJSoEQp_1kZm1r-HoXMB8RcCdC-avnbyOjTrAtGMU5Embc9eKzpVBTQlna4eY04PIqAPrhgCf67LP9MIblYxzcyeHRvtBV8vmqqJNEXy3UvwxjgD0j49XtJinV5aHQfkcsy6PKMYq2z_Hqdv9JBUeHOlpw"/>
</div>
<div className="flex flex-col">
<h4 className="font-body-md text-on-surface font-semibold">Marcus Thorne</h4>
<span className="text-[12px] text-on-surface-variant">System Architect</span>
</div>
</div>
<div className="flex flex-col items-end gap-1">
<span className="bg-surface-variant/40 text-on-surface-variant text-[10px] font-bold px-2 py-0.5 rounded border border-outline-variant/20 uppercase">82% Match</span>
</div>
</div>
<div className="flex flex-wrap gap-2 mt-1">
<span className="bg-surface-variant/50 text-on-surface-variant text-[10px] px-2 py-0.5 rounded">Kubernetes</span>
<span className="bg-surface-variant/50 text-on-surface-variant text-[10px] px-2 py-0.5 rounded">Go</span>
</div>
</div>
</div>
</div>

<div className="kanban-column flex flex-col gap-4">
<div className="flex items-center justify-between px-2">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-widest">Reviewed</span>
<span className="bg-surface-container-high text-on-surface-variant text-[10px] px-2 py-0.5 rounded-full border border-outline-variant/20">8</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="more_horiz">more_horiz</span>
</div>
<div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
<div className="glass-card p-4 rounded-xl flex flex-col gap-3 relative">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant/10">
<img className="w-full h-full object-cover" data-alt="Headshot of a creative UI/UX engineer in a modern setting. Vibrant secondary lighting in lime green against a dark architectural backdrop. The image conveys high intelligence and modern design sensibilities for a SaaS platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP60xXo852IZNkp6DqLD4rbjPCBxm6udLwqq4H29ICKxACkCnRT3mgNEN4cGwKXjSI7aMChX0WtFNP_Y5PiJ0ESgO8gOSU18c0E5uSOlCNsOmuoCDxNWR5HLJe9vfddtFk477XT58C7W--l0DR6JzfZk1wWEyw8gMsjB5SKcKPbX2rAI8vpJ_RNpMl_vOAEE_DyIQ8aZlLGC1ceVb6CtwNTYUXFVdyOyDFX3YJYcy0osFCN3TGWLGAlCRqjpQWV3bptubWwcp00kU"/>
</div>
<div className="flex flex-col">
<h4 className="font-body-md text-on-surface font-semibold">Elena Rodriguez</h4>
<span className="text-[12px] text-on-surface-variant">Frontend Lead</span>
</div>
</div>
<div className="flex flex-col items-end gap-1">
<span className="bg-secondary-container/20 text-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded border border-secondary-container/30 uppercase">94% Match</span>
<span className="material-symbols-outlined text-secondary text-[16px]" data-icon="verified" style={{fontVariationSettings: '\'FILL\' 1'}}>verified</span>
</div>
</div>
<div className="flex items-center gap-2 text-[11px] text-on-surface-variant mt-1">
<span className="material-symbols-outlined text-[14px]" data-icon="calendar_today">calendar_today</span>
<span>Reviewed 2h ago</span>
</div>
</div>
</div>
</div>

<div className="kanban-column flex flex-col gap-4">
<div className="flex items-center justify-between px-2">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-widest text-primary">Interview</span>
<span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full border border-primary/20">4</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="more_horiz">more_horiz</span>
</div>
<div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
<div className="glass-card p-4 rounded-xl flex flex-col gap-3 relative border-primary/20">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant/10">
<img className="w-full h-full object-cover" data-alt="Portrait of a talent focusing intently, minimalist studio background with subtle tech patterns. Deep blues and electric purples dominate the scene, showcasing a professional and innovative spirit." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWsOuAnJmHIr3ZShDXaLsfd9WVVjEcrdBJDr0a5iYDKjA-dZ0V86O_BP1pcujrY6QeEsumPckls8lNEo4biaJlf5f_5VKa7tk-BgXPHqpHhSX1FaP_iq6Aa2AIAUUd_0e2HajuwZ7AO1CQD71dGhx5ndl2wuv16G0i3-P36j8e3QfvY0ealvuzWAJnYUEecGI2qU7H6sfluLJx-NqoNpriTaotshCKAQ0FVZJuk_yacsSzbFFVsMYmiuNIw_9BtV1lJs4R2Am9PYg"/>
</div>
<div className="flex flex-col">
<h4 className="font-body-md text-on-surface font-semibold">Jordan Blake</h4>
<span className="text-[12px] text-on-surface-variant">Staff Engineer</span>
</div>
</div>
<div className="flex flex-col items-end gap-1">
<span className="bg-secondary-container/20 text-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded border border-secondary-container/30 uppercase">91% Match</span>
</div>
</div>
<div className="bg-primary/10 rounded-lg p-2 flex items-center justify-between">
<div className="flex items-center gap-2 text-[11px] text-primary">
<span className="material-symbols-outlined text-[14px]" data-icon="event">event</span>
<span>Tomorrow, 10:00 AM</span>
</div>
<span className="material-symbols-outlined text-primary text-[14px]" data-icon="videocam">videocam</span>
</div>
</div>
</div>
</div>

<div className="kanban-column flex flex-col gap-4">
<div className="flex items-center justify-between px-2">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-widest text-secondary">Offer</span>
<span className="bg-secondary/20 text-secondary text-[10px] px-2 py-0.5 rounded-full border border-secondary/20">2</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="more_horiz">more_horiz</span>
</div>
<div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
<div className="glass-card p-4 rounded-xl flex flex-col gap-3 relative border-secondary/20">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant/10">
<img className="w-full h-full object-cover" data-alt="Smiling software engineer in a vibrant, high-key lighting environment. Pure white and electric indigo color accents. The image is clean and modern, representing a successful and confident talent in the SaaS recruitment flow." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGMOiQo1mXeYt42rrDYuCdulrbOfGkCWdozOW5KxV5gX85BOmgGUQbJHdpm6ivqqFHeVesPug59sZJJpcyPSo82knsFxURFCHiCHfo_7qpECTKPy9bj2vabRWc9Sbyn2KJ8jwzGY7SXG8zTThZWseD5bNKN5sJH1bekSsqfdiFCmzpK166s1I2-mzzMHVN9De3n8exlLk2cCSbDelEhIQ9DJYxFgeJzkh26dkvkuW9CPd2W70j9S8RBo1eLgURzoNaAmMmGFiHGaw"/>
</div>
<div className="flex flex-col">
<h4 className="font-body-md text-on-surface font-semibold">Hiroshi Tanaka</h4>
<span className="text-[12px] text-on-surface-variant">Backend Specialist</span>
</div>
</div>
<div className="flex flex-col items-end gap-1">
<span className="bg-secondary-container/20 text-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded border border-secondary-container/30 uppercase">99% Match</span>
<span className="material-symbols-outlined text-secondary text-[16px]" data-icon="verified" style={{fontVariationSettings: '\'FILL\' 1'}}>verified</span>
</div>
</div>
<div className="flex items-center justify-between mt-1">
<span className="text-[10px] font-bold text-secondary uppercase">Pending Signature</span>
<span className="text-[10px] text-on-surface-variant">Sent 2 days ago</span>
</div>
</div>
</div>
</div>

<div className="kanban-column flex flex-col gap-4 opacity-70">
<div className="flex items-center justify-between px-2">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-widest text-error">Rejected</span>
<span className="bg-error/20 text-error text-[10px] px-2 py-0.5 rounded-full border border-error/20">142</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="more_horiz">more_horiz</span>
</div>
<div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
<div className="glass-card p-4 rounded-xl flex flex-col gap-3 relative grayscale hover:grayscale-0 transition-all">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant/10">
<img className="w-full h-full object-cover" data-alt="Portrait of a young tech professional with a neutral expression. High-contrast lighting with shadows in a dark, minimalist setting. Modern and clean aesthetic for recruitment software." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCALjeLlJf2FtP2sBJnC-tgd6O2DMPytob0UZh3EpivjxSdUQfh6x-b2P0A2J_vWE13HrXuzGjhEkC1Xjvd2U28_2hh4LUVNWiS-IVLaXJg6w3BPYljHP5VeLxk2mWjZDRX5WW7SGyag59KPgeW72lVXmXc_tyAZDIj27FmFukz8T_avAhb1qvUOMr50cwQdjkhvrYoSL_o0Jw7y4D01LQc1wis5OZZ9pOHYnTdG1ezgR8_cz4lAJo37jXnE7AESO6tINHrFkCpnvw"/>
</div>
<div className="flex flex-col">
<h4 className="font-body-md text-on-surface font-semibold">Toby Wright</h4>
<span className="text-[12px] text-on-surface-variant">Junior Talent</span>
</div>
</div>
<span className="text-error text-[10px] font-bold px-2 py-0.5 rounded border border-error/20 uppercase">Skill Gap</span>
</div>
</div>
</div>
</div>
</div>
</div>
</main>

<nav className="fixed lg:hidden bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface-container-high/90 backdrop-blur-lg border-t border-outline-variant/10 shadow-lg rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label-sm text-label-sm">Home</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1" href="#">
<span className="material-symbols-outlined" data-icon="group" style={{fontVariationSettings: '\'FILL\' 1'}}>group</span>
<span className="font-label-sm text-label-sm">Talent</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span className="material-symbols-outlined" data-icon="business_center">business_center</span>
<span className="font-label-sm text-label-sm">Jobs</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span className="material-symbols-outlined" data-icon="chat">chat</span>
<span className="font-label-sm text-label-sm">Messages</span>
</a>
</nav>

    </>
  );
}
