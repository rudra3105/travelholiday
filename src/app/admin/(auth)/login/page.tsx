"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Eye, EyeOff, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE_CONFIG } from "@/lib/constants";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 600));

    const validUser = process.env.NEXT_PUBLIC_ADMIN_USER || "travelholiday";
    const validPass = process.env.NEXT_PUBLIC_ADMIN_PASS || "TH@admin2024";

    if (username === validUser && password === validPass) {
      router.push("/admin");
    } else {
      setError("Invalid username or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=60" alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 to-brand-950/90" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <Image src="/logo.png" alt="Travel Holiday" fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-white">{SITE_CONFIG.name}</h1>
            <p className="text-gray-400 text-sm mt-1">Admin Panel Login</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="username" className="text-gray-300">Username</Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input id="username" type="text" placeholder="travelholiday" value={username} onChange={(e) => setUsername(e.target.value)} className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-brand-500" required />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-brand-500" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
            )}

            <Button type="submit" variant="premium" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" />Signing in...</> : "Sign In to Admin"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
