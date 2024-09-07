'use client'
import { Footer } from "../app/ui/Footer";
import { Banner } from "./ui/Banner";
import { GuestGreeting } from "@/app/ui/GuestGreeting"
import { ScrollableCards } from '@/app/ui/Cards'
import { acumen } from '@/app/ui/fonts'
import { useUser } from "@auth0/nextjs-auth0/client";
import { Spinner } from "@/app/ui/Spinner"

export default function Home() {
  const { user, error, isLoading } = useUser()
  if (!isLoading && !error ) {
    if (user !== undefined) {

    }
  } 
  return (
      <div className={`text-center ${acumen.className}`}>
        <Banner/>
        {isLoading && <Spinner/>}
        {error && <div className="text-red-700">{error.message} </div>}
        {user === undefined 
          ? <GuestGreeting/> 
          : <div className='text-2xl'> Hello, {user.name}</div>
        }
        <ScrollableCards/>
        <Footer/>
      </div>
  );    
}
