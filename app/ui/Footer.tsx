'use client'
import Link from "next/link";
import {Links} from '@/app/lib/definitions'

const links:Links = {'/': 'About Us', 'contact': 'Contact'}

export function Footer() {
    return (
    <footer className='flex flex-col absolute inset-x-0 bottom-12 sm:bottom-20'>
      <div className="flex flex-row sm:gap-20 gap-4 items-center justify-center">
        {Object.keys(links).map( (key, value) => {
          const path = key as keyof Links
          let pathname = path as string
          return(
            <Link key={key} href={pathname} className="hover:font-bold">{links[path]}</Link>
          )
        })}
      </div>
    </footer>
    )
}