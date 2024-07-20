import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Navigation} from "./Navigation";
import { Dropdown } from "./Dropdown";

const inter = Inter({ subsets: ["latin"] });

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
  const pages = [{ name: "In Real Life", path: "/" }, {name:"Contact Us", path:"/contact"}];
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cardo&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Maiden+Orange&family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&family=Oswald:wght@200..700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Handlee&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body className={inter.className}>
        <Navigation pages={pages}/>
        <Dropdown pages={pages}/>
        <div className="page-content">
          {children}
        </div>
      </body>
    </html>
  );
}