'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import SmartDestination from './SmartDestination';

export default function Home() {
  // --- STATE FOR AUTO PLANNER ---
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState('');
  const [plan, setPlan] = useState<any>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);

  // --- STATE FOR SEARCH BAR ---
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{name: string, img: string} | null>(null);
  const [searching, setSearching] = useState(false);

  // --- FUNCTION: SEARCH LOCATION (The Professional Fix) ---
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setSearching(true);
    setSearchResult(null);

    try {
      // 1. Get the Key from Environment Variables
      const unsplashKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

      // 2. Call Unsplash API directly
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: searchQuery,
          per_page: 1,
          orientation: 'landscape',
          client_id: unsplashKey // This authorizes the request
        }
      });

      // 3. Extract the high-quality image URL
      const image = response.data.results[0]?.urls?.regular || 
                    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"; // Fallback if no image found

      setSearchResult({
        name: searchQuery,
        img: image
      });

    } catch (err) {
      console.error("Unsplash Error:", err);
      // Fallback image so the UI never breaks
      setSearchResult({
        name: searchQuery,
        img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"
      });
    } finally {
      setSearching(false);
    }
  };

  // --- FUNCTION: AUTO PLANNER ---
  const handleAutoPlan = async () => {
    if (!budget || !interests) return alert("Please enter budget and interests!");
    setLoadingPlan(true);
    setPlan(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await axios.post(`${API_URL}/api/v1/ai/plan`, {
        budget,
        interests
      });
      setPlan(res.data.data);
    } catch (err) {
      alert("AI Connect Failed. Make sure Backend is running!");
    } finally {
      setLoadingPlan(false);
    }
  };

  // --- DATA ---
  const heroSlides = [
    { name: "Dubai, UAE", img: "https://images.unsplash.com/photo-1512453979798-5ea932a23518?w=1200" },
    { name: "Kyoto, Japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200" },
    { name: "Santorini, Greece", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200" },
  ];

  const galleryItems = [
    { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600" },
    { name: "New York", img: "https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?w=600" },
    { name: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600" },
    { name: "London", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600" },
    { name: "Rome", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600" },
    { name: "Sydney", img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      {/* 1. HERO SLIDER */}
      <section className="relative h-[80vh] w-full">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <img src={slide.img} className="w-full h-full object-cover opacity-60" alt={slide.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-20 left-10 md:left-20">
                  <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">{slide.name}</h1>
                  <button className="bg-teal-500 text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition">
                    Start Your Journey
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 2. SEARCH SECTION (API FIXED) */}
      <section className="relative -mt-10 z-20 px-6 max-w-4xl mx-auto mb-20">
        <div className="bg-zinc-900/90 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Where do you want to go? (e.g. Goa)"
              className="w-full bg-black border border-white/10 p-4 rounded-xl text-white focus:border-teal-500 outline-none"
            />
            <button 
              type="submit" 
              disabled={searching}
              className="bg-teal-500 hover:bg-teal-400 text-black font-bold px-8 rounded-xl transition disabled:opacity-50"
            >
              {searching ? 'Loading...' : 'Search'}
            </button>
          </form>

          {/* Search Result Display */}
          {searchResult && (
            <div className="mt-8 animate-fade-in-up">
              <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-4">Top Result</h3>
              <div className="h-[400px] border border-teal-500/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(20,184,166,0.2)]">
                {/* We pass the REAL Unsplash URL here */}
                <SmartDestination name={searchResult.name} initialImage={searchResult.img} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. GALLERY GRID */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-4xl font-thin">TRENDING <span className="font-bold text-teal-500">NOW</span></h2>
          <span className="text-gray-500 text-sm uppercase tracking-widest">Explore All</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div key={index} className="h-[400px]">
              <SmartDestination name={item.name} initialImage={item.img} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. STATISTICS SECTION */}
      <section className="py-20 bg-zinc-900 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "150+", label: "Countries" },
            { value: "10k+", label: "Happy Travelers" },
            { value: "500+", label: "AI Guides" },
            { value: "24/7", label: "Support" }
          ].map((stat, i) => (
            <div key={i} className="group">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-teal-500 transition-colors">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRICING / SUBSCRIPTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">CHOOSE YOUR GUIDE</h2>
          <p className="text-gray-400">Unlock smarter travel with our tiered AI subscriptions.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <div className="bg-black border border-white/10 p-8 rounded-2xl hover:border-white/30 transition flex flex-col">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
               {/* Icon: Compass */}
               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">Explorer</h3>
            <div className="text-4xl font-black text-white mb-6">Free</div>
            <ul className="space-y-4 text-sm text-gray-400 mb-8 flex-1">
              <li>✓ Basic AI Guides</li>
              <li>✓ 3 Itineraries per month</li>
              <li>✓ Community Support</li>
            </ul>
            <button className="w-full py-3 border border-white/20 rounded-xl font-bold hover:bg-white/10 transition">Get Started</button>
          </div>

          {/* Pro Tier */}
          <div className="bg-zinc-900 border border-teal-500 p-8 rounded-2xl transform scale-105 shadow-[0_0_30px_rgba(20,184,166,0.2)] relative flex flex-col">
            <div className="absolute top-0 right-0 bg-teal-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">Most Popular</div>
            <div className="w-12 h-12 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
               {/* Icon: Map/Globe */}
               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-teal-400 mb-2">Adventurer</h3>
            <div className="text-4xl font-black text-white mb-6">$19<span className="text-lg font-normal text-gray-500">/mo</span></div>
            <ul className="space-y-4 text-sm text-gray-300 mb-8 flex-1">
              <li>✓ Unlimited AI Guides</li>
              <li>✓ Unlimited Auto-Plans</li>
              <li className="flex items-center gap-2">
                 <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                 <span className="text-teal-400 font-bold">Smart Audio Tours</span>
              </li>
              <li>✓ Offline Access</li>
            </ul>
            <button className="w-full py-3 bg-teal-500 text-black rounded-xl font-bold hover:bg-teal-400 transition">Upgrade Now</button>
          </div>

          {/* VIP Tier */}
          <div className="bg-black border border-purple-500/50 p-8 rounded-2xl hover:border-purple-500 transition flex flex-col">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
               {/* Icon: Crown */}
               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-purple-400 mb-2">Globetrotter</h3>
            <div className="text-4xl font-black text-white mb-6">$49<span className="text-lg font-normal text-gray-500">/mo</span></div>
            <ul className="space-y-4 text-sm text-gray-400 mb-8 flex-1">
              <li>✓ Everything in Adventurer</li>
              <li>✓ <span className="text-purple-400 font-bold">Live Human Concierge</span></li>
              <li>✓ VIP Hotel Booking</li>
              <li>✓ 24/7 Priority Support</li>
            </ul>
            <button className="w-full py-3 border border-purple-500/50 text-purple-400 rounded-xl font-bold hover:bg-purple-500/10 transition">Go VIP</button>
          </div>
        </div>
      </section>

      {/* 6. AUTO PLANNER (Existing) */}
      <section id="autoplan" className="py-24 bg-zinc-900 border-t border-white/10 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-900/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">🤖 AI TRIP DESIGNER</h2>
            <p className="text-gray-400">Enter your budget and style. Gemini will build a custom itinerary instantly.</p>
          </div>
          
          {/* INPUT FORM */}
          <div className="bg-black p-8 rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row gap-4 mb-10">
            <div className="flex-1">
              <label className="text-xs text-gray-500 uppercase font-bold ml-1 mb-1 block">Your Budget</label>
              <input 
                type="number" 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 2000" 
                className="w-full bg-zinc-900 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-teal-500 transition" 
              />
            </div>
            <div className="flex-[2]">
              <label className="text-xs text-gray-500 uppercase font-bold ml-1 mb-1 block">Interests</label>
              <input 
                type="text" 
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g. Hiking, History, Italian Food" 
                className="w-full bg-zinc-900 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-teal-500 transition" 
              />
            </div>
            <div className="flex items-end">
              <button 
                onClick={handleAutoPlan}
                disabled={loadingPlan}
                className="w-full md:w-auto bg-teal-500 hover:bg-teal-400 text-black font-black px-10 py-4 rounded-xl transition disabled:opacity-50"
              >
                {loadingPlan ? 'THINKING...' : 'GENERATE'}
              </button>
            </div>
          </div>

          {/* RESULTS DISPLAY */}
          {plan && (
            <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-3xl border border-teal-500/30 animate-fade-in-up mt-10 shadow-2xl">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-6 gap-4">
                <div>
                  <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">{plan.tripTitle}</h3>
                  <div className="flex items-center gap-3">
                    <span className="bg-teal-500 text-black px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                      Recommended Hotel
                    </span>
                    <span className="text-gray-300 text-sm">{plan.hotelRecommendation}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Estimated Cost</p>
                  <p className="text-4xl font-black text-teal-400">{plan.totalCost}</p>
                </div>
              </div>

              <div className="space-y-6">
                {plan.days?.map((day: any) => (
                  <div key={day.day} className="relative pl-8 border-l-2 border-zinc-800 hover:border-teal-500 transition-colors duration-300">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
                    <h4 className="font-bold text-white text-lg mb-1">Day {day.day}: <span className="text-teal-200 font-normal">{day.theme}</span></h4>
                    <div className="grid md:grid-cols-3 gap-4 mt-3 text-sm">
                      <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <span className="text-xs text-gray-500 uppercase font-bold block mb-1">🌅 Morning</span>
                        <p className="text-gray-300">{day.morning}</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <span className="text-xs text-gray-500 uppercase font-bold block mb-1">☀️ Afternoon</span>
                        <p className="text-gray-300">{day.afternoon}</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                        <span className="text-xs text-gray-500 uppercase font-bold block mb-1">🌙 Evening</span>
                        <p className="text-gray-300">{day.evening}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <button className="text-teal-500 hover:text-white text-sm font-bold uppercase tracking-widest transition">
                  Save this Itinerary to Profile →
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
      
      <Footer />
    </main>
  );
}
