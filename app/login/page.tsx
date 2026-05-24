'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useNearKart } from '@/lib/context';

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useNearKart();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'customer' | 'shopkeeper'>('customer');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    // Mock login delay
    setTimeout(() => {
      setRole(selectedRole);
      setLoading(false);
      router.push(selectedRole === 'customer' ? '/customer/dashboard' : '/shopkeeper/dashboard');
    }, 1200);
  };

  const handleGoogleLoginMock = () => {
    setLoading(true);
    setTimeout(() => {
      setRole(selectedRole);
      setLoading(false);
      router.push(selectedRole === 'customer' ? '/customer/dashboard' : '/shopkeeper/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-[#dfb17b] transition-colors duration-200">
      
      <div className="w-full max-w-[420px] rounded-3xl border border-[#3a2f29] bg-[#2d2520] p-6 sm:p-8 shadow-2xl z-10 relative text-white">
        <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-500/10 rounded-full blur-2xl" />

        {/* Brand Header */}
        <div className="text-center mb-8 relative">
          <Link href="/" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1a1513] border border-[#3a2f29] shadow-md mb-3 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/NearKart/logo.png" 
              alt="NearKart Logo" 
              className="h-10 w-10 object-contain"
            />
          </Link>
          <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-white/80 mt-1.5 font-medium">
            Sign in to start managing orders or shopping groceries
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4 relative">
          
          {/* Role selector chips */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#1a1513] border border-[#3a2f29]">
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                selectedRole === 'customer'
                  ? 'bg-[#2d2520] text-emerald-500 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('shopkeeper')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                selectedRole === 'shopkeeper'
                  ? 'bg-[#2d2520] text-emerald-500 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Shopkeeper
            </button>
          </div>

          {/* Email / Phone input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Email or Phone</label>
            <div className="flex items-center rounded-xl border border-[#3a2f29] bg-[#1a1513] px-3.5 py-1.5">
              <Mail className="h-4.5 w-4.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@example.com"
                className="flex-1 bg-transparent py-1.5 text-xs sm:text-sm text-white focus:outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Password</label>
              <Link href="#" className="text-[10px] font-bold text-emerald-500 hover:underline">Forgot Password?</Link>
            </div>
            <div className="flex items-center rounded-xl border border-[#3a2f29] bg-[#1a1513] px-3.5 py-1.5">
              <Lock className="h-4.5 w-4.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="flex-1 bg-transparent py-1.5 text-xs sm:text-sm text-white focus:outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-bold text-white shadow-lg shadow-emerald-500/10 hover:bg-[#10b981] hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#3a2f29]" /></div>
          <span className="relative bg-[#2d2520] px-3 text-[10px] font-bold uppercase text-slate-400">Or Continue With</span>
        </div>

        {/* Google login mock button */}
        <button
          onClick={handleGoogleLoginMock}
          disabled={loading}
          className="w-full flex h-11 items-center justify-center gap-2.5 rounded-xl border border-[#3a2f29] bg-[#2d2520] hover:bg-[#3a2f29] text-xs sm:text-sm font-bold text-slate-200 transition-colors cursor-pointer"
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span>Sign In with Google</span>
        </button>

        {/* Signup Redirect */}
        <div className="text-center mt-8 text-xs font-semibold text-white/80">
          <span>Don&apos;t have an account? </span>
          <Link href="/signup" className="text-emerald-500 hover:underline">Create account</Link>
        </div>

      </div>

    </div>
  );
}
