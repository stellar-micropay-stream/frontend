import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stellar MicroPay Stream",
  description: "Real-time micropayment streaming on Stellar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950">
        <nav className="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
          <a href="/" className="text-indigo-400 font-bold text-lg">
            ⚡ MicroPay
          </a>
          <div className="flex gap-4 text-sm text-gray-400">
            <a href="/dashboard" className="hover:text-gray-100 transition-colors">
              Dashboard
            </a>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
