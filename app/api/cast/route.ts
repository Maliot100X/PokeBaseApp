import { NextResponse } from 'next/server';
import { neynarClient, APP_SIGNER_UUID } from '@/lib/neynar';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!APP_SIGNER_UUID) {
        return NextResponse.json({ error: "No signer UUID configured" }, { status: 500 });
    }

    const cast = await neynarClient.publishCast({
      signerUuid: APP_SIGNER_UUID,
      text: message,
    });

    return NextResponse.json({ success: true, hash: cast.cast.hash });
  } catch (error) {
    console.error("Error publishing cast:", error);
    return NextResponse.json({ error: "Failed to publish cast" }, { status: 500 });
  }
}
