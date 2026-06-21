"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginParablelabs() {
  const router = useRouter();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login';
    const payload = isSignUp ? { name, email, password, role } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      if (isSignUp) {
        setMessage({ type: 'success', text: 'Account created! Logging in...' });
        setTimeout(() => {
          router.push('/OnboardingAcademicParablelabs');
        }, 1500);
      } else {
        setMessage({ type: 'success', text: 'Verified! Sending to MFA...' });
        setTimeout(() => {
          router.push('/MfaVerificationParablelabs');
        }, 1200);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
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
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(16px);
        }
        .bg-login-gradient {
            background: radial-gradient(circle at top right, rgba(108, 92, 231, 0.15), transparent),
                        radial-gradient(circle at bottom left, rgba(108, 92, 231, 0.05), transparent);
        }
        .focus-ring:focus {
            outline: none;
            border-color: #6c5ce7;
            box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.2);
        }
        body {
            min-height: max(884px, 100dvh);
        }
      ` }} />
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-container/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-container/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4"></div>
      </div>
      
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop py-12 bg-login-gradient">
        
        <header className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary-container mb-6 shadow-[0_0_20px_rgba(108,92,231,0.4)]">
            <span className="material-symbols-outlined text-white text-4xl" data-weight="fill">terminal</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-white tracking-tighter mb-2">ParableLabs</h1>
          <p className="font-body-lg text-on-surface-variant max-w-md">
            {isSignUp ? 'Join the decentralized talent ecosystem.' : 'Welcome back to the flow state.'}
          </p>
        </header>
        
        <div className="w-full max-w-[440px] glass-card rounded-2xl p-8 md:p-10 shadow-2xl transition-all duration-300 hover:shadow-primary-container/5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          <h2 className="font-headline-md text-headline-md text-white mb-6">
            {isSignUp ? 'Create account' : 'Welcome back'}
          </h2>

          {message.text && (
            <div className={`p-4 mb-6 rounded-lg text-sm border flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-secondary/10 border-secondary/20 text-secondary' 
                : 'bg-error-container/10 border-error-container/20 text-error'
            }`}>
              <span className="material-symbols-outlined">
                {message.type === 'success' ? 'check_circle' : 'error'}
              </span>
              <span>{message.text}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit} id="loginForm">
            {isSignUp && (
              <div className="space-y-2">
                <label className="block font-label-md text-on-surface-variant" htmlFor="name">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">person</span>
                  <input 
                    className="w-full h-12 pl-12 pr-4 bg-surface-container-low border border-white/10 rounded-lg font-body-md text-white focus-ring transition-all placeholder:text-outline" 
                    id="name" 
                    placeholder="Alex Rivera" 
                    required 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block font-label-md text-on-surface-variant" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">mail</span>
                <input 
                  className="w-full h-12 pl-12 pr-4 bg-surface-container-low border border-white/10 rounded-lg font-body-md text-white focus-ring transition-all placeholder:text-outline" 
                  id="email" 
                  placeholder="alex@parable.ai" 
                  required 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-on-surface-variant" htmlFor="password">Password</label>
                {!isSignUp && (
                  <a className="font-label-sm text-primary hover:text-primary-container transition-colors" href="#">Forgot password?</a>
                )}
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">lock</span>
                <input 
                  className="w-full h-12 pl-12 pr-12 bg-surface-container-low border border-white/10 rounded-lg font-body-md text-white focus-ring transition-all placeholder:text-outline" 
                  id="password" 
                  placeholder="••••••••" 
                  required 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-white transition-colors" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <label className="block font-label-md text-on-surface-variant" htmlFor="role">I am a</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">badge</span>
                  <select 
                    className="w-full h-12 pl-12 pr-10 bg-surface-container-low border border-white/10 rounded-lg font-body-md text-white focus-ring transition-all appearance-none cursor-pointer" 
                    id="role" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="Student">Student (Academic Profile)</option>
                    <option value="Professional">Professional (Work Experience)</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Company Admin">Company Admin</option>
                    <option value="Platform Admin">Platform Admin</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">arrow_drop_down</span>
                </div>
              </div>
            )}
            
            {!isSignUp && (
              <div className="flex items-center gap-3">
                <input className="w-4 h-4 rounded border-white/10 bg-surface-container-low text-primary-container focus:ring-primary-container/50" id="remember" type="checkbox"/>
                <label className="font-label-md text-on-surface-variant cursor-pointer" htmlFor="remember">Stay logged in for 30 days</label>
              </div>
            )}
            
            <button 
              className="w-full h-12 bg-primary-container hover:bg-[#5b4cc7] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-white font-label-md rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary-container/20" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <>
                  {isSignUp ? 'Sign Up' : 'Log In'}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>
          
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[#161922] text-outline font-label-sm">OR CONTINUE WITH</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 h-11 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all active:scale-95">
              <img className="w-5 h-5" data-alt="Official Google G logo icon in color." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNO5xVfq9LPRAf1LBnUtR_yHEWZ11ous1fhvgfIBq1x0rDfzXoChWLfuqlFru7lFZDrL4sRUMjqpUGQ97jSS58L-tiiBMq62A-rdCmKCmQ8w9Rvycv_hkRg1rMhr43Rp6bAqmg7qfQ_NsU1uP6Y2ZEhHu4nKWNKQ_9L93NatuqJivEmE04AyBL71nh9_72srYG8DBEq8nLFrSE-ysrtifB1zez4QAsu6NYFZaaQFCavOx_1Y8jxrafbfKuRDcd8UIRuh5DQITUxr8"/>
              <span className="font-label-md text-white">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 h-11 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all active:scale-95">
              <img className="w-5 h-5" data-alt="Official Github logo icon in white." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHpuQUQ-PlJIT7bxJXJ1EywKX2MMrr_iNSh6XeSvNPdVgwL7EEhCpQgLp4c_Xe-unpgEthmJlMbYaPWsByfRkCizMBgqFiOlKKzYcnJ-8Ed4AeHhhIO8R6hgZ4krGMICwWxqGzrQg_64zxE9eb3JCaDL0ow6WH20dxIkwGNpMpZsZC03W36bvtIb7DFFUZCv-HzNUh-vScBXjPbkw6I065MqqlFeuv-QlWr0LofAshZIXUrWbod-63jawzU4pIOtqBwAIfTglHK1A"/>
              <span className="font-label-md text-white">GitHub</span>
            </button>
          </div>
          
          <p className="mt-8 text-center font-body-sm text-on-surface-variant">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"} 
            <button 
              className="text-primary font-label-md hover:underline decoration-primary/40 underline-offset-4 ml-1 cursor-pointer" 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setMessage({ type: '', text: '' });
              }}
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
        
        <footer className="mt-12 flex flex-col items-center gap-4 text-outline font-label-sm opacity-60">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_#88dc41]"></span>
              Systems Operational
            </span>
            <span>v2.4.0-release</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
            <span className="w-1 h-1 rounded-full bg-outline/30"></span>
            <a className="hover:text-on-surface transition-colors" href="#">Terms of Service</a>
          </div>
        </footer>
      </main>
    </>
  );
}
