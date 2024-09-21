import { Event } from "@/app/lib/definitions"
import { FaPerson } from 'react-icons/fa6'
import { getParticipantCount } from "@/app/lib/events";

export const EventCard = ({ event, active } : { event: Event, active:boolean}) => {
    return (
        <>
            <div className='flex text-left justify-between h-12'>
                <div>{event.membersOnly && 'Members Only'}</div>
                <div>{event.sign}</div>
            </div>
            <div className='flex flex-col pt-4 sm:pt-12 text-center h-1/2'>
                <div>{event.title}</div>
                <div>on {event.date.toLocaleDateString(undefined, {month:'long', day:'numeric'})}</div>
            </div>
            <div className='pt-8 flex justify-center items-center'>
                {getParticipantCount()}
                <FaPerson/>
            </div>
        </>
    )
}