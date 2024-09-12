'use client'
import { Footer } from "../app/ui/Footer";
import { Banner } from "./ui/Banner";
import { GuestGreeting } from "@/app/ui/GuestGreeting"
import { ScrollableCards } from '@/app/ui/Cards'
import { useUser } from "@auth0/nextjs-auth0/client";
import { Spinner } from "@/app/ui/Spinner"

export default function Landing() {
  const { user, error, isLoading } = useUser()
  if (!isLoading && !error ) {
    if (user !== undefined) {

    }
  } 
  return (
      <div className='text-center bg-palm bg-scroll bg-no-repeat bg-right-top bg-blend-lighten bg-70% sm:bg-25% w-full max-h-96'>
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
      </div>
  );    
}
