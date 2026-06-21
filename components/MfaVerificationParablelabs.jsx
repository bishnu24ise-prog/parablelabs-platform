"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MfaVerificationParablelabs() {
  const router = useRouter();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if session is already authenticated on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        if (data.authenticated) {
          const { role, onboarded } = data.user;
          if ((role === 'Student' || role === 'Professional') && !onboarded) {
            router.push('/OnboardingAcademicParablelabs');
          } else if (role === 'Recruiter') {
            router.push('/RecruiterPortalParablelabs');
          } else if (role === 'Company Admin') {
            router.push('/CompanyPortalParablelabs');
          } else if (role === 'Platform Admin') {
            router.push('/PlatformAdminDashboardParablelabs');
          } else {
            router.push('/ParablelabsDashboard');
          }
        }
      } catch (err) {
        console.error('Session check error:', err);
      }
    };
    checkSession();
  }, [router]);

  const handleChange = (target, index) => {
    const val = target.value;
    if (isNaN(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-focus next input
    if (val !== '' && target.nextSibling) {
      target.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      // Auto-focus previous input
      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-mfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: otpCode })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Verification failed.');
      }

      // MFA Verified! Fetch session to route user
      const sessionRes = await fetch('/api/auth/session');
      const sessionData = await sessionRes.json();

      if (sessionData.authenticated) {
        const { role, onboarded } = sessionData.user;
        if ((role === 'Student' || role === 'Professional') && !onboarded) {
          router.push('/OnboardingAcademicParablelabs');
        } else if (role === 'Recruiter') {
          router.push('/RecruiterPortalParablelabs');
        } else if (role === 'Company Admin') {
          router.push('/CompanyPortalParablelabs');
        } else if (role === 'Platform Admin') {
          router.push('/PlatformAdminDashboardParablelabs');
        } else {
          router.push('/ParablelabsDashboard');
        }
      } else {
        router.push('/LoginParablelabs');
      }
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
        .otp-input:focus {
            box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.4);
        }
        @keyframes pulse-soft {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        .animate-pulse-soft {
            animation: pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        body {
            min-height: max(884px, 100dvh);
        }
      ` }} />
      
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 bg-surface/80 backdrop-blur-xl border-b border-white/10">
        <div className="text-headline-md font-headline-md font-bold text-on-surface">
          ParableLabs
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant font-label-md">
          <span className="material-symbols-outlined text-[20px]">shield_person</span>
          <span className="hidden md:inline">Secure Session</span>
        </div>
      </header>
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>
      
      <main className="relative z-10 flex-grow flex items-center justify-center px-margin-mobile pt-16">
        <div className="w-full max-w-md">
          
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-primary-container/10 border border-primary/20 flex items-center justify-center text-primary animate-pulse-soft">
              <span className="material-symbols-outlined text-[32px]">lock_open</span>
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">Verify Identity</h1>
            <p className="font-body-md text-on-surface-variant">Enter the 6-digit code sent to your email</p>
            <p className="text-[11px] text-[#88dc41] mt-2 opacity-80 font-mono">Development Sandbox Mode: Enter 123456</p>
          </div>
          
          <div className="glass-card rounded-xl p-8 shadow-xl">
            {error && (
              <div className="p-4 mb-6 rounded-lg text-sm border bg-error-container/10 border-error-container/20 text-error flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">error</span>
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit} id="otp-form">
              <div className="flex justify-between gap-2 md:gap-4" id="otp-inputs">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    autoFocus={i === 0}
                    className="otp-input w-full aspect-square text-center font-headline-md text-headline-md bg-surface-container-low border border-white/10 rounded-lg focus:border-primary focus:ring-0 transition-all text-primary"
                    inputMode="numeric"
                    maxLength="1"
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(e.target, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                  />
                ))}
              </div>
              
              <div className="space-y-4">
                <button 
                  className="w-full py-4 px-6 bg-primary-container hover:bg-primary-container/90 disabled:opacity-50 disabled:pointer-events-none text-on-primary-container font-label-md text-label-md rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-primary-container/20" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
                <div className="text-center">
                  <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    Resend code available
                  </p>
                </div>
              </div>
            </form>
          </div>
          
          <div className="mt-8 text-center space-y-4">
            <a className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-primary/80 transition-colors group" href="#">
              <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">phonelink_setup</span>
              Use authenticator app instead
            </a>
            <p className="text-on-surface-variant font-label-sm text-[12px] opacity-60">
              Need help? <a className="underline hover:text-on-surface transition-colors" href="#">Contact Support</a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
