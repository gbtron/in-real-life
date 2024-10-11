'use client'
import { Footer } from "@/app/ui/Footer";
import { ScrollableCards } from '@/app/ui/ScrollableCards'
import { useUser } from "@auth0/nextjs-auth0/client";
import { Spinner } from "@/app/ui/Spinner"
import { Greeting } from "./ui/Greeting";

export default function about() {
  const { user, isLoading, error } = useUser()
  return (
    <>
      <main className='text-center pt-20 dark:text-tangerine-100'>
			  {isLoading && <Spinner/>}
			  {error && <div className="text-red-700" role="status">{error.message} </div>}
			  <Greeting user={ user } eventSelected={false}/>
			  <ScrollableCards /> 
      </main>
      <Footer/>
    </>
  );    
}
