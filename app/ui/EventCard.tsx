import { ActiveEventDispatch, Event } from "@/app/lib/definitions"
import { FaPerson } from 'react-icons/fa6'
import { getParticipantCount, nullEvent } from "@/app/lib/events";
import { IoIosArrowBack } from "react-icons/io";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

export const EventCard = ({ event, selected } : { event: Event, selected:boolean }) => {
    const router = useRouter()
    const { user } = useUser()
    return (
        <div 
            className={clsx(
                'h-full px-1 bg-white/50 dark:bg-black/50 mx-2 sm:mx-32 border-solid border-2 sm:border-4 border-tangerine-400 dark:border-tangerine-100 dark:text-tangerine-100 rounded-md', 
                {
                    'my-12': selected
                }
            )}
        >
            <div className='flex text-left justify-between items-center h-12'>
                {selected && (<button onClick={() => router.push('/')} ><IoIosArrowBack/></button>)}
                <div>{event.membersOnly && 'Members Only'}</div>
                <div>{event.sign}</div>
            </div>
            <div className='flex flex-col pt-4 sm:pt-12 text-center items-center h-1/2'>
                <div>{event.title}</div>
                <div>on {event.date.toLocaleDateString(undefined, {month:'long', day:'numeric'})}</div>
                {selected && (
                    <>
                        <div>at {event.date.toLocaleTimeString([], {hour:'numeric', minute:'numeric'})}</div>
                        {event.instructors && <div> with {event.instructors?.map((instructor)=>instructor)}</div> }
                        <div className='w-1/2 sm:w-1/4 mt-4 p-2'>{event.description}</div>
                        {user && 
                            <button 
                                className="bg-tangerine-400 hover:font-semibold text-white px-4 rounded-xl w-20 sm:ml-[23rem]"
                            >
                                Join
                            </button>
                        }
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