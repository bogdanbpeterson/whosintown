import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/providers";
import Favorites from "@/components/favorites";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Who's in town",
  description: "Find new events for you to visit in your town!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html className="h-full" lang="en">
        <body
          className={`${inter.className} m-auto flex h-full max-w-6xl justify-between gap-5 p-4`}
        >
          {children}
          <Favorites />
        </body>
      </html>
    </Providers>
  );
}
