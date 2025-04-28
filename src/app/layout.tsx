import type { Metadata } from "next";
import { AppSidebar } from "@/components/AppSidebar";
import { Poppins } from "next/font/google";
import Providers from "./providers";

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
        className={`flex min-h-dvh font-sans antialiased ${poppins.variable}`}
      >
        <Providers>
          <AppSidebar />
          <main className="flex flex-1 flex-col gap-4 p-2">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
