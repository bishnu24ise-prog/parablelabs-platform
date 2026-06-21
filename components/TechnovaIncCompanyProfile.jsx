"use client";
import React from 'react';

export default function TechnovaIncCompanyProfile() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
      body {
        background-color: #0B0D12;
        color: #e2e2e9;
        -webkit-font-smoothing: antialiased;
      }
      .glass-card {
        background: rgba(22, 25, 34, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(12px);
      }
      .active-tab-glow {
        box-shadow: 0 4px 20px -5px rgba(108, 92, 231, 0.4);
      }
      /* Custom Scrollbar */
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #33353a; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: #474554; }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<aside className="hidden lg:flex flex-col z-50 fixed h-screen w-[260px] left-0 top-0 border-r border-white/8 bg-surface-container-lowest/80 backdrop-blur-xl">
<div className="p-6 flex flex-col h-full">
<div className="mb-10">
<h1 className="font-headline-md text-headline-md font-bold text-primary">ParableLabs</h1>
<p className="text-on-surface-variant font-label-sm">Talent Hub</p>
</div>
<nav className="flex-1 space-y-2">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors duration-200 cursor-pointer active:scale-95" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-md">Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors duration-200 cursor-pointer active:scale-95" href="#">
<span className="material-symbols-outlined">event</span>
<span className="font-label-md">Events</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors duration-200 cursor-pointer active:scale-95" href="#">
<span className="material-symbols-outlined">code</span>
<span className="font-label-md">Assessments</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-primary bg-primary/10 border-l-4 border-primary transition-colors duration-200 cursor-pointer active:scale-95" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-label-md">Talent</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors duration-200 cursor-pointer active:scale-95" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-md">Settings</span>
</a>
</nav>
<div className="pt-6 border-t border-white/5">
<div className="flex items-center gap-3 px-2">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A professional studio portrait of a young tech professional with a friendly smile, clean minimalist lighting, wearing a dark navy sweatshirt, blurred high-tech workspace background, focused on head and shoulders, in the modern ParableLabs dark mode style with deep blues and purples." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfwB-GHOKSbHijy3rdQlMJSqsLzDrMpNAjf8EZSToO9YP5nd6aJTcfi_hPEQYxLSjddLpiG1suNMOCGWMRjYnoCI0sqXdPH6cQRyyD7tn3y5cBNonS9rZu0PSDaovaSun6znD1T0kCGc7tGToXGzATTbS8HwPqPyPKog7auEVyz1qhJvkUDbDJCJ9-norBMYFz8RSd58CGgAzicoslpluVJDz-3MqC59uDjlutCM4vzW6ty-ifjpRLu78chk3eGcVBCr3OrQf7a0Q"/>
</div>
<div>
<p className="font-label-md text-on-surface">Alex Rivera</p>
<p className="text-[10px] text-on-surface-variant uppercase tracking-wider">v1.0 Admin</p>
</div>
</div>
</div>
</div>
</aside>

<header className="lg:hidden flex justify-between items-center px-4 h-16 w-full fixed top-0 z-40 bg-surface-dim/80 backdrop-blur-lg border-b border-white/8">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">menu</span>
<span className="font-headline-md-mobile text-headline-md-mobile font-bold text-primary">ParableLabs</span>
</div>
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Close up avatar of a talent in a dark grey hoodie, soft violet ambient lighting, digital painting style, sharp focus, consistent with a high-end tech platform aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTQjHGy5SJu2nrZwnPL6_nNSSOXbK2NT-l5ToMxGoAskKAxCSBxOaIYNeh95d8Q8cUZ9UKEYbZE3Je2EY3F_lLVw4tVpwWR_MI8d__1cKlCPB6N9tPUjibcAemwjlBjM6RNQousRHhIQDRAoZy_DTnC6jCLplDOETk_42WR3ZMo9qEJY6SHxbsRzUR-6mGEpSeXkR7zGTPI9V8Vtw46CzAfJWeHXQb4y4a1yi21MzwMG46Yf1kwC9sopN_bDSGvlEkamEmXeuXu1w"/>
</div>
</header>

<main className="min-h-screen pt-16 lg:pt-0">
<div className="max-w-[1200px] mx-auto px-4 md:px-margin-desktop py-8 md:py-12">

<section className="relative mb-12">
<div className="absolute inset-0 -z-10 rounded-3xl overflow-hidden opacity-40">

</div>
<div className="glass-card rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
<div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
<div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-primary-container p-4 flex items-center justify-center shadow-2xl rotate-3">
<span className="material-symbols-outlined text-white text-5xl" style={{fontVariationSettings: '\'FILL\' 1'}}>account_balance</span>
</div>
<div className="space-y-4">
<div className="flex flex-wrap justify-center md:justify-start gap-3">
<span className="bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">FinTech</span>
<span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">120 Employees</span>
</div>
<h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tighter">TechNova Inc.</h2>
<p className="text-on-surface-variant max-w-lg font-body-md leading-relaxed">
                                Redefining the intersection of algorithmic trading and decentralized finance. Join us in building the next generation of global financial infrastructure.
                            </p>
</div>
</div>
<div className="flex justify-center">
<button className="bg-primary-container text-on-primary-container font-label-md px-8 py-4 rounded-xl flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-lg shadow-primary-container/20">
<span className="material-symbols-outlined">add</span>
                            Follow
                        </button>
</div>
</div>
</section>

<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter mb-16">
<div className="glass-card p-6 rounded-2xl flex items-center justify-between group hover:border-primary/30 transition-all">
<div>
<p className="text-on-surface-variant font-label-sm uppercase mb-1">Hackathons Hosted</p>
<h4 className="font-headline-lg text-headline-lg text-primary">4</h4>
</div>
<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">terminal</span>
</div>
</div>
<div className="glass-card p-6 rounded-2xl flex items-center justify-between group hover:border-secondary/30 transition-all">
<div>
<p className="text-on-surface-variant font-label-sm uppercase mb-1">Interns Hired</p>
<h4 className="font-headline-lg text-headline-lg text-secondary">17</h4>
</div>
<div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">person_add</span>
</div>
</div>
<div className="glass-card p-6 rounded-2xl flex items-center justify-between group hover:border-tertiary/30 transition-all sm:col-span-2 lg:col-span-1">
<div>
<p className="text-on-surface-variant font-label-sm uppercase mb-1">Avg Time-to-Hire</p>
<h4 className="font-headline-lg text-headline-lg text-tertiary">12 Days</h4>
</div>
<div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">timer</span>
</div>
</div>
</section>

<section className="mb-10">
<div className="flex items-center gap-8 border-b border-white/5 px-2">
<button className="pb-4 font-label-md text-primary border-b-2 border-primary relative">
                        Active Postings
                        <div className="absolute -bottom-[2px] left-0 w-full h-1 bg-primary blur-sm opacity-50"></div>
</button>
<button className="pb-4 font-label-md text-on-surface-variant hover:text-on-surface transition-colors">Hosted Hackathons</button>
<button className="pb-4 font-label-md text-on-surface-variant hover:text-on-surface transition-colors">Reviews</button>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

<div className="lg:col-span-7 space-y-6">
<h3 className="font-headline-md text-headline-md mb-6">Open Opportunities</h3>

<div className="glass-card p-6 rounded-2xl hover:bg-white/[0.04] cursor-pointer transition-all border-l-4 border-l-primary group">
<div className="flex justify-between items-start mb-4">
<div>
<h4 className="font-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">Senior AI Engineer</h4>
<div className="flex items-center gap-4 text-on-surface-variant text-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> New York / Remote</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">payments</span> $160k - $220k</span>
</div>
</div>
<span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">Hot</span>
</div>
<p className="text-on-surface-variant text-sm mb-4 line-clamp-2">
                            Build sophisticated neural networks for real-time market sentiment analysis and predictive liquidity modeling.
                        </p>
<div className="flex gap-2">
<span className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 uppercase">PyTorch</span>
<span className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 uppercase">FastAPI</span>
<span className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 uppercase">AWS</span>
</div>
</div>

<div className="glass-card p-6 rounded-2xl hover:bg-white/[0.04] cursor-pointer transition-all border-l-4 border-l-transparent group">
<div className="flex justify-between items-start mb-4">
<div>
<h4 className="font-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">Frontend Intern</h4>
<div className="flex items-center gap-4 text-on-surface-variant text-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> London / Hybrid</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">payments</span> £4k / month</span>
</div>
</div>
<span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">Seasonal</span>
</div>
<p className="text-on-surface-variant text-sm mb-4 line-clamp-2">
                            Help us design high-performance data visualizations for our flagship trading terminal using React and Three.js.
                        </p>
<div className="flex gap-2">
<span className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 uppercase">React</span>
<span className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 uppercase">Three.js</span>
<span className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 uppercase">Tailwind</span>
</div>
</div>
<button className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all text-sm font-label-md">
                        View all 14 active roles
                    </button>
</div>

<div className="lg:col-span-5 space-y-6">
<h3 className="font-headline-md text-headline-md mb-6">Talent Sentiment</h3>
<div className="glass-card p-8 rounded-3xl text-center">
<h5 className="text-5xl font-bold text-on-surface mb-2 tracking-tighter">4.8</h5>
<div className="flex justify-center gap-1 text-secondary mb-4">
<span className="material-symbols-outlined" style={{fontVariationSettings: '\'FILL\' 1'}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: '\'FILL\' 1'}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: '\'FILL\' 1'}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: '\'FILL\' 1'}}>star</span>
<span className="material-symbols-outlined" style={{fontVariationSettings: '\'FILL\' 1'}}>star_half</span>
</div>
<p className="text-on-surface-variant text-sm">Overall satisfaction rating from past interns and hackathon participants.</p>
</div>

