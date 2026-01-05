import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LoanShield | Due Diligence Platform",
  description: "Automated Loan Trading Due Diligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen overflow-hidden`}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 ml-64 overflow-auto p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
