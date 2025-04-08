import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { VercelToolbar } from "@vercel/toolbar/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clipes Awards - Kaique's House",
  description: "Melhores clipes do servidor Kaique's House",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultTheme = "dark";
  const shouldInjectToolbar = process.env.NODE_ENV === "development";

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <ThemeProvider
          attribute="class"
          defaultTheme={defaultTheme}
          disableTransitionOnChange
        >
          {children}
          {shouldInjectToolbar && <VercelToolbar />}
        </ThemeProvider>
      </body>
    </html>
  );
}
