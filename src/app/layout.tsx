import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parth Salunke | Digital Command Center",
  description:
    "Parth Salunke — Frontend, Flutter, Cybersecurity, and UI/UX portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${jetbrains.variable} scroll-smooth`}>
      <body className={`${orbitron.className} min-h-screen antialiased scanline`}>
        {children}
      </body>
    </html>
  );
}
