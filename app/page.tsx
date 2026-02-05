'use client';

import { Scanner } from '@/components/Scanner';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <header className="w-full max-w-md mb-8 flex items-center justify-center pt-8">
        <h1 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          CLANKERMON
        </h1>
      </header>

      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center min-h-[50vh]">
        <Scanner />
      </div>

      <footer className="mt-8 pb-4 text-center">
        <p className="text-xs text-gray-600 font-mono">
          POWERED BY BASE & FARCASTER
        </p>
      </footer>
    </main>
  );
}
