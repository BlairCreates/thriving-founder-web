import VideoHero from '@/components/VideoHero';
import ContentSections from '@/components/ContentSections';

export default function Home() {
  return (
    <main className="min-h-screen">
      <VideoHero />
      <ContentSections />
    </main>
  );
}
