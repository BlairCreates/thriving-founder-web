'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DIMENSIONS = [
  {
    key: 'clarity',
    label: 'Clarity',
    color: 'text-gold',
    bg: 'bg-gold/10',
    description: 'How clear are you on what you\'re building and who you serve?',
    questions: [
      'I can describe my business and who it serves in one clear sentence.',
      'I know exactly who my ideal client is and where to find them.',
      'I have a clear 12-month vision for where my business is going.',
      'My business has a defined offer with a clear price and outcome.',
    ],
  },
  {
    key: 'capacity',
    label: 'Capacity',
    color: 'text-gold',
    bg: 'bg-gold/10',
    description: 'Do you have the internal operating system to sustain what you\'re building?',
    questions: [
      'Running my business energizes me more than it drains me.',
      'I have clear boundaries between work time and personal time.',
      'I make decisions from clarity rather than fear or urgency.',
      'I have systems in place that keep me consistently productive.',
    ],
  },
  {
    key: 'cashflow',
    label: 'Cashflow',
    color: 'text-gold',
    bg: 'bg-gold/10',
    description: 'Is your business generating real, predictable revenue?',
    questions: [
      'I have consistent monthly revenue or clear income predictability.',
      'I know exactly how much I need to earn each month to cover my life.',
      'I have at least one paying client for my core offer.',
      'I have a clear strategy to grow my revenue over the next 90 days.',
    ],
  },
  {
    key: 'confidence',
    label: 'Confidence',
    color: 'text-gold',
    bg: 'bg-gold/10',
    description: 'Are you moving forward with conviction, not overwhelm?',
    questions: [
      'When I think about my business, I feel more excited than overwhelmed.',
      'I consistently take action on my business even when I don\'t feel ready.',
      'I have mentorship, coaching, or a community supporting my growth.',
      'I trust myself to figure out what I don\'t yet know.',
    ],
  },
];

const SCALE_LABELS = ['Not at all', 'Sometimes', 'Often', 'Always'];

const RESULT_TIERS = [
  {
    range: [0, 39],
    label: 'Laying the Foundation',
    description: 'You\'re at the beginning of building something real. The potential is there — what\'s needed now is clarity, structure, and the right support to get moving.',
    next: 'The first step is getting clear. Let\'s find out where to focus.',
  },
  {
    range: [40, 59],
    label: 'Building Momentum',
    description: 'You\'ve started, and parts of it are working. The gap between where you are and real freedom is smaller than you think — it just needs the right strategy to close it.',
    next: 'You\'re closer than you feel. Let\'s identify what\'s holding you back.',
  },
  {
    range: [60, 79],
    label: 'Gaining Freedom',
    description: 'You have real traction. Your foundations are solid in some areas, and you\'re making progress. Now it\'s about removing the friction that\'s slowing you down.',
    next: 'The right move now is optimization. Let\'s find your highest-leverage opportunity.',
  },
  {
    range: [80, 100],
    label: 'Thriving Founder',
    description: 'You\'re operating at a high level. Clarity, capacity, cashflow, and confidence are working together. The opportunity is to scale what\'s already working.',
    next: 'You\'re ready to scale. Let\'s talk about what\'s next for you.',
  },
];

type Answers = Record<string, number[]>;

function getScoreForDimension(answers: number[]): number {
  const total = answers.reduce((sum, v) => sum + v, 0);
  return Math.round((total / (answers.length * 4)) * 100);
}

function getTotalScore(answers: Answers): number {
  const allScores = DIMENSIONS.map(d =>
    d.key in answers ? getScoreForDimension(answers[d.key]) : 0
  );
  return Math.round(allScores.reduce((sum, s) => sum + s, 0) / DIMENSIONS.length);
}

function getResultTier(score: number) {
  return RESULT_TIERS.find(t => score >= t.range[0] && score <= t.range[1]) || RESULT_TIERS[0];
}

