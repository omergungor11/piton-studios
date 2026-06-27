import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piton Studios — Digital Studio",
  description: "Design, code & AI under one roof.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
