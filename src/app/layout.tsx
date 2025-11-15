// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { TRPCProvider } from "~/providers/TRPCProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Menu System",
  description: "Manage your restaurant menus digitally",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
