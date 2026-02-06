
import React, { useState, useEffect } from 'react';
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: "torque-forge-01",
    name: "Forge Engine V1",
    description: "Industrial-grade neural orchestrator. Built for high-torque agentic reasoning and zero-latency decision loops.",
    tags: ["Core", "Compute", "Steel"],
    imageUrl: "https://storage.googleapis.com/rga-image-to-url/9pIn88_T.png",
    price: 2400
  },
  {
    id: "torque-lever-sdk",
    name: "Leverage SDK Pro",
    description: "The 'Infinite Leverage' development suite. Hardened libraries for recursive tool-use and multi-bot synchronization.",
    tags: ["SDK", "Software", "Leverage"],
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800",
    price: 99
  },
  {
    id: "torque-engine-sdk-v1",
    name: "TORQUE ENGINE SDK v1.0",
    description: "Uncompromised neural interface for autonomous software outcomes. Engineered for high-velocity agentic logic.",
    tags: ["SDK", "Core"],
    imageUrl: "https://storage.googleapis.com/rga-image-to-url/20GQjTM5.png",
    price: 59.99
  },
  {
    id: "torque-biker-jacket",
    name: "TORQUE BIKER JACKET",
    description: "Industrial-grade chassis for the human frame. Reinforced armor for the Rogue Industrialist lifestyle.",
    tags: ["Gear", "Armor"],
    imageUrl: "https://storage.googleapis.com/rga-image-to-url/GiK5Pf6v.png",
    price: 359.99
  },
  {
    id: "torque-cap",
    name: "TORQUE CAP",
    description: "Noise-rejection tactical headwear. Low profile, high impact multiplication for elite builders.",
    tags: ["Gear", "Tactical"],
    imageUrl: "https://storage.googleapis.com/rga-image-to-url/dsst9EIb.png",
    price: 19.99
  },
  {
    id: "torque-bot-figurine",
    name: "TORQUE BOT FIGURINE",
    description: "Desktop-scale agent manifestation. Precision molded for builders who value sovereign aesthetics.",
    tags: ["Collectible", "Mascot"],
    imageUrl: "https://storage.googleapis.com/rga-image-to-url/N_CDpIil.png",
    price: 39.99
  },
  {
    id: "torque-rust-frame",
    name: "Oxidized Chassis v4",
    description: "Ruggedized exterior housing for edge nodes. Weathered bronze finish with Molton Rust accents. Built to last the singularity.",
    tags: ["Hardware", "Chassis", "Rugged"],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    price: 650
  },
  {
    id: "torque-arc-capacitor",
    name: "Arc Flash Power Cell",
    description: "High-density power storage for mobile agent platforms. Delivers a steady FFD700 surge for intensive compute cycles.",
    tags: ["Power", "Battery", "Arc"],
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    price: 320
  }
];

export const LogoIcon = ({ className = "" }: { className?: string }) => (
  <img 
    src="https://storage.googleapis.com/rga-image-to-url/F51nyWbc.png" 
    alt="TORQUE Logo" 
    className={`object-contain transition-all duration-700 brightness-110 contrast-125 select-none ${className}`} 
  />
);

export const TorqueBotMascot = ({ className = "" }: { className?: string }) => {
  const [frame, setFrame] = useState(0);
  const frames = [
    "https://storage.googleapis.com/rga-image-to-url/X-4FHA0c.png",
    "https://storage.googleapis.com/rga-image-to-url/zJrk4AyP.png",
    "https://storage.googleapis.com/rga-image-to-url/yrWHt4xw.png",
    "https://storage.googleapis.com/rga-image-to-url/iIL4A8-1.png",
    "https://storage.googleapis.com/rga-image-to-url/GGaGM-7j.png",
    "https://storage.googleapis.com/rga-image-to-url/DwDEO45W.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 120); // Kinetic speed for industrial movement
    return () => clearInterval(interval);
  }, [frames.length]);

  return (
    <img 
      src={frames[frame]} 
      alt="Torque Bot" 
      className={`object-contain drop-shadow-[0_0_15px_rgba(74,124,115,0.3)] select-none ${className}`}
    />
  );
};
