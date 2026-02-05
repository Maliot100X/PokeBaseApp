import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { FarcasterInit } from "@/components/FarcasterInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const frame = {
  version: "1",
  imageUrl: "https://placehold.co/600x400/png",
  button: {
    title: "View Monsters",
    action: {
      type: "launch_frame",
      name: "ClankerMon Tracker",
      url: "https://example.com",
      splashImageUrl: "https://placehold.co/200x200/png",
      splashBackgroundColor: "#000000",
    },
  },
};

export const metadata: Metadata = {
  title: "ClankerMon Tracker",
  description: "Track your Base tokens as monsters!",
  other: {
    "fc:frame": JSON.stringify(frame),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <FarcasterInit />
          {children}
        </Providers>
      </body>
    </html>
  );
}
