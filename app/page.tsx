'use client'
import { Footer } from "@/app/ui/Footer";
import { bookmania } from '@/app/ui/fonts'
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
        <div className='dark:text-tangerine-100 '>
            <h1 className={`${bookmania.className} font-bold italic text-2xl`}>
                Welcome,
            </h1>
            {user === undefined 
                ? 
                    <>
                        <div className='pb-2'>
                            we look forward to serving you. 
                        </div>
                        <a href='/api/auth/login' className='py-1 px-2 bg-tangerine-200 dark:bg-tangerine-400 dark:text-white hover:font-bold rounded-md '>
                            Begin
                        </a>
                    </>
                : 
                <div>Select an event below to get started. </div>
            }
         </div>
        {activeEvent.title !== "initialized" 
          ? <EventCard event={activeEvent} active={true}/> 
          : <ScrollableCards setActiveEvent={setActiveEvent} /> 
        }
      </main>
      <Footer/>
    </>
  );    
}
