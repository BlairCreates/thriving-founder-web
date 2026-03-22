'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoHeight, setVideoHeight] = useState('20vh');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end center']
  });

  // Transform scroll progress to height (20vh -> 100vh)
  const height = useTransform(scrollYProgress, [0, 1], ['20vh', '100vh']);
  
  useEffect(() => {
    const unsubscribe = height.on('change', (v) => setVideoHeight(v));
    return () => unsubscribe();
  }, [height]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      <motion.div
        className="sticky top-0 w-full overflow-hidden bg-navy"
        style={{ height: videoHeight }}
      >
        <div className="relative w-full h-full max-w-7xl mx-auto">
          {/* Placeholder for video - replace with actual video element */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy to-navy/80 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-playfair text-5xl md:text-7xl font-bold mb-6"
              >
                Thriving Founder™
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-inter text-xl md:text-2xl font-semibold text-gold"
              >
                Clarity. Capacity. Cashflow. Confidence.
              </motion.p>
            </div>
          </div>
          
          {/* Actual video element (uncomment and add video source) */}
          {/* <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/path-to-video.mp4" type="video/mp4" />
          </video> */}
        </div>
      </motion.div>
    </div>
  );
}
