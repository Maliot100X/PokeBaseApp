'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { getWalletBalances, type TokenBalance } from '@/lib/tokens';
import { MonsterCard } from './MonsterCard';
import { Loader2, ScanLine, Wallet } from 'lucide-react';
import sdk from '@farcaster/miniapp-sdk';
import { ShareButton } from './ShareButton';

export function Scanner() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<TokenBalance[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Infer the type from the sdk.context promise resolution
  const [context, setContext] = useState<Awaited<typeof sdk.context> | undefined>(undefined);

  useEffect(() => {
    // Load context if available (only on client)
    if (typeof window !== 'undefined') {
        sdk.context.then(setContext).catch(console.error);
    }
  }, []);

  // Auto-scan if connected
  useEffect(() => {
    if (isConnected && address && !results && !isScanning) {
      handleScan();
    }
  }, [isConnected, address]);

  const handleScan = async () => {
    if (!address) return;

    setIsScanning(true);
    setError(null);

    // Fake delay for "scanning" effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const balances = await getWalletBalances(address);
      setResults(balances);
    } catch (e) {
      console.error(e);
      setError("Failed to scan blockchain data.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleConnect = () => {
    const connector = connectors.find((c) => c.id === 'coinbaseWalletSDK') || connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-700 mb-4 animate-pulse">
          <Wallet className="w-16 h-16 text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">
            {context?.user?.username ? `Welcome, @${context.user.username}!` : 'Connect Wallet'}
        </h2>
        <p className="text-gray-400 max-w-xs">
          Connect your Base wallet to reveal your ClankerMons.
        </p>
        <button
          onClick={handleConnect}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow-lg transform transition active:scale-95"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  if (isScanning) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative w-48 h-48 bg-gray-900 rounded-full border-4 border-green-500 overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.3)]">
           <div className="absolute inset-0 bg-green-900/20 animate-pulse"></div>
           <ScanLine className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-green-500 animate-spin-slow" />
           <div className="absolute top-0 left-0 w-full h-1 bg-green-400 animate-scan-down shadow-[0_0_10px_#4ade80]"></div>
        </div>
        <h2 className="text-xl font-mono text-green-400 animate-pulse">SCANNING BLOCKCHAIN...</h2>
        <p className="text-xs text-gray-500 font-mono">Target: {address?.slice(0,6)}...{address?.slice(-4)}</p>
      </div>
    );
  }

  if (results) {
    const shareText = `I found ${results.length} ClankerMons on Base! My top monster is ${results[0]?.name || 'Unknown'}. Check yours now!`;

    return (
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Your Collection ({results.length})</h2>
            <button
                onClick={() => { disconnect(); setResults(null); }}
                className="text-xs text-red-400 hover:text-red-300"
            >
                Disconnect
            </button>
        </div>

        {results.length === 0 ? (
           <div className="text-center p-8 bg-gray-800 rounded-xl border border-dashed border-gray-600">
             <p className="text-gray-400">No ClankerMons found...</p>
             <p className="text-xs text-gray-500 mt-2">Try getting some WETH, USDC, or DEGEN on Base!</p>
           </div>
        ) : (
            <>
                <div className="grid grid-cols-2 gap-4">
                {results.map(token => (
                    <MonsterCard key={token.id} token={token} />
                ))}
                </div>
                <ShareButton text={shareText} />
            </>
        )}

        <button
            onClick={handleScan}
            className="mt-8 w-full py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 rounded-lg font-mono text-sm"
        >
            RESCAN NETWORK
        </button>
      </div>
    );
  }

  return null;
}
