import React from 'react';
import { motion } from 'motion/react';
import { Phone, Heart, Zap, Star, MessageSquare, Instagram } from 'lucide-react';
import { OWNER_NUMBER, WHATSAPP_LINK, INSTAGRAM_LINK } from '../constants';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b-2 border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-500 overflow-hidden border-2 border-[#1A1A1A]">
              <img 
                src="https://res.cloudinary.com/dicpwgdap/image/upload/v1774532523/WhatsApp_Image_2026-03-26_at_6.40.21_PM_rxqkuv.jpg" 
                alt="Fit Buddies Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-[#1A1A1A] font-black text-3xl tracking-tighter uppercase leading-none italic">FIT</span>
            <span className="text-red-600 font-black text-xl tracking-widest uppercase leading-none italic">BUDDIES</span>
          </div>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-10">
          <a href="#products" className="text-[#1A1A1A] font-black uppercase tracking-tight hover:text-red-600 transition-colors">Products</a>
          <a href="#reviews" className="text-[#1A1A1A] font-black uppercase tracking-tight hover:text-red-600 transition-colors">Reviews</a>
          <a href="#about" className="text-[#1A1A1A] font-black uppercase tracking-tight hover:text-red-600 transition-colors">About</a>
        </div>

        <div className="flex items-center gap-4">
          <motion.a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3.5 rounded-2xl flex items-center gap-3 font-black uppercase tracking-tight transition-all shadow-[6px_6px_0px_0px_rgba(37,211,102,0.3)]"
            title="Connect on WhatsApp"
          >
            <MessageSquare size={20} />
            <span className="hidden sm:inline">WhatsApp</span>
          </motion.a>

          <motion.a 
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] hover:scale-105 text-white p-3.5 rounded-2xl flex items-center gap-3 font-black uppercase tracking-tight transition-all shadow-[6px_6px_0px_0px_rgba(230,104,60,0.3)]"
            title="Follow on Instagram"
          >
            <Instagram size={20} />
            <span className="hidden sm:inline">Instagram</span>
          </motion.a>
        </div>
      </div>
    </nav>
  );
}
