import "../styles.css";
import React from "react";
import { ThemeProvider } from "../components/theme-provider";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "../lib/utils";
import { Metadata } from "next";
import client from "../tina/__generated__/client";
import Link from "next/link";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export const metadata: Metadata = {
  title: "ShaneDev",
  description: "Testing, learning, impelementing tech.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalQuery = await client.queries.global({
    relativePath: "index.json",
  });
  const global = globalQuery.data.global;

  const selectFont = (fontName: string) => {
    switch (fontName) {
      case "nunito":
        return `font-nunito ${nunito.variable}`;
      case "lato":
        return `font-lato ${lato.variable}`;
      case "sans":
      default:
        return `font-sans ${fontSans.variable} `;
    }
  };
  const fontVariable = selectFont(global.theme.font);

  return (
    <html lang="en">
      <body className={cn("min-h-screen flex flex-col antialiased", fontVariable)}>
        {/* Navigation Bar */}
        <nav className="w-full bg-white/80 backdrop-blur-md shadow-md fixed top-0 z-50">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            {/* Logo */}
            <a href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600">
              YourLogo
            </a>

            {/* Navigation Links */}
            <ul className="flex space-x-8 text-lg">
              <li>
                <Link
                  href="/calculator"
                  className="text-gray-600 hover:text-gray-800 transition-colors mr-24"
                >
                  Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/content/about"
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/content/posts"
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        {/* <main className="pt-16">
          {children}
        </main> */}
        <main className="mt-24">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            forcedTheme={global.theme.darkMode}
          >
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
    // <html lang="en" suppressHydrationWarning>
    //   <body
    //     className={cn("min-h-screen flex flex-col antialiased", fontVariable)}
    //   >
    //     <ThemeProvider
    //       attribute="class"
    //       defaultTheme="system"
    //       disableTransitionOnChange
    //       forcedTheme={global.theme.darkMode}
    //     >
    //       {children}
    //     </ThemeProvider>
    //   </body>
    // </html>
  );
}
