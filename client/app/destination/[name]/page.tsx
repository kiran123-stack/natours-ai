'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Header from '../../../components/Header';
import Image from 'next/image';

export default function DestinationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const destinationName = decodeURIComponent(params.name as string);
  const bgImage = searchParams.get('img') || '';

  const [aiData, setAiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);

  // FETCH AI DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/v1/ai/info', {
          destination: destinationName
        });
        setAiData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [destinationName]);

  // TEXT TO SPEECH FUNCTION
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop previous speech
      window.speechSynthesis.cancel();

      // Split text into sentences for highlighting
      const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
      
      let sentenceIndex = 0;

      const speakNextSentence = () => {
        if (sentenceIndex >= sentences.length) {
          setIsSpeaking(false);
          setCurrentSentenceIndex(-1);
          return;
        }

        const utterance = new SpeechSynthesisUtterance(sentences[sentenceIndex]);
        utterance.rate = 1; // Speed
        utterance.pitch = 1;
        
        // When this sentence starts, highlight it
        utterance.onstart = () => setCurrentSentenceIndex(sentenceIndex);
        
        // When it ends, go to next
        utterance.onend = () => {
          sentenceIndex++;
          speakNextSentence();
        };

        window.speechSynthesis.speak(utterance);
      };

      setIsSpeaking(true);
      speakNextSentence();
    } else {
      alert("Your browser does not support AI Speech!");
    }
  };

  const handleTalkClick = () => {
    if (aiData) {
      speak(aiData.summary);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      <div className="flex flex-col md:flex-row h-screen pt-20">
        
        {/* LEFT: AVATAR & VISUALS */}
        <div className="w-full md:w-1/2 relative h-[50vh] md:h-full">
          <Image 
            src={bgImage} 
            alt="Background" 
            fill 
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          
          {/* AI AVATAR CIRCLE */}
          <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 flex items-center gap-4">
            <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-teal-500 overflow-hidden ${isSpeaking ? 'animate-pulse' : ''}`}>
               {/* Placeholder Avatar Image - Replace with any avatar URL */}
               <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Felix" alt="AI Avatar" className="w-full h-full bg-zinc-800" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase text-white">{destinationName}</h1>
              <button 
                onClick={handleTalkClick}
                className="mt-2 bg-teal-500 text-black font-bold px-4 py-2 rounded-full text-sm hover:scale-105 transition flex items-center gap-2"
              >
                {isSpeaking ? '🔊 Speaking...' : '▶ Listen to Guide'}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: CONTENT & TRANSCRIPT */}
        <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto bg-zinc-950 border-l border-white/10">
          
          {loading ? (
            <div className="text-teal-500 animate-pulse text-xl font-mono">Loading AI Knowledge...</div>
          ) : aiData ? (
            <div className="space-y-8">
              
              {/* SUMMARY (KARAOKE HIGHLIGHTING) */}
              <div>
                <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-4">AI Summary</h3>
                <div className="text-lg md:text-2xl font-light leading-relaxed text-gray-400">
                  {aiData.summary.match(/[^\.!\?]+[\.!\?]+/g)?.map((sentence: string, index: number) => (
                    <span 
                      key={index} 
                      className={`transition-colors duration-300 ${index === currentSentenceIndex ? 'text-teal-400 font-medium bg-teal-900/30' : ''}`}
                    >
                      {sentence} 
                    </span>
                  )) || aiData.summary}
                </div>
              </div>

              {/* STATS BOXES */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-zinc-900 p-4 rounded-xl border border-white/5">
                    <span className="text-xs text-gray-500 uppercase">Best Time</span>
                    <div className="text-xl font-bold text-white">{aiData.bestTime}</div>
                 </div>
                 <div className="bg-zinc-900 p-4 rounded-xl border border-white/5">
                    <span className="text-xs text-gray-500 uppercase">Local Dish</span>
                    <div className="text-xl font-bold text-white">{aiData.localDish}</div>
                 </div>
              </div>
              
              {/* TOP ATTRACTIONS LIST */}
              <div>
                <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-4">Top Attractions</h3>
                <ul className="space-y-2">
                  {aiData.topAttractions?.map((place: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg border border-white/5">
                      <span className="bg-teal-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{i+1}</span>
                      {place}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="text-red-500">Failed to load data.</div>
          )}
        </div>

      </div>
    </main>
  );
}