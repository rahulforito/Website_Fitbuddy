import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const PACKET_IMAGES = [
  'https://res.cloudinary.com/dicpwgdap/image/upload/v1774536946/Gemini_Generated_Image_7z2oh97z2oh97z2o_sk0dhf.png',
  'https://res.cloudinary.com/dicpwgdap/image/upload/v1774536946/Gemini_Generated_Image_7z2oh97z2oh97z2o_sk0dhf.png',
  'https://res.cloudinary.com/dicpwgdap/image/upload/v1774536946/Gemini_Generated_Image_7z2oh97z2oh97z2o_sk0dhf.png',
];

export default function FloatingPackets() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* 
        Using fixed position ensures they stay in the viewport.
        We use scrollYProgress to give them a parallax movement so they 
        appear to be floating at different depths as the user scrolls.
      */}
      <FloatingPacket 
        src={PACKET_IMAGES[0]} 
        initialX="5%" 
        initialY="10%" 
        scrollProgress={scrollYProgress} 
        speed={0.4} 
        rotation={-15}
      />
      <FloatingPacket 
        src={PACKET_IMAGES[1]} 
        initialX="85%" 
        initialY="20%" 
        scrollProgress={scrollYProgress} 
        speed={-0.3} 
        rotation={10}
      />
      <FloatingPacket 
        src={PACKET_IMAGES[2]} 
        initialX="15%" 
        initialY="40%" 
        scrollProgress={scrollYProgress} 
        speed={0.5} 
        rotation={25}
      />
      <FloatingPacket 
        src={PACKET_IMAGES[0]} 
        initialX="80%" 
        initialY="60%" 
        scrollProgress={scrollYProgress} 
        speed={-0.45} 
        rotation={-20}
      />
      <FloatingPacket 
        src={PACKET_IMAGES[1]} 
        initialX="10%" 
        initialY="80%" 
        scrollProgress={scrollYProgress} 
        speed={0.35} 
        rotation={5}
      />
      <FloatingPacket 
        src={PACKET_IMAGES[2]} 
        initialX="90%" 
        initialY="90%" 
        scrollProgress={scrollYProgress} 
        speed={-0.25} 
        rotation={-10}
      />
    </div>
  );
}

function FloatingPacket({ src, initialX, initialY, scrollProgress, speed, rotation }: any) {
  // Parallax effect: move the packet as the user scrolls
  // We use a larger range for yOffset to make the movement more pronounced
  const yOffset = useTransform(scrollProgress, [0, 1], [0, speed * 1200]);
  const rotate = useTransform(scrollProgress, [0, 1], [rotation, rotation + (speed * 240)]);
  
  // Keep them visible throughout the scroll with a subtle atmospheric opacity
  const opacity = useTransform(scrollProgress, [0, 0.05, 0.95, 1], [0, 0.15, 0.15, 0]);

  return (
    <motion.div
      style={{ 
        left: initialX, 
        top: initialY, 
        y: yOffset,
        rotate,
        opacity
      }}
      className="absolute w-32 md:w-64 filter blur-[0.5px] md:blur-none"
    >
      <motion.img 
        animate={{ 
          y: [0, 30, 0],
          x: [0, 20, 0],
          rotate: [0, 8, 0]
        }}
        transition={{ 
          duration: 5 + Math.random() * 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        src={src} 
        alt="Floating Bhujia Packet" 
        className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-3xl"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}
