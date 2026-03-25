import type { Metadata } from 'next';
import './globals.css';
import Nav from '../components/Nav';

export const metadata: Metadata = {
  title: 'Thriving Founder™',
  description: 'Clarity. Capacity. Cashflow. Confidence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
