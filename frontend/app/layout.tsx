import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const headline = localFont({
  src: "./fonts/merriweather.woff2",
  variable: "--font-headline",
  weight: "300 900",
  display: "swap",
});
const body = localFont({
  src: "./fonts/source-sans-3.woff2",
  variable: "--font-body",
  weight: "200 900",
  display: "swap",
});
const label = localFont({
  src: "./fonts/public-sans.woff2",
  variable: "--font-label",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "INCAE | Perspectivas empresariales",
  description:
    "Estrategia empresarial, operaciones y perspectivas alumni. Prototipo editorial.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${headline.variable} ${body.variable} ${label.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
