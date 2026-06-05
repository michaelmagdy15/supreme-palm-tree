import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TAQA Madinat Zayed Buildings - Commercial Cost Analysis",
  description: "Commercial cost analysis and feasibility study dashboard for the TAQA Madinat Zayed Buildings project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden w-full max-w-full`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden w-full max-w-full bg-slate-900">
        {children}
      </body>
    </html>
  );
}
