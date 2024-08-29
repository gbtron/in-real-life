import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts"
import "@/app/ui/globals.css";
import {Navigation} from "./ui/Navigation";
import { Dropdown } from "./ui/Dropdown";
import { ThemeProvider } from "next-themes";

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
  const pages = [{ name: "In Real Life", path: "/" }, {name:"Join", path:"/dashboard/register"}, {name:"Contact", path:"/contact"}];
  return (
  
    <html suppressHydrationWarning lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="page-content z-10 relative">
          <main className='flex flex-col sm:mb-40 mb-12'>
            <ThemeProvider attribute='class'>{children}</ThemeProvider></main>
        </div>
      </body>
    </html>

  );
}