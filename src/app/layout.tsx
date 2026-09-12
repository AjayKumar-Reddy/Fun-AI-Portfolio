import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ajay Kumar S — Software Engineer',
  description:
    'Interactive Linux terminal portfolio of Ajay Kumar S — Full Stack Developer & CS undergraduate at MS Ramaiah Institute of Technology, Bengaluru.',
  keywords: [
    'Ajay Kumar S',
    'portfolio',
    'software engineer',
    'full stack developer',
    'MSRIT',
    'terminal portfolio',
    'Java',
    'Spring Boot',
    'Next.js',
    'React',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="bg-ctp-crust text-ctp-text font-[family-name:var(--font-jetbrains)] min-h-screen overflow-hidden selection:bg-ctp-surface2 selection:text-ctp-text">
        {children}
      </body>
    </html>
  );
}
