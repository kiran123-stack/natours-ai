'use client';

import { useState } from 'react';
import Header from '../components/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import SmartDestination from './SmartDestination';
import Footer from '../components/Footer';

export default function Home() {
  // --- STATE FOR AUTO PLANNER ---
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState('');
  const [plan, setPlan] = useState<any>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);

  // --- FUNCTION TO GENERATE PLAN ---
  const handleAutoPlan = async () => {
    if (!budget || !interests) return alert("Please enter budget and interests!");
    setLoadingPlan(true);
    setPlan(null); // Reset previous plan

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
const res = await axios.post(`${API_URL}/api/v1/ai/plan`, {
        budget,
        interests
      });
      setPlan(res.data.data);
    } catch (err) {
      alert("AI Connect Failed");
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

      {/* 1. NEW HERO SLIDER (Full Width Fade) */}
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

      {/* 2. GALLERY GRID (6 Items) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-4xl font-thin">TRENDING <span className="font-bold text-teal-500">NOW</span></h2>
          <span className="text-gray-500 text-sm uppercase tracking-widest">Explore All</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            // Reusing your smart component for the grid
            <div key={index} className="h-[400px]">
              <SmartDestination name={item.name} initialImage={item.img} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. WORKING AUTO PLANNER */}
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
              
              {/* HEADER: Title & Cost */}
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

              {/* TIMELINE: Day by Day */}
              <div className="space-y-6">
                {plan.days?.map((day: any) => (
                  <div key={day.day} className="relative pl-8 border-l-2 border-zinc-800 hover:border-teal-500 transition-colors duration-300">
                    {/* Day Number Badge */}
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

              {/* ACTION BUTTON */}
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