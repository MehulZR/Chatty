import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import { store } from "@/store";
//import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Chatty",
  description: "Chatting made fun.",
};

//<Provider store={store}>{children}</Provider>
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
