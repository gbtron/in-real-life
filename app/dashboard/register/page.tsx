"use client"
import { handlee } from "@/app/ui/fonts"
import { useState, useActionState, startTransition, useEffect } from "react"
import clsx from "clsx"
import Link from "next/link";
import { createAccount, RegistrationState } from "@/app/lib/actions";

export default function Register() {
    const initialState: RegistrationState = { errors: {}, submissionPending:false };
    const [fieldsValid, setFieldsValid] = useState(false);
    const [clientErrors, setClientErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    });
    const [state, formAction] = useActionState(createAccount, initialState);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '', 
    });

    const checkClientErrors = () => {
        if (Object.values(clientErrors).every((error) => error === '')) {
            setFieldsValid(true)
        } else {
            setFieldsValid(false)   
        }
    }
    useEffect(() => {
        checkClientErrors();
    }, [clientErrors])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
            setFormData({
                ...formData,
                [name]: value
            })
            clientSideValidation(value, name)
    }

    // server validation and data entry
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData()
        data.append('firstName', formData.firstName)
        data.append('lastName', formData.lastName)
        data.append('email', formData.email)
        data.append('phone', formData.phone)
        data.append('password', formData.password)

        startTransition(() => {
            state.submissionPending = true
            formAction(data);
        })
    }

    function clientSideValidation(value:string, name:string) {
        const nameRegex = /^[\p{L}\s'-]*$/u;
        const phoneRegex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/
        switch (name) {
            case 'firstName':
            case 'lastName':
                if (value === '') {
                    setClientErrors({
                        ...clientErrors,
                        [name]: `Please enter your name`
                    })
                } else if (value.length < 2) {
                    setClientErrors({
                        ...clientErrors,
                        [name]: `Your name should contain at least 2 characters`
                    })
                } else if (!nameRegex.test(value)) {
                    setClientErrors({
                        ...clientErrors,
                        [name]: `Please enter your name using Unicode letters, apostrophes, and hyphens`
                    })
                }   
                else {
                    setClientErrors({
                        ...clientErrors,
                        [name]: ''
                    })
                }
                break;
            case 'phone':
                if (!phoneRegex.test(value)) {
                    setClientErrors({
                        ...clientErrors,
                        [name]: 'Please enter a valid phone number using only numbers, spaces, hyphens, plus symbols, and parentheses'
                    })
                }   
                else {
                    setClientErrors({
                        ...clientErrors,
                        [name]: ''
                    })
                }
                break;
            default:
                if (value === '') {
                    setClientErrors({
                        ...clientErrors,
                        [name]: `Please enter your ${name}`
                            .replace('firstName', 'first name')
                            .replace('lastName', 'last name')
                            .replace('phone', 'phone number')
                    })
                }
                else {
                    setClientErrors({
                        ...clientErrors,
                        [name]: ''
                    })
                }
        }
    }

    const handleBlur = (e:React.FocusEvent<HTMLInputElement>) => {
        clientSideValidation(e.target.value, e.target.name)
    }

    return (
            <div className="flex flex-col sm:flex-row px-4 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
                <div className="sm:block w-3/4 sm:w-1/2 pl-4 sm:pr-44 sm:pt-36 pt-8 text-slate-600">
                    <div className={`${handlee.className} text-4xl lg:text-6xl text-slate-600 font-semibold `}>
                        IRL
                    </div>
                    <div className="text-2xl pt-12 hidden sm:block">
                        Get started
                    </div>
                </div>
                <div className="bg-white sm:mt-12 mt-4 sm:w-3/6 sm:pt-16 pt-8 pb-1 rounded-md border-black">
                    <form onSubmit={handleSubmit}>
                        <div onBlur={handleBlur}>
                            <h1 className="px-4 sm:px-16 text-2xl text-slate-900 font-semibold"> Create your IRL account</h1>
                            <div className="mt-6 px-4 sm:px-16 flex flex-col">
                                <label htmlFor="firstName" className={clsx(
                                    "font-medium text-sm inline-block w-full", 
                                    {"text-red-600": clientErrors.firstName?.[0]}
                                )}
                                    >First Name</label>
                                <input 
                                    aria-describedby="first-name-error" 
                                    className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" 
                                    id="firstName" 
                                    name="firstName" 
                                    type="text" 
                                    onChange = {handleInputChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div id="first-name-error" className="px-4 sm:px-16 text-red-600" aria-live="polite" aria-atomic="true">
                                {state?.errors?.firstName?.[0] &&
                                state.errors.firstName.map((error:string) => (
                                    <p className="text-red-600 my-2 text-sm" key={error}>
                                        {error.replace('String', 'Your first name').replace('must', 'should')}
                                    </p>
                                ))}
                                {clientErrors.firstName &&
                                    <p className="text-red-600 text-sm">
                                        {clientErrors.firstName}
                                    </p>
                                }
                            </div>
                            <div className="mt-6 px-4 sm:px-16 flex flex-col">
                                <label htmlFor="lastName" className={clsx(
                                    "font-medium text-sm inline-block w-full",
                                    {"text-red-600": clientErrors.lastName?.[0]}
                                )}
                                >Last Name</label>
                                <input 
                                    aria-describedby="name-error" 
                                    className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" 
                                    id="lastName" 
                                    name="lastName" 
                                    type="text" 
                                    onChange= {handleInputChange}
                                />
                            </div>
                            <div id="last-name-error" className="px-4 sm:px-16 text-red-600" aria-live="polite" aria-atomic="true">
                                {state?.errors?.lastName?.[0] &&
                                state.errors.lastName.map((error:string) => (
                                    <p className="text-red-600 my-2 text-sm" key={error}>
                                        {error.replace('String', 'Your last name').replace('must', 'should')}
                                    </p>
                                ))}
                                {clientErrors.lastName &&
                                    <p className="text-red-600 text-sm">
                                        {clientErrors.lastName}
                                    </p>
                                }
                            </div>
                            <div className="mt-8 px-4 sm:px-16 flex flex-col ">
                                <label htmlFor="email" className={clsx(
                                    "font-medium text-sm inline-block w-full",
                                    {"text-red-600": clientErrors.email?.[0]}
                                )}>Email</label>
                                <input onChange= {handleInputChange} aria-describedby="name-error" className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" id="email" name="email" type="email" />
                            </div>
                            <div id="email-error" className="px-4 sm:px-16 text-red-600" aria-live="polite" aria-atomic="true">
                                {state?.errors?.email?.[0] &&
                                state.errors.email.map((error:string) => (
                                    <p className="text-red-600 my-2 text-sm" key={error}>
                                        {error.replace('String', 'Your email').replace('must', 'should')}
                                    </p>
                                ))}
                                {clientErrors.email &&
                                    <p className="text-red-600 text-sm">
                                        {clientErrors.email}
                                    </p>
                                }
                            </div>
                            <div className="mt-8 px-4 sm:px-16 flex flex-col ">
                                <label htmlFor="email" className={clsx(
                                    "font-medium text-sm inline-block w-full",
                                    {"text-red-600": clientErrors.phone?.[0]}
                                )}>Phone Number</label>
                                <input onChange= {handleInputChange} aria-describedby="name-error" className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" id="phone" name="phone" type="tel" />
                            </div>
                            <div id="phone-error" className="px-4 sm:px-16 text-red-600" aria-live="polite" aria-atomic="true">
                                {state?.errors?.phone?.[0] &&
                                state.errors.phone.map((error:string) => (
                                    <p className="text-red-600 my-2 text-sm" key={error}>
                                        {error.replace('String', 'Your phone number').replace('must', 'should')}
                                    </p>
                                ))}
                                {clientErrors.phone &&
                                    <p className="text-red-600 text-sm">
                                        {clientErrors.phone}
                                    </p>
                                }
                            </div>
                            <div className="mt-6 px-4 sm:px-16 flex flex-col">
                                <label htmlFor="password" className={clsx(
                                    "font-medium text-sm inline-block w-full",
                                    {"text-red-600": clientErrors.password?.[0]}
                                    )}>Password</label>
                                <input onChange= {handleInputChange} aria-describedby="name-error" className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" id="password" name="password" type="password" />
                            </div>
                            <div id="password-error" className="px-4 sm:px-16 text-red-600" aria-live="polite" aria-atomic="true">
                                {state?.errors?.password?.[0] &&
                                state.errors.password.map((error:string) => (
                                    <p className="text-red-600 my-2 text-sm" key={error}>
                                        {error.replace('String', 'Your password').replace('must', 'should')}
                                    </p>
                                ))}
                                {clientErrors.password &&
                                    <p className="text-red-600 text-sm">
                                        {clientErrors.password}
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="mt-4">
                            {state?.errors?.form && 
                                <p aria-live="polite" role="status" className="text-red-600">
                                    {state.errors.form}
                                </p>
                            }
                            {Object.values(state).length == 1 && 
                                <p aria-live="polite" role="status" className="text-green-600">
                                    The account was created.
                                </p>
                            }
                        </div>

                        <div className="mt-10 px-4 sm:px-16 justify-end flex md:justify-start">
                            <button className={clsx(
                                "bg-gray-300 text-white px-4 py-2 rounded-md w-full",
                                {
                                    'hover:bg-indigo-300 bg-indigo-900': !state.submissionPending && fieldsValid,
                                }
                            )} disabled={state.submissionPending && !fieldsValid}>Create account</button>
                        </div>
                        <div className="p-6 rounded bg-lightTan mt-12 mx-1 text-center text-sm text-slate-600">
                            Already have an account?  {' '}
                            <Link href="/dashboard/login" className="text-indigo-500 hover:text-indigo-900">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>         
            </div>
    )
}