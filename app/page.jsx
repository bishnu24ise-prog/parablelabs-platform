'use client';
import React, { useState } from 'react';

const categories = {
  "Dashboards": [
    {
      "name": "AiAgentsDashboardParablelabs",
      "title": "Ai Agents Dashboard Parablelabs",
      "category": "Dashboards"
    },
    {
      "name": "CompanyPortalParablelabs",
      "title": "Company Portal Parablelabs",
      "category": "Dashboards"
    },
    {
      "name": "ParablelabsDashboard",
      "title": "Parablelabs Dashboard",
      "category": "Dashboards"
    },
    {
      "name": "PlatformAdminDashboardParablelabs",
      "title": "Platform Admin Dashboard Parablelabs",
      "category": "Dashboards"
    },
    {
      "name": "RecruiterPortalParablelabs",
      "title": "Recruiter Portal Parablelabs",
      "category": "Dashboards"
    }
  ],
  "Assessments & Evaluations": [
    {
      "name": "AiEvaluationResultsParablelabs",
      "title": "Ai Evaluation Results Parablelabs",
      "category": "Assessments & Evaluations"
    },
    {
      "name": "AiEvaluations",
      "title": "Ai Evaluations",
      "category": "Assessments & Evaluations"
    },
    {
      "name": "AnanyaRaoRecruiterEvaluation",
      "title": "Ananya Rao Recruiter Evaluation",
      "category": "Assessments & Evaluations"
    }
  ],
  "Core Platform & Utilities": [
    {
      "name": "AnalyticsReportingParablelabs",
      "title": "Analytics Reporting Parablelabs",
      "category": "Core Platform & Utilities"
    },
    {
      "name": "AuditLogPlatformAdmin",
      "title": "Audit Log Platform Admin",
      "category": "Core Platform & Utilities"
    },
    {
      "name": "BadgesProgressParablelabs",
      "title": "Badges Progress Parablelabs",
      "category": "Core Platform & Utilities"
    },
    {
      "name": "CreateJobPostingParablelabs",
      "title": "Create Job Posting Parablelabs",
      "category": "Core Platform & Utilities"
    },
    {
      "name": "DailyChallengesFeedParablelabs",
      "title": "Daily Challenges Feed Parablelabs",
      "category": "Core Platform & Utilities"
    },
    {
      "name": "RewardsStoreParablelabs",
      "title": "Rewards Store Parablelabs",
      "category": "Core Platform & Utilities"
    },
    {
      "name": "SolveChallengeParablelabs",
      "title": "Solve Challenge Parablelabs",
      "category": "Core Platform & Utilities"
    },
    {
      "name": "UserRoleManagementRbac",
      "title": "User Role Management Rbac",
      "category": "Core Platform & Utilities"
    }
  ],
  "Talent & Profiles": [
    {
      "name": "AnanyaRaoParablelabsProfile",
      "title": "Ananya Rao Parablelabs Profile",
      "category": "Talent & Profiles"
    },
    {
      "name": "ApplicantPipelineParablelabs",
      "title": "Applicant Pipeline Parablelabs",
      "category": "Talent & Profiles"
    },
    {
      "name": "ApplicationTrackerParablelabs",
      "title": "Application Tracker Parablelabs",
      "category": "Talent & Profiles"
    },
    {
      "name": "TalentSearchRecruiterView",
      "title": "Talent Search Recruiter View",
      "category": "Talent & Profiles"
    },
    {
      "name": "TeamManagementParablelabs",
      "title": "Team Management Parablelabs",
      "category": "Talent & Profiles"
    },
    {
      "name": "TechnovaIncCompanyProfile",
      "title": "Technova Inc Company Profile",
      "category": "Talent & Profiles"
    }
  ],
  "Hackathons": [
    {
      "name": "BuildaiHackathon2026Detail",
      "title": "Buildai Hackathon2026 Detail",
      "category": "Hackathons"
    },
    {
      "name": "CreateHackathonJudgingCriteria",
      "title": "Create Hackathon Judging Criteria",
      "category": "Hackathons"
    },
    {
      "name": "GlobalLeaderboardParablelabs",
      "title": "Global Leaderboard Parablelabs",
      "category": "Hackathons"
    },
    {
      "name": "HackathonDiscoveryParablelabs",
      "title": "Hackathon Discovery Parablelabs",
      "category": "Hackathons"
    },
    {
      "name": "HackathonsExplorer",
      "title": "Hackathons Explorer",
      "category": "Hackathons"
    },
    {
      "name": "HackathonSponsorshipParablelabs",
      "title": "Hackathon Sponsorship Parablelabs",
      "category": "Hackathons"
    },
    {
      "name": "SubmitProjectParablelabs",
      "title": "Submit Project Parablelabs",
      "category": "Hackathons"
    },
    {
      "name": "TalentEcosystem",
      "title": "Talent Ecosystem",
      "category": "Hackathons"
    }
  ],
  "Marketplaces": [
    {
      "name": "FrontendInternReactTechnovaInc",
      "title": "Frontend Intern React Technova Inc",
      "category": "Marketplaces"
    },
    {
      "name": "InternshipMarketplaceParablelabs",
      "title": "Internship Marketplace Parablelabs",
      "category": "Marketplaces"
    },
    {
      "name": "ProjectDetailParablelabs",
      "title": "Project Detail Parablelabs",
      "category": "Marketplaces"
    },
    {
      "name": "ProjectMarketplaceParablelabs",
      "title": "Project Marketplace Parablelabs",
      "category": "Marketplaces"
    }
  ],
  "Authentication": [
    {
      "name": "LoginParablelabs",
      "title": "Login Parablelabs",
      "category": "Authentication"
    },
    {
      "name": "MfaVerificationParablelabs",
      "title": "Mfa Verification Parablelabs",
      "category": "Authentication"
    }
  ],
  "Onboarding": [
    {
      "name": "OnboardingAcademicParablelabs",
      "title": "Onboarding Academic Parablelabs",
      "category": "Onboarding"
    },
    {
      "name": "OnboardingInterestsParablelabs",
      "title": "Onboarding Interests Parablelabs",
      "category": "Onboarding"
    },
    {
      "name": "OnboardingSkillsParablelabs",
      "title": "Onboarding Skills Parablelabs",
      "category": "Onboarding"
    }
  ]
};

