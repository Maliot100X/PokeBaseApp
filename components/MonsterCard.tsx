import Image from 'next/image';
import { type TokenBalance } from '@/lib/tokens';

export function MonsterCard({ token }: { token: TokenBalance }) {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-xl border-2 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)] transform hover:scale-105 transition-transform duration-200">
      <div className="w-24 h-24 relative mb-2 rounded-full overflow-hidden border-4 border-white bg-gray-700">
         {/* Using standard img tag for external URLs if Next/Image config is tricky with arbitrary domains, but here we used placehold.co so simple img is fine or Next Image with unoptimized if needed. We'll stick to Next Image but might need config. For safety in this environment, unoptimized. */}
        <Image
          src={token.monsterImage}
          alt={token.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <h3 className="text-xl font-bold text-yellow-400 font-mono">{token.name}</h3>
      <div className="bg-gray-900 px-3 py-1 rounded mt-2 border border-gray-600">
        <span className="text-sm text-gray-400 font-mono">CP: </span>
        <span className="text-green-400 font-bold font-mono">
          {parseFloat(token.formattedBalance).toFixed(4)}
        </span>
      </div>
      <div className="mt-2 text-xs text-gray-500 font-mono">{token.symbol} TYPE</div>
    </div>
  );
}
