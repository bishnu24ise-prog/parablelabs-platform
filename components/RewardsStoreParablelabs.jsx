"use client";
import React from 'react';

export default function RewardsStoreParablelabs() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #0B0D12;
            color: #e2e2e9;
            font-family: 'Inter', sans-serif;
        }
        .glass-card {
            background: rgba(22, 25, 34, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(12px);
        }
        .text-glow-indigo {
            text-shadow: 0 0 10px rgba(108, 92, 231, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #111318;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #33353a;
            border-radius: 10px;
        }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16">
<div className="flex items-center gap-3">
<span className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold tracking-tighter text-primary">PARABLE LABS</span>
</div>
<div className="flex items-center gap-4">
<div className="flex items-center gap-2 bg-secondary-container/10 border border-secondary-container/20 px-3 py-1.5 rounded-full">
<span className="material-symbols-outlined text-secondary text-[20px]" style={{fontVariationSettings: '\'FILL\' 1'}}>monetization_on</span>
<span className="font-headline-md text-headline-md text-secondary tracking-tight">2,450 <span className="text-label-sm uppercase font-bold opacity-70">Coins</span></span>
</div>
<div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 hidden md:block">
<img className="w-full h-full object-cover" data-alt="A professional studio portrait of a modern software engineer in a high-tech environment. The lighting is dramatic and moody with deep shadows and soft purple rim light. The individual has a focused, confident expression, representing the elite talent persona of the ParableLabs brand. The background shows blurred server racks and digital displays." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFRTfzAbA7f7Y8Iz85KzhrHxF4vXOpyLWJn9TSSrWtm8AnIJOI3RY2EorW1kZ6Btkb4E0oa0NuPdoqy0QOJsNZAlBQu76jGyDd_WwtRzNr9CAnN1QIvOiRfog00eUPO9w7YoNAmSz0JJWGeCicttsosJBYOwZPINwZ_LLjA9JJQRurcgF05OqKMjcxvEhuzXQW9y7N99jIBKBe0ZU_fcLwrg_6zzHouVB1Xekv9yxaZH60yReU54tYOwtCFgAVxqMIvXe5fTL5DAs"/>
</div>
</div>
</header>

<aside className="hidden md:flex fixed left-0 top-0 h-full w-[260px] bg-surface-container border-r border-white/10 shadow-2xl flex-col py-8 gap-4 z-40 pt-20">
<div className="px-6 mb-6">
<div className="flex items-center gap-3 mb-2">
<div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-white">
<span className="material-symbols-outlined">terminal</span>
</div>
<div>
<h3 className="font-body-md text-body-md font-bold text-on-surface">Alex Rivera</h3>
<p className="text-[12px] text-on-surface-variant">Senior Architect • Level 42</p>
</div>
</div>
</div>
<nav className="flex flex-col gap-1 px-3">
<a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-white/5 transition-colors rounded-lg group" href="#">
<span className="material-symbols-outlined group-hover:text-primary">leaderboard</span>
<span className="font-body-md text-body-md">Leaderboard</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-white/5 transition-colors rounded-lg group" href="#">
<span className="material-symbols-outlined group-hover:text-primary">military_tech</span>
<span className="font-body-md text-body-md">Showcase</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 bg-primary/10 text-primary border-l-4 border-primary rounded-r-lg group" href="#">
<span className="material-symbols-outlined" style={{fontVariationSettings: '\'FILL\' 1'}}>shopping_cart</span>
<span className="font-body-md text-body-md font-bold">Rewards</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-white/5 transition-colors rounded-lg group" href="#">
<span className="material-symbols-outlined group-hover:text-primary">settings</span>
<span className="font-body-md text-body-md">Settings</span>
</a>
</nav>
</aside>

<main className="pt-24 pb-32 md:pb-12 px-margin-mobile md:px-margin-desktop md:ml-[260px] min-h-screen relative overflow-hidden">


<section className="max-w-container-max mx-auto relative z-10">

<div className="mb-12">
<h1 className="font-headline-xl text-headline-xl text-primary mb-2">Rewards Store</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Redeem your hard-earned coins for exclusive mentor sessions, professional reviews, and limited edition ParableLabs swag.</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

<div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 flex flex-col">
<div className="h-48 relative overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A clean, minimalist 3D render of a resume or document being analyzed by a high-tech digital magnifying glass. The scene is lit with cool blue and purple tones, echoing the ParableLabs dark mode aesthetic. Geometric line art and data particles float around the document, suggesting a thorough AI and human expert review process." src="https://lh3.googleusercontent.com/aida-public/AB6AXuChNXwNunRMlB9aCy0dgruSpVjk-kD0L54g9qfGzID9UnKDGipbCjUgtMCzOqZm8FvvSrs78XDPf_-5l42pwc_szeDOqu8gvqAMhq1FjPc419pp5m4vz60wE1TMHzpfcPpJvK9uvzNeqAFv98xXGBVma-3SwmDSEYW5s5Dfb4fo_J07S8sF6nQ8_eMp15KOBjvw7Icl7oiGP3g1Vo_3HdOQ-a4OaiJPkK_EtP6kAflfY9132llLjT-WOJB-gNbNR3CFAS8SRwb2xEg"/>
<div className="absolute top-4 right-4 bg-surface/90 backdrop-blur px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[16px]" style={{fontVariationSettings: '\'FILL\' 1'}}>monetization_on</span>
<span className="text-label-sm font-bold text-on-surface">500</span>
</div>
</div>
<div className="p-6 flex flex-col flex-grow">
<h3 className="font-headline-md text-headline-md text-on-surface mb-2">Resume Review Session</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6 flex-grow">A comprehensive feedback loop on your technical portfolio and CV by top-tier industry hiring managers.</p>
<button className="w-full py-3 px-4 bg-primary-container text-on-primary-container font-bold rounded-xl active:scale-95 transition-all hover:shadow-[0_0_20px_rgba(108,92,231,0.4)]">
                            Redeem
                        </button>
</div>
</div>

<div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 flex flex-col">
<div className="h-48 relative overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A high-tech digital illustration of two abstract human silhouettes connecting through a holographic interface. Vibrant indigo light pulses between the figures, representing knowledge transfer and mentorship. The background is a deep charcoal grey with subtle grid patterns, fitting the elite talent aesthetic of ParableLabs." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuGMBqB18hmS7-9QVDGjdAsGLmIzSaRSpLWra3WEpF8d99OtJUlnOspRyDWNhacIpxe6unqSStHCw0zrcveVhWlC1hWXgSm8ZzDAkOvOWWDuQBnAamQj3mzMPX7mbnkio97IF4LimqnjtybmIuoNp7AxnWGNWBFqxvk1KCq5YlX_bIH9YI8CywUrasFAbZehDMeMnSoyUWBOmT8gg97hgHhZ9lXtOEXHuUhoJFuG9Eh_cJnL4jkL9OV0x8bogrWMeJum444Br2Jjg"/>
<div className="absolute top-4 right-4 bg-surface/90 backdrop-blur px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[16px]" style={{fontVariationSettings: '\'FILL\' 1'}}>monetization_on</span>
<span className="text-label-sm font-bold text-on-surface">1,200</span>
</div>
</div>
<div className="p-6 flex flex-col flex-grow">
<h3 className="font-headline-md text-headline-md text-on-surface mb-2">1:1 Mentor Call</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6 flex-grow">30-minute private call with a Senior Architect from our partner network to discuss career growth or project architecture.</p>
<button className="w-full py-3 px-4 bg-primary-container text-on-primary-container font-bold rounded-xl active:scale-95 transition-all hover:shadow-[0_0_20px_rgba(108,92,231,0.4)]">
                            Redeem
                        </button>
</div>
</div>

<div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 flex flex-col border-white/5 opacity-90">
<div className="h-48 relative overflow-hidden grayscale-[0.5]">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A premium, cinematic product shot of a high-quality black heavyweight hoodie with a minimalist, glowing indigo ParableLabs logo on the chest. The hoodie is draped elegantly over a modern geometric pedestal in a dark, foggy studio environment. Soft cyan and purple light rays pierce through the haze, creating a sense of rarity and exclusivity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSVFJ7L57IpnjQ7fjSQW6hkdeV3Ld9BTH1mpCOw6Zd6WH1tdstCpLZL0-agmyRPHFt_Iy6iUY3GRaDwS7leElW1Y36wWNEbegm5rRlkLy2Z3jo2RZ5SLl5QIffH4omO73kJ61qCQcto_A9U8g6LOOHptDdjyg1X_hU38-fpVib-wm1tWU_u_5nXwFPkZNbCuwSlD4ffAUyt_ySa5xZ6g8B602dsnJQ4KUyKIlQ4y1f2PVMbPZVHLw6BNLLhEhQcp2DNF0JuVUYHeA"/>
<div className="absolute top-4 right-4 bg-error-container/20 backdrop-blur px-3 py-1 rounded-full border border-error/20 flex items-center gap-1.5">
<span className="material-symbols-outlined text-error text-[16px]" style={{fontVariationSettings: '\'FILL\' 1'}}>lock</span>
<span className="text-label-sm font-bold text-error">3,000</span>
</div>
</div>
<div className="p-6 flex flex-col flex-grow bg-white/5">
<div className="flex justify-between items-start mb-2">
<h3 className="font-headline-md text-headline-md text-on-surface">ParableLabs Hoodie</h3>
<span className="bg-error/10 text-error text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Locked</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6 flex-grow">Limited edition "Flow State" heavyweight hoodie. Made for long nights of focused building.</p>
<div className="space-y-3">
<div className="w-full bg-surface-container-highest rounded-full h-1.5">
<div className="bg-primary h-full rounded-full w-[81%] shadow-[0_0_8px_rgba(198,191,255,0.4)]"></div>
</div>
<p className="text-[11px] text-center text-on-surface-variant font-medium">81% reached • 550 coins more needed</p>
<button className="w-full py-3 px-4 bg-outline-variant/30 text-on-surface-variant font-bold rounded-xl cursor-not-allowed opacity-50 flex items-center justify-center gap-2" disabled>
<span className="material-symbols-outlined text-[18px]">lock</span>
                                Redeem
                            </button>
</div>
</div>
</div>

<div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 flex flex-col lg:col-span-2 lg:flex-row">
<div className="lg:w-1/2 h-48 lg:h-full relative overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A stunning macro shot of a physical metallic badge featuring the ParableLabs insignia. The metal has an iridescent finish that shifts between lime green and deep purple. It rests on a bed of dark carbon fiber texture. The image is crisp with high contrast and shallow depth of field, emphasizing the intricate craftsmanship of the physical reward." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUcfrZyA0x5bEVZtLwueq7FYIqgCEOjm79qze8kQ6puj2ljtUI0DA4KfDsE6pAs4pAlPLGvrKaWw57PCNo1JCrOkoDyif2jqOOv5X5DytxP5gTPy_es2WKEF-FniJYAD41gj6Cu8vi8aO8v53yFqozgUcoc0uhkW9q82xL3Hu4_0jk3mNDgromHIfifmz9dkIXy6bh6LVlQikYe_XPEDRoBrIZjONutBkDJu3-fQlus8VSMelEB3l-hyjP6sg10OGrZwLQUK6mTKM"/>
</div>
<div className="p-8 lg:w-1/2 flex flex-col justify-center">
<div className="flex items-center gap-2 mb-3">
<span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: '\'FILL\' 1'}}>workspace_premium</span>
<span className="text-secondary font-bold text-label-sm uppercase tracking-tighter">Contributor Perk</span>
</div>
<h3 className="font-headline-xl text-headline-lg text-on-surface mb-3">Founding Member Badge</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-8">A physical laser-etched metal badge and a unique digital NFT displayed prominently on your profile. Only available this season.</p>
<div className="flex items-center justify-between gap-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[24px]" style={{fontVariationSettings: '\'FILL\' 1'}}>monetization_on</span>
<span className="font-headline-md text-headline-md text-secondary tracking-tight">2,000</span>
</div>
<button className="flex-grow py-3 px-6 bg-secondary-container text-on-secondary-container font-bold rounded-xl active:scale-95 transition-all hover:brightness-110">
                                Redeem Now
                            </button>