export default function NavigationHome() {
  const [activeCategory, setActiveCategory] = useState('All');
  const allCategories = ['All', ...Object.keys(categories)];

  const getFilteredRoutes = () => {
    if (activeCategory === 'All') {
      return Object.values(categories).flat();
    }
    return categories[activeCategory] || [];
  };

  return (
    <main className="min-h-screen bg-[#0B0D12] text-white font-sans selection:bg-[#6c5ce7]/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6c5ce7]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#88dc41]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-16 border-b border-white/5 pb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-lg bg-[#6c5ce7] flex items-center justify-center shadow-[0_0_15px_rgba(108,92,231,0.5)]">
              <span className="text-white text-xs font-bold font-mono">&lt;&gt;</span>
            </span>
            <span className="text-sm font-semibold tracking-widest text-[#88dc41] uppercase">Stitch UI Playground</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            ParableLabs Talent Platform
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Interactive route directory to preview all 39 design screens imported and converted from Stitch. Click on any card below to launch its full-viewport screen.
          </p>
        </header>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#6c5ce7] text-white shadow-lg shadow-[#6c5ce7]/20 border border-[#6c5ce7]'
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                activeCategory === cat ? 'bg-white/20 text-white' : 'bg-white/10 text-gray-500'
              }`}>
                {cat === 'All'
                  ? Object.values(categories).flat().length
                  : (categories[cat] || []).length
                }
              </span>
            </button>
          ))}
        </div>

        {/* Bento Grid Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredRoutes().map((route, i) => (
            <a
              key={route.name}
              href={`/${route.name}`}
              className="group relative bg-[#161922] border border-white/5 p-6 rounded-2xl transition-all duration-300 hover:border-[#6c5ce7]/30 hover:shadow-2xl hover:shadow-[#6c5ce7]/5 hover:-translate-y-1 overflow-hidden"
            >
              {/* Card Ambient Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#6c5ce7]/5 rounded-full blur-2xl group-hover:bg-[#6c5ce7]/10 transition-all duration-300"></div>

              <div className="flex justify-between items-start mb-4">
                <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/5 font-semibold">
                  {route.category}
                </span>
                <span className="text-[#88dc41] text-xs font-mono font-semibold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Launch View &rarr;
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white group-hover:text-[#6c5ce7] transition-colors mb-2">
                {route.title}
              </h3>
              <p className="text-sm text-gray-500 font-mono">
                /{route.name}
              </p>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-white/5 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2026 ParableLabs UI System. Constructed dynamically from Stitch Design Tokens.</p>
        </footer>
      </div>
    </main>
  );
}
