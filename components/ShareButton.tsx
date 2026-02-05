'use client';

import { useState } from 'react';
import sdk from '@farcaster/miniapp-sdk';
import { Share } from 'lucide-react';

export function ShareButton({ text }: { text: string }) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
        // Use the Mini App SDK to open the cast composer (User action)
        await sdk.actions.composeCast({
            text: text,
            embeds: ['https://example.com'] // Replace with actual app URL
        });
    } catch (e) {
        console.error("Share failed", e);
    } finally {
        setIsSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-bold shadow-lg transition-all"
    >
      <Share className="w-4 h-4" />
      {isSharing ? 'Preparing...' : 'Share Collection'}
    </button>
  );
}
