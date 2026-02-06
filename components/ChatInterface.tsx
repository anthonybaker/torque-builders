
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Product, ChatMessage } from '../types';
import { PRODUCTS, TorqueBotMascot, LogoIcon } from '../constants';
import ProductCard from './ProductCard';

interface ChatInterfaceProps {
  onClose: () => void;
  onProductClick?: (product: Product) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose, onProductClick }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMsg: ChatMessage = {
        id: 'initial',
        role: 'assistant',
        text: "LINK_SYNC: SECURE.\n[TORQUE_UNIT] DEPLOYED.\nMISSION: NOISE_SUBTRACTION.\n\nState your intent, Builder. We provide the leverage. No fluff. No trap.",
        timestamp: Date.now()
      };
      setMessages([welcomeMsg]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const aiResponseText = await geminiService.getChatResponse(inputValue, PRODUCTS, history);

    const assistantMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: aiResponseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  const renderMessageText = (text: string) => {
    const parts = text.split(/(\[PRODUCT:[^\]]+\])/);
    
    return parts.map((part, i) => {
      const match = part.match(/\[PRODUCT:([^\]]+)\]/);
      if (match) {
        const productId = match[1];
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
          return (
            <div key={i} className="my-8 max-w-sm transform hover:scale-[1.02] transition-transform">
              <ProductCard product={product} compact onOpen={onProductClick} />
            </div>
          );
        }
      }
      return <span key={i} className="whitespace-pre-wrap">{part}</span>;
    });
  };

  return (
    <div className="fixed inset-0 bg-brand-black z-50 flex flex-col font-mono text-brand-teal overflow-hidden">
      {/* Tactical Terminal Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-brand-teal/30 bg-brand-grime shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 industrial-border p-1 bg-brand-black relative group overflow-hidden">
            <TorqueBotMascot className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-brand-flash opacity-5 pointer-events-none"></div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-black tracking-[0.4em] uppercase text-brand-flash">TORQUE_BOT.KINETIC</h2>
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-brand-rust animate-pulse" />
               <span className="text-[10px] text-brand-teal/80 uppercase font-bold">SOVEREIGN_LINK: ESTABLISHED</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-[9px] text-brand-rust font-bold uppercase">Rejecting_Noise: 100%</span>
                <span className="text-[9px] text-brand-teal/50">PROTOCOL: SUBTRACTIVE</span>
            </div>
            <button 
              onClick={onClose}
              className="group relative p-3 border border-brand-rust/30 bg-brand-black hover:bg-brand-rust transition-all"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="group-hover:text-white group-hover:rotate-90 transition-transform">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
        </div>
      </div>

      {/* Terminal Grid Output */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 py-10 space-y-10 relative"
      >
        {/* Subtle Brand Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02]">
            <LogoIcon className="w-[80%] h-[80%]" />
        </div>
        
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`relative max-w-[80%] md:max-w-[70%] ${
                msg.role === 'user' 
                ? 'bg-brand-rust/10 text-brand-rust border-brand-rust/40' 
                : 'bg-brand-grime/90 text-brand-teal border-brand-teal/20'
            } border-l-4 p-8 shadow-2xl backdrop-blur-md`}>
              {msg.role === 'assistant' && (
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-grime border border-brand-teal/50 p-1 flex items-center justify-center">
                  <TorqueBotMascot className="w-full h-full opacity-60" />
                </div>
              )}
              <div className="text-sm md:text-lg leading-relaxed tracking-tight font-medium">
                {renderMessageText(msg.text)}
              </div>
              <div className="mt-6 flex items-center justify-between opacity-30 text-[10px] font-bold">
                <span className="tracking-[0.2em] uppercase">T-STAMP: {new Date(msg.timestamp).toLocaleTimeString()}</span>
                <span className="tracking-[0.2em]">KINETIC_SYNC_ENABLED</span>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-brand-grime border border-brand-teal/20 p-5 flex items-center gap-4">
              <div className="w-8 h-8 opacity-50">
                <TorqueBotMascot className="w-full h-full animate-pulse" />
              </div>
              <span className="animate-pulse font-black text-xs tracking-widest text-brand-flash uppercase">Subtracting_Noise...</span>
            </div>
          </div>
        )}
      </div>

      {/* Industrial Terminal Input */}
      <div className="p-8 border-t border-brand-teal/20 bg-brand-black shadow-[0_-10px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto flex gap-6">
          <div className="flex-1 relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-rust font-black text-xl italic">{'>'}</span>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="DECLARE_INTENT..."
              className="w-full bg-brand-grime border border-brand-teal/20 pl-12 pr-8 py-5 focus:outline-none focus:border-brand-rust focus:bg-brand-grime/50 transition-all uppercase placeholder:text-brand-teal/20 text-md font-black tracking-widest text-brand-teal"
            />
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-rust transition-all group-focus-within:w-full"></div>
          </div>
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="bg-brand-rust text-white hover:bg-brand-flash hover:text-black disabled:opacity-20 p-5 px-10 transition-all duration-300 transform active:scale-95 flex items-center gap-3 shadow-[4px_4px_0px_rgba(183,65,2,0.3)] hover:shadow-none"
          >
            <span className="hidden md:inline font-black text-xs tracking-widest">SUBMIT</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="max-w-5xl mx-auto mt-4 flex justify-between px-2">
            <span className="text-[9px] text-brand-rust/50 font-black uppercase tracking-widest">Protocol: Reject Efficiency Trap</span>
            <span className="text-[9px] text-brand-teal/30 font-bold uppercase tracking-widest">Link: Rogue Industrialist</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
