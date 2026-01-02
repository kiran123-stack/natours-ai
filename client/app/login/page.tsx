'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/v1/users/login', {
        email,
        password
      });

      if (res.data.status === 'success') {
        // Save the token (basic way)
        localStorage.setItem('token', res.data.token);
        alert("Login Successful! Welcome back.");
        router.push('/'); // Go back home
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-8">Access your AI Travel Plans</p>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/10 p-3 rounded-lg text-white focus:border-teal-500 outline-none transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 p-3 rounded-lg text-white focus:border-teal-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 rounded-lg transition disabled:opacity-50 mt-4"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        <p className="text-gray-500 text-xs text-center mt-6">
          Don't have an account? <Link href="/signup" className="text-teal-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}