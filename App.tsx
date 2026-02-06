
import React, { useState, useEffect } from 'react';
import { PRODUCTS, LogoIcon, TorqueBotMascot } from './constants';
import { Product } from './types';
import ProductCard from './components/ProductCard';
import ChatInterface from './components/ChatInterface';
import ProductModal from './components/ProductModal';
import CaseStudyCarousel from './components/CaseStudyCarousel';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const playTronSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const playPulse = (freq: number, startTime: number, duration: number, type: 'bass' | 'digital') => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = type === 'bass' ? 'sawtooth' : 'square';
        osc.frequency.setValueAtTime(freq, startTime);
        
        if (type === 'bass') {
          // Deep descending sub-bass growl
          osc.frequency.exponentialRampToValueAtTime(freq * 0.5, startTime + duration);
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1200, startTime);
          filter.frequency.exponentialRampToValueAtTime(20, startTime + duration);
        } else {
          // Digital re-rez sweep
          osc.frequency.exponentialRampToValueAtTime(freq * 3, startTime + duration * 0.5);
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(3000, startTime);
          filter.frequency.exponentialRampToValueAtTime(150, startTime + duration);
        }

        filter.Q.setValueAtTime(15, startTime);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.25, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      // Layered sound for that "cool" high-fidelity feel
      playPulse(55, ctx.currentTime, 2.5, 'bass'); // Deep A1
      playPulse(56, ctx.currentTime + 0.02, 2.5, 'bass'); // Detuned layer
      playPulse(1200, ctx.currentTime, 1.2, 'digital'); // High sweep
      playPulse(2200, ctx.currentTime + 0.1, 0.8, 'digital'); // Digital artifact
    } catch (e) {
      console.warn("Audio sync failed: check browser permissions", e);
    }
  };

  const triggerEasterEgg = () => {
    setIsEasterEggActive(true);
    playTronSound();
    setTimeout(() => setIsEasterEggActive(false), 3000);
  };

  return (
    <div className={`min-h-screen bg-brand-black text-white selection:bg-brand-rust selection:text-white transition-colors duration-500 ${isEasterEggActive ? 'bg-brand-teal/20' : ''}`}>
      <style>{`
        @keyframes waveSweep {
          0% { transform: translateX(-100%) skewX(-20deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%) skewX(-20deg); opacity: 0; }
        }
        .neon-wave {
          position: fixed;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #00F5FF, transparent);
          z-index: 9999;
          pointer-events: none;
          animation: waveSweep 1.5s ease-in-out forwards;
          box-shadow: 0 0 100px #00F5FF;
        }
        .flicker-text {
          animation: flameFlicker 0.15s infinite alternate;
        }
        @keyframes flameFlicker {
          0% { opacity: 1; transform: scale(1); filter: blur(0px) brightness(1); }
          50% { opacity: 0.85; transform: scale(1.01) translateY(-1px); filter: blur(1px) brightness(1.2); }
          100% { opacity: 0.95; transform: scale(0.99) translateX(1px); filter: blur(0.5px) brightness(1.1); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Easter Egg Overlay */}
      {isEasterEggActive && (
        <>
          <div className="neon-wave" />
          <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <h2 className="text-5xl md:text-9xl font-black text-[#00F5FF] tracking-tighter uppercase flicker-text drop-shadow-[0_0_60px_#00F5FF]">
              YOU ARE TORQUE NOW
            </h2>
          </div>
        </>
      )}

      {/* Full Screen Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black animate-in fade-in duration-500">
          <button 
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-8 right-8 z-[210] p-4 text-white hover:text-brand-flash transition-all bg-brand-black/50 backdrop-blur-md border border-white/20 hover:border-brand-flash group"
            aria-label="Close Video"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:rotate-90 transition-transform">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <video 
            src="https://image2url.com/r2/default/videos/1770349446942-a15f9caf-7a90-4f98-9e76-c8a4ef72d62e.mp4"
            className="w-full h-full object-cover"
            autoPlay
            controls
            loop
          />
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-black/95 backdrop-blur-xl border-b border-brand-bronze/30 px-6 py-4 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-8 group cursor-pointer">
          <div className="w-32 h-32 -my-8 transition-all duration-700 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(255,215,0,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(255,215,0,0.7)]">
             <LogoIcon className="w-full h-full" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl md:text-2xl font-black tracking-[0.2em] text-brand-bronze uppercase opacity-90 underline decoration-brand-rust decoration-2">
              Sovereign Edge Systems
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Easter Egg Trigger */}
          <button 
            onClick={triggerEasterEgg}
            className="w-10 h-10 rounded-none border border-[#00F5FF]/40 flex items-center justify-center text-[#00F5FF] hover:bg-[#00F5FF] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,245,255,0.2)]"
            title="KINETIC_SYNC_OVERRIDE"
          >
            <div className="w-2 h-2 bg-[#00F5FF] rounded-full animate-ping" />
          </button>

          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`relative group px-8 py-3 font-black text-xs tracking-[0.3em] uppercase transition-all duration-500 overflow-hidden ${
              isChatOpen 
              ? 'bg-brand-rust text-white glow-rust' 
              : 'bg-brand-grime border border-brand-teal/40 text-brand-teal hover:border-brand-flash hover:text-brand-flash'
            }`}
          >
            <span className="relative z-10 flex items-center gap-3">
               <div className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse shadow-[0_0_10px_#668E23]" />
               {isChatOpen ? 'TERMINATE_SYNC' : 'ENGAGE_AGENT'}
            </span>
            <div className="absolute inset-0 bg-brand-flash scale-x-0 group-hover:scale-x-100 transition-transform origin-left opacity-10"></div>
          </button>
        </div>
      </nav>

      <main className="pt-28 pb-12 px-6">
        {isChatOpen ? (
          <ChatInterface 
            onClose={() => setIsChatOpen(false)} 
            onProductClick={(product) => setSelectedProduct(product)}
          />
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="relative mb-24 py-20 flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1 z-10">
                  <div className="inline-block px-4 py-1.5 mb-8 bg-brand-teal/20 border border-brand-teal/40 text-brand-teal font-mono text-xs tracking-[0.3em] uppercase">
                    Status: Dismantling the Efficiency Trap
                  </div>
                  
                  <h1 className="text-7xl md:text-[9rem] font-black mb-6 tracking-tighter leading-[0.8] uppercase select-none">
                    MULTIPLY<br />
                    <span className="text-brand-rust drop-shadow-[0_0_30px_rgba(183,65,2,0.2)]">IMPACT.</span>
                  </h1>
                  
                  <div className="max-w-2xl p-10 bg-brand-grime/80 industrial-border backdrop-blur-sm group hover:border-brand-rust transition-colors">
                    <p className="text-xl text-neutral-400 leading-relaxed font-bold uppercase tracking-tight italic">
                      Strip away the noise. Sovereign edge agents for the <span className="text-white">Burned Out Believer</span>. <br />
                      Turning complex intent into <span className="text-brand-flash underline decoration-brand-rust underline-offset-8">Autonomous Action</span>.
                    </p>
                    <div className="mt-8 flex gap-4">
                        <button 
                          onClick={() => setIsVideoModalOpen(true)}
                          className="bg-brand-rust px-8 py-4 text-xs font-black tracking-widest uppercase hover:bg-brand-flash hover:text-black transition-all"
                        >
                          Claim Sovereignty
                        </button>
                        <button className="border border-brand-teal/30 px-8 py-4 text-xs font-black tracking-widest uppercase hover:border-brand-teal transition-all">Reject Noise</button>
                    </div>
                  </div>
               </div>

               {/* Prominent Hero Mascot */}
               <div className="relative flex-1 flex justify-center items-center">
                  <div className="absolute inset-0 bg-brand-rust/5 rounded-full blur-[120px] animate-pulse"></div>
                  <TorqueBotMascot className="w-full max-w-md md:max-w-lg lg:max-w-2xl transform hover:scale-105 transition-transform duration-1000 z-0 opacity-90" />
               </div>
            </div>

            {/* Catalog Section */}
            <div className="flex items-center gap-8 mb-16">
               <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-rust to-brand-rust"></div>
               <div className="flex flex-col items-center">
                  <h2 className="text-lg font-black tracking-[0.8em] text-brand-flash uppercase mb-2">INDUSTRIAL_FORGE</h2>
                  <span className="text-[10px] font-mono text-brand-bronze uppercase">Protocol: Kinetic Empowerment</span>
               </div>
               <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-brand-teal to-brand-teal"></div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {PRODUCTS.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onOpen={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>

            {/* Success Chronicles Carousel */}
            <CaseStudyCarousel />

            {/* Tactical Footer */}
            <footer className="mt-40 pt-20 border-t border-brand-grime flex flex-col md:flex-row justify-between items-start gap-12 text-[10px] font-mono tracking-widest bg-gradient-to-b from-transparent to-brand-grime/30 px-8 pb-12">
              <div className="flex flex-col gap-6">
                 <div className="flex items-center gap-6">
                    <div className="w-24 h-24 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                        <LogoIcon className="w-full h-full hover:rotate-6" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-lg md:text-xl font-black tracking-[0.2em] text-brand-bronze uppercase opacity-90 underline decoration-brand-rust decoration-2">
                          Sovereign_Edge_Only
                        </span>
                    </div>
                 </div>
                 <p className="text-neutral-500 max-w-sm leading-relaxed border-l border-brand-rust pl-4 italic">
                    DISMANTLING THE WESTERN EFFICIENCY TRAP. <br />
                    AUTONOMOUS SOFTWARE OUTCOMES THROUGH CULTURAL INTENT. <br />
                    KINETIC. UNYIELDING. SUBTRACTIVE.
                 </p>
              </div>
              
              <div className="grid grid-cols-2 gap-x-20 gap-y-6 text-brand-teal">
                <a href="#" className="hover:text-brand-flash transition-all hover:translate-x-1">_SOVEREIGN_CORE</a>
                <a href="#" className="hover:text-brand-flash transition-all hover:translate-x-1">_EDGE_PROTOCOLS</a>
                <a href="#" className="hover:text-brand-flash transition-all hover:translate-x-1">_IMPACT_SDK</a>
                <a href="#" className="hover:text-brand-flash transition-all hover:translate-x-1">_AUTONOMOUS_MODELS</a>
                <a href="#" className="hover:text-brand-flash transition-all hover:translate-x-1">_FORGE_MANIFESTO</a>
                <a href="#" className="hover:text-brand-flash transition-all hover:translate-x-1">_NOISE_REJECTION</a>
              </div>

              <div className="flex flex-col gap-4 items-end text-brand-bronze">
                <div className="w-24 h-24 opacity-30 group hover:opacity-100 transition-opacity">
                    <TorqueBotMascot className="w-full h-full grayscale hover:grayscale-0" />
                </div>
                <div className="text-right flex flex-col items-end">
                    <span className="font-bold text-white mb-1 tracking-widest italic uppercase">Rogue Industrialist Unit</span>
                    <span className="opacity-50 uppercase">FORGE_ID: KINETIC_X01</span>
                    <span className="opacity-30">© 2024 TORQUE_CORP</span>
                </div>
              </div>
            </footer>
          </div>
        )}
      </main>

      {/* Global Product Detail Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};

export default App;
