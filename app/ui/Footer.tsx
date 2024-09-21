'use client'
import Link from "next/link";
import {Links} from '@/app/lib/definitions'
import { usePathname } from "next/navigation";
import Image from "next/image";
import clsx from 'clsx';
import { bookmania } from "@/app/ui/fonts";

const links:Links = {about: 'About', contact: 'Contact'}

export function Footer() {
  const currentPath = usePathname()
  const isContactForm = currentPath === '/contact'

  return (
    <footer className='flex flex-col items-center'>
      <div className="flex flex-row sm:gap-20 gap-4 items-center justify-center">
        {Object.keys(links).map( (pathname, key) => {
          let path = pathname as keyof Links
          return(
            <Link key={key} href={`/${pathname}`} className="hover:font-bold">{links[path]}</Link>
          )
        })}
      </div>
      <Link href="/">
        {!isContactForm && (
          <Image
            src="/assets/IRL_Logo_Final_Main.png"
            alt="Landing page link"
            width={200}
            height={200}
            className="hidden sm:block"
          />
        )}
          
        <Image
          src="/assets/IRL_Logo_Final_Responsive.png"
          alt="Landing page link"
          width={100}
          height={100}
          className="sm:hidden"
        />
        
      </Link>
      <div className={clsx(
        {'sm:hidden': isContactForm}
      )}>
        <Address />
      </div>
    </footer>
  )
}

export const Address = () => (
      <div className={`text-tangerine-900 ${bookmania.className} italic`}>
        <div>1430 South Dixie Hwy</div>
        <div>Coral Gables, FL 33146</div>
      </div>
    )
