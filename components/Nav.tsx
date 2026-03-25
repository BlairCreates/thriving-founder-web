'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Program', href: '#program' },
  { label: 'Score', href: '/score' },
  { label: 'About', href: '#about' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(27, 42, 74, 0.95)' : 'rgba(27, 42, 74, 0)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-8"
      style={{ height: '72px' }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="font-playfair font-bold text-xl hover:opacity-80 transition-opacity" style={{ color: '#C9A84C' }}>
          Thriving Founder™
        </Link>

        {/* Right side: nav links + CTA */}
        <div className="flex items-center gap-8">
          {/* Nav links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-inter font-medium text-white/80 hover:text-white transition-colors text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="#">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block font-inter font-semibold text-sm px-5 py-2.5 rounded-lg cursor-pointer transition-colors"
              style={{
                backgroundColor: '#C9A84C',
                color: '#1B2A4A',
              }}
            >
              Apply Now
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
