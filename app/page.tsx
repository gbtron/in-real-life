'use client'
import { Footer } from "../app/ui/Footer";
import { Banner } from "./ui/Banner";
import {ScrollableCards} from '@/app/ui/Cards'
import { bookmania } from '@/app/ui/fonts'
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, error, isLoading } = useUser()
  if (isLoading) return <>Loading</>
  if (error) return <>{error.message}</>
  return (
      <div className='dark:bg-gray-800 text-center'>
        <Banner user={user}/>
        <div className={`${bookmania.className} font-bold italic text-2xl`}>
          Welcome,
        </div>
        <div className='pb-2'>
          we look forward to serving you well 
        </div>
        <a href='/dashboard/register' className='py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-blue-100'>
          Begin
        </a>
        <ScrollableCards/>
        <Footer/>
      </div>
  );    
}
