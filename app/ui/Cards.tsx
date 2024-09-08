import { mockEvents } from "@/app/lib/data"

export function ScrollableCards() {
    const getParticipantCount = () => (5)
    return (
        <div className='width-full overflow-x-auto px-24 py-2 mt-4'>
            <div className='flex width-full'>
                {mockEvents.map((event, i)=> (
                    <div className='w-full h-4/6 py-2 px-1 border-solid border-2 border-tangerine-400 dark:border-tangerine-100 rounded-md' key={i}>
                        <div className='flex flex-row justify-between'>
                            <div>{event.membersEvent && 'Members Only'}</div>
                            <div>{event.sign}</div>
                        </div>
                        <div className='flex flex-col pt-4 text-center'>
                            <div>{event.title}</div>
                            <div>on {event.date.toDateString()}</div>
                        </div>
                        <div className='pt-8'>{getParticipantCount()}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}