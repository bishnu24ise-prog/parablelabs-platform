"use client";
import React from 'react';

export default function UserRoleManagementRbac() {
  return (
    <>
      
      <style dangerouslySetInnerHTML={{ __html: `
        body {
            background-color: #0B0D12;
            color: #e2e2e9;
            font-family: 'Inter', sans-serif;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .glass-panel {
            background: rgba(22, 25, 34, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #33353a;
            border-radius: 10px;
        }
        .active-pill {
            background: rgba(136, 220, 65, 0.1);
            color: #88dc41;
            border: 1px solid rgba(136, 220, 65, 0.2);
        }
        .suspended-pill {
            background: rgba(255, 180, 171, 0.1);
            color: #ffb4ab;
            border: 1px solid rgba(255, 180, 171, 0.2);
        }
        /* Bulk Action Bar Animation */
        #bulk-action-bar {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        }
        #bulk-action-bar.hidden {
            transform: translate(-50%, 100%);
            opacity: 0;
            display: flex !important;
            pointer-events: none;
        }
body {
      min-height: max(884px, 100dvh);
    }
      ` }} />
      
<header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 flex justify-between items-center px-gutter h-16 w-full">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary" data-icon="terminal">terminal</span>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary tracking-tight">ParableLabs Admin</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex items-center gap-6 mr-6">
<span className="text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer active:scale-95 font-label-md text-label-md">Docs</span>
<span className="text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer active:scale-95 font-label-md text-label-md">Support</span>
</div>
<div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center cursor-pointer overflow-hidden border border-outline-variant/20">
<img className="w-full h-full object-cover" data-alt="A professional headshot of a high-level system administrator, clean aesthetic, studio lighting, wearing a dark turtleneck against a neutral grey background, minimalist and technical atmosphere consistent with a premium SaaS platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVt8lVh7Sisc2NY82T_OABn8mZcIuYoCPdHZh1E-IG55O-kPZ7Ae14vbVKUiRR2-naSkiDKlgm2XAJRkpxmIjp1WrKm3BA9uixvyan1U9QkDvxZOVlQXR61bM5DImkwBqtWjJnWS6liyqydI5yyHV6kY41QKfLOvxURjMOPhti78iyRQuTzN7yjCvbOSbsqoxwqE9ejO-LVqj98MYLUG8sR6t986-Y9gmDad7Z79b1gM6NwCdALCTiQDYyo97sG6zM5H3C5iIXZYM"/>
</div>
</div>
</header>

<aside className="fixed left-0 top-0 h-full w-[260px] z-40 bg-surface-container dark:bg-surface-container border-r border-outline-variant/10 flex flex-col pt-20 pb-4 h-full hidden md:flex">
<div className="px-6 mb-8">
<h2 className="text-outline font-label-sm text-label-sm tracking-widest uppercase">SYSTEM OPS</h2>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-variant/50 duration-200 ease-in-out transition-all" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-label-md text-label-md">Dashboard</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 bg-primary/10 text-primary border-l-4 border-primary duration-200 ease-in-out transition-all" href="#">
<span className="material-symbols-outlined" data-icon="admin_panel_settings">admin_panel_settings</span>
<span className="font-label-md text-label-md">RBAC</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-variant/50 duration-200 ease-in-out transition-all" href="#">
<span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
<span className="font-label-md text-label-md">Audit Logs</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-variant/50 duration-200 ease-in-out transition-all" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-label-md text-label-md">System Settings</span>
</a>
</nav>
<div className="px-6 pt-4 border-t border-outline-variant/10">
<div className="bg-surface-container-high rounded-xl p-4 border border-outline-variant/20">
<div className="flex justify-between items-center mb-2">
<span className="text-label-sm font-label-sm text-outline">Cluster Health</span>
<span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(136,220,65,0.6)]"></span>
</div>
<div className="w-full bg-surface-container-highest rounded-full h-1">
<div className="bg-secondary h-1 rounded-full w-[94%]"></div>
</div>
</div>
</div>
</aside>

<main className="md:pl-[260px] pt-16 h-screen flex flex-col bg-background">

<div className="px-gutter pt-8 pb-6 space-y-6">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">User &amp; Role Management</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage global platform access, permissions, and entity status.</p>
</div>
<button className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all w-fit">
<span className="material-symbols-outlined" data-icon="person_add">person_add</span>
                    Invite User
                </button>
</div>

<div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center">
<div className="relative flex-1 w-full">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" data-icon="search">search</span>
<input className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary-container transition-all font-body-sm text-body-sm" placeholder="Search by name, email, or ID..." type="text"/>
</div>
<div className="flex items-center gap-3 w-full md:w-auto">
<div className="flex items-center gap-2 bg-surface-container-highest/50 px-3 py-1.5 rounded-full border border-outline-variant/20 cursor-pointer hover:bg-surface-container-highest transition-colors">
<span className="text-label-sm font-label-sm text-outline">Role:</span>
<span className="text-label-sm font-label-sm text-primary">All</span>
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="expand_more">expand_more</span>
</div>
<div className="flex items-center gap-2 bg-surface-container-highest/50 px-3 py-1.5 rounded-full border border-outline-variant/20 cursor-pointer hover:bg-surface-container-highest transition-colors">
<span className="text-label-sm font-label-sm text-outline">Status:</span>
<span className="text-label-sm font-label-sm text-primary">Active</span>
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="expand_more">expand_more</span>
</div>
<button className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface px-4 py-2 transition-colors">
<span className="material-symbols-outlined" data-icon="filter_list">filter_list</span>
<span className="text-label-md font-label-md">More Filters</span>
</button>
</div>
</div>
</div>

<div className="flex-1 px-gutter pb-8 overflow-hidden">
<div className="glass-panel rounded-xl h-full flex flex-col overflow-hidden">
<div className="overflow-x-auto custom-scrollbar">
<table className="w-full text-left border-collapse">
<thead className="sticky top-0 bg-surface-container-high/90 backdrop-blur-md z-10 border-b border-outline-variant/20">
<tr>
<th className="py-4 px-6 w-12">
<input className="w-4 h-4 rounded border-outline-variant bg-transparent text-primary-container focus:ring-primary-container" id="master-checkbox" type="checkbox"/>
</th>
<th className="py-4 px-6 font-label-md text-label-md text-outline">User Profile</th>
<th className="py-4 px-6 font-label-md text-label-md text-outline">Access Role</th>
<th className="py-4 px-6 font-label-md text-label-md text-outline">Account Status</th>
<th className="py-4 px-6 font-label-md text-label-md text-outline">Last Activity</th>
<th className="py-4 px-6 w-16"></th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/10" id="user-table-body">

<tr className="hover:bg-white/5 transition-colors group">
<td className="py-4 px-6">
<input className="user-checkbox w-4 h-4 rounded border-outline-variant bg-transparent text-primary-container focus:ring-primary-container" type="checkbox"/>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/20 flex-shrink-0 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A portrait of a software engineer, highly detailed skin texture, wearing professional gear, vibrant teal lighting, tech-focused background with blurred monitors, consistent with ParableLabs' high-fidelity SaaS aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFHCI0RtHs2D77yOf0BAUESjxAPh3RLbpKJDLcF3nWbC25LDCJqENLGo0s0OqpKnhzXE2SQhYIkakutNjv3DCjAb-fm117wUlatbiv7UXKlW5vq9qnWnRPHXcMzzIq6J3I2odm8l4meQa54cLhCSDhgp4dbe_RlCSag3AFo1fr7dh1p698b6ubsWLhR_ChqBrnhyiPtwGoEh_gYsfPkpYN1wvf5RSIRPkjt8O97SXm1l83nNuV62VCBqfNaDmr7WdVxPw4JvxmTvE"/>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface">Alex Rivera</p>
<p className="font-body-sm text-body-sm text-outline">arivera@parablelabs.io</p>
</div>
</div>
</td>
<td className="py-4 px-6">
<select className="bg-surface-container border-none text-label-md font-label-md text-on-surface-variant rounded focus:ring-1 focus:ring-primary-container py-1 px-2 cursor-pointer transition-all">
<option selected="" value="platform-admin">Platform Admin</option>
<option value="company-admin">Company Admin</option>
<option value="mentor">Mentor</option>
<option value="recruiter">Recruiter</option>
<option value="student">Student</option>
<option value="professional">Professional</option>
</select>
</td>
<td className="py-4 px-6">
<span className="active-pill px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider">Active</span>
</td>
<td className="py-4 px-6 font-body-sm text-body-sm text-on-surface-variant">
                                    2 mins ago
                                </td>
<td className="py-4 px-6 text-right">
<button className="text-outline hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-variant/50">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-white/5 transition-colors group">
<td className="py-4 px-6">
<input className="user-checkbox w-4 h-4 rounded border-outline-variant bg-transparent text-primary-container focus:ring-primary-container" type="checkbox"/>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/20 flex-shrink-0 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A portrait of a young female talent, smiling, clean studio lighting with soft indigo shadows, wearing modern spectacles, high-end digital aesthetic, professional tech-focused look." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhS3Hnj1K3hvq-wHGK2v4jRH14RCREDV8ncz0z_L5DGZLRSOMgAtSKjAoSY583rJHG86PXkubEtAR41VWzW_2GXO5udZtaf2kPfDRjWpuZvQ1BstMckx5yTzpzPii5myhm9oTGjREWgaHZjto4QFZs016c3UfoVSFAnE5vx27IkS689eEH5lLM3jB6SJL0f9txdlaoR55mYKAYBDboEhmbGtK7m2q2gVxOnEtBP7ZIkVkqXE6qGh7afp-nKtx8aPGGaW0wFWzBmXQ"/>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface">Elena Soros</p>
<p className="font-body-sm text-body-sm text-outline">e.soros@enterprise.com</p>
</div>
</div>
</td>
<td className="py-4 px-6">
<select className="bg-surface-container border-none text-label-md font-label-md text-on-surface-variant rounded focus:ring-1 focus:ring-primary-container py-1 px-2 cursor-pointer transition-all">
<option value="platform-admin">Platform Admin</option>
<option selected="" value="company-admin">Company Admin</option>
<option value="mentor">Mentor</option>
<option value="recruiter">Recruiter</option>
<option value="student">Student</option>
<option value="professional">Professional</option>
</select>
</td>
<td className="py-4 px-6">
<span className="active-pill px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider">Active</span>
</td>
<td className="py-4 px-6 font-body-sm text-body-sm text-on-surface-variant">
                                    14 hours ago
                                </td>
<td className="py-4 px-6 text-right">
<button className="text-outline hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-variant/50">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-white/5 transition-colors group">
<td className="py-4 px-6">
<input className="user-checkbox w-4 h-4 rounded border-outline-variant bg-transparent text-primary-container focus:ring-primary-container" type="checkbox"/>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/20 flex-shrink-0 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A portrait of a senior tech recruiter, diverse features, professional attire, lit with warm and cool dual-tone lighting, bokeh tech office background, extremely high resolution and professional quality." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa-9rRuAHQ9Gi3BM7tJbpNvQrUtqSj3MIHn14xywfEYlEOp8w01Bsv9tBWZlC3vM9sHWhqINSxcP2UYEwKdfQYOPjpXOOFqP6eKKeJblN27fDjTlMEh-XTdfq9nWAUtLRlQq6koO3hjazqDfwJwCy2xFSsl1q5PI2SHXvcOefCntPxP-f9qPEphTBiDj6vBdpx7Dx-0z2Wbkd4nzeL1IsARcgbgwjOsF9HaDqdy0QwesNqxJV-1A6emvi-ONjntIjc--K36j5wXSQ"/>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface">Marcus Thorne</p>
<p className="font-body-sm text-body-sm text-outline">m.thorne@talentlabs.net</p>
</div>
</div>
</td>
<td className="py-4 px-6">
<select className="bg-surface-container border-none text-label-md font-label-md text-on-surface-variant rounded focus:ring-1 focus:ring-primary-container py-1 px-2 cursor-pointer transition-all">
<option value="platform-admin">Platform Admin</option>
<option value="company-admin">Company Admin</option>
<option value="mentor">Mentor</option>
<option selected="" value="recruiter">Recruiter</option>
<option value="student">Student</option>
<option value="professional">Professional</option>
</select>
</td>
<td className="py-4 px-6">
<span className="suspended-pill px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider">Suspended</span>
</td>
<td className="py-4 px-6 font-body-sm text-body-sm text-on-surface-variant">
                                    3 days ago
                                </td>
<td className="py-4 px-6 text-right">
<button className="text-outline hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-variant/50">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-white/5 transition-colors group">
<td className="py-4 px-6">
<input className="user-checkbox w-4 h-4 rounded border-outline-variant bg-transparent text-primary-container focus:ring-primary-container" type="checkbox"/>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/20 flex-shrink-0 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A profile photo of a young male student, energetic expression, dark mode aesthetics, vibrant blue accent lighting from the side, modern hoodie, high-tech classroom setting in the background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA43deh-GjkHgT4SW3eY5EM3XBJfSNsBG6DScD2aVZbjHRr0pzTQ_oPKcWlTlIIfH470Y1euFsy8j6dg7LbdDRyhHum10z52gUIOhH13wjVzKlwdY0hS9LlIXBQRcMxJl2xYMN_ytkEoG61Mq7fkMKedRDGiF7Oo5HuOsa0CPHbjSQamvjGjT4S7MX9mDPW5U5-HsM_6hwFNZsTjFDu6giWt27KWVp4ww00w8n8k0eViVdPUHmpKIv1yGUkRs2gnXDyU-8gdi4S2kQ"/>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface">Chen Wei</p>
<p className="font-body-sm text-body-sm text-outline">chen.w@university.edu</p>
</div>
</div>
</td>
<td className="py-4 px-6">
<select className="bg-surface-container border-none text-label-md font-label-md text-on-surface-variant rounded focus:ring-1 focus:ring-primary-container py-1 px-2 cursor-pointer transition-all">
<option value="platform-admin">Platform Admin</option>
<option value="company-admin">Company Admin</option>
<option value="mentor">Mentor</option>
<option value="recruiter">Recruiter</option>
<option selected="" value="student">Student</option>
<option value="professional">Professional</option>
</select>
</td>
<td className="py-4 px-6">
<span className="active-pill px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider">Active</span>
</td>
<td className="py-4 px-6 font-body-sm text-body-sm text-on-surface-variant">
                                    5 mins ago
                                </td>
<td className="py-4 px-6 text-right">
<button className="text-outline hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-variant/50">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-4 border-t border-outline-variant/20 flex items-center justify-between mt-auto">
<p className="text-body-sm text-outline">Showing <span className="text-on-surface font-semibold">1-4</span> of 1,248 users</p>
<div className="flex items-center gap-2">
<button className="p-2 rounded-lg border border-outline-variant/20 hover:bg-surface-container-high transition-colors text-outline">
<span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm">1</button>
<button className="w-8 h-8 rounded-lg hover:bg-surface-container-high transition-colors font-label-sm text-label-sm">2</button>
<button className="w-8 h-8 rounded-lg hover:bg-surface-container-high transition-colors font-label-sm text-label-sm">3</button>
<span className="text-outline">...</span>
<button className="w-8 h-8 rounded-lg hover:bg-surface-container-high transition-colors font-label-sm text-label-sm">125</button>
<button className="p-2 rounded-lg border border-outline-variant/20 hover:bg-surface-container-high transition-colors text-outline">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</main>

<div className="hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1C1F2B] border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.4)] rounded-2xl px-6 py-4 flex items-center gap-8 glass-panel" id="bulk-action-bar">
<div className="flex items-center gap-3 pr-8 border-r border-outline-variant/20">
<div className="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center text-on-primary-container font-bold text-sm" id="selection-count">0</div>
<span className="text-on-surface font-label-md text-label-md">Users Selected</span>
</div>
<div className="flex items-center gap-4">
<button className="flex items-center gap-2 px-4 py-2 text-on-surface hover:bg-surface-variant/30 rounded-lg transition-all group">
<span className="material-symbols-outlined text-outline group-hover:text-primary" data-icon="sync_alt">sync_alt</span>
<span className="font-label-md text-label-md">Change Role</span>
</button>
<button className="flex items-center gap-2 px-4 py-2 text-error hover:bg-error/10 rounded-lg transition-all group">
<span className="material-symbols-outlined group-hover:text-error" data-icon="block">block</span>
<span className="font-label-md text-label-md">Suspend</span>
</button>
<button className="flex items-center gap-2 px-4 py-2 text-on-surface hover:bg-surface-variant/30 rounded-lg transition-all group">
<span className="material-symbols-outlined text-outline group-hover:text-secondary" data-icon="download">download</span>
<span className="font-label-md text-label-md">Export</span>
</button>
</div>
<div className="pl-4 border-l border-outline-variant/20">
<button className="text-outline hover:text-on-surface p-2 rounded-full hover:bg-surface-variant/30 transition-all" id="clear-selection">
<span className="material-symbols-outlined" data-icon="close">close</span>
</button>
</div>
</div>
    </>
  );
}
