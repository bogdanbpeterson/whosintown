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
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Favorites />
        </body>
      </html>
    </Providers>
  );
}
