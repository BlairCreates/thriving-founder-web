'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: content moves up at 0.4x scroll speed (slower than scroll = depth)
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={containerRef} className="relative" style={{ height: '100vh' }}>
      {/* Fixed background layer */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: '#1B2A4A' }}
      >
        {/* Subtle radial depth — lighter at center, darker at edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 45%, rgba(201,168,76,0.06) 0%, transparent 70%), radial-gradient(ellipse 120% 100% at 50% 50%, rgba(27,42,74,0) 0%, rgba(10,16,30,0.6) 100%)',
          }}
        />
      </div>

      {/* Parallax content wrapper */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        {/* Arch SVG — outer + inner architectural arches */}
        <div className="relative flex items-center justify-center w-full h-full pointer-events-none">
          <svg
            viewBox="0 0 800 720"
            preserveAspectRatio="xMidYMid meet"
            className="absolute"
            style={{
              width: 'min(820px, 92vw)',
              height: 'min(740px, 80vh)',
            }}
            aria-hidden="true"
          >
            {/* Outer arch — low opacity */}
            <path
              d="M 60 700 L 60 340 Q 60 60 400 60 Q 740 60 740 340 L 740 700"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />
            {/* Inner arch — slightly higher opacity, inset ~40px */}
            <path
              d="M 100 700 L 100 350 Q 100 108 400 108 Q 700 108 700 350 L 700 700"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="1"
              strokeOpacity="0.6"
            />
            {/* Subtle keystone ornament at apex */}
            <circle
              cx="400"
              cy="84"
              r="6"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <circle
              cx="400"
              cy="84"
              r="2"
              fill="#C9A84C"
              fillOpacity="0.4"
            />
          </svg>

          {/* Text content — centered inside arch */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-2xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
              className="font-inter font-medium tracking-widest uppercase text-sm mb-8"
              style={{ color: '#C9A84C', letterSpacing: '0.2em' }}
            >
              A 24-Week Partnership
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 1, ease: 'easeOut' }}
              className="font-playfair font-bold text-white mb-6 leading-tight"
              style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
            >
              Build Your<br />Freedom Business
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9, ease: 'easeOut' }}
              className="font-inter font-normal text-xl mb-12"
              style={{ color: 'rgba(255,255,255,0.78)', fontSize: 'clamp(18px, 2.2vw, 22px)' }}
            >
              Clarity. Capacity. Cashflow. Confidence.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.9, ease: 'easeOut' }}
            >
              <Link href="/score">
                <motion.span
                  whileHover={{ scale: 1.03, backgroundColor: '#d4b05a' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block font-inter font-semibold text-lg px-10 py-4 rounded-lg cursor-pointer transition-colors"
                  style={{
                    backgroundColor: '#C9A84C',
                    color: '#1B2A4A',
                    fontSize: 'clamp(16px, 1.8vw, 19px)',
                  }}
                >
                  Take the Founder Freedom Score™ →
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient fade: navy → off-white */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '180px',
          background: 'linear-gradient(to bottom, transparent 0%, #1B2A4A 60%, #F5F3EF 100%)',
        }}
      />
    </div>
  );
}
