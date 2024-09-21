'use client'
import Link from "next/link";
import {Links} from '@/app/lib/definitions'
import { usePathname } from "next/navigation";
import Image from "next/image";

const links:Links = {about: 'About', contact: 'Contact'}

export function Footer() {
  const currentPath = usePathname()
    return (
    <footer className='flex flex-col '>
      <div className="flex flex-row sm:gap-20 gap-4 items-center justify-center">
        {Object.keys(links).map((key, value)=> {
          let path = key as keyof Links
          return(
            <Link key={key} href={`/${key}`} className="hover:font-bold">{links[path]}</Link>
          )
        })}
      {currentPath !== "/" && (
        <Link href="/" >
          <Image
            src="/assets/IRL_Logo_Final_Responsive.png"
            alt="Landing page link"
            width={100}
            height={100}
            className="sm:hidden"
            />
        </Link>
      )}
      </div>
    </footer>
    )
}