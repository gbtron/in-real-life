'use client'
import { Footer } from "@/app/ui/Footer";
import { GuestGreeting } from "@/app/ui/GuestGreeting"
import { ScrollableCards } from '@/app/ui/Cards'
import { useUser } from "@auth0/nextjs-auth0/client";
import { Spinner } from "@/app/ui/Spinner"

export default function Landing() {
  const { user, error, isLoading } = useUser()
  return (
      <div className='text-center pt-20'>
        <main>
          {isLoading && <Spinner/>}
          {error && <div className="text-red-700" role="status">{error.message} </div>}
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
