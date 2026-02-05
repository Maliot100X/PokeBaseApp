'use client';

import { useEffect } from 'react';
import sdk from '@farcaster/miniapp-sdk';

export function FarcasterInit() {
  useEffect(() => {
    const init = async () => {
      try {
        await sdk.actions.ready();
        console.log("Farcaster SDK Ready");
      } catch (e) {
        console.error("Farcaster SDK Init Error:", e);
      }
    };
    init();
  }, []);

  return null;
}
