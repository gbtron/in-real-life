"use client"

import { sendMessage, State } from '@/app/lib/actions'; 
import { useActionState } from 'react';

const initialState= {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
}

export default function Form() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(sendMessage, initialState);

    return (
        <form className="" action={formAction}>
            <div className="bg-white p-8 flex flex-col rounded-md border-black">
                <h1 className="text-2xl text-slate-900 font-semibold">How can we reach you?</h1>
                <div className="mb-8 text-slate-500"> Let us know your preferred method of communication </div>
                <div className="flex flex-col md:flex-row">
                    <label htmlFor="name" className="font-semibold text-sm inline-block w-16">Name</label>
                    <input className="md:ml-16 mb-4 w-full md:w-80 bg-slate-100 rounded-sm px-2 py-1" placeholder="Jane Diaz" id="name" name="name" />
                </div>
                <div className="md:flex">
                    <label className="font-semibold text-sm inline-block w-16" htmlFor="email">Email</label>
                    <input className="md:ml-16 mb-4 w-full md:w-80 bg-slate-100 rounded-sm px-2 py-1" type="email" placeholder="jane@email.com" id="email" name="email"  />
                </div>
                <div className="flex flex-col md:flex-row">
                    <label className="font-semibold text-sm inline-block w-16" htmlFor="email">Phone</label>
                    <input className="md:ml-16 mb-4 w-full md:w-80 bg-slate-100 rounded-sm px-2 py-1" type="tel" placeholder="+3(333)333-3333" id="phone" name="phone"  />
                </div>
                <div className="flex flex-col md:flex-row mb-8">
                    <label className="font-semibold text-sm inline-block w-16" htmlFor="message">Message</label>
                    <textarea className="md:ml-16 w-full md:w-80 bg-slate-100 rounded-sm px-2 py-1" placeholder="Tell us if you are a parent, young adult, or counselor " id="message" name="message"  />
                </div>

                <div className="justify-end flex md:justify-start">
                    <button type="submit" className="bg-indigo-600 text-white px-4 rounded-xl w-20 ml-[23rem] hover:bg-black hover:text-slate-100">
                        Send
                    </button>
                </div>
                <p aria-live="polite" role="status" className="text-red-600">
                  
                </p>
            </div>
        </form>
    )
}