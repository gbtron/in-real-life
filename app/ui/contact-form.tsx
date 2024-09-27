    "use client"

    import { sendMessage } from '@/app/lib/actions'; 
    import React, { useActionState, useState, startTransition } from 'react';
    import clsx from 'clsx';
    import Link from 'next/link'
    import Image from 'next/image'
    import { ContactField, ContactFormState, ContactFormData, ContactResponse } from '@/app/lib/definitions';
    import { FieldRow } from '@/app/ui/FieldRow';
   
    export default function ContactForm() {
        const contactFields: ContactField[] = ['name', 'email', 'phone', 'message']
        const initFieldValues = contactFields.reduce(
            (obj, field) => (
                {...obj, [field]:''}
            ), 
            {} as ContactFormData
        )

        const initialState: ContactResponse = { submissionPending: false, messageSent:false };
        const [apiState, formAction] = useActionState(sendMessage, initialState);
        const [fieldValues, setFieldValues] : ContactFormState = useState(initFieldValues);
        const [fieldErrors, setFieldErrors] : ContactFormState = useState(initFieldValues)

        // ui state
        const [fieldsValid, setFieldsValid] = useState(false)
        const [fieldsFilled, setFieldsFilled] = useState(false)
        
        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData()
            data.append('name', fieldValues.name)
            data.append('email', fieldValues.email)
            data.append('phone', fieldValues.phone)
            data.append('message', fieldValues.message)
            startTransition(() => {
                apiState.submissionPending = true;
                formAction(data);
            })  
        }

        return (
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-40 align-center w-full">
                    <div className="dark:bg-brown-100 dark:text-white mt-12 sm:p-8 flex flex-col text-left rounded-md border-black w-full sm:w-1/2">
                        {!apiState.messageSent && 
                            <>
                                <h1 className="text-2xl dark:text-tangerine-100 font-semibold">How can we reach you?</h1>
                                <div className="w-3/4 sm:w-auto dark:text-tangerine-100 mb-8"> Let us know your preferred method of communication. </div>
                                { contactFields.map((field, index) => (
                                    <FieldRow 
                                        fieldName={field} 
                                        setFieldValues={setFieldValues} 
                                        fieldValues={fieldValues} 
                                        apiState={apiState} 
                                        key={index}
                                        fieldErrors={fieldErrors}
                                        setFieldErrors={setFieldErrors}
                                        setFieldsValid={setFieldsValid}
                                        setFieldsFilled={setFieldsFilled}
                                        />
                                    
                                )) }
                            </>
                        }
                        {apiState.messageSent && 
                            // no errors returned from api 
                            <div
                                className="dark:text-tangerine-100 text-md sm:text-xl"
                            > Thank you for inquiring about In Real Life. <br/> We will get back to you shortly at your provided email address or phone. 
                            </div>
                        }
                        
                        {apiState?.errors?.form && 
                            <div className="mt-4">
                                <p aria-live="polite" role="status" className="text-red-600">
                                    {apiState.errors.form}
                                </p>
                            </div>
                        }
                        
                        {!apiState.messageSent && 
                            <div className="justify-end flex md:justify-start mb-8">
                                <button type="submit" disabled={apiState.submissionPending || !fieldsValid || !fieldsFilled} className={clsx(
                                    "dark:bg-gray-600 bg-gray-300 text-white px-4 rounded-xl w-20 sm:ml-[23rem]",
                                    {
                                        'hover:font-bold bg-tangerine-900 hover:bg-tangerine-900 dark:bg-tangerine-900 dark:': !apiState.submissionPending && fieldsFilled && fieldsValid,
                                    }
                                )}>
                                    Send
                                </button>
                            </div>
                        }
                    </div>
                    <div className="pt-12 relative hidden sm:block w-1/2">
                        <Link href="/">
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