import type { Metadata } from 'next';
import FounderScoreAssessment from '@/components/FounderScoreAssessment';

export const metadata: Metadata = {
  title: 'Founder Freedom Score™ | Thriving Founder',
  description: 'Take the free 3-minute assessment. Discover your score across Clarity, Capacity, Cashflow, and Confidence — and find out exactly where to focus next.',
};

export default function ScorePage() {
  return (
    <main className="min-h-screen bg-off-white">
      <div className="max-w-4xl mx-auto">
        <FounderScoreAssessment />
      </div>
    </main>
  );
}
