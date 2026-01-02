'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter">
          NATOURS<span className="text-teal-400">.AI</span>
        </Link>

        {/* Desktop Tabs */}
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <Link href="/" className="hover:text-teal-400 transition">Home</Link>
          <a href="#tours" className="hover:text-teal-400 transition">Destinations</a>
          <a href="#autoplan" className="hover:text-teal-400 transition">Auto-Plan</a>
        </div>

        {/* LINKED LOGIN BUTTON */}
        <Link href="/login">
          <button className="bg-teal-500 hover:bg-teal-600 text-black font-bold py-2 px-6 rounded-full text-xs uppercase transition-all">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}