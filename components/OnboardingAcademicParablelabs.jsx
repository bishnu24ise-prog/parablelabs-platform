"use client";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingAcademicParablelabs() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [role, setRole] = useState('student');
  const [university, setUniversity] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [company, setCompany] = useState('');
  const [experience, setExperience] = useState('');
  const [resumeName, setResumeName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skipped: true })
      });
      if (!res.ok) {
        throw new Error('Failed to skip onboarding.');
      }
      router.push('/ParablelabsDashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = role === 'student' 
      ? { university, gradYear, resumeName } 
      : { company, experience, resumeName };

    try {
      const res = await fetch('/api/auth/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Onboarding failed.');
      }

      router.push('/ParablelabsDashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
            background: rgba(22, 25, 34, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .progress-dot {
            width: 8px;
            height: 8px;
            border-radius: 9999px;
            transition: all 0.3s ease;
        }
        .progress-dot.active {
            background-color: #6C5CE7;
            width: 24px;
            box-shadow: 0 0 10px rgba(108, 92, 231, 0.5);
        }
        .progress-dot.inactive {
            background-color: #33353a;
        }
        .progress-dot.complete {
            background-color: #88dc41;
        }
        body {
            background-color: #0B0D12;
            color: #e2e2e9;
        }
        input:focus, select:focus {
            outline: none;
            border-color: #6C5CE7 !important;
            box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
        }
        .dropzone:hover {
            border-color: #6C5CE7;
            background: rgba(108, 92, 231, 0.05);
        }
        body {
            min-height: max(884px, 100dvh);
        }
      ` }} />
      
      {/* Top AppBar (Simplified for Onboarding) */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold text-headline-md font-headline-md tracking-tight">ParableLabs</span>
        </div>
        <div className="hidden md:block">
          <span className="text-on-surface-variant text-label-md font-label-md">Step 2 of 3</span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-24 relative overflow-hidden">
        {/* Ambient Background Decoration */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="w-full max-w-xl">
          {/* Progress Indicator */}
          <div className="flex justify-center gap-3 mb-10">
            <div className="progress-dot complete"></div>
            <div className="progress-dot active"></div>
            <div className="progress-dot inactive"></div>
          </div>
          
          {/* Content Card */}
          <div className="glass-card rounded-xl p-8 md:p-10 shadow-2xl">
            <div className="mb-8">
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
                {role === 'student' ? 'Academic Profile' : 'Professional Profile'}
              </h1>
              <p className="text-on-surface-variant text-body-md opacity-80">
                {role === 'student' 
                  ? 'Tell us about your educational background to unlock relevant hackathons and roles.'
                  : 'Tell us about your professional background to unlock matching opportunities.'}
              </p>
            </div>

            {/* Role Switcher */}
            <div className="mb-6">
              <label className="block text-label-sm font-label-sm text-on-surface-variant mb-2 uppercase tracking-wider">Select Onboarding Path</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold border transition-all text-sm cursor-pointer ${
                    role === 'student'
                      ? 'bg-[#6C5CE7] border-[#6C5CE7] text-white shadow-lg shadow-[#6c5ce7]/20'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('professional')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold border transition-all text-sm cursor-pointer ${
                    role === 'professional'
                      ? 'bg-[#6C5CE7] border-[#6C5CE7] text-white shadow-lg shadow-[#6c5ce7]/20'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Professional
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 mb-6 rounded-lg text-sm border bg-error-container/10 border-error-container/20 text-error flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">error</span>
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-6" id="onboarding-form" onSubmit={handleSubmit}>
              {role === 'student' ? (
                <>
                  {/* College Name */}
                  <div className="space-y-2">
                    <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="university">College/University Name</label>
                    <input 
                      className="w-full bg-[#161922] border border-white/10 rounded-lg px-4 py-3 text-on-surface transition-all placeholder:text-white/20" 
                      id="university" 
                      placeholder="e.g. Stanford University" 
                      type="text"
                      required
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                    />
                  </div>
                  {/* Graduation Year */}
                  <div className="space-y-2">
                    <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="grad-year">Graduation Year</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-[#161922] border border-white/10 rounded-lg px-4 py-3 text-on-surface transition-all appearance-none cursor-pointer" 
                        id="grad-year"
                        required
                        value={gradYear}
                        onChange={(e) => setGradYear(e.target.value)}
                      >
                        <option value="" disabled>Select year</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028+</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="company">Current/Last Company Name</label>
                    <input 
                      className="w-full bg-[#161922] border border-white/10 rounded-lg px-4 py-3 text-on-surface transition-all placeholder:text-white/20" 
                      id="company" 
                      placeholder="e.g. Google" 
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  {/* Years of Experience */}
                  <div className="space-y-2">
                    <label className="block text-label-md font-label-md text-on-surface-variant" htmlFor="experience">Years of Experience</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-[#161922] border border-white/10 rounded-lg px-4 py-3 text-on-surface transition-all appearance-none cursor-pointer" 
                        id="experience"
                        required
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      >
                        <option value="" disabled>Select experience</option>
                        <option value="1-2">1-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Resume Upload Dropzone */}
              <div className="space-y-2">
                <label className="block text-label-md font-label-md text-on-surface-variant">Resume (PDF)</label>
                <div 
                  className="dropzone cursor-pointer border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center transition-all group" 
                  id="dropzone"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    ref={fileInputRef}
                    accept=".pdf" 
                    className="hidden" 
                    id="resume-input" 
                    type="file"
                    onChange={handleFileChange}
                  />
                  {!resumeName ? (
                    <>
                      <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-primary-container">cloud_upload</span>
                      </div>
                      <p className="text-on-surface font-medium text-center">Click to upload or drag and drop</p>
                      <p className="text-on-surface-variant text-label-sm mt-1">Maximum file size: 5MB</p>
                    </>
                  ) : (
                    <div className="w-full bg-surface-container-highest/30 p-3 rounded-lg flex items-center justify-between" id="file-preview">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary">description</span>
                        <span className="text-label-md text-on-surface truncate max-w-[200px]" id="file-name">{resumeName}</span>
                      </div>
                      <button 
                        className="hover:text-error transition-colors text-on-surface-variant" 
                        id="remove-file" 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setResumeName('');
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* CTA Section */}
              <div className="pt-4 flex flex-col md:flex-row gap-4 items-center">
                <button 
                  className="w-full bg-[#6C5CE7] hover:bg-[#5847d2] disabled:opacity-50 disabled:pointer-events-none text-white font-semibold py-4 rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-primary-container/20 cursor-pointer flex items-center justify-center" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Next'}
                </button>
                <button 
                  className="w-full md:w-auto px-8 py-4 text-on-surface-variant font-medium hover:text-on-surface transition-colors cursor-pointer disabled:opacity-50" 
                  type="button"
                  disabled={loading}
                  onClick={handleSkip}
                >
                  Skip for now
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      {/* Footer Meta */}
      <footer className="py-8 px-6 text-center">
        <p className="text-on-surface-variant text-label-sm opacity-50">© 2024 ParableLabs. All rights reserved.</p>
      </footer>
    </>
  );
}
