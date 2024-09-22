import { bookmania } from '@/app/ui/fonts'

export function GuestGreeting() {
    return (
        <>
            <h1 className={`${bookmania.className} font-bold italic text-2xl`}>
                Welcome,
            </h1>
            <div className='pb-2'>
                we look forward to serving you. 
            </div>
            <a href='/api/auth/login' className='py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-blue-100'>
                Begin
            </a>
         </>
    )
}