import Link from "next/link";
import Image from "next/image";
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
      <Link href="/" className="self-center">
        <Image 
          src="/assets/IRL_Logo_Final_Main.png" 
          alt="IRL desktop Logo" 
          width={100} 
          height={100} 
          className="relative hidden sm:block"/>    
        <Image 
          src="/assets/IRL_Logo_Final_Responsive.png" 
          alt="IRL desktop Logo" 
          width={100} 
          height={100} 
          className="relative sm:hidden"/>  
      </Link>
    </footer>
    )
}