# ClankerMon Tracker 👾

> Track your Base tokens as battle-ready monsters in this Farcaster Mini App!

![ClankerMon Banner](https://placehold.co/1200x400/171717/white?text=ClankerMon+Tracker)

ClankerMon Tracker is a gamified portfolio tracker built as a Farcaster Mini App (Frame v2). It scans your Base network wallet and transforms your token holdings into unique "ClankerMon" cards.

## 🌟 Features

-   **Wallet Scanning**: Instantly connects to your Base wallet (Coinbase Wallet, etc.) to fetch balances.
-   **Gamified Portfolio**: Visualizes boring token numbers as "Combat Power" (CP) and Monster Cards.
-   **Farcaster Native**: Runs smoothly inside Warpcast and other Farcaster clients.
-   **Social Sharing**: One-click sharing of your collection to Farcaster using the Neynar integration.
-   **Bot Powered**: Includes server-side capabilities for automated interactions.

## 📱 Screenshots

| Scanner View | Collection View | Share Preview |
|:---:|:---:|:---:|
| ![Scanner](https://placehold.co/300x600/171717/white?text=Scanning...) | ![Collection](https://placehold.co/300x600/171717/white?text=Collection) | ![Share](https://placehold.co/300x600/171717/white?text=Share) |

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Blockchain**: [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/) (Base Network)
-   **UI/UX**: [Tailwind CSS](https://tailwindcss.com/) & [OnchainKit](https://onchainkit.xyz/)
-   **Farcaster**: [`@farcaster/miniapp-sdk`](https://www.npmjs.com/package/@farcaster/miniapp-sdk)
-   **Bot/Cast**: [`@neynar/nodejs-sdk`](https://neynar.com/)

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+ installed.
-   A Farcaster account (for testing context).
-   A [Neynar](https://neynar.com/) API Key (for sharing/casting features).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/clankermon-tracker.git
    cd clankermon-tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Copy `.env.example` to `.env.local` and fill in your keys.
    ```bash
    cp .env.example .env.local
    ```
    *   `NEYNAR_API_KEY`: Your Neynar API Key.
    *   `NEYNAR_SIGNER_UUID`: The UUID for your bot/app signer.
    *   `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: (Optional) For Coinbase OnchainKit features.

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing & Preview

### Local Preview
Since this is a Farcaster Mini App, it is best tested within a Frame debugging environment or directly in the browser with the SDK mocking.

1.  Navigate to `http://localhost:3000`.
2.  The app will load in "browser mode". To simulate Farcaster context, you can use the [Farcaster Developer Tools](https://warpcast.com/~/developers/frames).
3.  Connect your Base wallet when prompted to see the scanning animation and your "Monsters".

### Production Preview
To test the actual Frame v2 functionality:
1.  Deploy to Vercel (or any HTTPS host).
2.  Use the [Warpcast Frame Debugger](https://warpcast.com/~/developers/frames) and enter your deployment URL.

## 📂 Project Structure

-   `/app`: Next.js App Router pages and API routes.
-   `/components`: React components (`Scanner`, `MonsterCard`, `ShareButton`).
-   `/lib`: Utilities for blockchain (`tokens.ts`) and Farcaster (`neynar.ts`).
-   `/public/.well-known`: Contains the `farcaster.json` manifest.

## 📜 License

MIT
