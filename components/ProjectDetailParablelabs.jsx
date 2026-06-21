"use client";
import React from 'react';

export default function ProjectDetailParablelabs() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-panel {
            background: rgba(22, 25, 34, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .sidebar-item-active {
            border-left: 4px solid #6C5CE7;
            background: rgba(108, 92, 231, 0.1);
        }
        body {
            background-color: #0B0D12;
            color: #e2e2e9;
            font-family: 'Inter', sans-serif;
        }
        .font-headline { font-family: 'Space Grotesk', sans-serif; }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/8 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary" data-icon="terminal">terminal</span>
<h1 className="font-headline-md text-headline-md font-bold text-primary">Parable Marketplace</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 mr-6">
<a className="text-primary font-medium hover:text-primary transition-colors" href="#">Browse Projects</a>
<a className="text-on-surface-variant hover:text-primary transition-colors" href="#">My Proposals</a>
</div>
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold overflow-hidden border border-white/10">
<img className="w-full h-full object-cover" data-alt="A professional close-up portrait of a tech-savvy freelancer in a modern office, wearing stylish glasses and a neutral expression. The lighting is moody with purple and green neon accents reflecting off their skin, fitting a premium talent marketplace aesthetic. The background is a blurred high-end workstation with multiple monitors displaying lines of code." src="https://lh3.googleusercontent.com/aida-public/AB6AXuADnoOblCOAN84a258cjty7AJknewE9vDZeXHe0yQg7TxGpeBGqS3eOppvsvF7lRWLXA5V_LOrtpsPn-pWDcUQuKDyQOmggygEWPzdXzBzlZ_6fatlt2dqS8nRhiGj6mnyq7IgxqFc9TOd4AMBEIHXmD26ZOj6Nx3YTJDtzRyD24I4cJNG3MGok88OvyKRBr9yVHOmsL7Yp95fQuSXFyEltevMH9n-3I3Z3aIpECXP36ivmyLLW0jx7RbXKLnQwSD1JYF_ORhti69o"/>
</div>
</div>
</header>
<div className="flex min-h-screen pt-16">

<aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-[260px] bg-surface-container border-r border-white/8 hidden lg:flex flex-col py-8">
<div className="px-6 mb-8">
<div className="flex items-center gap-3 mb-2">
<div className="w-12 h-12 rounded-lg bg-surface-variant border border-white/8 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A macro shot of a sleek talent workspace with a mechanical keyboard and a high-end mouse. The scene is lit by soft, focused indigo desk lamps, creating a professional and technical atmosphere. Low-contrast outlines define the hardware against the dark desk surface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3e3uJOs2Ibin5gxzUYKSEi4OM5t8wXn_y_qxKxhnO2texbWsa3sVAah8LgzpXQ7ChxLVhH5ZGo4WkcQeEpJHtMHC6PNSaiwT9NXlvJYWyvpOGMEKMPthnicKFy6c9h4KKYnvz-c-ovbLyHppoN3KX7GKtVxSkLV-Kz_RRn2ADh09ZzSU0dqeqJGQiBXbM8xTDjKiXQHcpLsh6YlDnCGO1c_QchOXKYiFv2fYfe6L4q3bXdUDevT4SKIS0yn2-bxrfzETdS08dffs"/>
</div>
<div>
<div className="text-label-md font-bold text-on-surface">Alex</div>
<div className="text-[12px] text-secondary">Top Rated • 98%</div>
</div>
</div>
<div className="text-[12px] text-on-surface-variant mt-1">$4.2k Earned</div>
</div>
<nav className="flex-1">
<div className="px-4 space-y-1">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 border-primary bg-primary/10 text-primary font-bold transition-all duration-200" href="#">
<span className="material-symbols-outlined" data-icon="explore">explore</span>
<span>Browse Projects</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-white/5 transition-all duration-200" href="#">
<span className="material-symbols-outlined" data-icon="description">description</span>
<span>My Proposals</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-white/5 transition-all duration-200" href="#">
<span className="material-symbols-outlined" data-icon="terminal">terminal</span>
<span>Active Projects</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-white/5 transition-all duration-200" href="#">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
<span>Payments</span>
</a>
</div>
</nav>
</aside>

<main className="flex-1 lg:ml-[260px] px-margin-mobile md:px-margin-desktop py-8 mb-20 lg:mb-0">
<div className="max-w-container-max mx-auto">

<button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 group">
<span className="material-symbols-outlined text-[20px] group-active:scale-90 transition-transform" data-icon="arrow_back">arrow_back</span>
<span className="font-label-md">Back to Projects</span>
</button>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

<div className="lg:col-span-8 space-y-8">
<section className="glass-panel p-6 md:p-8 rounded-xl">
<div className="flex justify-between items-start mb-6">
<h2 className="font-headline-lg text-headline-lg text-primary max-w-2xl">Build a Chrome Extension for Price Tracking</h2>
<span className="bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1 rounded-full text-label-sm font-bold">URGENT</span>
</div>
<div className="space-y-6">
<div>
<h3 className="text-on-surface font-bold text-label-md uppercase tracking-wider mb-3">Project Description</h3>
<p className="text-body-md text-on-surface-variant leading-relaxed">
                                        We need a robust Chrome extension that tracks price changes on major e-commerce platforms and notifies users via push notifications. The tool must be capable of scraping dynamic pricing data across multiple regions and stores efficiently. 
                                        &lt;br/&gt;&lt;br/&gt;
                                        The extension must be optimized for performance to ensure it doesn't slow down the user's browser experience. Key features include price history charts, desktop alerts, and a dashboard for managing tracked items.
                                    </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
<div className="flex items-center gap-3 p-3 bg-surface-container rounded-lg border border-white/5">
<span className="material-symbols-outlined text-primary" data-icon="language">language</span>
<span className="text-body-sm">JavaScript / TypeScript</span>
</div>
<div className="flex items-center gap-3 p-3 bg-surface-container rounded-lg border border-white/5">
<span className="material-symbols-outlined text-primary" data-icon="extension">extension</span>
<span className="text-body-sm">Manifest V3</span>
</div>
</div>

<div className="pt-6 border-t border-white/8">
<h3 className="text-on-surface font-bold text-label-md uppercase tracking-wider mb-4">Attachments</h3>
<div className="flex flex-wrap gap-3">
<div className="flex items-center gap-3 p-3 bg-surface-container hover:bg-surface-variant rounded-lg border border-white/10 cursor-pointer transition-all">
<span className="material-symbols-outlined text-error" data-icon="picture_as_pdf">picture_as_pdf</span>
<div>
<div className="text-body-sm font-semibold">Project_Spec_v1.pdf</div>
<div className="text-label-sm text-on-surface-variant">2.4 MB</div>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="glass-panel p-6 md:p-8 rounded-xl border-l-4 border-primary" id="proposal-form">
<h2 className="font-headline-md text-headline-md text-on-surface mb-6">Submit a Proposal</h2>
<form className="space-y-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<label className="block text-label-md text-on-surface-variant mb-2">Bid Amount (₹)</label>
<div className="relative">
<span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">₹</span>
<input className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg pl-10 pr-4 py-3 text-on-surface transition-all" placeholder="10,000" type="number"/>
</div>
</div>
<div>
<label className="block text-label-md text-on-surface-variant mb-2">Estimated Delivery (Days)</label>
<input className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg px-4 py-3 text-on-surface transition-all" placeholder="10" type="number"/>
</div>
</div>
<div>
<label className="block text-label-md text-on-surface-variant mb-2">Pitch Message</label>
<textarea className="w-full bg-surface-container border border-outline-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg px-4 py-3 text-on-surface transition-all" placeholder="Describe your experience with similar Chrome extensions..." rows="4"></textarea>
</div>
<div className="flex justify-end">
<button className="bg-primary-container hover:bg-primary-container/90 text-on-primary-container font-semibold px-8 py-3 rounded-lg shadow-lg active:scale-95 transition-all" type="submit">
                                        Submit Proposal
                                    </button>
</div>
</form>
</section>

<section className="space-y-4">
<h3 className="font-headline-md text-headline-md text-on-surface">Recent Proposals (6)</h3>
<div className="space-y-3">

<div className="glass-panel p-4 rounded-xl flex items-start gap-4 hover:border-primary/30 transition-all">
<div className="w-10 h-10 rounded-full bg-surface-variant flex-shrink-0 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A close-up profile picture of a digital nomad talent working from a tropical location. The lighting is warm and natural, with sunlight filtering through palm leaves, casting soft shadows. The overall aesthetic is high-fidelity and modern, representing the freedom and skill of top-tier AI talent in the Parable Labs ecosystem." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlQ8WqhnKWy1-SC1WQ2Msx8SqC7Be8t1oT2MyKnzhM78rKjJAqUM4foy_yrRBCUenv_YZBEVyTn4q_Eosm-fNCKXwP0uETVcf-stillsD8GeuEetNsGLH4rbPcVD9orOuF76oyPogky7enZJjN6_Nf-ZJROgnuGyGVpGdKoGOWpeRDVLkMoBR3LpHJw_CCASLGXnf19GILf6UPmw6wHepovKhb53POyms4QJp9oCy_6aGKskT1XGzRsCsvS7B1V4vGB7E15l2tltQ"/>
</div>
<div className="flex-1">
<div className="flex justify-between items-center mb-1">
<span className="font-bold text-on-surface">@codemaster_flex</span>
<span className="text-secondary font-bold text-label-md">₹9,500</span>
</div>
<p className="text-body-sm text-on-surface-variant line-clamp-1">I have built 5+ price trackers using Manifest V3 and Puppeteer. I can deliver this with a clean UI...</p>
</div>
</div>

<div className="glass-panel p-4 rounded-xl flex items-start gap-4 hover:border-primary/30 transition-all">
<div className="w-10 h-10 rounded-full bg-surface-variant flex-shrink-0 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="An abstract avatar representing a high-energy software engineer. The style is futuristic 3D render with glowing neon lines in lime green and indigo, symbolizing rapid prototyping and focus. The background is a clean, dark-mode gradient consistent with a premium SaaS platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEPda4isdCIrSGcP82F_UmJkAtXEqXrHBFYEB-R0ndNO0cn4VzPduadv4dvGZimcv5VCnS2iaVpd4doxcvHhssHNybiUoOuIVk-PgFRRsL19YM68qsDlo1jx4lWRFmhl6Fb2zFU2RR7KKCOra5ujy9vkpIYlPshO8wk2xKTWyP6R0RisE-Q8fw1EiQ74Lrd4En9M7_vxMH6kK6gkD2LIkI17bVXjacZlMSC5pSFzglHjAKtuS-8wYAm-WmvpN120C49f9nE4JSAd4"/>
</div>
<div className="flex-1">
<div className="flex justify-between items-center mb-1">
<span className="font-bold text-on-surface">@extension_wizard</span>
<span className="text-secondary font-bold text-label-md">₹11,000</span>
</div>
<p className="text-body-sm text-on-surface-variant line-clamp-1">Specialized in stealth scraping and low-latency notifications. Check my portfolio for the Amazon Tracker I made.</p>
</div>
</div>
</div>
</section>
</div>

<div className="lg:col-span-4 space-y-6">
<aside className="glass-panel p-6 rounded-xl sticky top-24">
<h3 className="text-label-md font-bold text-on-surface-variant uppercase mb-6 tracking-widest">Project Summary</h3>
<div className="space-y-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
</div>
<div>
<div className="text-headline-md font-bold text-on-surface">₹8,000 - ₹12,000</div>
<div className="text-label-sm text-on-surface-variant">Est. Budget</div>
</div>
</div>
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" data-icon="schedule">schedule</span>
</div>
<div>
<div className="text-headline-md font-bold text-on-surface">10 Days</div>
<div className="text-label-sm text-on-surface-variant">Timeline</div>
</div>
</div>
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center text-on-surface">
<span className="material-symbols-outlined" data-icon="group">group</span>
</div>
<div>
<div className="text-headline-md font-bold text-on-surface">6 Proposals</div>
<div className="text-label-sm text-on-surface-variant">Active Bids</div>
</div>
</div>
<div className="pt-6 border-t border-white/8">
<div className="text-label-sm text-on-surface-variant mb-3">Hackathon Progress</div>
<div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary w-2/3 shadow-[0_0_8px_rgba(168,255,96,0.5)]"></div>
</div>
<div className="flex justify-between mt-2">
<span className="text-[10px] font-bold text-secondary">PROJECT ACTIVE</span>
<span className="text-[10px] font-bold text-on-surface-variant">65% EXPIRED</span>
</div>
</div>
<button className="w-full py-4 bg-primary-container text-on-primary-container font-bold rounded-xl shadow-lg hover:shadow-primary-container/20 transition-all active:scale-[0.98]">
                                    Bid on this Project
                                </button>
</div>
</aside>

<div className="glass-panel p-6 rounded-xl">
<h3 className="text-label-md font-bold text-on-surface-variant uppercase mb-4 tracking-widest">About Client</h3>
<div className="flex items-center gap-3 mb-4">
<div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center font-bold text-primary">SC</div>
<div>
<div className="font-bold">SmartCart Labs</div>
<div className="text-label-sm text-on-surface-variant">Verified Employer</div>
</div>
</div>
<div className="flex items-center gap-2 text-secondary mb-4">
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '\'FILL\' 1'}}>star</span>
<span className="text-label-md font-bold">4.9 (24 Reviews)</span>
</div>
<p className="text-label-sm text-on-surface-variant leading-relaxed">
                                Innovative e-commerce solutions provider looking for elite talent.
                            </p>
</div>
</div>
</div>
</div>
</main>
</div>

<nav className="lg:hidden fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-md border-t border-white/8 flex justify-around items-center pt-2 pb-safe px-4 h-16">
<a className="flex flex-col items-center text-primary" href="#">
<span className="material-symbols-outlined" data-icon="search">search</span>
<span className="text-[10px] font-medium">Browse</span>
</a>
<a className="flex flex-col items-center text-on-surface-variant hover:text-primary transition-all active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="article">article</span>
<span className="text-[10px] font-medium">Proposals</span>
</a>
<a className="flex flex-col items-center text-on-surface-variant hover:text-primary transition-all active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="integration_instructions">integration_instructions</span>
<span className="text-[10px] font-medium">Projects</span>
</a>
<a className="flex flex-col items-center text-on-surface-variant hover:text-primary transition-all active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="account_balance_wallet">account_balance_wallet</span>
<span className="text-[10px] font-medium">Wallet</span>
</a>
</nav>

<div className="fixed inset-0 pointer-events-none -z-10 opacity-30">
<div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary-container/20 blur-[120px] rounded-full"></div>
<div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full"></div>
</div>
    </>
  );
}
