import { bookmania } from '@/app/ui/fonts'
import { UserProfile } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import { BiQuestionMark } from "react-icons/bi";
import { IconContext } from 'react-icons';

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
            {user !== undefined && eventSelected &&
                <>
                    <a className="text-2xl translate-x-6 pl-12">Will you join us </a>
                    <Image 
                        src="/assets/IRL_Logo_Final_Responsive.png" 
                        alt="In Real Life Logo" 
                        width={100} 
                        height={100} 
                        className="sm:hidden object-center object-scale-down h-20 w-20 relative inline -translate-x-6 -translate-y-2"
                    />
                    <Image 
                        src="/assets/IRL_Logo_Final_Main.png" 
                        alt="In Real Life Logo" 
                        width={100} 
                        height={100} 
                        className="hidden sm:inline object-center object-scale-down h-40 w-40 relative inline -translate-x-6 -translate-y-2"
                    />
                    <IconContext.Provider value={{size:"1.5rem", className:"font-medium"}}>
                        <BiQuestionMark className="inline -translate-x-12 h-20 -translate-y-1"/>
                    </IconContext.Provider>
                    
                </>
            }
         </div>
    )
}