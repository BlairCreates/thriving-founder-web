'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function ContentSections() {
  return (
    <div className="bg-off-white">
      {/* About Section */}
      <Section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl">
          <h2 className="font-playfair text-4xl md:text-6xl text-navy mb-8">
            We build your dream business with you—and support you to thrive.
          </h2>
          <p className="font-inter text-lg md:text-xl text-charcoal leading-relaxed mb-6">
            Thriving Founder exists for mid-career professionals who know they're capable of more — 
            and are ready to build something that belongs entirely to them, without unravelling 
            the life they've already earned.
          </p>
          <p className="font-inter text-lg md:text-xl text-charcoal leading-relaxed">
            This is not a course. It is a genuine business partnership — one that delivers 
            tangible assets, deep transformational work, and a proven path to your first paying client. 
            What you invest in here becomes the foundation of everything that follows.
          </p>
        </div>
      </Section>

      {/* Four Pillars Section with Paper Texture */}
      <Section className="bg-navy py-24 md:py-32 relative overflow-hidden">
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23fff' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308 538 101 381M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23fff'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="font-playfair text-4xl md:text-6xl text-white mb-16 text-center">
            Four Foundations of Freedom
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Clarity', description: 'Know exactly what you\'re building and why it matters.' },
              { title: 'Capacity', description: 'Build the internal operating system to sustain it all.' },
              { title: 'Cashflow', description: 'Launch with your first paying client and real revenue.' },
              { title: 'Confidence', description: 'Move forward with certainty, not overwhelm.' },
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-lg p-8 hover:bg-white/10 transition-colors"
              >
                <h3 className="font-playfair text-2xl md:text-3xl text-gold mb-4">
                  {pillar.title}
                </h3>
                <p className="font-inter text-base text-white/80 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Program Overview */}
      <Section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl text-navy mb-6">
              Founder ON™
            </h2>
            <p className="font-inter text-lg text-charcoal leading-relaxed mb-6">
              A 24-week business-building partnership that combines transformational coaching 
              with done-with-you production.
            </p>
            <p className="font-inter text-lg text-charcoal leading-relaxed mb-8">
              Most coaching programs sell advice. Thriving Founder sells outcomes. 
              You leave with a live brand, a professional website, a marketing system, 
              your first client, and the internal operating system to sustain it all.
            </p>
            <Link href="#program">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block bg-gold hover:bg-gold/90 text-navy font-inter font-semibold text-lg px-10 py-4 rounded-lg transition-colors cursor-pointer"
              >
                Learn More
              </motion.span>
            </Link>
          </div>
          <div className="bg-navy/5 rounded-2xl p-12 border border-navy/10">
            <h3 className="font-playfair text-3xl text-navy mb-8">The ON Method™</h3>
            <ul className="space-y-6">
              {['Empower', 'Build', 'Operate', 'Thrive'].map((phase, index) => (
                <motion.li
                  key={phase}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-inter font-semibold text-navy text-lg">
                      {index + 1}
                    </span>
                  </div>
                  <span className="font-inter text-xl text-charcoal font-medium">
                    {phase}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-navy py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-playfair text-4xl md:text-6xl text-white mb-8">
            Ready to Build Your Freedom Business?
          </h2>
          <p className="font-inter text-xl text-white/80 mb-12 leading-relaxed">
            Take the Founder Freedom Score™ assessment to discover where you stand 
            and what comes next.
          </p>
          <Link href="/score">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gold hover:bg-light-gold text-navy font-inter font-bold text-xl px-12 py-5 rounded-lg transition-colors shadow-lg cursor-pointer"
            >
              Take the Assessment →
            </motion.span>
          </Link>
        </div>
      </Section>
    </div>
  );
}
