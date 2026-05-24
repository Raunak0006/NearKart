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
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-[#dfb17b] transition-colors duration-200">
      
      <div className="w-full max-w-[420px] rounded-3xl border border-[#3a2f29] bg-[#2d2520] p-6 sm:p-8 shadow-2xl z-10 relative text-white">
        <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-500/10 rounded-full blur-2xl" />

        {/* Brand Header */}
        <div className="text-center mb-6 relative">
          <Link href="/" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1a1513] border border-[#3a2f29] shadow-md mb-3 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.png" 
              alt="NearKart Logo" 
              className="h-10 w-10 object-contain"
            />
          </Link>
          <h2 className="text-2xl font-extrabold text-white">Create Account</h2>
          <p className="text-xs text-white/80 mt-1.5 font-medium">
            Join NearKart to buy or sell groceries instantly
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSignup} className="space-y-3.5 relative">
          
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

          {/* Name input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Full Name</label>
            <div className="flex items-center rounded-xl border border-[#3a2f29] bg-[#1a1513] px-3.5 py-1">
              <User className="h-4.5 w-4.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="flex-1 bg-transparent py-1.5 text-xs sm:text-sm text-white focus:outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Email input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Email Address</label>
            <div className="flex items-center rounded-xl border border-[#3a2f29] bg-[#1a1513] px-3.5 py-1">
              <Mail className="h-4.5 w-4.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="flex-1 bg-transparent py-1.5 text-xs sm:text-sm text-white focus:outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Phone input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Phone Number</label>
            <div className="flex items-center rounded-xl border border-[#3a2f29] bg-[#1a1513] px-3.5 py-1">
              <Phone className="h-4.5 w-4.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (123) 456-7890"
                className="flex-1 bg-transparent py-1.5 text-xs sm:text-sm text-white focus:outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Password</label>
            <div className="flex items-center rounded-xl border border-[#3a2f29] bg-[#1a1513] px-3.5 py-1">
              <Lock className="h-4.5 w-4.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
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
            <span>{loading ? 'Creating Account...' : 'Sign Up'}</span>
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        {/* Login Redirect */}
        <div className="text-center mt-6 text-xs font-semibold text-white/80">
          <span>Already have an account? </span>
          <Link href="/login" className="text-emerald-500 hover:underline">Sign in</Link>
        </div>

      </div>

    </div>
  );
}
