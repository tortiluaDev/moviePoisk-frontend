import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.scss";
import Providers from "@/app/Providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "MoviePoisk",
  description: "Search movies an another level",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${poppins.variable} ${roboto.variable}`}>
          {children}
        </body>
      </html>
    </Providers>
  );
}
