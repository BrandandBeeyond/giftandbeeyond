"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientProvider";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en">
      <body className="antialiased">
        <ClientProvider>
          <main className={mounted ? `${geistSans.variable} ${geistMono.variable}` : ""}>
            {children}
            <Toaster/>
          </main>
        </ClientProvider>
      </body>
    </html>
  );
}
