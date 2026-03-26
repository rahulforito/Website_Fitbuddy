import React from 'react';
import { Phone, Mail, MapPin, Heart, Zap, Star, MessageSquare, Instagram } from 'lucide-react';
import { OWNER_NUMBER, OWNER_EMAIL, OWNER_ADDRESS, WHATSAPP_LINK, INSTAGRAM_LINK } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white/70 py-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-4 mb-10 group cursor-pointer">
            <div className="relative">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-500 overflow-hidden border-2 border-white/20">
                <img 
                  src="https://res.cloudinary.com/dicpwgdap/image/upload/v1774532523/WhatsApp_Image_2026-03-26_at_6.40.21_PM_rxqkuv.jpg" 
                  alt="Fit Buddies Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="flex flex-col -gap-1">
              <span className="text-white font-black text-3xl tracking-tighter uppercase leading-none italic">FIT</span>
              <span className="text-red-600 font-black text-xl tracking-widest uppercase leading-none italic">BUDDIES</span>
            </div>
          </div>
          <p className="text-2xl leading-tight max-w-md mb-12 text-white/60 font-medium">
            Guilt-free snacking for a healthy heart. High protein, no palm oil, and purely baked. 
            Join the revolution of healthy snacking with Fit Buddies.
          </p>
          <div className="flex items-center gap-6">
             <a href="#" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-red-600 transition-all border border-white/10">
               <Heart size={28} className="text-red-500 fill-red-500" />
             </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-black text-xl mb-10 uppercase tracking-widest">Quick Links</h3>
          <ul className="space-y-6">
            <li><a href="#products" className="text-xl font-medium hover:text-red-600 transition-colors">Products</a></li>
            <li><a href="#reviews" className="text-xl font-medium hover:text-red-600 transition-colors">Reviews</a></li>
            <li><a href="#about" className="text-xl font-medium hover:text-red-600 transition-colors">About Us</a></li>
            <li><a href="#contact" className="text-xl font-medium hover:text-red-600 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-black text-xl mb-10 uppercase tracking-widest">Contact Us</h3>
          <ul className="space-y-10">
            <li className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 flex items-center justify-center shrink-0">
                <MessageSquare size={24} className="text-[#25D366]" />
              </div>
              <div>
                <p className="text-white font-black uppercase text-sm tracking-widest mb-2">WhatsApp</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-xl font-medium hover:text-[#25D366] transition-colors">{OWNER_NUMBER}</a>
              </div>
            </li>
            <li className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-pink-600/20 flex items-center justify-center shrink-0">
                <Instagram size={24} className="text-pink-500" />
              </div>
              <div>
                <p className="text-white font-black uppercase text-sm tracking-widest mb-2">Instagram</p>
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-xl font-medium hover:text-pink-500 transition-colors">@fitbuddies_official</a>
              </div>
            </li>
            <li className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 flex items-center justify-center shrink-0">
                <Mail size={24} className="text-red-500" />
              </div>
              <div>
                <p className="text-white font-black uppercase text-sm tracking-widest mb-2">Email</p>
                <a href={`mailto:${OWNER_EMAIL}`} className="text-xl font-medium hover:text-red-600 transition-colors">{OWNER_EMAIL}</a>
              </div>
            </li>
            <li className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 flex items-center justify-center shrink-0">
                <MapPin size={24} className="text-red-500" />
              </div>
              <div>
                <p className="text-white font-black uppercase text-sm tracking-widest mb-2">Address</p>
                <p className="text-xl font-medium leading-snug">{OWNER_ADDRESS}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-lg font-medium text-white/40">
        <p>© 2026 Fit Buddies. All rights reserved.</p>
        <p className="flex items-center gap-2">Made with <Heart size={20} className="text-red-500 fill-red-500" /> for a healthy heart.</p>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-600/5 to-transparent pointer-events-none" />
    </footer>
  );
}
