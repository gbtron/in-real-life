import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts"
import "@/app/ui/globals.css";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@auth0/nextjs-auth0/client"

export const metadata: Metadata = {
  title: "In Real Life",
  description: "The home page for in real life",
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
        <body className={`${inter.className} antialiased`}>
          <div className="page-content z-10 relative">
            <main className='flex flex-col sm:mb-40 mb-12'>
              <ThemeProvider attribute='class'>{children}</ThemeProvider></main>
          </div>
        </body>
      </UserProvider>
    </html>

  );
}