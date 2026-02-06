
import React from 'react';
import { Product } from '../types';
import { TorqueBotMascot } from '../constants';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  onOpen?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, compact, onOpen }) => {
  return (
    <div 
      onClick={() => onOpen?.(product)}
      className={`industrial-border bg-brand-grime/50 backdrop-blur-sm overflow-hidden group transition-all duration-500 hover:glow-rust relative cursor-pointer ${compact ? 'max-w-xs' : 'flex flex-col h-full'}`}
    >
      <div className="aspect-[16/10] overflow-hidden relative border-b border-brand-bronze/20">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
        />
        {/* Subtle Mascot Watermark on Image */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity duration-500">
            <TorqueBotMascot className="w-24 h-24 grayscale brightness-200" />
        </div>
        
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {product.tags.map(tag => (
            <span key={tag} className="text-[9px] font-black tracking-tighter bg-brand-teal/80 text-white px-2 py-1 uppercase clip-path-polygon-[10%_0%,100%_0%,90%_100%,0%_100%] backdrop-blur-md border border-white/10">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1 relative">
        {/* Tiny mascot icon in the background of the content area */}
        <div className="absolute bottom-4 left-4 w-12 h-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <TorqueBotMascot className="w-full h-full" />
        </div>

        <h3 className="text-2xl font-black mb-3 text-white tracking-tighter uppercase leading-[0.9] group-hover:text-brand-flash transition-colors">{product.name}</h3>
        
        {!compact && (
          <p className="text-neutral-500 text-[11px] mb-8 font-bold leading-relaxed italic border-l-2 border-brand-bronze/50 pl-4 uppercase tracking-tighter">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-teal/10">
          <div className="flex flex-col">
            <span className="text-[9px] text-brand-bronze font-black uppercase tracking-widest opacity-70">Price_Input</span>
            <span className="text-brand-flash font-mono font-black text-2xl leading-none italic">${product.price}</span>
          </div>
          <button 
            className="bg-brand-rust text-white px-7 py-3 text-[11px] font-black tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 clip-path-polygon-[0%_0%,100%_0%,100%_75%,85%_100%,0%_100%] shadow-[4px_4px_0px_rgba(183,65,2,0.3)]"
            onClick={(e) => {
              e.stopPropagation();
              onOpen?.(product);
            }}
          >
            DEPLOY_ASSET
          </button>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-brand-teal/20 group-hover:border-brand-flash/50 transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-brand-teal/20 group-hover:border-brand-flash/50 transition-colors"></div>
    </div>
  );
};

export default ProductCard;
