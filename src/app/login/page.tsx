"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.trim().length > 0 && user.password.trim().length > 0));
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md mx-4">
        <div className="relative bg-gradient-to-br from-black via-zinc-900 to-neutral-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-500 to-rose-500 blur opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-lg">
                SD
              </div>
              <div>
                <h1 className="text-white text-2xl font-semibold">Welcome back</h1>
                <p className="text-sm text-zinc-400">Login to continue to SelfDevQuest</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <label className="block text-xs text-zinc-300">Email</label>
              <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                <svg className="w-5 h-5 text-zinc-400 mr-2" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8.5L12 13l9-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="you@example.com"
                  className="bg-transparent outline-none text-white w-full placeholder-zinc-500 text-sm"
                  aria-label="email"
                />
              </div>

              {/* Password */}
              <label className="block text-xs text-zinc-300">Password</label>
              <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                <svg className="w-5 h-5 text-zinc-400 mr-2" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="4" y="7" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 7V6a4 4 0 018 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="●●●●●●●●"
                  className="bg-transparent outline-none text-white w-full placeholder-zinc-500 text-sm"
                  aria-label="password"
                  onKeyDown={(e) => { if (e.key === "Enter" && !buttonDisabled && !loading) onLogin(); }}
                />
              </div>

              {/* CTA */}
              <button
                onClick={onLogin}
                disabled={buttonDisabled || loading}
                aria-disabled={buttonDisabled || loading}
                className={`w-full mt-2 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2
                  ${buttonDisabled || loading ? "bg-zinc-700/40 text-zinc-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-500 to-sky-400 text-black shadow-md"}
                `}
              >
                {loading ? (
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2"/>
                    <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                ) : null}
                {buttonDisabled ? "Fill all fields" : loading ? "Processing..." : "Login"}
              </button>

              <div className="flex items-center justify-between text-sm text-zinc-500 mt-2">
                <Link href="/signup" className="text-zinc-300 hover:text-white">Create account</Link>
                <Link href="/forgot-password" className="text-zinc-500 hover:text-zinc-300">Forgot password?</Link>
              </div>

              <div className="pt-4">
                <p className="text-xs text-zinc-500 text-center">By continuing you agree to our <span className="text-zinc-300">Terms</span> & <span className="text-zinc-300">Privacy</span>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
