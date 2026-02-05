import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";

if (!process.env.NEYNAR_API_KEY) {
  throw new Error("Make sure to provide NEYNAR_API_KEY");
}

const config = new Configuration({
    apiKey: process.env.NEYNAR_API_KEY,
});

export const neynarClient = new NeynarAPIClient(config);

export const APP_SIGNER_UUID = process.env.NEYNAR_SIGNER_UUID!;