<div className="bg-surface-container-low border border-white/5 p-6 rounded-2xl relative overflow-hidden">
<span className="material-symbols-outlined absolute -right-2 -top-2 text-primary/10 text-8xl rotate-12 select-none">format_quote</span>
<p className="text-on-surface italic mb-4 relative z-10 leading-relaxed font-body-md">
                            "Incredible mentorship and cutting-edge tech stack. I was pushing production code within my first week as an intern."
                        </p>
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Portrait of a young female software engineer, studio lighting, soft focus, high-quality digital photography, professional and focused expression, tech company aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyJgbHb8Of58K6PaEljpiPLTDXm3d3uEggZ7Ynw13VRlM-N5KTAr1sD2jCifXkRvdTFNY5AdljfUQLztQ0yjC1JsSBUjXeNCduRtwMIpsJE7E6TOr97panqF0JTUrlancqZ2T5RuVoTLJ6HRQbSuMwMecceeFtiJWVWEBnQMyeTaOtWgYjvzMeYKB_JwwrWMqvcExrE2oh-CRedRuReEf4miIYBzP8KAvn_QpWUi8OsbpumalGDGioMA7PD8T6Vk1V8eRSm4JLlaQ"/>
</div>
<div>
<p className="text-xs font-bold text-on-surface">Sarah Chen</p>
<p className="text-[10px] text-on-surface-variant">S23 Frontend Intern</p>
</div>
</div>
</div>

