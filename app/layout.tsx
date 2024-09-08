import type { Metadata } from "next";
import { acumen } from "@/app/ui/fonts"
import "@/app/ui/globals.css";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@auth0/nextjs-auth0/client"

export const metadata: Metadata = {
  title: "In Real Life",
  description: "The web page for the In Real Life foundation",
};

export interface Page {
  name: string;
  path: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <UserProvider>
        <body className={`${acumen.className} antialiased bg-beige-100 dark:bg-brown-100 flex flex-col sm:mb-40 mb-12 page-content z-10 relative`}>
          <ThemeProvider attribute='class'>{children}</ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}