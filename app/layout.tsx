import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RaashanKartProvider } from "@/lib/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RaashanKart - Hyperlocal Grocery Platform",
  description: "Find nearby grocery stores instantly, chat with shopkeepers, and get quick deliveries or pickups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col text-slate-900 antialiased transition-colors duration-200">
        <RaashanKartProvider>
          {children}
        </RaashanKartProvider>
      </body>
    </html>
  );
}
