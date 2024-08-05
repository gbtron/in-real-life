"use client"

import { sendMessage, State } from '@/app/lib/actions'; 
import { useActionState, useState } from 'react';

export default function Form() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(sendMessage, initialState);
    const [phone, setPhone] = useState('');

    const onPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length === 4 && !value.includes('(') && !value.includes('+')) {
            setPhone(`${value.slice(0,3)}-${value.slice(-1)}`);
        } else if (value.length === 10 && !value.includes('(') && !value.includes('+')) {
            setPhone(`(${value.slice(0,3)}) ${value.slice(4,7)}-${value.slice(7)}`);
        }
        else {
            setPhone(value);
        }
    }

    return (
        <form action={formAction}>
            <div className="bg-white p-8 flex flex-col rounded-md border-black">
                <h1 className="text-2xl text-slate-900 font-semibold">How can we reach you?</h1>
                <div className="text-slate-500"> Let us know your preferred method of communication </div>
                <div className="mt-8 flex flex-col md:flex-row">
                    <label htmlFor="name" className="font-semibold text-sm inline-block w-16">Name</label>
                    <input aria-describedby="name-error" className="md:ml-16 w-full md:w-80 bg-slate-100 rounded-sm px-2 py-1" placeholder="Jane Diaz" id="name" name="name" />
                </div>
                <div id="name-error" className="text-red-600" aria-live="polite" aria-atomic="true">
                    {state?.errors?.name?.[0] &&
                      state.errors.name.map((error:string) => (
                        <p className="text-red-600 my-2 text-sm" key={error}>
                            {error.replace('String', 'Your name').replace('must', 'should')}
                        </p>
                    ))}
                </div>
                <div className="md:flex mt-4">
                    <label className="font-semibold text-sm inline-block w-16" htmlFor="email">Email</label>
                    <input aria-describedby="email-error" className="md:ml-16 w-full md:w-80 bg-slate-100 rounded-sm px-2 py-1" placeholder="jane@email.com" id="email" name="email"  />
                </div>
                <div id="email-error" className="text-red-600" aria-live="polite" aria-atomic="true">
                    {state?.errors?.email?.[0] &&
                      state.errors.email.map((error:string) => (
                        <p className="text-red-600 my-2 text-sm" key={error}>
                            {error.replace('String', 'Your email').replace('must', 'should')}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row mt-4">
                    <label className="font-semibold text-sm inline-block w-16" htmlFor="email">Phone</label>
                    <input className="md:ml-16 w-full md:w-80 bg-slate-100 rounded-sm px-2 py-1" type="tel" placeholder="(333) 333-3333" value={phone} onChange={onPhoneChange} id="phone" name="phone"  />
                </div>
                <div id="phone-error" className="text-red-600" aria-live="polite" aria-atomic="true">
                    {state?.errors?.phone?.[0] &&
                      state.errors.phone.map((error:string) => (
                        <p className="text-red-600 my-2 text-sm" key={error}>
                            {error.replace('String', 'Your phone number').replace('must', 'should')}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row mt-4">
                    <label className="font-semibold text-sm inline-block w-16" htmlFor="message">Message</label>
                    <textarea className="md:ml-16 w-full md:w-80 bg-slate-100 rounded-sm px-2 py-1" placeholder="Tell us if you are a parent, young adult, or counselor " id="message" name="message"  />
                </div>
                <div id="message-error" className="text-red-600" aria-live="polite" aria-atomic="true">
                    {state?.errors?.message?.[0] &&
                      state.errors.message.map((error:string) => (
                        <p className="text-red-600 my-2 text-sm" key={error}>
                            {error.replace('String', 'Your message').replace('must', 'should')}
                        </p>
                    ))}
                </div>
                <div className="mt-4">
                    {state.message == "The message could not be sent." && 
                        <p aria-live="polite" role="status" className="text-red-600">
                            {state.message}
                        </p>
                    }
                    {state.message == "The message was sent successfully." && 
                        <p aria-live="polite" role="status" className="text-green-600">
                            {state?.message}
                        </p>
                    }
                </div>
                <div className="justify-end flex md:justify-start mt-8">
                    <button type="submit" className="bg-indigo-600 text-white px-4 rounded-xl w-20 ml-[23rem] hover:bg-black hover:text-slate-100">
                        Send
                    </button>
                </div>
            </div>
        </form>
    )
}