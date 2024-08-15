import { handlee } from "@/app/ui/fonts"
import Link from "next/link"

export default function Login() {
    return (
        <div className="flex flex-col sm:flex-row px-4 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
            <div className="sm:block w-3/4 sm:w-1/2 pl-4 sm:pr-44 sm:pt-36 pt-8 text-slate-600">
                <div className={`${handlee.className} text-4xl lg:text-6xl text-slate-600 font-semibold `}>
                    IRL
                </div>  
            </div>  
            <div className="bg-white sm:mt-12 mt-4 sm:w-3/6 sm:pt-16 pt-8 pb-1 rounded-md border-black">
                <h1 className="px-4 sm:px-16 text-2xl text-slate-900 font-semibold"> Log in to your IRL account</h1>
                <div className="mt-6 px-4 sm:px-16 flex flex-col">
                    <label htmlFor="email" className="font-medium text-sm inline-block w-full">Email</label>
                    <input 
                        aria-describedby="email-error"
                        className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md"
                        id="email"
                        name="email"
                        type="email"
                        required
                    />
                </div>
                <div className="mt-6 px-4 sm:px-16 flex flex-col">
                    <label htmlFor="password" className="font-medium text-sm inline-block w-full">Password</label>
                    <input 
                        aria-describedby="password-error"
                        className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md"
                        id="password"
                        name="password"
                        type="password"
                        required
                    />
                </div>
                <div className="mt-10 px-4 sm:px-16 justify-end flex md:justify-start">
                    <button className="bg-indigo-900 text-white px-4 py-2 rounded-md w-full">Log in</button>
                </div>
                <div className="p-6 rounded bg-lightTan mt-12 mx-1 text-center text-sm text-slate-600">
                    Don&apos;t have an account?  {' '}
                    <Link href="/dashboard/register" className="text-indigo-500 hover:text-indigo-900">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    )
}