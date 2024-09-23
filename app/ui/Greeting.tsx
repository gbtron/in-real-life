import { bookmania } from '@/app/ui/fonts'
import { UserProfile } from '@auth0/nextjs-auth0/client'

export const Greeting = ({ user, eventSelected }: {user: UserProfile | undefined, eventSelected:boolean}) => {
    return (
        <div className='dark:text-tangerine-100'>
            {user === undefined && !eventSelected &&
                    <>
                        <h1 className={`${bookmania.className} font-bold italic text-2xl`}>
                            Welcome,
                        </h1>
                        <h2 className='pb-2'>
                            we look forward to serving you. 
                        </h2>
                        <a href='/api/auth/login' className='py-1 px-2 bg-tangerine-200 dark:bg-tangerine-400 dark:text-white hover:font-bold rounded-md '>
                            Begin
                        </a>
                    </>
            }
            {user === undefined && eventSelected &&
            <>
                <h2 className="my-4">Sign in or register an account to join the event.</h2>
                <a href='/api/auth/login' className='py-1 px-2 bg-tangerine-200 dark:bg-tangerine-400 dark:text-white hover:font-bold rounded-md '>
                    Access account
                </a>
            </>
            }
            {user !== undefined && !eventSelected &&
                <div>Select an event below to get started. </div>
            }
         </div>
    )
}