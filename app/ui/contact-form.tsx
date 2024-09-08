    "use client"

    import { sendMessage, ContactState } from '@/app/lib/actions'; 
    import React, { useActionState, useState, startTransition } from 'react';
    import clsx from 'clsx';
    import Link from 'next/link'
    import Image from 'next/image'

    export default function ContactForm() {
        const initialState: ContactState = { errors:{}, submissionPending: false };
        const [state, formAction] = useActionState(sendMessage, initialState);
        const [formData, setFormData] = useState({
            phone: '',
            name: '',
            email: '',
            message: ''
        });

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            if (name === 'phone') {
                if (value.length === 4 && !['(', '+', '-'].some(char => value.includes(char))) {
                    setFormData({
                        ...formData,
                        phone:`${value.slice(0,3)}-${value.slice(-1)}`
                    })
                } else if (value.length === 10 && !value.includes('(') && !value.includes('+')) {
                    setFormData({
                        ...formData,
                        phone:`(${value.slice(0,3)}) ${value.slice(4,7)}-${value.slice(7)}`
                    })
                }
                else {
                    setFormData({
                        ...formData,
                        phone: value
                    })
                }
            } else {
                setFormData({
                    ...formData,
                    [name]: value
                })
            }
        }

        const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            const {name, value} = event.target;
            setFormData({
                ...formData,
                [name]: value
            })
        }
        
        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData()
            data.append('name', formData.name)
            data.append('email', formData.email)
            data.append('phone', formData.phone)
            data.append('message', formData.message)
            startTransition(() => {
                state.submissionPending = true;
                formAction(data);
            })  
        }

        return (
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-40">
                    <div className="dark:bg-brown-100 dark:text-white p-8 flex flex-col rounded-md border-black">
                        <h1 className="text-2xl dark:text-burntOrange-100 font-semibold">How can we reach you?</h1>
                        <div className=" dark:text-burntOrange-100"> Let us know your preferred method of communication </div>
                        <div className="mt-8 flex flex-col md:flex-row">
                            <label htmlFor="name" className="font-semibold text-sm inline-block w-16 dark:text-burntOrange-100">Name</label>
                            <input 
                                aria-describedby="name-error" 
                                className="md:ml-16 w-full md:w-80 bg-slate-100 dark:bg-black rounded-sm px-2 py-1"  
                                id="name" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
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
                            <label className="font-semibold text-sm inline-block w-16 dark:text-burntOrange-100" htmlFor="email">Email</label>
                            <input aria-describedby="email-error" className="md:ml-16 w-full md:w-80 bg-slate-100 dark:bg-black rounded-sm px-2 py-1" id="email" name="email" value={formData.email} onChange={handleInputChange}/>
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
                            <label className="font-semibold text-sm inline-block w-16 dark:text-burntOrange-100" htmlFor="email">Phone</label>
                            <input className="md:ml-16 w-full md:w-80  rounded-sm px-2 py-1" type="tel"  value={formData.phone} onChange={handleInputChange} id="phone" name="phone"  />
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
                            <label className="font-semibold text-sm inline-block w-16 dark:text-burntOrange-100" htmlFor="message">Message</label>
                            <textarea className="md:ml-16 w-full md:w-80 rounded-sm px-2 py-1" id="message" name="message" value ={formData.message} onChange={handleTextChange} />
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
                            {state?.errors?.form && 
                                <p aria-live="polite" role="status" className="text-red-600">
                                    {state.errors.form}
                                </p>
                            }
                            {Object.values(state).length == 1 && 
                                <p aria-live="polite" role="status" className="text-green-600">
                                    The message was sent.
                                </p>
                            }
                        </div>
                        <div className="justify-end flex md:justify-start mt-8">
                            <button type="submit" disabled={state.submissionPending} className={clsx(
                                "bg-gray-300 text-white px-4 rounded-xl w-20 ml-[23rem]",
                                {
                                    'bg-brown-100 hover:text-slate-100 hover:bg-burntOrange-900': !state.submissionPending,
                                }
                            )}>
                                Send
                            </button>
                        </div>
                    </div>
                    <div className="justify-self-center self-center">
                        <Link href="/" className="self-center">
                            <Image 
                                src="/assets/IRL_Logo_Final_Main.png" 
                                alt="IRL desktop Logo" 
                                width={400} 
                                height={400} 
                                className="relative hidden sm:block"/>    
                            <Image 
                                src="/assets/IRL_Logo_Final_Responsive.png" 
                                alt="IRL desktop Logo" 
                                width={100} 
                                height={100} 
                                className="relative sm:hidden"/>  
                        </Link>
                    </div>
                </div>
            </form>
        )
    }