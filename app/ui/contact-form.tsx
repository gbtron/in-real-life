    "use client"

    import { sendMessage } from '@/app/lib/actions'; 
    import React, { useActionState, useState, startTransition } from 'react';
    import clsx from 'clsx';
    import Link from 'next/link'
    import Image from 'next/image'
    import { ContactFieldName, ContactFormState, ContactField, ContactResponse } from '@/app/lib/definitions';
    import { FieldRow } from '@/app/ui/FieldRow';
   
    export default function ContactForm() {
        const contactFieldNames: ContactFieldName[] = ['name', 'email', 'phone', 'message']
        const initializedFields = contactFieldNames.reduce(
            (obj, field) => (
                {...obj, [field]:''}
            ), 
            {} as ContactField
        )

        const initialState: ContactResponse = { submissionPending: false, messageSent:false };
        const [apiState, formAction] = useActionState(sendMessage, initialState);
        const [contactFields, setContactFields] : ContactFormState = useState(initializedFields);
        const [fieldErrors, setFieldErrors] : ContactFormState = useState(initializedFields)

        const fieldsFilled = Object.values(contactFields).every( (field) => (field !== '') ) && true
        const fieldsValid = Object.values(fieldErrors).every((error) => error === '') && true
        
        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData()
            data.append('name', contactFields.name)
            data.append('email', contactFields.email)
            data.append('phone', contactFields.phone)
            data.append('message', contactFields.message)
            startTransition(() => {
                apiState.submissionPending = true;
                formAction(data);
            })  
        }

        return (
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-40 align-center w-full">
                    <div className="dark:bg-brown-100 dark:text-white mt-24 sm:p-8 flex flex-col text-left rounded-md border-black w-full sm:w-3/4 lg:w-3/5">
                        {!apiState.messageSent && 
                            <>
                                <h1 className="text-3xl font-title dark:text-tangerine-100 font-normal">Get in touch with us</h1>
                                <div className="sm:w-3/4 dark:text-tangerine-100 mb-8 text-xl"> 
                                    If you are interested in learning more about IRL and how we plan to serve the community, reach out to us using the form below. 
                                </div>
                                {apiState?.errors?.form && 
                                    <div className="mb-4">
                                        <p aria-live="polite" role="status" className="text-red-600">
                                            {apiState.errors.form}
                                        </p>
                                    </div>
                                }
                                { contactFieldNames.map((field, index) => (
                                    <FieldRow 
                                        fieldName={field} 
                                        setContactFields={setContactFields} 
                                        contactFields={contactFields} 
                                        apiState={apiState} 
                                        key={index}
                                        fieldErrors={fieldErrors}
                                        setFieldErrors={setFieldErrors}
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
                        
                        {!apiState.messageSent && 
                            <div className="justify-end flex md:justify-start mb-8">
                                <button type="submit" disabled={apiState.submissionPending || !fieldsValid || !fieldsFilled} className={clsx(
                                    "peer dark:bg-gray-600 bg-gray-300 text-white px-4 rounded-xl w-20 sm:ml-[26rem]",
                                    {
                                        'hover:font-bold bg-tangerine-900 hover:bg-tangerine-900 dark:bg-tangerine-900 dark:': !apiState.submissionPending && fieldsFilled && fieldsValid,
                                    }
                                )}>
                                    Send
                                </button>
                                <div className='hidden order-first sm:order-last peer-disabled:peer-hover:block sm:peer-disabled:peer-hover:inline px-4'>Fill out the form</div>
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