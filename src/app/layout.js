"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientProvider";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import CartSidebar from "@/components/ui/CartSidebar";
import { LoaderProvider } from "@/context/LoaderContext";
import GlobalLoader from "./loader/GlobalLoader";
import SmoothScrolling from "@/components/SmoothScrolling";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const openHandler = () => setSidebarOpen(true);
    const closeHandler = () => setSidebarOpen(false);

    window.addEventListener("open-cart", openHandler);
    window.addEventListener("close-cart", closeHandler);

    return () => {
      window.removeEventListener("open-cart", openHandler);
      window.removeEventListener("close-cart", closeHandler);
    };
  }, []);

  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScrolling>
          <ClientProvider>
            <LoaderProvider>
              <main
                className={
                  mounted ? `${geistSans.variable} ${geistMono.variable}` : ""
                }
              >
                {children}
                <GlobalLoader />
                <Toaster />
              </main>

              <CartSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            </LoaderProvider>
          </ClientProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
