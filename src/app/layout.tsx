import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

// Toggle this or use process.env.NEXT_PUBLIC_SITE_URL
const siteUrl = "https://precision-pay-website.vercel.app/"; 

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Precision Pay | Exceptional Payroll Services",
  description:
    "Specializing in seamless, accurate, and rapid payroll processing. Bespoke payroll systems for ambitious companies — crafted with precision, clarity, and care.",
  keywords: ["payroll", "payroll services", "UK payroll", "tax compliance", "statutory compliance", "payroll processing"],
  openGraph: {
    title: "Precision Pay | Exceptional Payroll Services",
    description: "Bespoke payroll systems for ambitious companies.",
    url: siteUrl,
    siteName: "Precision Pay",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/opengraph-image.jpg", // This will now resolve to https://precision-pay-website.vercel.app/opengraph-image.jpg
        width: 1200,
        height: 630,
        alt: "Precision Pay Payroll Services",
      },
    ],
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