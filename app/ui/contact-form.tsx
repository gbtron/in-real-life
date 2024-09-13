    "use client"

    import { sendMessage, ContactState } from '@/app/lib/actions'; 
    import React, { useActionState, useState, startTransition } from 'react';
    import clsx from 'clsx';
    import Link from 'next/link'
    import Image from 'next/image'
    import { ContactField, ContactFormState, ContactFormData, FieldRowComponent } from '@/app/lib/definitions';

    const contactFields: ContactField[] = ['name', 'email', 'phone', 'message']
   
    export default function ContactForm() {
        const initialState: ContactState = { errors:{}, submissionPending: false };
        const [state, formAction] = useActionState(sendMessage, initialState);
        const [formData, setFormData] : ContactFormState = useState(
            contactFields.reduce(
                (obj, field) => (
                    {...obj, [field]:''}
                ), 
                {} as ContactFormData
            )
        );

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target as {name: ContactField, value: string}
            if (name === 'phone') {
                let formattedPhone = value;
                if (value.length === 4 && !['(', '+', '-'].some(char => value.includes(char))) {
                    formattedPhone = `${value.slice(0,3)}-${value.slice(-1)}`
                } else if (value.length === 10 && !value.includes('(') && !value.includes('+')) {
                    formattedPhone = `(${value.slice(0,3)}) ${value.slice(4,7)}-${value.slice(7)}`
                }
                if (formData.phone !== formattedPhone) {
                    setFormData( (previousData => ({
                        ...previousData, 
                        phone: formattedPhone
                    }) ))
                }
            } else {
                if (formData[name] !== value) {
                    setFormData({
                        ...formData,
                        [name]: value
                    })
                }
                
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

        const labels : ContactFormData = {
            name: 'Name', 
            email: 'Email', 
            phone: 'Phone Number', 
            message: 'Message'
        }

        const FieldRow : FieldRowComponent = ({ fieldName }) => {
            return (
            <>
                <div className="mt-8 flex flex-col md:flex-row">
                    <label className="font-semibold text-sm inline-block w-16 dark:text-tangerine-100" htmlFor="email">
                        {labels[fieldName]}
                    </label>
                    <input 
                        aria-describedby="email-error" 
                        className="md:ml-16 w-full md:w-80 bg-slate-100 dark:bg-black rounded-sm px-2 py-1" 
                        id={fieldName} 
                        name={fieldName} 
                        value={formData[fieldName]} 
                        onChange={handleInputChange}
                    />
                </div>
                <div id="name-error" className="text-red-600" aria-live="polite" aria-atomic="true">
                    {state?.errors?.[fieldName]?.[0] &&
                        state.errors[fieldName].map( (error:string) => (
                            <p className="text-red-600 my-2 text-sm" key={error}>
                                {error
                                    .replace(
                                        'String', 
                                        `Your ${labels[fieldName].toLocaleLowerCase()}`)
                                    .replace(
                                        'must', 
                                        'should'
                                    )
                                }
                            </p>
                        ))
                    }
                </div>
            </>
        ) }

        return (
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-40">
                    <div className="dark:bg-brown-100 dark:text-white p-1 sm:p-8 flex flex-col sm:text-left rounded-md border-black">
                        <h1 className="text-2xl dark:text-tangerine-100 font-semibold">How can we reach you?</h1>
                        <div className="w-3/4 sm:w-auto dark:text-tangerine-100"> Let us know your preferred method of communication. </div>
                        
                        {contactFields.map((field, index) => (
                            <FieldRow fieldName={field} handleInputChange={handleInputChange} key={index}/>
                        ))}
                        
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
                                    'bg-brown-100 hover:text-slate-100 hover:bg-tangerine-900': !state.submissionPending,
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