</div>
</div>
</div>

<div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 flex flex-col">
<div className="h-48 relative overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A futuristic UI dashboard showing a 'System Access Granted' message in glowing green typography. The screen is filled with streaming lines of code and data visualization charts in a terminal-like environment. The mood is highly technical, secretive, and exciting, representing early access to cutting-edge AI tools." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjSCeG1iryEM5yXatp7UZWpSTKYX2fa5Ymv51UgFog9-oVQp99dPha4U4HW_c4c2ayGXKKvyxMzHBKd-TpX5i-7iPjWmrZoDa3mhAUSxevsDW45XjvH_TVlIMmkHXYIBJHRP9c7fMccBG6IlzB-tEC4xaNiaQzAynrLJx0SJUnwsKsqAuZnq5ezUF9XAsuOae2zlasLsn52I8zSjoy2lFneNjwCzwEtt2uxE_VuUZFSoTWd59aVkdrthq2zpS7D66qxtVuv-IvpsA"/>
<div className="absolute top-4 right-4 bg-surface/90 backdrop-blur px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[16px]" style={{fontVariationSettings: '\'FILL\' 1'}}>monetization_on</span>
<span className="text-label-sm font-bold text-on-surface">1,000</span>
</div>
</div>
<div className="p-6 flex flex-col flex-grow">
<h3 className="font-headline-md text-headline-md text-on-surface mb-2">Beta Feature Access</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-6 flex-grow">Get 1-month early access to our proprietary LLM orchestration engine and testing playground.</p>
<button className="w-full py-3 px-4 bg-primary-container text-on-primary-container font-bold rounded-xl active:scale-95 transition-all hover:shadow-[0_0_20px_rgba(108,92,231,0.4)]">
                            Redeem
                        </button>
</div>
</div>
</div>
</section>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-surface/90 dark:bg-surface/90 backdrop-blur-lg border-t border-white/10 h-16">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">emoji_events</span>
<span className="font-label-sm text-label-sm mt-1">Rank</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">workspace_premium</span>
<span className="font-label-sm text-label-sm mt-1">Badges</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container/20 text-secondary rounded-xl px-4 py-1" href="#">
<span className="material-symbols-outlined" style={{fontVariationSettings: '\'FILL\' 1'}}>storefront</span>
<span className="font-label-sm text-label-sm mt-1">Store</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label-sm text-label-sm mt-1">Profile</span>
</a>
</nav>

    </>
  );
}
