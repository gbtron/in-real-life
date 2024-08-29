import { Footer } from "../app/ui/Footer";
import { Banner } from "./ui/Banner";
import {Cards} from '@/app/ui/Cards'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='dark:bg-gray-800 text-center'>
      <Banner/>
      <div className='text-xl'>
        Welcome,
      </div>
      <div className='pb-2'>
        we look forward to serving you well 
      </div>
      <Link href='/dashboard/register' className='border border-4 px-1 bg-slate-200 rounded-md hover:bg-blue-100'>
        Begin
      </Link>
      <Cards/>
      <Footer/>
    </div>
  );    
}
