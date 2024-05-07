import cn from "@/lib/clsx";
import type { Metadata, Viewport } from "next";
import ProgressbarProvider from "./components/wrapper/ProgressbarProvider";
import SessionProvider from "./components/wrapper/SessionProvider";
import ToasterProvider from "./components/wrapper/ToasterProvider";
import "./globals.css";
import basierFont from "./font";

export const metadata: Metadata = {
  title: "LKBB Antareja",
  description: "Official Website of LKBB Antareja",
  authors: [
    { name: "Ahsan Azizan", url: "https://ahsanzizan.xyz" },
    { name: "Teguh Bayu Pratama", url: "https://bayu.xtero.live" },
    { name: "Ibani Muhamad Hillabi", url: "https://iban.com" },
    { name: "Muhammad Fadhil Kholaf", url: "https://fadhilkholaf.my.id" },
  ],
  keywords: "antareja, lkbb, moklet, SMK, malang, telkom, paskibra",
  creator: "MokletDev Team",
  publisher: "SMK Telkom Malang",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(basierFont.className + " relative")}>
        <SessionProvider>
          <ToasterProvider />
          <ProgressbarProvider>{children}</ProgressbarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
