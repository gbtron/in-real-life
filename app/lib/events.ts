import { Event } from "@/app/lib/definitions";

export const sortEvents = (mockEvents:Event[]) => {
    const parseDate = (date: Date) => ( Date.parse( date.toUTCString() ) )
    return mockEvents.toSorted( (a,b) => parseDate(a.date) - parseDate(b.date) )
}

export const getParticipantCount = () => (Math.round(Math.random()*20))