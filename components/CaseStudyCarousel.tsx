
import React, { useRef } from 'react';

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  description: string;
  imageUrl: string;
  metric: string;
  impact: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-01',
    client: 'NEBULA DYNAMICS',
    industry: 'GLOBAL LOGISTICS',
    description: 'Replaced a 400-person scheduling department with a single TORQUE Forge cluster. Zero human-error shipments recorded since deployment.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
    metric: '99.99%',
    impact: 'AUTONOMY_RATIO'
  },
  {
    id: 'cs-02',
    client: 'TITAN PETRO-SYSTEMS',
    industry: 'ENERGY EXTRACTION',
    description: 'Deep-sea rig maintenance performed by autonomous agents built on TORQUE Leverage SDK. 42% reduction in operational risk.',
    imageUrl: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1200',
    metric: '42%',
    impact: 'RISK_SUBTRACTION'
  },
  {
    id: 'cs-03',
    client: 'ZENITH FINCORP',
    industry: 'ALGORITHMIC BANKING',
    description: 'Real-time fraud neutralization at the hardware level. TORQUE agents now handle $4B in daily transactions with zero leakage.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    metric: '$4.2B',
    impact: 'DAILY_CLEARED'
  },
  {
    id: 'cs-04',
    client: 'STARLIGHT AEROSPACE',
    industry: 'ORBITAL INFRASTRUCTURE',
    description: 'Fleet optimization for low-orbit satellite constellations. Sovereign agents negotiate bandwidth swaps without Earth-link latency.',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200',
    metric: '-240ms',
    impact: 'LATENCY_DECAY'
  }
];

const CaseStudyCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full mt-32 space-y-12">
      <div className="flex items-end justify-between px-2">
        <div className="space-y-2">
          <span className="text-brand-rust font-black text-[10px] tracking-[0.4em] uppercase">Impact_Chronicles_v4.2</span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">SOVEREIGN_SUCCESS</h2>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="p-4 border border-brand-teal/20 hover:border-brand-rust hover:text-brand-rust transition-all group"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-4 border border-brand-teal/20 hover:border-brand-rust hover:text-brand-rust transition-all group"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CASE_STUDIES.map((study) => (
          <div 
            key={study.id}
            className="flex-none w-full md:w-[85%] lg:w-[70%] snap-center relative group overflow-hidden industrial-border bg-brand-grime"
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Image Section */}
              <div className="w-full md:w-1/2 aspect-video md:aspect-auto overflow-hidden relative">
                <img 
                  src={study.imageUrl} 
                  alt={study.client}
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-transparent to-transparent hidden md:block" />
                <div className="absolute inset-0 bg-brand-rust/10 mix-blend-overlay group-hover:bg-transparent transition-colors" />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-brand-black/40 backdrop-blur-md relative">
                <div className="space-y-6">
                  <div>
                    <span className="text-brand-teal font-black text-[9px] tracking-widest uppercase mb-1 block opacity-60 italic">DEPLOYMENT_SITE: {study.industry}</span>
                    <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none group-hover:text-brand-flash transition-colors">
                      {study.client}
                    </h3>
                  </div>
                  
                  <p className="text-neutral-400 text-sm md:text-lg font-bold leading-relaxed italic border-l-2 border-brand-rust/50 pl-6 uppercase tracking-tight">
                    {study.description}
                  </p>
                </div>

                <div className="mt-12 flex items-end justify-between border-t border-brand-teal/10 pt-8">
                  <div className="space-y-1">
                    <span className="text-[10px] text-brand-bronze font-black uppercase tracking-widest opacity-70">METRIC_IMPACT</span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl md:text-6xl font-black text-brand-flash italic leading-none drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                        {study.metric}
                      </span>
                      <span className="text-[10px] text-brand-teal font-black uppercase tracking-widest mb-1">{study.impact}</span>
                    </div>
                  </div>
                  
                  <button className="hidden md:block bg-transparent border border-brand-teal/30 text-brand-teal px-6 py-3 text-[10px] font-black tracking-widest hover:bg-brand-teal hover:text-black transition-all uppercase clip-path-polygon-[10%_0,100%_0,90%_100%,0_100%]">
                    READ_INTEL
                  </button>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M12 22v-5M9 8V2h6v6M12 17V8M6 13h12" />
                   </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudyCarousel;
