"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui";
import { useBBPSStore } from "@/lib/bbps-store";

export default function BBPSLoginPage() {
  const router = useRouter();
  const { login } = useBBPSStore();

  const [username, setUsername] = useState("retailer.agency@bharatconnect.in");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login();
      setIsLoading(false);
      router.push("/bbps/dashboard");
    }, 600);
  };

  const handleFillDemo = () => {
    setUsername("retailer.agency@bharatconnect.in");
    setPassword("Bharat@2026");
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetEmailSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Top Navigation Bar back to main website */}
      <header className="w-full max-w-5xl flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 font-medium">
          ← Back to Travel Website
        </Link>
      </header>

      {/* Main Login Card Container */}
      <div className="w-full max-w-md my-auto">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          {/* Header Banner */}
          <div className="bg-slate-900 p-6 text-center relative border-b border-slate-800">
            <h2 className="text-white text-lg font-bold tracking-tight">Retailer & Agent Portal</h2>
          </div>

          {/* Form Content */}
          <form onSubmit={handleLoginSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Quick Demo Credentials Autofill Banner */}
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 flex items-center justify-between">
              <div className="text-xs text-blue-900">
                <span className="font-semibold block">Demo Retailer Account</span>
                <span className="text-[11px] text-blue-700">Pre-configured UAT test credentials</span>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs bg-blue-600 text-white font-medium px-2.5 py-1 rounded-md hover:bg-blue-700 transition-colors shadow-2xs"
              >
                Autofill
              </button>
            </div>

            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Retailer ID / Email Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Retailer ID or registered email"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all font-sans"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-xs text-blue-600 font-medium hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter account password"
                  className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating Agent...
                </>
              ) : (
                <>
                  Login to Retailer Dashboard <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            </form>
        </div>
      </div>

      {/* Forgot Password Interactive Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" /> Reset Agent Password
              </h3>
              <button
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setResetEmailSent(false);
                }}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {!resetEmailSent ? (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-slate-600">
                  Enter your registered Retailer Mobile Number or Email ID. We will send an OTP reset code to authorize your password recovery.
                </p>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Retailer Email or Mobile</label>
                  <input
                    type="text"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="retailer.agency@bharatconnect.in"
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-xs text-slate-600 font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700"
                  >
                    Send OTP Reset Link
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-800 text-sm">OTP Reset Code Sent!</h4>
                <p className="text-xs text-slate-600">
                  Password reset link has been dispatched to your registered mobile/email. Please check your inbox.
                </p>
                <button
                  onClick={() => {
                    setShowForgotPasswordModal(false);
                    setResetEmailSent(false);
                  }}
                  className="px-6 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
                >
                  Return to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer copyright */}
      <footer className="text-center text-xs text-slate-400 py-4">
        © 2026 Retailer Operations Portal. All rights reserved.
      </footer>
    </div>
  );
}
