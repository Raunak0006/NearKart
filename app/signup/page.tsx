'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { useNearKart } from '@/lib/context';

export default function SignupPage() {
  const router = useRouter();
  const { setRole } = useNearKart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'customer' | 'shopkeeper'>('customer');
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) return;

    setLoading(true);
    // Mock registration delay
    setTimeout(() => {
      setRole(selectedRole);
      setLoading(false);
      router.push(selectedRole === 'customer' ? '/customer/dashboard' : '/shopkeeper/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-white dark:bg-slate-950 transition-colors duration-200">
      
      <div className="w-full max-w-[420px] rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 z-10 relative">
        <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-500/10 rounded-full blur-2xl" />

        {/* Brand Header */}
        <div className="text-center mb-6 relative">
          <Link href="/" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-md mb-3 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.png" 
              alt="NearKart Logo" 
              className="h-10 w-10 object-contain"
            />
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white">Create Account</h2>
          <p className="text-xs text-slate-450 dark:text-slate-400 mt-1.5 font-medium">
            Join NearKart to buy or sell groceries instantly
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSignup} className="space-y-3.5 relative">
          
          {/* Role selector chips */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-850">
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                selectedRole === 'customer'
                  ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-900 dark:text-emerald-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('shopkeeper')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                selectedRole === 'shopkeeper'
                  ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-900 dark:text-emerald-400'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Shopkeeper
            </button>
          </div>

          {/* Name input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Full Name</label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-transparent px-3.5 py-1 dark:border-slate-800">
              <User className="h-4.5 w-4.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="flex-1 bg-transparent py-1.5 text-xs sm:text-sm text-slate-850 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Email input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email Address</label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-transparent px-3.5 py-1 dark:border-slate-800">
              <Mail className="h-4.5 w-4.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="flex-1 bg-transparent py-1.5 text-xs sm:text-sm text-slate-850 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Phone input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Phone Number</label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-transparent px-3.5 py-1 dark:border-slate-800">
              <Phone className="h-4.5 w-4.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (123) 456-7890"
                className="flex-1 bg-transparent py-1.5 text-xs sm:text-sm text-slate-850 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Password</label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-transparent px-3.5 py-1 dark:border-slate-800">
              <Lock className="h-4.5 w-4.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="flex-1 bg-transparent py-1.5 text-xs sm:text-sm text-slate-850 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{loading ? 'Creating Account...' : 'Sign Up'}</span>
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        {/* Login Redirect */}
        <div className="text-center mt-6 text-xs font-semibold text-slate-550 dark:text-slate-400">
          <span>Already have an account? </span>
          <Link href="/login" className="text-emerald-600 hover:underline dark:text-emerald-400">Sign in</Link>
        </div>

      </div>

    </div>
  );
}
