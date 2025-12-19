import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Performates - Melbourne Performance Marketing Meetup",
  description:
    "Join Melbourne's premier monthly networking event for performance marketing professionals. Connect with fellow marketers specializing in PPC, SEO, analytics, and growth marketing.",
  keywords: [
    "performance marketing",
    "Melbourne",
    "networking",
    "digital marketing",
    "PPC",
    "SEO",
    "analytics",
    "growth marketing",
    "meetup",
  ],
  openGraph: {
    title: "Performates - Melbourne Performance Marketing Meetup",
    description:
      "Monthly networking event for performance marketing professionals in Melbourne, Australia",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
