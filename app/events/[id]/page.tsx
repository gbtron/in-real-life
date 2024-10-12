'use client'
import { EventCard } from "@/app/ui/EventCard";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getEventById } from "@/app/lib/data"
import { Greeting } from "@/app/ui/Greeting";
import { Banner } from "@/app/ui/Banner"

export default function Card( {params} : { params:{ id:string } }) {
    const eventId = params.id
    const { user } = useUser()
    return (
        <>
            <Banner/>
            <main className="text-center pt-20 ">
                <Greeting user={ user } eventSelected={true}/>
                <EventCard event={getEventById(eventId)} selected={true}/>
            </main>
        </>
    )
}