<div className="bg-surface-container-low border border-white/5 p-6 rounded-2xl relative overflow-hidden">
<span className="material-symbols-outlined absolute -right-2 -top-2 text-secondary/10 text-8xl rotate-12 select-none">format_quote</span>
<p className="text-on-surface italic mb-4 relative z-10 leading-relaxed font-body-md">
                            "The hackathon TechNova hosted was the most well-organized event I've attended. The problems were actually challenging and relevant."
                        </p>
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Close up of a creative technologist, soft blue and violet ambient light, realistic features, high-tech vibe, looking inspired." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNsjpgUO3Dk41py0RcDYJbXNX0f2veCK3t8DCaboYFX0HTXO0E5CF2aTk3Et-EwOayTes_loIzGw2NOJ_eMsyXJ8XQo4yPr6fb9cdnBinINCwjzb3zMtKggOdKFnEHHQg6AKCSbzh-RIkL-q2Z8vgnzJD_rGZRAyxP8ETSURJehcY94I-wVDuHxaQlfAADbIzerszf-0q52vKA2R-6yXHk1KdzoL1QNtHPnwPgOM3B6-pfsLxtbP6BM8bmOnC449RGATPv8KfYxDI"/>
</div>
<div>
<p className="text-xs font-bold text-on-surface">Jordan Mills</p>
<p className="text-[10px] text-on-surface-variant">HackCity Participant</p>
</div>
</div>
</div>
</div>
</div>
</div>
</main>

<nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 pb-safe bg-surface-container-low/90 backdrop-blur-md border-t border-white/8 shadow-xl">
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 duration-150 transition-colors">
<span className="material-symbols-outlined">home</span>
<span className="font-label-sm text-label-sm">Home</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 duration-150 transition-colors">
<span className="material-symbols-outlined">explore</span>
<span className="font-label-sm text-label-sm">Events</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 duration-150 transition-colors">
<span className="material-symbols-outlined">terminal</span>
<span className="font-label-sm text-label-sm">Code</span>
</div>
<div className="flex flex-col items-center justify-center text-secondary bg-secondary/10 rounded-xl px-3 py-1 active:scale-95 duration-150">
<span className="material-symbols-outlined">psychology</span>
<span className="font-label-sm text-label-sm">Team</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 duration-150 transition-colors">
<span className="material-symbols-outlined">person</span>
<span className="font-label-sm text-label-sm">Me</span>
</div>
</nav>

    </>
  );
}
