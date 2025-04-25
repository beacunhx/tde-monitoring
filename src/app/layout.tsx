import type { Metadata } from "next";
import { SideMenu } from "@/components/SideMenu";
import { Poppins } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TDE Monitoring",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased font-sans flex min-h-dvh ${poppins.variable}`}
      >
        <SideMenu />
        <main className="p-2">{children}</main>
      </body>
    </html>
  );
}
