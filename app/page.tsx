import { Footer } from "../app/ui/Footer";
import { Banner } from "./ui/Banner";
import {ScrollableCards} from '@/app/ui/Cards'
import Link from 'next/link'
import { bookmania } from '@/app/ui/fonts'

export default function Home() {
  return (
    <div className='dark:bg-gray-800 text-center'>
      <Banner/>
      <div className={`${bookmania.className} font-bold italic text-2xl`}>
        Welcome,
      </div>
      <div className='pb-2'>
        we look forward to serving you well 
      </div>
      <Link href='/dashboard/register' className='py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-blue-100'>
        Begin
      </Link>
      <ScrollableCards/>
      <Footer/>
    </div>
  );    
}
