import Image from "next/image";
import center from "./rivage-tM__6KpPlSw-unsplash.jpg"
import flower from "./flower.jpg"
import Link from "next/link";
import {handlee, cardo} from "@/app/ui/fonts";
import { Footer } from "../app/ui/Footer";
import { Navigation } from "./ui/Navigation";
import { Banner } from "./ui/Banner";
import {ThemeProvider} from "next-themes"

export default function Home() {
  return (
    <div className='dark:bg-gray-800'>
      <Banner/>
      <Footer/>
    </div>
  );    
}
