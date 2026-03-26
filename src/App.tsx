import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Star, Heart, Phone, Check, ArrowRight, Quote, ShieldCheck, Zap, Leaf, ShoppingCart, MessageSquare, Instagram, Twitter, Facebook } from 'lucide-react';
import { FlyingPosters } from './components/FlyingPosters';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import ReviewSection from './components/ReviewSection';
import ErrorBoundary from './components/ErrorBoundary';
import FloatingPackets from './components/FloatingPackets';
import { PRODUCTS, OWNER_NUMBER, WHATSAPP_LINK } from './constants';

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const galleryImages = [
    'https://res.cloudinary.com/dicpwgdap/image/upload/v1774532523/WhatsApp_Image_2026-03-26_at_6.40.21_PM_rxqkuv.jpg',
    'https://res.cloudinary.com/dicpwgdap/image/upload/v1774532523/WhatsApp_Image_2026-03-26_at_6.40.21_PM_rxqkuv.jpg',
    'https://res.cloudinary.com/dicpwgdap/image/upload/v1774532523/WhatsApp_Image_2026-03-26_at_6.40.21_PM_rxqkuv.jpg',
    'https://res.cloudinary.com/dicpwgdap/image/upload/v1774532523/WhatsApp_Image_2026-03-26_at_6.40.21_PM_rxqkuv.jpg',
  ];

  return (
    <div className="relative min-h-screen bg-[#FDFCF8] text-[#1A1A1A] font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />
      <FloatingPackets />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-40">
          <FlyingPosters 
            items={galleryImages} 
            planeWidth={400} 
            planeHeight={540} 
            distortion={4} 
            scrollEase={0.06}
          />
        </div>

        {/* Floating Title Overlay */}
        <div className="absolute top-32 left-12 z-10 hidden lg:block">
          <h1 className="text-[#1A1A1A] text-2xl font-black tracking-tighter opacity-90 uppercase italic">
            Fit Buddies
          </h1>
          <p className="text-[#1A1A1A]/40 text-sm mt-2 font-bold uppercase tracking-widest">
            3D Distortion Gallery
          </p>
        </div>

        {/* Replay Button */}
        <button 
          className="absolute bottom-12 right-12 z-30 bg-[#1A1A1A]/10 hover:bg-[#1A1A1A]/20 backdrop-blur-md text-[#1A1A1A] px-6 py-3 rounded-full text-sm font-black transition-all border border-[#1A1A1A]/10 flex items-center gap-2 uppercase tracking-widest"
          onClick={() => window.location.reload()}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Replay
        </button>
        
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block bg-red-600/10 text-red-600 px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-6 border border-red-600/20">
              Guilt-Free Snacking
            </span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-[#1A1A1A]">
              BAKED.<br />
              <span className="text-red-600">NEVER FRIED.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#4A4A4A] max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Experience the crunch of health. High protein, no palm oil, and purely baked for your heart's delight.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a 
                href="#products" 
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-red-600/20 flex items-center justify-center gap-3 group"
              >
                EXPLORE FLAVORS
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-white hover:bg-gray-50 text-[#1A1A1A] border-2 border-[#1A1A1A] px-12 py-6 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3"
              >
                ORDER ON WHATSAPP
                <MessageSquare size={24} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Badges */}
        <div className="absolute bottom-12 left-12 hidden lg:flex flex-col gap-4 z-20">
          {[
            { icon: <ShieldCheck size={20} />, text: "No Palm Oil" },
            { icon: <Zap size={20} />, text: "High Protein" },
            { icon: <Leaf size={20} />, text: "100% Baked" }
          ].map((badge, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-4 bg-white border-2 border-[#1A1A1A] px-6 py-4 rounded-2xl shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]"
            >
              <div className="text-red-600">{badge.icon}</div>
              <span className="text-base font-black text-[#1A1A1A] uppercase tracking-tight">{badge.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#1A1A1A]/40">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-12 bg-gradient-to-b from-red-600 to-transparent rounded-full"
          />
        </motion.div>

        {/* Hero Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent" />
        </div>
      </section>

      {/* Why Fit Buddies Section */}
      <section id="about" className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tight leading-none">
                WHY CHOOSE<br />
                <span className="text-red-600">FIT BUDDIES?</span>
              </h2>
              <p className="text-2xl text-[#4A4A4A] mb-12 leading-relaxed font-medium">
                Most snacks are fried in palm oil, loaded with trans fats, and low in nutrition. 
                We've changed the game with our baked, high-protein snacks.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "No Palm Oil", desc: "We use only heart-healthy alternatives.", icon: <ShieldCheck className="text-red-600" /> },
                  { title: "Baked, Not Fried", desc: "60% less fat than regular fried snacks.", icon: <Zap className="text-red-600" /> },
                  { title: "High Protein", desc: "Up to 16g of protein per pack to keep you fueled.", icon: <Check className="text-red-600" /> },
                  { title: "No Trans Fat", desc: "Pure ingredients for a healthier you.", icon: <Leaf className="text-red-600" /> }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="p-8 bg-[#FDFCF8] border-2 border-[#1A1A1A] rounded-3xl shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center mb-6">
                      {item.icon}
                    </div>
                    <h4 className="text-2xl font-black text-[#1A1A1A] mb-3 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-[#4A4A4A] font-medium leading-snug">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-red-600/5 blur-[100px] rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop" 
                alt="Comparison Chart" 
                className="relative z-10 rounded-[3rem] shadow-2xl border-4 border-[#1A1A1A]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-40 bg-[#FDFCF8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-[#1A1A1A]">OUR FLAVORS</h2>
            <p className="text-2xl text-[#4A4A4A] max-w-3xl mx-auto font-medium">
              Discover our range of premium baked snacks, each crafted with care for your health and taste buds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-[#1A1A1A]">CUSTOMER REVIEWS</h2>
            <p className="text-2xl text-[#4A4A4A] max-w-3xl mx-auto font-medium">
              Hear from our happy customers who have switched to guilt-free snacking.
            </p>
          </div>

          <ErrorBoundary>
            <ReviewSection />
          </ErrorBoundary>
        </div>
      </section>

      {/* Lab Report Section */}
      <section className="py-40 bg-[#FDFCF8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop" 
                alt="Lab Report 1" 
                className="rounded-3xl shadow-xl border-2 border-[#1A1A1A]"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop" 
                alt="Lab Report 2" 
                className="rounded-3xl shadow-xl border-2 border-[#1A1A1A] translate-y-12"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tight leading-none">
                CERTIFIED<br />
                <span className="text-red-600">QUALITY.</span>
              </h2>
              <p className="text-2xl text-[#4A4A4A] mb-12 leading-relaxed font-medium">
                Our products are tested in certified laboratories to ensure the highest standards of quality and nutrition. 
                We believe in transparency and health above all.
              </p>
              <div className="bg-white p-10 rounded-[3rem] border-4 border-[#1A1A1A] shadow-[12px_12px_0px_0px_rgba(26,26,26,1)]">
                <Quote size={60} className="text-red-600 mb-8 opacity-20" />
                <p className="text-3xl font-black text-[#1A1A1A] italic leading-tight mb-8">
                  "The nutritional profile of Fit Buddies snacks is exceptional, making them a perfect choice for heart-conscious consumers."
                </p>
                <p className="font-black text-red-600 uppercase tracking-widest">— Accurate Laboratory Report</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative overflow-hidden bg-red-600">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter text-white">READY TO SWITCH?</h2>
          <p className="text-3xl text-white/90 mb-16 font-medium max-w-3xl mx-auto leading-tight">
            Join thousands of others who have chosen a healthier way to snack. 
            Order your Fit Buddies pack today!
          </p>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-white text-[#1A1A1A] hover:scale-105 px-16 py-8 rounded-[2rem] font-black text-3xl transition-all shadow-[12px_12px_0px_0px_rgba(26,26,26,0.3)]"
          >
            <MessageSquare size={36} />
            <span>ORDER ON WHATSAPP</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
