import React from 'react';
import { motion } from 'motion/react';
import { Check, Star, Heart } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    protein: string;
    color: string;
    image: string;
    features: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-[3rem] overflow-hidden border-4 border-[#1A1A1A] transition-all duration-500 shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] hover:shadow-[16px_16px_0px_0px_rgba(239,68,68,1)]"
    >
      <div className="aspect-square relative overflow-hidden bg-[#FDFCF8] border-b-4 border-[#1A1A1A]">
        <div 
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at center, ${product.color}, transparent)` }}
        />
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain p-12 relative z-10 group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute top-8 right-8 z-20">
          <div className="bg-red-600 text-white px-6 py-2 rounded-2xl text-base font-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] uppercase tracking-tight">
            {product.protein} PROTEIN
          </div>
        </div>
      </div>

      <div className="p-10 relative z-20">
        <h3 className="text-3xl font-black text-[#1A1A1A] mb-4 group-hover:text-red-600 transition-colors uppercase tracking-tighter">
          {product.name}
        </h3>
        <p className="text-xl text-[#4A4A4A] mb-8 line-clamp-2 font-medium leading-snug">
          {product.description}
        </p>

        <div className="grid grid-cols-1 gap-4 mb-10">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-base font-black text-[#1A1A1A] uppercase tracking-tight">
              <div className="w-6 h-6 rounded-lg bg-red-600/10 flex items-center justify-center border border-red-600/20">
                <Check size={14} className="text-red-600" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <button className="w-full bg-[#1A1A1A] text-white hover:bg-red-600 py-6 rounded-2xl font-black text-xl uppercase tracking-tight transition-all duration-300 flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(239,68,68,0.3)]">
          <span>Explore Flavor</span>
          <Heart size={24} className="group-hover:fill-white transition-all" />
        </button>
      </div>
    </motion.div>
  );
}
