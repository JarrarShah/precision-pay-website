import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Precision Pay | Exceptional Payroll Services",
  description:
    "Specializing in seamless, accurate, and rapid payroll processing. Bespoke payroll systems for ambitious companies — crafted with precision, clarity, and care.",
  keywords: "payroll, payroll services, UK payroll, tax compliance, statutory compliance, payroll processing",
  openGraph: {
    title: "Precision Pay | Exceptional Payroll Services",
    description: "Bespoke payroll systems for ambitious companies.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
