
import React, { useEffect } from 'react';
import { Product } from '../types';
import { TorqueBotMascot } from '../constants';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [product]);

  if (!product) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto industrial-border bg-brand-grime shadow-[0_0_100px_rgba(183,65,2,0.15)] flex flex-col md:flex-row group animate-in zoom-in-95 duration-500">
        
        {/* Decorative Mascot (Background) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
          <TorqueBotMascot className="w-full h-full" />
        </div>

        {/* Product Image Section */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative border-b md:border-b-0 md:border-r border-brand-bronze/20 overflow-hidden bg-black">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-10000 hover:scale-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent pointer-events-none" />
          
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            {product.tags.map(tag => (
              <span key={tag} className="text-[10px] font-black tracking-widest bg-brand-rust text-white px-3 py-1.5 uppercase clip-path-polygon-[10%_0%,100%_0%,90%_100%,0%_100%] shadow-lg border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col relative z-10">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-brand-teal hover:text-brand-flash transition-colors group/close"
            aria-label="Close modal"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="mb-10">
            <span className="text-[10px] text-brand-rust font-black tracking-[0.4em] uppercase mb-4 block animate-pulse">Asset_Manifest_v2.0</span>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6 group-hover:text-brand-flash transition-colors">
              {product.name}
            </h2>
            <div className="h-1 w-24 bg-brand-rust mb-8" />
            <p className="text-neutral-400 text-lg md:text-xl font-bold italic leading-relaxed uppercase border-l-4 border-brand-teal/30 pl-6 mb-10">
              {product.description}
            </p>
          </div>

          <div className="mt-auto space-y-8">
            <div className="flex items-end justify-between border-b border-brand-teal/10 pb-6">
              <div className="flex flex-col">
                <span className="text-xs text-brand-bronze font-black uppercase tracking-widest mb-1 opacity-70">VALUATION_SYNC</span>
                <span className="text-brand-flash font-mono font-black text-4xl leading-none italic drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                  ${product.price}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-brand-teal font-bold uppercase tracking-widest block opacity-50 mb-1">Stock_Status</span>
                <span className="text-brand-green font-black text-xs uppercase tracking-widest">AV_LINK_ESTABLISHED</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => {
                  alert(`SYNCED: ${product.name} ADDED TO BUILD_QUEUE`);
                }}
                className="col-span-2 bg-brand-rust text-white py-6 font-black text-sm tracking-[0.3em] uppercase transition-all duration-300 hover:bg-brand-flash hover:text-black clip-path-polygon-[0%_0%,100%_0%,100%_85%,95%_100%,0%_100%] shadow-[0_0_20px_rgba(183,65,2,0.2)] active:scale-[0.98]"
              >
                ADD_TO_QUEUE
              </button>
              <button 
                onClick={onClose}
                className="col-span-2 md:col-span-1 border border-brand-teal/30 text-brand-teal py-4 font-black text-[10px] tracking-[0.2em] uppercase hover:bg-brand-teal/10 transition-colors"
              >
                RETURN_TO_FORGE
              </button>
              <button 
                className="hidden md:block border border-brand-bronze/30 text-brand-bronze py-4 font-black text-[10px] tracking-[0.2em] uppercase hover:bg-brand-bronze/10 transition-colors"
              >
                SHARE_INTEL
              </button>
            </div>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-brand-rust/30 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-brand-rust/30 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ProductModal;
