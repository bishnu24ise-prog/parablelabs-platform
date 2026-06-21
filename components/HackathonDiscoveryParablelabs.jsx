"use client";
import React from 'react';

export default function HackathonDiscoveryParablelabs() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
            --primary: #6C5CE7;
            --accent: #A8FF60;
            --bg: #0B0D12;
        }
        body {
            background-color: var(--bg);
            color: #e2e2e9;
            font-family: 'Inter', sans-serif;
        }
        .font-space { font-family: 'Space Grotesk', sans-serif; }
        .glass-card {
            background: rgba(22, 25, 34, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(12px);
        }
        .custom-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            background: var(--primary);
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid #fff;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary" style={{fontVariationSettings: '\'FILL\' 1'}}>terminal</span>
<span className="font-headline-md text-headline-md-mobile md:text-headline-md font-bold text-primary dark:text-primary-fixed tracking-tight">ParableLabs</span>
</div>
<div className="w-8 h-8 rounded-full bg-surface-container-highest border border-white/10 flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A professional headshot of a young tech innovator in a minimalist studio. The lighting is dramatic and moody with deep shadows and soft highlights in a premium dark-mode aesthetic. The color palette is strictly charcoal, black, and subtle hints of deep indigo, maintaining a sophisticated elite talent persona." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmtEzXOFblCSNhIc-Ri9JbHjoMqPcGkJ_O7KLPmJ4GIYXcJKJp9MHqWFlY-Pv8ffwPGp95NC9Gl7kuDm3_qQKn73S_FBVqS9o8xW95x678Gj-XjvXUFqooryRKFNJ2m1qP944a7N49BW56JCyL4KEGfQVGR07CVl5d0d_QDnZwSgEHVI7ONWH2nbdQDF0fdYjv3UuSqaDrNrBQUd4-WJOOq5EQYGJ40-_WFFsWMAeYtYWKLqlZhUrfmo8eU6kVqUet2cOwV222DA8"/>
</div>
</header>
<main className="pt-24 pb-32 px-margin-mobile">

<section className="mb-8">
<h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">Discover Hacks</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">Join the world's most elite talent competitions and build the future.</p>
</section>

<section className="mb-10 space-y-4">

<div className="flex flex-col gap-4">
<div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-xl border border-white/5 w-full">
<button className="flex-1 py-2 px-4 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md transition-all" id="toggle-online">Online</button>
<button className="flex-1 py-2 px-4 rounded-lg text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-all" id="toggle-offline">Offline</button>
</div>
<div className="relative group">
<select className="w-full appearance-none bg-surface-container-low border border-white/10 rounded-xl px-4 py-3 text-on-surface font-body-sm text-body-sm focus:ring-1 focus:ring-primary outline-none transition-all">
<option>All Domains</option>
<option>Artificial Intelligence</option>
<option>Web3 &amp; Crypto</option>
<option>FinTech</option>
<option>Climate Tech</option>
</select>
<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
</div>
</div>

<div className="bg-surface-container-low p-4 rounded-xl border border-white/5">
<div className="flex justify-between items-center mb-3">
<label className="font-label-md text-label-md text-on-surface-variant">Min Prize Pool</label>
<span className="text-secondary font-bold" id="prize-value">₹0</span>
</div>
<input className="w-full h-1 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary custom-slider" max="1000000" min="0" onInput={(e) => { try { document.getElementById('prize-value').innerText = '₹' + parseInt(e.currentTarget.value).toLocaleString() } catch(err) { console.error(err); } }} step="50000" type="range" value="0"/>
</div>
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Sort by</span>
<button className="flex items-center gap-1 text-primary font-label-md text-label-md">
                    Deadline soonest
                    <span className="material-symbols-outlined text-[18px]">sort</span>
</button>
</div>
</section>

<div className="grid grid-cols-1 gap-6">

<article className="glass-card rounded-2xl overflow-hidden group">
<div className="relative h-48 w-full">
<img className="w-full h-full object-cover" data-alt="A futuristic digital landscape illustrating advanced artificial intelligence, featuring glowing neural network nodes and crystalline geometric structures. The scene is set in a deep cosmic void with a rich color palette of deep blacks and electric indigo gradients. High-fidelity glassmorphism effects and soft light leaks create an atmosphere of technical innovation and elite performance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjqYZ3RGNsRROThy0xuPidVXtk1dELoc3WeneKnyRo0HzysdljO7Q9C-f6TLDco8NhU5fzWFI-4gbJLEcoLP4D06tOpG8j-5lEt70Be3YCXSe97mT0K2lup9Boa_UvUVwjQAdNVD9ZOqmPhJdV7p3JCJoxGDi3Z3inmDIMj_pnTPZTrSyQ3hpnb8TQ4Wlai_B6qnMOxeEIY9IpQvMFOd4JdYpLLE1MLvuGdZjzB1FZZ-KFplE4S2efXwOTq4uZhEe2tywk5o0XZgs"/>
<div className="absolute top-4 left-4 bg-error-container/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-white">schedule</span>
<span className="text-[11px] font-bold text-white uppercase tracking-tighter">Closes in 4 days</span>
</div>
</div>
<div className="p-5">
<div className="flex justify-between items-start mb-3">
<div className="space-y-1">
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">BuildAI Hackathon 2026</h3>
<div className="flex items-center gap-2">
<div className="w-5 h-5 rounded bg-surface-container-highest border border-white/10 flex items-center justify-center">
<span className="material-symbols-outlined text-[14px]">psychology</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">NVIDIA AI Research</span>
</div>
</div>
</div>
<div className="flex items-center justify-between mt-6">
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Prize Pool</span>
<span className="font-headline-md text-headline-md text-secondary">₹3,00,000</span>
</div>
<div className="flex -space-x-2">
<div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-highest">
<img className="w-full h-full rounded-full object-cover" data-alt="A close-up professional profile avatar of a talent. Minimalist lighting, dark background, and sharp focus on eyes. Style is modern SaaS, clean and high-energy." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiaW_nuCaaPK9dz3be305oxP-1D0wBAT2OBbtZIIHjDt-USrV8SNgLxT-VxDE59fURSEJH6JEy0hLz_H9Jd4IDGJ87Omx27w3hstO_HwvB9bw5rsy7VdARwlcZUtDERJKLXq85dCM148AoSBWQxfoXhaH4pTZNktyDXlqdGaOsz3uulHr_MzfQuPEpCxM-hE_54-eSS1EWXQG68crjwem5FjVP-f75DjRQbiYe9_LOqzcpdMpzBt7kIgwS2D3-GXsaQU09uIMHqbE"/>
</div>
<div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-highest">
<img className="w-full h-full rounded-full object-cover" data-alt="A tech leader portrait for a profile chip. High contrast, dark-mode first design, featuring cool indigo highlights. The image quality is high-fidelity and professional." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBENDTRNKZn7x-QM-etH3neihPU3tBCn2HescexniZrIkjS2JVdLpRs8WLHZYeuRFvPhmJFSqTZavSCBXOosxKh7NzDuu1AzMJh3tX4YOPp_zdJf550dB-BEm9OiJhYGRNbY2O2J4SpN3kap9xFXiFQIxrApSlpi9-AoZzQFpyV1xaQlXxwWHuOdBrAk0qB7NaMyh3PBRsceH-cLLEpKs42Hj2HVS-IEyPtUFJ9qNCnyetbQhyLk2Agn8K8Xgyy0OKHr1SlvjPe2hk"/>
</div>
<div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-low flex items-center justify-center">
<span className="text-[10px] font-bold text-on-surface-variant">+340</span>
</div>
</div>
</div>
<button className="w-full mt-6 py-4 bg-primary-container hover:bg-primary-container/90 text-on-primary-container font-headline-md text-headline-md rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2">
                        Register
                        <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</article>

<article className="glass-card rounded-2xl overflow-hidden group">
<div className="relative h-48 w-full">
<img className="w-full h-full object-cover" data-alt="Abstract visualization of blockchain protocols with shimmering interconnected hexagonal grids and flowing data streams. The aesthetic is deep focus dark-mode with neon lime green accents representing the flow of decentralized assets. Sleek, minimalist environment with high-contrast elements and professional tech-stack imagery." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhGL26HRYDxgO9JbH-qLi095QA2gVWYDKp9PJsX2VEOC8UgVojj866dtSVYzo59q5-UNFBa705Bllx2D_Ggs0jObXs-D5GPaYWWlL9sZ6cv_XLKdZFYIBYFCKfmMrrVFsbsBMHDNBENC1_AohV0qvLlUR1IwRF9_tAXutItGKHa3gsBvo9QI7fQN1bjOdx8NffTNSGf1wbTCNdhxOyUPKSEN_dQT19G-6-fCunttogg4X3fRRQs-4JS9QMxw4dm8vBCELUkR5mDz0"/>
<div className="absolute top-4 left-4 bg-surface-container-highest/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-on-surface">schedule</span>
<span className="text-[11px] font-bold text-on-surface uppercase tracking-tighter">Starts in 12 days</span>
</div>
</div>
<div className="p-5">
<div className="flex justify-between items-start mb-3">
<div className="space-y-1">
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">DeFi Protocol Jam</h3>
<div className="flex items-center gap-2">
<div className="w-5 h-5 rounded bg-surface-container-highest border border-white/10 flex items-center justify-center">
<span className="material-symbols-outlined text-[14px]">token</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Solana Foundation</span>
</div>
</div>
</div>
<div className="flex items-center justify-between mt-6">
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Prize Pool</span>
<span className="font-headline-md text-headline-md text-secondary">₹15,50,000</span>
</div>
<div className="flex -space-x-2">
<div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-highest">
<img className="w-full h-full rounded-full object-cover" data-alt="A sharp profile image of a young talent in a hoodie. Intense look, tech-noir lighting with electric indigo and dark charcoal tones. Perfect for a professional talent-first design system." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEQH9NWrDyyxfEi5OlXVuwW6WGY4vpKI-sHZjhX1hRzBxvsDypDGD2x338ktbg9FCUxbREdkHW6wbPh1hYXZRUQw7J9ZrDpL2PDzzZKGBs-7OER68lMSJbeN1sXghdVV8-eTz7-JSXt66-xHI3QGRHS5DI4xS_fvxuGS0A3bdg6pMjZoxzLvhqmj2HZ09m9QVq7Xb0HkQolXEBv46vb-pHOt4_XaQH5E_wZMgjKLBD7Q0sUghACspBorRIdRDgO3le1Cyi6vAOzbw"/>
</div>
<div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-low flex items-center justify-center">
<span className="text-[10px] font-bold text-on-surface-variant">+1.2k</span>
</div>
</div>
</div>
<button className="w-full mt-6 py-4 bg-primary-container hover:bg-primary-container/90 text-on-primary-container font-headline-md text-headline-md rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2">
                        Register
                        <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</article>

<article className="glass-card rounded-2xl overflow-hidden group">
<div className="relative h-48 w-full">
<img className="w-full h-full object-cover" data-alt="An artistic representation of renewable energy and sustainable tech, showing bioluminescent green leaves merging with complex computer circuit patterns. The style is modern minimalism with deep blacks, forest greens, and lime accents. Lighting is cinematic and focused, evoking a sense of urgency and environmental innovation for a talent hackathon." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB21a00qzxiALwbjyjHx3dFF0c0R0cCSrujSvnV50A9nWgx0e7yt2gxHYis-RCNLyi6jLnyVJ_Zd93iHdLH38aZ2AkKyCoYB1RW3H4peIJIQl259-Qv9comchzmccsDmmQCu48L2RzfS345YRaq2J-992L80d8pM6D8g5E19kRBeRZmQNkApEOeCE66wnE2gJiH3do1czTTmRMd0Yyv5Fa7hPpTmY0OK1CTNXsoI-7Dxi2dlRNOoMOJk7HXnnt_yCXmhrMlA0FVPI"/>
<div className="absolute top-4 left-4 bg-surface-container-highest/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-on-surface">event</span>
<span className="text-[11px] font-bold text-on-surface uppercase tracking-tighter">Registration Open</span>
</div>
</div>
<div className="p-5">
<div className="flex justify-between items-start mb-3">
<div className="space-y-1">
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">GreenCode Summit</h3>
<div className="flex items-center gap-2">
<div className="w-5 h-5 rounded bg-surface-container-highest border border-white/10 flex items-center justify-center">
<span className="material-symbols-outlined text-[14px]">eco</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Terraform Labs</span>
</div>
</div>
</div>
<div className="flex items-center justify-between mt-6">
<div>
<span className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Prize Pool</span>
<span className="font-headline-md text-headline-md text-secondary">₹5,00,000</span>
</div>
<div className="flex -space-x-2">
<div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-low flex items-center justify-center">
<span className="text-[10px] font-bold text-on-surface-variant">+890</span>
</div>
</div>
</div>
<button className="w-full mt-6 py-4 bg-primary-container hover:bg-primary-container/90 text-on-primary-container font-headline-md text-headline-md rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2">
                        Register
                        <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</article>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface/90 dark:bg-surface/90 backdrop-blur-lg border-t border-white/10 shadow-lg flex justify-around items-center h-16 px-4">
<a className="flex flex-col items-center justify-center text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10 rounded-xl py-1 px-4 transition-all" href="#">
<span className="material-symbols-outlined" style={{fontVariationSettings: '\'FILL\' 1'}}>explore</span>
<span className="font-label-sm text-label-sm">Explore</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant py-1 px-4 hover:bg-surface-container-high transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined">emoji_events</span>
<span className="font-label-sm text-label-sm">My Hacks</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant py-1 px-4 hover:bg-surface-container-high transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined">add_circle</span>
<span className="font-label-sm text-label-sm">Submit</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant py-1 px-4 hover:bg-surface-container-high transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-sm text-label-sm">Organize</span>
</a>
</nav>
    </>
  );
}
