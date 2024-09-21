import { bookmania } from '@/app/ui/fonts'

export function GuestGreeting() {
    return (
        <div className='dark:text-tangerine-100 '>
            <h1 className={`${bookmania.className} font-bold italic text-2xl`}>
                Welcome,
            </h1>
            <div className='pb-2'>
                we look forward to serving you. 
            </div>
            <a href='/api/auth/login' className='py-1 px-2 bg-tangerine-200 dark:bg-tangerine-400 dark:text-white hover:font-bold rounded-md '>
                Begin
            </a>
         </div>
    )
}