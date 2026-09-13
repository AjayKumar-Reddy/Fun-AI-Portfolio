"use client";

import { Terminal } from '@/components/Terminal/Terminal';

export default function Home() {
  return (
    <main className="w-full h-full h-[100dvh] bg-ctp-crust overflow-hidden flex flex-col">
      <Terminal />
    </main>
  );
}