export default function FounderScoreAssessment() {
  const [stage, setStage] = useState<'intro' | 'assessment' | 'email' | 'results'>('intro');
  const [dimensionIndex, setDimensionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentDimension = DIMENSIONS[dimensionIndex];
  const totalQuestions = DIMENSIONS.length * 4;
  const answeredCount = Object.values(answers).reduce((sum, arr) => sum + arr.length, 0);
  const progress = (answeredCount / totalQuestions) * 100;

  function handleAnswer(value: number) {
    const key = currentDimension.key;
    const current = answers[key] || [];
    const updated = [...current, value];
    const newAnswers = { ...answers, [key]: updated };
    setAnswers(newAnswers);

    if (questionIndex < currentDimension.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else if (dimensionIndex < DIMENSIONS.length - 1) {
      setDimensionIndex(dimensionIndex + 1);
      setQuestionIndex(0);
    } else {
      setStage('email');
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          score: getTotalScore(answers),
          breakdown: Object.fromEntries(
            DIMENSIONS.map(d => [d.key, getScoreForDimension(answers[d.key] || [])])
          ),
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {}
    setSubmitted(true);
    setStage('results');
    setSubmitting(false);
  }

  const totalScore = getTotalScore(answers);
  const tier = getResultTier(totalScore);

  if (stage === 'intro') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center py-16 px-6"
      >
        <div className="inline-block bg-gold/10 text-gold font-inter text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
          Free Assessment
        </div>
        <h1 className="font-playfair text-5xl md:text-6xl text-navy mb-6 leading-tight">
          Founder Freedom Score™
        </h1>
        <p className="font-inter text-xl text-charcoal/70 mb-4 leading-relaxed">
          16 questions. 4 dimensions. A clear picture of where you stand — and what comes next.
        </p>
        <p className="font-inter text-base text-charcoal/50 mb-12">
          Takes about 3 minutes.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {DIMENSIONS.map(d => (
            <div key={d.key} className="bg-navy/5 rounded-xl p-4 text-center">
              <div className="font-playfair text-lg text-navy font-bold">{d.label}</div>
            </div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStage('assessment')}
          className="bg-navy text-white font-inter font-semibold text-lg px-12 py-4 rounded-xl transition-colors hover:bg-navy/90 shadow-lg"
        >
          Start the Assessment →
        </motion.button>
      </motion.div>
    );
  }

  if (stage === 'assessment') {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <span className="font-inter text-sm text-charcoal/50 font-medium">
              {currentDimension.label} · Question {questionIndex + 1} of {currentDimension.questions.length}
            </span>
            <span className="font-inter text-sm text-charcoal/50">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-navy/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gold rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <div className="flex gap-1 mt-3">
            {DIMENSIONS.map((d, i) => (
              <div
                key={d.key}
                className={`flex-1 h-1 rounded-full transition-colors duration-300 ${
                  i < dimensionIndex ? 'bg-gold' :
                  i === dimensionIndex ? 'bg-gold/40' :
                  'bg-navy/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dimension label */}
        <div className="mb-8">
          <span className="font-inter text-xs font-bold uppercase tracking-widest text-gold">
            {currentDimension.label}
          </span>
          <p className="font-inter text-sm text-charcoal/50 mt-1">{currentDimension.description}</p>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${dimensionIndex}-${questionIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl text-navy mb-10 leading-snug">
              &ldquo;{currentDimension.questions[questionIndex]}&rdquo;
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SCALE_LABELS.map((label, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(i + 1)}
                  className="bg-white border-2 border-navy/10 hover:border-gold hover:bg-gold/5 rounded-xl p-4 text-center transition-all duration-200 group"
                >
                  <div className="font-inter text-2xl font-bold text-navy group-hover:text-gold mb-1 transition-colors">
                    {i + 1}
                  </div>
                  <div className="font-inter text-xs text-charcoal/50 group-hover:text-charcoal/70 transition-colors">
                    {label}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (stage === 'email') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto py-16 px-6 text-center"
      >
        <div className="text-4xl mb-4">🎯</div>
        <h2 className="font-playfair text-4xl text-navy mb-4">You&apos;re done.</h2>
        <p className="font-inter text-lg text-charcoal/70 mb-8 leading-relaxed">
          Enter your name and email to see your Founder Freedom Score™ and personalized breakdown.
        </p>
        <form onSubmit={handleEmailSubmit} className="space-y-4 text-left">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            className="w-full font-inter text-base px-5 py-4 rounded-xl border-2 border-navy/10 focus:border-gold focus:outline-none transition-colors bg-white"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full font-inter text-base px-5 py-4 rounded-xl border-2 border-navy/10 focus:border-gold focus:outline-none transition-colors bg-white"
          />
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={submitting}
            className="w-full bg-navy text-white font-inter font-semibold text-lg py-4 rounded-xl transition-colors hover:bg-navy/90 disabled:opacity-50"
          >
            {submitting ? 'Loading your score...' : 'Show My Score →'}
          </motion.button>
        </form>
        <p className="font-inter text-xs text-charcoal/40 mt-4">
          No spam. Unsubscribe any time.
        </p>
      </motion.div>
    );
  }

  // Results
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-12 px-6"
    >
      {/* Score hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gold/10 text-gold font-inter text-sm font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
          Your Results
        </div>
        {firstName && (
          <p className="font-inter text-base text-charcoal/50 mb-2">Nice work, {firstName}.</p>
        )}
        <div className="relative inline-flex items-center justify-center mb-6">
          <svg className="w-48 h-48 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#1B2A4A" strokeOpacity="0.08" strokeWidth="8" />
            <motion.circle
              cx="60" cy="60" r="54"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - totalScore / 100) }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            />
          </svg>
          <div className="absolute text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="font-playfair text-5xl font-bold text-navy"
            >
              {totalScore}
            </motion.div>
            <div className="font-inter text-xs text-charcoal/40 uppercase tracking-widest">/ 100</div>
          </div>
        </div>
        <h2 className="font-playfair text-3xl md:text-4xl text-navy mb-4">{tier.label}</h2>
        <p className="font-inter text-lg text-charcoal/70 max-w-xl mx-auto leading-relaxed">
          {tier.description}
        </p>
      </div>

      {/* Dimension breakdown */}
      <div className="bg-white rounded-2xl p-8 mb-8 border border-navy/5">
        <h3 className="font-playfair text-2xl text-navy mb-6">Your Breakdown</h3>
        <div className="space-y-5">
          {DIMENSIONS.map(d => {
            const score = getScoreForDimension(answers[d.key] || []);
            return (
              <div key={d.key}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-inter text-sm font-semibold text-navy">{d.label}</span>
                  <span className="font-inter text-sm text-charcoal/50">{score}%</span>
                </div>
                <div className="h-2 bg-navy/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gold rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* What's next */}
      <div className="bg-navy rounded-2xl p-8 text-center">
        <h3 className="font-playfair text-3xl text-white mb-4">What&apos;s Next</h3>
        <p className="font-inter text-lg text-white/70 mb-8 leading-relaxed">{tier.next}</p>
        <motion.a
          href="https://thrivingfounder.com"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block bg-gold hover:bg-light-gold text-navy font-inter font-semibold text-lg px-10 py-4 rounded-xl transition-colors shadow-lg"
        >
          Book a Free Strategy Call
        </motion.a>
      </div>
    </motion.div>
  );
}
