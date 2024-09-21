import type { Metadata } from "next";
import { acumen } from "@/app/ui/fonts"
import "@/app/ui/globals.css";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { Banner } from "./ui/Banner";

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
        <body className={`${acumen.className} antialiased bg-beige-100 dark:bg-brown-900 flex flex-col page-content z-10 relative `}>
          <div className="bg-palm bg-scroll bg-no-repeat bg-right-top bg-70% sm:bg-25% w-full max-h-96">
            <ThemeProvider attribute='class'>
              <Banner/>
              {children}
            </ThemeProvider>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}