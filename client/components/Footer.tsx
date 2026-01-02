import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-3xl font-black tracking-tighter mb-4 block">
              NATOURS<span className="text-teal-500">.AI</span>
            </Link>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              The world's first AI-powered travel agency. We combine Google Gemini's intelligence with curated real-world data to build the perfect itinerary for you.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold mb-6 text-teal-500 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold mb-6 text-teal-500 uppercase text-xs tracking-widest">Discover</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Top Destinations</a></li>
              <li><a href="#" className="hover:text-white transition">Travel Guides</a></li>
              <li><a href="#" className="hover:text-white transition">Auto-Planner</a></li>
              <li><a href="#" className="hover:text-white transition">AI Blog</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>&copy; 2024 Natours AI Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Instagram</span>
            <span>Twitter</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}