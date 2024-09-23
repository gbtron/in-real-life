'use client'
import { Footer } from "@/app/ui/Footer";
import { ScrollableCards } from '@/app/ui/ScrollableCards'
import { useUser } from "@auth0/nextjs-auth0/client";
import { Spinner } from "@/app/ui/Spinner"
import { useState } from "react";
import { ActiveEventState } from "@/app/lib/definitions";
import { nullEvent } from "@/app/lib/events";
import { EventCard } from "@/app/ui/EventCard";
import { Greeting } from "./ui/Greeting";

export default function Landing() {
  const { user, error, isLoading } = useUser()
  const [activeEvent, setActiveEvent] : ActiveEventState = useState(nullEvent)
  const eventSelected = activeEvent.title !== "initialized"
  return (
    <>
      <main className='text-center pt-20 dark:text-tangerine-100'>
        {isLoading && <Spinner/>}
        {error && <div className="text-red-700" role="status">{error.message} </div>}
        <Greeting user={ user } eventSelected={eventSelected}/>
        {eventSelected
          ? <EventCard setActiveEvent={setActiveEvent} event={activeEvent} selected={true} user={user}/> 
          : <ScrollableCards setActiveEvent={setActiveEvent} /> 
        }
      </main>
      <Footer/>
    </>
  );    
}
