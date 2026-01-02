'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();

  // 1. State for all fields in your User Schema
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 2. Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit Form
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic Client-side Validation
    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // 4. Send Data to Backend
      // Notice we send exactly what your Schema expects: name, email, password, passwordConfirm
      const res = await axios.post('http://localhost:5000/api/v1/users/signup', formData);

      if (res.data.status === 'success') {
        alert("Account created successfully! Please log in.");
        router.push('/login'); // Redirect to login page
      }
    } catch (err: any) {
      console.error(err);
      // Show the exact error message from your backend (e.g. "Email already exists")
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-[50px] pointer-events-none" />

        <h1 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h1>
        <p className="text-gray-400 text-center mb-6 text-sm">Join Natours AI today</p>

        {/* Error Message Box */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm mb-4 text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Full Name</label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 p-3 rounded-lg text-white focus:border-teal-500 outline-none transition"
              placeholder="Kiran Kumar"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 p-3 rounded-lg text-white focus:border-teal-500 outline-none transition"
              placeholder="kiran@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Password</label>
            <input 
              type="password" 
              name="password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 p-3 rounded-lg text-white focus:border-teal-500 outline-none transition"
              placeholder="•••••••• (min 8 chars)"
            />
          </div>

          {/* Password Confirm Field */}
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Confirm Password</label>
            <input 
              type="password" 
              name="passwordConfirm"
              required
              minLength={8}
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 p-3 rounded-lg text-white focus:border-teal-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 rounded-lg transition disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-gray-500 text-xs text-center mt-6">
          Already have an account? <Link href="/login" className="text-teal-500 hover:underline">Log in</Link>
        </p>
      </div>
    </main>
  );
}