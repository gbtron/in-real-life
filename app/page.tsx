'use client'
import { Footer } from "../app/ui/Footer";
import { Banner } from "./ui/Banner";
import { GuestGreeting } from "@/app/ui/GuestGreeting"
import { ScrollableCards } from '@/app/ui/Cards'
import { useUser } from "@auth0/nextjs-auth0/client";
import { Spinner } from "@/app/ui/Spinner"
import Image from "next/image";

export default function Landing() {
  const { user, error, isLoading } = useUser()
  if (!isLoading && !error ) {
    if (user !== undefined) {

    }
  } 
  return (
      <div className='text-center'>
        <Banner/>
        <main>
          {isLoading && <Spinner/>}
          {error && <div className="text-red-700">{error.message} </div>}
          {user === undefined 
            ? <GuestGreeting/> 
            : <h1 className='text-2xl'> Hello, {user.name}</h1>
          }
          <ScrollableCards/>
        </main>
        <Footer/>
          <Image
              src="/assets/PalmLeaf.png"
              alt="Palm leaf decoration"
              width={670}
              height={450}
              className="rotate-90 z-[-1] fixed bottom-0 -right-14"
              />
        
      </div>
  );    
}
