"use client"
import { handlee } from "@/app/ui/fonts"
import { useState } from "react"
import clsx from "clsx"
import Link from "next/link";

export default function Register() {
    const [isDisabled, setIsDisabled] = useState(true);

    return (
            <div className="flex flex-col sm:flex-row px-4 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
                <div className="sm:block w-3/4 sm:w-1/2 pl-4 sm:pr-44 sm:pt-36 pt-8 text-slate-600">
                    <div className={`${handlee.className} text-4xl lg:text-6xl text-slate-600 font-semibold `}>
                        IRL
                    </div>
                    <div className="text-2xl pt-12 hidden sm-block  ">
                        Get started
                    </div>
                </div>

                <div className="bg-white sm:mt-12 mt-4 sm:w-3/6 sm:pt-16 pt-8 pb-1 rounded-md border-black">
                    <h1 className="px-4 sm:px-16 text-2xl text-slate-900 font-semibold"> Create your IRL account</h1>
                    <div className="mt-6 px-4 sm:px-16 flex flex-col">
                        <label htmlFor="first-name" className="font-medium text-sm inline-block w-full">First Name</label>
                        <input 
                            aria-describedby="name-error" 
                            className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" 
                            id="first-name" 
                            name="first-name" 
                            type="text" 
                            required
                        />
                    </div>
                    <div className="mt-6 px-4 sm:px-16 flex flex-col">
                        <label htmlFor="last-name" className="font-medium text-sm inline-block w-full">Last Name</label>
                        <input 
                            aria-describedby="name-error" 
                            className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" 
                            id="last-name" 
                            name="last-name" 
                            type="text" 
                            required
                        />
                    </div>
                    <div className="mt-8 px-4 sm:px-16 flex flex-col ">
                        <label htmlFor="email" className="font-medium text-sm inline-block w-full">Email</label>
                        <input aria-describedby="name-error" className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" id="email" name="email" type="email" required/>
                    </div>
                    <div className="mt-8 px-4 sm:px-16 flex flex-col ">
                        <label htmlFor="email" className="font-medium text-sm inline-block w-full">Phone Number</label>
                        <input aria-describedby="name-error" className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" id="phone" name="phone" type="tel" required/>
                    </div>
                    <div className="mt-6 px-4 sm:px-16 flex flex-col">
                        <label htmlFor="password" className="font-medium text-sm inline-block w-full">Password</label>
                        <input aria-describedby="name-error" className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" id="password" name="password" type="password" required/>
                    </div>

                    <div className="mt-10 px-4 sm:px-16 justify-end flex md:justify-start">
                        <button className={clsx(
                            "bg-indigo-900 text-white px-4 py-2 rounded-md w-full",
                            {
                                'hover:bg-indigo-300': !isDisabled,
                            }
                         )} disabled={isDisabled} >Create account</button>
                    </div>
                    <div className="p-6 rounded bg-camo mt-12 mx-1 text-center text-sm text-slate-600">
                        Already have an account?  {' '}
                        <Link href="/dashboard/login" className="text-indigo-500 hover:text-indigo-900">
                            Sign in
                        </Link>
                    </div>
                </div>    
            </div>
    )
}