    "use client"

    import { sendMessage } from '@/app/lib/actions'; 
    import React, { useActionState, useState, startTransition } from 'react';
    import clsx from 'clsx';
    import Link from 'next/link'
    import Image from 'next/image'
    import { ContactField, ContactFormState, ContactFormData, ContactResponse } from '@/app/lib/definitions';
    import { FieldRow } from '@/app/ui/FieldRow';

    const contactFields: ContactField[] = ['name', 'email', 'phone', 'message']
   
    export default function ContactForm() {
        const initialState: ContactResponse = { errors:{}, submissionPending: false };
        const [state, formAction] = useActionState(sendMessage, initialState);
        const [formData, setFormData] : ContactFormState = useState(
            contactFields.reduce(
                (obj, field) => (
                    {...obj, [field]:''}
                ), 
                {} as ContactFormData
            )
        );
        
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
        const messageWasSent = Object.values(state).length == 1

        return (
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-40 ">
                    <div className="dark:bg-brown-900 dark:text-white mt-12 sm:p-8 flex flex-col text-left rounded-md border-black">
                        <h1 className="text-2xl dark:text-tangerine-100 font-semibold">How can we reach you?</h1>
                        <div className="w-3/4 sm:w-auto dark:text-tangerine-100"> Let us know your preferred method of communication. </div>
                        
                        {!messageWasSent && 
                            contactFields.map((field, index) => (
                                <FieldRow fieldName={field} setFormData={setFormData} formData={formData} state={state} key={index}/>
                            ))
                        }
                        
                        <div className="mt-4">
                            {state?.errors?.form && 
                                <p aria-live="polite" role="status" className="text-red-600">
                                    {state.errors.form}
                                </p>
                            }
                            
                            {messageWasSent && 
                                // no errors returned from api 
                                <div
                                    className="dark:text-tangerine-100"
                                > Thank you for inquiring about In Real Life. <br/> We will get back to you shortly at your provided email address or phone. 
                                </div>
                            }
                        </div>
                        {!messageWasSent && 
                            <div className="justify-end flex md:justify-start mt-8">
                                <button type="submit" disabled={state.submissionPending} className={clsx(
                                    "bg-gray-300 text-white px-4 rounded-xl w-20 sm:ml-[23rem]",
                                    {
                                        'hover:text-slate-100 bg-tangerine-900 hover:bg-tangerine-900': !state.submissionPending,
                                    }
                                )}>
                                    Send
                                </button>
                            </div>
                        }
                    </div>
                    <div className="justify-self-center self-center relative hidden sm:block">
                        <Link href="/" className="self-center">
                            <Image 
                                src="/assets/IRL_Logo_Final_Main.png" 
                                alt="IRL desktop Logo" 
                                width={400} 
                                height={400} 
                                />    
                            
                        </Link>
                    </div>
                </div>
            </form>
        )
    }