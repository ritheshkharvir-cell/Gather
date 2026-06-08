import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Mail, Lock, User as UserIcon, Sparkle } from 'lucide-react';
import { User } from '../types';

interface AuthScreenProps {
  onLoginSuccess: (user: User) => void;
  initialTab?: 'login' | 'signup';
}

export default function AuthScreen({ onLoginSuccess, initialTab = 'login' }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please fill in all fields');
      return;
    }
    if (activeTab === 'signup' && !fullName) {
      setErrorMsg('Please enter your full name');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    // Simulate database lookup or creation
    setTimeout(() => {
      setLoading(false);
      const isGoogleUser = email.includes('google') || email === 'guest';
      const defaultUser: User = {
        id: 'u_' + Math.floor(Math.random() * 10000),
        email: email,
        fullName: activeTab === 'signup' ? fullName : (isGoogleUser ? 'Alex Rivera' : 'Sarah Jenkins'),
        avatarUrl: isGoogleUser 
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmBTI2aqM9RLRq6XIGR-pOZuLhHN6-BvGnhSoGxjtpKDkHOpTanXspd7MQ64MoP0I4H5e1DPMnWUTqxg56gAFiOvHJdllz6UB4HiKcCxF2CZuE9OhUsD14IjY_3GGHnc74P6EDR14aKw1aOJG2TiSaL20wmkBzEDSbv_VqtkTvUQpTSoaMgg4oIN236PnxC20gFLmrBq3C2S4teb1-xe_DQdVkR4oUmgimHBTL_r50SmUGDsP_sgMiESl7oF29Qh-o9VQb3EOYW38'
          : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhJAuJxeICZdZ8hA-ED4cgSVnmR5Qb2mIBxgBiZn8-ZcmGRhhcJcBgobwbND7rT6BiL58eASj6Wh0yuE6aFeIct_6MUVippmS9kXt6-f5yYQusHVllQ5A9Y1mJt3-HW7BMLbCfQT4BKQVxjmFY0qU37ZReZCIYYtyQAuAork7_RCqS9ng9I_ZxQW3EACq9aWnMj_wwtTl_jZKLx3Erm5SOZRC39d_h0Z-YWfeDoppsqMhKqk43QwO3zuH_Nv112BwOUqWJ1Ry1apc',
        joinedAt: new Date().toISOString(),
        likedEvents: []
      };

      // Save user profile in LocalStorage for persistence session!
      localStorage.setItem('gather_session_user', JSON.stringify(defaultUser));
      onLoginSuccess(defaultUser);
    }, 800);
  };

  const handleSocialLogin = (platform: 'Google' | 'Apple') => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const socialUser: User = {
        id: 'u_social_' + platform.toLowerCase(),
        email: `${platform.toLowerCase()}user@gather.com`,
        fullName: platform === 'Google' ? 'Alex Rivera' : 'Sarah Jenkins',
        avatarUrl: platform === 'Google'
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJG26__svJulUrdnfP7uflIYNdzBysdBxNAHu7NjCs2MX1CyOTvLD4N48bJT5rdN8ZerN5mlJuDeYEmmq9KLkeLyIyDfghyIlLCjQrElE_gEVnUgik1H_jNQyZYfZvnOreiTKemPNgkYMjRG2KvcOngeVzng_kwdF2FGpyyMHgOozLcmiYjidnjNNI7pYqux_WVNiFn5hq7z0DzMy9NN6qdbrGQIFRqO_zRtIdh_VEWlben37ETvI1QEX8VhatT7Ry2FYRTv4jN30'
          : 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmBTI2aqM9RLRq6XIGR-pOZuLhHN6-BvGnhSoGxjtpKDkHOpTanXspd7MQ64MoP0I4H5e1DPMnWUTqxg56gAFiOvHJdllz6UB4HiKcCxF2CZuE9OhUsD14IjY_3GGHnc74P6EDR14aKw1aOJG2TiSaL20wmkBzEDSbv_VqtkTvUQpTSoaMgg4oIN236PnxC20gFLmrBq3C2S4teb1-xe_DQdVkR4oUmgimHBTL_r50SmUGDsP_sgMiESl7oF29Qh-o9VQb3EOYW38',
        joinedAt: new Date().toISOString(),
        likedEvents: []
      };
      localStorage.setItem('gather_session_user', JSON.stringify(socialUser));
      onLoginSuccess(socialUser);
    }, 600);
  };

  const handleQuickDemoSession = () => {
    setEmail('guest@gather.com');
    setPassword('guest123');
    setFullName('Marcus Chen');
  };

  return (
    <div className="min-h-screen bg-[#fcf8ff] flex flex-col items-center justify-center font-sans py-12 px-6">
      <main className="w-full max-w-[440px] flex flex-col gap-8">
        
        {/* Brand / Logo */}
        <header className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform">
            <Sparkles className="text-[#ab3500] w-10 h-10 fill-current" />
            <h1 className="font-headline text-3xl font-extrabold text-[#ab3500] tracking-tight">Gather</h1>
          </div>
          <p className="text-base text-[#594139] px-4 font-semibold font-sans">
            Connecting you to real-world experiences and community sparks.
          </p>
        </header>

        {/* Content Card layout */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(24,20,69,0.08)] border border-[#e3dfff] flex flex-col gap-6">
          
          {/* Segmented control bar */}
          <div className="bg-[#efebff] p-1 rounded-full flex relative overflow-hidden h-12 items-center">
            <div
              className={`absolute h-[calc(100%-8px)] top-1 bg-[#ff6b35] rounded-full transition-all duration-300 ease-out`}
              style={{
                width: 'calc(50% - 4px)',
                left: activeTab === 'login' ? '4px' : 'calc(50% - 0px)',
              }}
            ></div>
            <button
              id="tab-login"
              type="button"
              onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
              className={`flex-1 text-center py-2 font-headline font-bold text-sm relative z-10 transition-colors duration-300 ${
                activeTab === 'login' ? 'text-white' : 'text-[#594139]'
              }`}
            >
              Login
            </button>
            <button
              id="tab-signup"
              type="button"
              onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
              className={`flex-1 text-center py-2 font-headline font-bold text-sm relative z-10 transition-colors duration-300 ${
                activeTab === 'signup' ? 'text-white' : 'text-[#594139]'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form fields */}
          <form onSubmit={handleAction} className="flex flex-col gap-4">
            
            {errorMsg && (
              <div className="text-red-600 text-xs text-center font-semibold bg-red-50 p-2 rounded-lg border border-red-100">
                {errorMsg}
              </div>
            )}

            <div className="flex flex-col gap-3">
              {/* Optional sign up inputs */}
              {activeTab === 'signup' && (
                <div className="relative flex items-center">
                  <UserIcon className="absolute left-3 w-5 h-5 text-[#594139]/60" />
                  <input
                    id="input-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full h-12 pl-10 pr-4 bg-[#fcf8ff] border-2 border-[#e1bfb5] focus:border-[#ff6b35] focus:ring-0 outline-none rounded-2xl transition-all text-[#181445] placeholder-[#594139]/50 text-sm font-semibold"
                  />
                </div>
              )}

              {/* Email Address */}
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-5 h-5 text-[#594139]/60" />
                <input
                  id="input-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full h-12 pl-10 pr-4 bg-[#fcf8ff] border-2 border-[#e1bfb5] focus:border-[#ff6b35] focus:ring-0 outline-none rounded-2xl transition-all text-[#181445] placeholder-[#594139]/50 text-sm font-semibold"
                />
              </div>

              {/* Password */}
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-5 h-5 text-[#594139]/60" />
                <input
                  id="input-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-12 pl-10 pr-4 bg-[#fcf8ff] border-2 border-[#e1bfb5] focus:border-[#ff6b35] focus:ring-0 outline-none rounded-2xl transition-all text-[#181445] placeholder-[#594139]/50 text-sm font-semibold"
                />
              </div>
            </div>

            {/* Forgot password bar */}
            {activeTab === 'login' && (
              <div className="flex justify-between items-center px-1">
                <button
                  id="btn-quick-fill"
                  type="button"
                  onClick={handleQuickDemoSession}
                  className="text-xs text-[#5654a8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkle className="w-3 h-3" /> Quick fill demo
                </button>
                <button
                  id="btn-forgot-password"
                  type="button"
                  onClick={() => alert('Password reset email sent to your registered email!')}
                  className="font-headline text-xs text-[#ab3500] font-bold hover:opacity-85"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Main Action Button */}
            <button
              id="btn-form-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff6b35] text-white h-12 rounded-full font-headline font-semibold text-sm shadow-[0_8px_16px_-4px_rgba(171,53,0,0.3)] hover:shadow-[0_12px_20px_-4px_rgba(171,53,0,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : activeTab === 'login' ? (
                'Login'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Social login divider divider */}
          <div className="flex items-center gap-4 my-2">
            <div className="h-[1px] flex-1 bg-[#e1bfb5]"></div>
            <span className="font-headline text-xs font-bold text-[#594139] tracking-wider">OR CONTINUE WITH</span>
            <div className="h-[1px] flex-1 bg-[#e1bfb5]"></div>
          </div>

          {/* Social login buttons */}
          <div className="flex flex-col gap-2">
            <button
              id="btn-login-google"
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center gap-2 w-full h-11 border-2 border-[#5654a8] rounded-full font-headline text-sm font-bold text-[#5654a8] hover:bg-[#5654a8]/5 active:scale-95 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="currentColor"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="currentColor"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="currentColor"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="currentColor"
                />
              </svg>
              Google
            </button>
            <button
              id="btn-login-apple"
              onClick={() => handleSocialLogin('Apple')}
              className="flex items-center justify-center gap-2 w-full h-11 bg-[#181445] rounded-full font-headline text-sm font-bold text-white hover:opacity-95 active:scale-95 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.96.00-1.76-.31-2.4-.31s-1.35.31-2.26.31c-1.49 0-3.14-.93-4.01-2.45-1.76-3.05-1.12-6.52.56-9.06 1.05-1.58 2.59-2.58 4.29-2.58 1.15 0 1.95.39 2.59.39s1.29-.39 2.48-.39c1.26 0 2.55.53 3.48 1.45-2.31 1.05-2.85 4.38-.43 5.75-.92 2.1-2.12 4.14-3.5 4.14-.3 0-.6-.08-.85-.15-.17-.06-.33-.12-.45-.12zm-3.52-16.14c0-1.85 1.54-3.39 3.39-3.39 0 1.85-1.54 3.39-3.39 3.39z" />
              </svg>
              Apple
            </button>
          </div>

        </div>

        {/* Lower Graphic Cover banner banner */}
        <div className="relative w-full h-44 rounded-3xl overflow-hidden shadow-md">
          <img
            alt="Community Gathering"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVBUkneu-dsoXQPSCOCwIq553M_1XJjInCPrujlc1_Idqh977y4ZzWCdP7yPE39uEcCo-jdaJVnPXibaUzXDGs4ERH0Y44uiinzBSb_zns_KKNyJv8o3t_t-eoXrWvG9KrzF7jHVici6QdsuK3XMXEdA0NrpilPlZcTGdXkI5gPKYJuUznROPHNFIQjPS4hEmu14kHHKQDS4FT6gnCQq5kdrDotThiIwU71aLx7qpJaGy-MWCCtq3yB3gGLJARK8IWBh3PC7bV6X0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181445]/70 via-[#181445]/20 to-transparent flex items-end p-4">
            <p className="text-white font-headline text-lg font-bold">Start your story here.</p>
          </div>
        </div>

      </main>
    </div>
  );
}
