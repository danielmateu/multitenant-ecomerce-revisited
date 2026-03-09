import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";

// import { ThemeProvider } from "@/components/theme-provider";
// import { ThemeProvider } from "@/components/theme-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  // variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Fun Rad App",
  description: "Multitenant app built with love by Daniel Mateu, following Code WIth Antonio's tutorial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={` ${dmSans.className} antialiased`}
      >
        <TRPCReactProvider>
          <Toaster />
          {children}

        </TRPCReactProvider>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        </ThemeProvider> */}
      </body>
    </html>
  );
}
