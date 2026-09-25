import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "House Price Predictor",
  description: "Machine Learning powered California house price prediction",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col border  justify-center text-center ">
        <header className="p-4 text-center ">
          <h2 className="text-5xl font-bold font-display tracking-wide text-red-600">
            House Price Predictor
          </h2>
          <p>Machine Learning powered California house price prediction</p>
        </header>

        <main className="flex-1 flex justify-center border ">{children}</main>

        <footer>
          <p>@Vendi Vardhan Babu</p>
          <p>@Supervised ML Project</p>
        </footer>
      </body>
    </html>
  );
}
