'use client'
import { Footer } from "@/app/ui/Footer";
import { GuestGreeting } from "@/app/ui/GuestGreeting"
import { ScrollableCards } from '@/app/ui/Cards'
import { useUser } from "@auth0/nextjs-auth0/client";
import { Spinner } from "@/app/ui/Spinner"
import { useState } from "react";
import { ActiveEventState } from "@/app/lib/definitions";
import { nullEvent } from "@/app/lib/events";
import { EventCard } from "@/app/ui/EventCard";

export default function Landing() {
  const { user, error, isLoading } = useUser()
  const [activeEvent, setActiveEvent] : ActiveEventState = useState(nullEvent)
  return (
    <>
      <main className='text-center pt-20 dark:text-tangerine-100'>
        {isLoading && <Spinner/>}
        {error && <div className="text-red-700" role="status">{error.message} </div>}
        {/* {user === undefined ? <GuestGreeting/> : <h1 className='text-2xl'> Hello, {user.name}</h1>} */}
        {activeEvent.title !== "initialized" 
          ? <EventCard event={activeEvent} active={true}/> 
          : <ScrollableCards setActiveEvent={setActiveEvent} /> 
        }
      </main>
      <Footer/>
    </>
  );    
}
