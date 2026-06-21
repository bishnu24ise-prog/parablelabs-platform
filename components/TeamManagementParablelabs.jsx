"use client";
import React from 'react';

export default function TeamManagementParablelabs() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #0B0D12;
            color: #e2e2e9;
            font-family: 'Inter', sans-serif;
        }
        .glass-panel {
            background: rgba(22, 25, 34, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
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
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-outline-variant/10 bg-surface-container/80 backdrop-blur-xl flex flex-col py-6 z-50">
<div className="px-6 mb-10">
<h1 className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary tracking-tight">Parable.</h1>
</div>
<nav className="flex-1 space-y-1">

<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-variant/50 transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-label-md text-label-md">Dashboard</span>
</a>

<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-variant/50 transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="rocket_launch">rocket_launch</span>
<span className="font-label-md text-label-md">Hackathons</span>
</a>

<a className="flex items-center gap-3 px-6 py-3 text-primary bg-primary-container/10 border-l-4 border-primary transition-all opacity-90 scale-[0.99]" href="#">
<span className="material-symbols-outlined" data-icon="group" style={{fontVariationSettings: '\'FILL\' 1'}}>group</span>
<span className="font-label-md text-label-md">Team Management</span>
</a>

<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-variant/50 transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="monitoring">monitoring</span>
<span className="font-label-md text-label-md">Analytics</span>
</a>

<a className="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:bg-surface-variant/50 transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-label-md text-label-md">Settings</span>
</a>
</nav>

<div className="px-6 pt-6 mt-auto border-t border-outline-variant/10">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
<img className="w-full h-full object-cover" data-alt="A professional headshot of a modern tech administrator with a focused expression. The lighting is dramatic with cool blue and purple highlights reflecting a high-end SaaS dark mode aesthetic. The background is a soft-focus office interior with minimalist decor, maintaining an elite talent-first atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQh3vBqo0Ps_rxq1woS9bX3KXPKdVx7xkCbO_YwJrtA9IqFIuWnvTWcWXspyzEl2fmm2ZhH1DBhbGfsHutv6kMm6DBEZSJp9H0X-Rq8jGh2cZWLXyLjkeavNzvRkyRusqEqjcBeGihJBIsQrfAVGBiQRm-ZGCJkwIbAlRN0WVx1gD6ZIgmu-uKAc54NdGQrHH3BOAiG-0BA9M5rhqSN7Mufsun3RSzAue8_8M2sW9YpSWMw24e7M6zEqrRARNqbo6ZOpImPJkbYg4"/>
</div>
<div>
<p className="font-label-md text-label-md font-bold text-on-surface">Parable Admin</p>
<p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Enterprise Tier</p>
</div>
</div>
<p className="mt-4 text-[10px] text-outline opacity-50">v2.4.0</p>
</div>
</aside>

<main className="flex-1 ml-[260px] relative h-screen overflow-y-auto custom-scrollbar bg-surface-container-lowest">

<header className="sticky top-0 right-0 w-full z-40 border-b border-outline-variant/10 backdrop-blur-md bg-surface/80 flex justify-between items-center px-margin-desktop h-20">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface cursor-pointer md:hidden" data-icon="menu">menu</span>
<h2 className="font-headline-md text-headline-md font-bold text-on-surface">Admin Command Center</h2>
</div>
<div className="flex items-center gap-6">
<button className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-label-md text-label-md font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary-container/20">
                    Create Hackathon
                </button>
</div>
</header>

<div className="p-margin-desktop space-y-gutter">

<div className="flex justify-between items-end">
<div>
<nav className="flex gap-2 text-[12px] text-outline mb-2">
<span className="hover:text-primary cursor-pointer transition-colors">Organization</span>
<span>/</span>
<span className="text-on-surface">Team Management</span>
</nav>
<h3 className="font-headline-lg text-headline-lg text-on-surface">Company Personnel</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage permissions, invite new recruiters, and monitor platform activity.</p>
</div>
<button className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-6 py-3 rounded-lg font-label-md text-label-md font-bold hover:brightness-110 active:scale-95 transition-all border border-secondary/20">
<span className="material-symbols-outlined" data-icon="person_add">person_add</span>
                    Invite teammate
                </button>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
<div className="glass-panel p-6 rounded-xl flex flex-col justify-between">
<p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Total Members</p>
<p className="font-headline-md text-headline-md text-on-surface mt-2">128</p>
</div>
<div className="glass-panel p-6 rounded-xl flex flex-col justify-between">
<p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Active Admins</p>
<p className="font-headline-md text-headline-md text-on-surface mt-2">14</p>
</div>
<div className="glass-panel p-6 rounded-xl flex flex-col justify-between">
<p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Pending Invites</p>
<div className="flex items-center gap-2">
<p className="font-headline-md text-headline-md text-secondary mt-2">8</p>
<span className="text-[10px] text-secondary bg-secondary/10 px-2 py-0.5 rounded mt-2">+2 today</span>
</div>
</div>
<div className="glass-panel p-6 rounded-xl flex flex-col justify-between">
<p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Security Health</p>
<p className="font-headline-md text-headline-md text-on-surface mt-2">98.4%</p>
</div>
</div>

<div className="glass-panel rounded-xl overflow-hidden">
<div className="p-6 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-high/40">
<div className="relative w-full max-w-md">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm" data-icon="search">search</span>
<input className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg py-2.5 pl-10 pr-4 font-body-sm text-body-sm focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all outline-none" placeholder="Search members by name or email..." type="text"/>
</div>
<div className="flex items-center gap-3">
<button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant/30 hover:bg-surface-variant/30 transition-all font-label-md text-label-md">
<span className="material-symbols-outlined" data-icon="filter_list">filter_list</span>
                            Filters
                        </button>
<button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant/30 hover:bg-surface-variant/30 transition-all font-label-md text-label-md">
<span className="material-symbols-outlined" data-icon="download">download</span>
                            Export
                        </button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low/50">
<th className="px-6 py-4 font-label-md text-label-md text-outline font-semibold uppercase tracking-wider">Name</th>
<th className="px-6 py-4 font-label-md text-label-md text-outline font-semibold uppercase tracking-wider">Role</th>
<th className="px-6 py-4 font-label-md text-label-md text-outline font-semibold uppercase tracking-wider">Email</th>
<th className="px-6 py-4 font-label-md text-label-md text-outline font-semibold uppercase tracking-wider">Permissions</th>
<th className="px-6 py-4 font-label-md text-label-md text-outline font-semibold uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/10">

<tr className="hover:bg-surface-variant/10 transition-colors group">
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center font-bold text-primary">AK</div>
<div>
<p className="font-label-md text-label-md font-bold text-on-surface">Alex Kasprow</p>
<p className="text-[12px] text-outline">Joined 2m ago</p>
</div>
</div>
</td>
<td className="px-6 py-5">
<span className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-tight">Admin</span>
</td>
<td className="px-6 py-5 font-body-sm text-body-sm text-on-surface-variant">alex.k@parablelabs.io</td>
<td className="px-6 py-5">
<select className="bg-surface-container border border-outline-variant/30 rounded-lg py-1.5 px-3 font-body-sm text-body-sm text-on-surface focus:border-primary-container focus:ring-0 outline-none w-48 cursor-pointer">
<option selected="" value="full">Full admin</option>
<option value="jobs">Can post jobs</option>
<option value="analytics">Can view analytics</option>
</select>
</td>
<td className="px-6 py-5 text-right">
<button className="material-symbols-outlined text-outline hover:text-error transition-colors" data-icon="more_vert">more_vert</button>
</td>
</tr>

<tr className="hover:bg-surface-variant/10 transition-colors group">
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center font-bold text-secondary">SL</div>
<div>
<p className="font-label-md text-label-md font-bold text-on-surface">Sarah Lopez</p>
<p className="text-[12px] text-outline">Joined 5m ago</p>
</div>
</div>
</td>
<td className="px-6 py-5">
<span className="bg-secondary/10 text-secondary border border-secondary/20 px-2.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-tight">Recruiter</span>
</td>
<td className="px-6 py-5 font-body-sm text-body-sm text-on-surface-variant">s.lopez@recruit.net</td>
<td className="px-6 py-5">
<select className="bg-surface-container border border-outline-variant/30 rounded-lg py-1.5 px-3 font-body-sm text-body-sm text-on-surface focus:border-primary-container focus:ring-0 outline-none w-48 cursor-pointer">
<option value="full">Full admin</option>
<option selected="" value="jobs">Can post jobs</option>
<option value="analytics">Can view analytics</option>
</select>
</td>
<td className="px-6 py-5 text-right">
<button className="material-symbols-outlined text-outline hover:text-error transition-colors" data-icon="more_vert">more_vert</button>
</td>
</tr>

<tr className="hover:bg-surface-variant/10 transition-colors group">
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center font-bold text-tertiary">JD</div>
<div>
<p className="font-label-md text-label-md font-bold text-on-surface">Jordan Dax</p>
<p className="text-[12px] text-outline">Joined 1y ago</p>
</div>
</div>
</td>
<td className="px-6 py-5">
<span className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-tight">Admin</span>
</td>
<td className="px-6 py-5 font-body-sm text-body-sm text-on-surface-variant">jordan@dax.studio</td>
<td className="px-6 py-5">
<select className="bg-surface-container border border-outline-variant/30 rounded-lg py-1.5 px-3 font-body-sm text-body-sm text-on-surface focus:border-primary-container focus:ring-0 outline-none w-48 cursor-pointer">
<option value="full">Full admin</option>
<option value="jobs">Can post jobs</option>
<option selected="" value="analytics">Can view analytics</option>
</select>
</td>
<td className="px-6 py-5 text-right">
<button className="material-symbols-outlined text-outline hover:text-error transition-colors" data-icon="more_vert">more_vert</button>
</td>
</tr>

<tr className="hover:bg-surface-variant/10 transition-colors group">
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-on-surface-variant/20 flex items-center justify-center font-bold text-on-surface">MI</div>
<div>
<p className="font-label-md text-label-md font-bold text-on-surface">Marcus Ito</p>
<p className="text-[12px] text-outline">Joined 3d ago</p>
</div>
</div>
</td>
<td className="px-6 py-5">
<span className="bg-secondary/10 text-secondary border border-secondary/20 px-2.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-tight">Recruiter</span>
</td>
<td className="px-6 py-5 font-body-sm text-body-sm text-on-surface-variant">mito@agency.co</td>
<td className="px-6 py-5">
<select className="bg-surface-container border border-outline-variant/30 rounded-lg py-1.5 px-3 font-body-sm text-body-sm text-on-surface focus:border-primary-container focus:ring-0 outline-none w-48 cursor-pointer">
<option value="full">Full admin</option>
<option value="jobs">Can post jobs</option>
<option value="analytics">Can view analytics</option>
</select>
</td>
<td className="px-6 py-5 text-right">
<button className="material-symbols-outlined text-outline hover:text-error transition-colors" data-icon="more_vert">more_vert</button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="px-6 py-4 flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-high/20">
<p className="font-body-sm text-body-sm text-outline">Showing 4 of 128 members</p>
<div className="flex items-center gap-2">
<button className="p-2 rounded hover:bg-surface-variant disabled:opacity-30" disabled>
<span className="material-symbols-outlined text-xl" data-icon="chevron_left">chevron_left</span>
</button>
<button className="w-8 h-8 rounded bg-primary text-on-primary font-bold text-sm">1</button>
<button className="w-8 h-8 rounded hover:bg-surface-variant text-sm">2</button>
<button className="w-8 h-8 rounded hover:bg-surface-variant text-sm">3</button>
<button className="p-2 rounded hover:bg-surface-variant">
<span className="material-symbols-outlined text-xl" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
<div className="lg:col-span-2 glass-panel p-8 rounded-xl relative overflow-hidden">

<div className="relative z-10">
<h4 className="font-headline-md text-headline-md text-on-surface mb-4">Activity Insights</h4>
<div className="h-48 w-full bg-surface-container-low/50 rounded-lg border border-outline-variant/10 flex items-center justify-center">

<div className="flex items-end gap-3 h-32 w-full px-8">
<div className="w-full bg-primary/20 h-[30%] rounded-t-sm border-t border-primary animate-pulse"></div>
<div className="w-full bg-primary/20 h-[50%] rounded-t-sm border-t border-primary"></div>
<div className="w-full bg-primary/20 h-[40%] rounded-t-sm border-t border-primary animate-pulse" style={{animationDelay: '200ms'}}></div>
<div className="w-full bg-primary/20 h-[80%] rounded-t-sm border-t border-primary"></div>
<div className="w-full bg-primary/20 h-[60%] rounded-t-sm border-t border-primary animate-pulse" style={{animationDelay: '400ms'}}></div>
<div className="w-full bg-primary/20 h-[90%] rounded-t-sm border-t border-primary"></div>
<div className="w-full bg-primary/20 h-[45%] rounded-t-sm border-t border-primary"></div>
</div>
</div>
<div className="flex justify-between mt-4">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-primary"></div>
<span className="text-xs text-outline">Member Login Activity</span>
</div>
<span className="text-xs text-primary font-bold">Trend: +12% since yesterday</span>
</div>
</div>
</div>
<div className="glass-panel p-6 rounded-xl flex flex-col h-full">
<h4 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-widest mb-6">Security Logs</h4>
<div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
<div className="flex gap-4">
<div className="mt-1">
<div className="w-2 h-2 rounded-full bg-secondary"></div>
</div>
<div>
<p className="font-body-sm text-body-sm font-bold text-on-surface">Admin Access Granted</p>
<p className="text-xs text-outline">Sarah Lopez updated permissions for Marcus Ito.</p>
<p className="text-[10px] text-outline opacity-60 mt-1">14:02 PM • UTC-5</p>
</div>
</div>
<div className="flex gap-4">
<div className="mt-1">
<div className="w-2 h-2 rounded-full bg-error"></div>
</div>
<div>
<p className="font-body-sm text-body-sm font-bold text-on-surface">Failed Login Attempt</p>
<p className="text-xs text-outline">IP: 192.168.1.1 (San Francisco, CA)</p>
<p className="text-[10px] text-outline opacity-60 mt-1">11:45 AM • UTC-5</p>
</div>
</div>
<div className="flex gap-4">
<div className="mt-1">
<div className="w-2 h-2 rounded-full bg-primary"></div>
</div>
<div>
<p className="font-body-sm text-body-sm font-bold text-on-surface">New Invite Sent</p>
<p className="text-xs text-outline">Alex Kasprow invited r.weaver@gmail.com</p>
<p className="text-[10px] text-outline opacity-60 mt-1">09:12 AM • UTC-5</p>
</div>
</div>
</div>
<button className="mt-6 w-full py-2.5 rounded-lg bg-surface-container-highest/50 border border-outline-variant/30 text-[12px] font-bold text-on-surface hover:bg-surface-variant transition-all">
                        View Audit Vault
                    </button>
</div>
</div>
</div>
</main>
    </>
  );
}
