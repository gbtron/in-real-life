import { ActiveEventDispatch, Event } from "@/app/lib/definitions"
import { FaPerson } from 'react-icons/fa6'
import { getParticipantCount } from "@/app/lib/events";

export const EventCard = ({ event, setActiveEvent } : { event: Event, setActiveEvent:ActiveEventDispatch}) => {
    return (
        <div 
            className='h-full px-1 bg-white/50 dark:bg-black/50 mx-2 sm:mx-32 border-solid border-2 sm:border-4 border-tangerine-400 dark:border-tangerine-100 dark:text-tangerine-100 rounded-md'
            onClick={() => {
                event.title !== "initialized" && setActiveEvent(event)
            }}
        >
            <div className='flex text-left justify-between h-12'>
                <div>{event.membersOnly && 'Members Only'}</div>
                <div>{event.sign}</div>
            </div>
            <div className='flex flex-col pt-4 sm:pt-12 text-center h-1/2'>
                <div>{event.title}</div>
                <div>on {event.date.toLocaleDateString(undefined, {month:'long', day:'numeric'})}</div>
                {event.title !== "initialized" && (
                    <>
                        <div>at {event.date.toLocaleTimeString([], {hour:'numeric', minute:'numeric'})}</div>
                        {event.instructors && <div> with {event.instructors?.map((instructor)=>instructor)}</div> }
                    </>
                )}
            </div>
            <div className='pt-8 flex justify-center items-center'>
                {getParticipantCount()}
                <FaPerson/>
            </div>
        </div>
    )
}