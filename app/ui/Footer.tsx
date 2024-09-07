import Link from "next/link";
import {Links} from '@/app/lib/definitions'

const links:Links = {about: 'About', contact: 'Contact'}

export function Footer() {
    return (
    <footer className='flex flex-col'>
      <div className="flex flex-row sm:gap-20 gap-4 items-center justify-center">
        {Object.keys(links).map((key, value)=> {
          let path = key as keyof Links
          return(
            <Link key={key} href={`/${key}`} className="hover:font-bold">{links[path]}</Link>
          )
        })}
      </div>
    </footer>
    )
}