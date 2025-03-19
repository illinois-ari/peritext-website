import "./globals.css";
import { Playfair_Display, Open_Sans } from "next/font/google";
import Flipbook from "@/components/Flipbook";

// Load Open Sans (default font)
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

// Load Playfair Display (for headings)
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

export const metadata = {
  title: "Peritext",
  description: "Peritext Project Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${playfairDisplay.variable}`}
    >
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <Flipbook>{children}</Flipbook>
        </div>
      </body>
    </html>
  );
}
