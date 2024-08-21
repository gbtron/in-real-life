"use client"
import { handlee } from "@/app/ui/fonts"
import React, { useState, useActionState, startTransition, useEffect } from "react"
import clsx from "clsx"
import Link from "next/link";
import { createAccount, RegistrationState } from "@/app/lib/actions";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

export default function Register() {
    // ui state
    const [blurred, setBlurred] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [fieldsValid, setFieldsValid] = useState(false);
    const [fieldsFilled, setFieldsFilled] = useState(false);
    type FieldData = {
        clientErrors:string, 
        value:string
    }
    type FormData = {
        firstName: FieldData, 
        lastName: FieldData, 
        email: FieldData, 
        phone: FieldData, 
        password: FieldData
    }
    const initFieldData = {
        clientErrors:'', 
        value: ''
    }
    const [formData, setFormData]: [FormData, React.Dispatch<React.SetStateAction<FormData>>] = useState({
        firstName: initFieldData,
        lastName: initFieldData,
        email: initFieldData,
        phone: initFieldData,
        password: initFieldData, 
    });
    type registrationField = keyof FormData

    // api state
    const initState: RegistrationState = { submissionPending:false };
    const [apiState, formAction] = useActionState(createAccount, initState);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as registrationField
        const value = event.target.value

        let changedValue = value
        let clientErrors = formData[name].clientErrors
        if (name === 'phone') {
            if (value.length === 4 && !['(', '+', '-'].some(char => value.includes(char))) {
                changedValue = `${value.slice(0,3)}-${value.slice(-1)}`
            } else if (value.length === 10 && !value.includes('(') && !value.includes('+')) {
                changedValue = `(${value.slice(0,3)}) ${value.slice(4,7)}-${value.slice(7)}`
            }
        }

        if (Object.hasOwn(blurred, name)) {
            clientErrors = getClientSideValidation(changedValue, name)
        }
        setFormData({
            ...formData,
            [name]: {
                clientErrors: clientErrors,
                value: changedValue
            }
        })
    }

    const getClientSideValidation = (value:string, name:registrationField) => {
        const nameFieldValidation = [
            { condition: value.length > 1, message: `at least 2 characters`}, 
            { condition: /^[\p{L}\s'-]*$/u.test(value), message: `Unicode letters, apostrophes, and hyphens`}
        ]
        type ValidationFlags<Type> = {
            [Property in keyof Type]: {
                condition: boolean, 
                message:string
            }[]
        }
        type FieldValidation = ValidationFlags<FormData>

        const fieldValidation:FieldValidation = {
            firstName: nameFieldValidation, 
            lastName: nameFieldValidation,
            phone: [
                {
                    condition: /^\s*(\+?\d{1,3})?[-. (]*\(?(\d{3})\)?[-. ]*(\d{3})[-. ]*(\d{4})(?:\s*x\s*\d+)?\s*$/
                        .test(value), 
                    message: `digits and optional separators "-", ".",or " "`
                }
            ], 
            email: [
                {
                    condition: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z]{2,})+$/
                        .test(value), 
                    message:''
                }
            ], 
            password: [
                {
                    condition: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/
                        .test(value), 
                    message:`at least one lowercase letter, one uppercase letter, one number, and one special character`
                }
            ]
        }

        const userfyName = (name:string) => {
            if (name == 'firstName') {
                name = 'first name'
            } else if (name === 'lastName') {
                name = 'last name'
            } else if (name === 'phone') {
                name += ' number'
            }
            return name
        }
        const messagePrefix = `Please enter your ${userfyName(name)}`

        let validationMessage = ''
        let fieldsValid = true
        if (value === '') {
            validationMessage = `${messagePrefix}.`
            fieldsValid = false
        } else {
            for (let validation of fieldValidation[name]) {
                if (validation.condition === false) {
                    validationMessage = `${validation.message !== '' 
                        ? `${messagePrefix} with ${validation.message}` 
                        : `${messagePrefix.replace('enter', 'correct')}`}.`
                    fieldsValid = false
                }
            }
        }
        
        setFieldsValid(fieldsValid)
        return validationMessage
    }

    const checkFieldsFilled = () => {
        if (Object.values(formData).every((field) => field.value !== '')) {
            setFieldsFilled(true)
        } else {
            setFieldsFilled(false)
        }
    }


    useEffect(() => {
        checkFieldsFilled();
    }, [formData])

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
                <form onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const data = new FormData()
                    data.append('firstName', formData.firstName.value)
                    data.append('lastName', formData.lastName.value)
                    data.append('email', formData.email.value)
                    data.append('phone', formData.phone.value)
                    data.append('password', formData.password.value)
                    startTransition(() => {
                        apiState.submissionPending = true
                        formAction(data);
                    })
                }}>
                    <div onBlur={(e:React.FocusEvent<HTMLInputElement>) => {
                        const name = e.target.name as registrationField
                        const value = e.target.value
                        setBlurred({
                            ...blurred,
                            [name]: true
                        })
                        let clientErrors = getClientSideValidation(value, name)
                        setFormData({
                            ...formData, 
                            [name]: {
                                clientErrors: clientErrors, 
                                value: value
                            }
                        })
                    }}>
                        <h1 className="px-4 sm:px-16 text-2xl text-slate-900 font-semibold"> Create your IRL account</h1>
                        <div className="mt-6 px-4 sm:px-16 flex flex-col">
                            <label htmlFor="firstName" className={clsx(
                                "font-medium text-sm inline-block w-full", 
                                {"text-red-600": formData.firstName.clientErrors}
                            )}
                                >First Name</label>
                            <input 
                                aria-describedby="first-name-error" 
                                className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" 
                                id="firstName" 
                                name="firstName" 
                                type="text" 
                                onChange = {handleInputChange}
                            />
                        </div>
                        <div id="first-name-error" className="px-4 sm:px-16 text-red-600" aria-live="polite" aria-atomic="true">
                            {apiState?.errors?.firstName &&
                                apiState.errors.firstName.map((error) => (
                                    <p className="text-red-600 my-2 text-sm" key={error}>
                                        {error.replace('String', 'Your first name').replace('must', 'should')}
                                    </p>
                                ))
                                
                            }
                            {formData.firstName.clientErrors &&
                                <p className="text-red-600 text-sm">
                                    {formData.firstName.clientErrors}
                                </p>
                            }
                        </div>
                        <div className="mt-6 px-4 sm:px-16 flex flex-col">
                            <label htmlFor="lastName" className={clsx(
                                "font-medium text-sm inline-block w-full",
                                {"text-red-600": formData.lastName.clientErrors}
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
                            {apiState?.errors?.lastName?.[0] &&
                            apiState.errors.lastName.map((error:string) => (
                                <p className="text-red-600 my-2 text-sm" key={error}>
                                    {error.replace('String', 'Your last name').replace('must', 'should')}
                                </p>
                            ))}
                            {formData.lastName.clientErrors &&
                                <p className="text-red-600 text-sm">
                                    {formData.lastName.clientErrors}
                                </p>
                            }
                        </div>
                        <div className="mt-8 px-4 sm:px-16 flex flex-col ">
                            <label htmlFor="email" className={clsx(
                                "font-medium text-sm inline-block w-full",
                                {"text-red-600": formData.email.clientErrors}
                            )}>Email</label>
                            <input onChange= {handleInputChange} aria-describedby="name-error" className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" id="email" name="email" type="email" />
                        </div>
                        <div id="email-error" className="px-4 sm:px-16 text-red-600" aria-live="polite" aria-atomic="true">
                            {apiState?.errors?.email?.[0] &&
                            apiState.errors.email.map((error:string) => (
                                <p className="text-red-600 my-2 text-sm" key={error}>
                                    {error.replace('String', 'Your email').replace('must', 'should')}
                                </p>
                            ))}
                            {formData.email.clientErrors &&
                                <p className="text-red-600 text-sm">
                                    {formData.email.clientErrors}
                                </p>
                            }
                        </div>
                        <div className="mt-8 px-4 sm:px-16 flex flex-col ">
                            <label htmlFor="email" className={clsx(
                                "font-medium text-sm inline-block w-full",
                                {"text-red-600": formData.phone.clientErrors}
                            )}>Phone Number</label>
                            <input 
                                value={formData.phone.value} onChange= {handleInputChange} aria-describedby="name-error" 
                                className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" id="phone" name="phone" type="tel" />
                        </div>
                        <div id="phone-error" className="px-4 sm:px-16 text-red-600" aria-live="polite" aria-atomic="true">
                            {apiState?.errors?.phone?.[0] &&
                            apiState.errors.phone.map((error:string) => (
                                <p className="text-red-600 my-2 text-sm" key={error}>
                                    {error.replace('String', 'Your phone number').replace('must', 'should')}
                                </p>
                            ))}
                            {formData.phone.clientErrors &&
                                <p className="text-red-600 text-sm">
                                    {formData.phone.clientErrors}
                                </p>
                            }
                        </div>
                        <div className="mt-6 px-4 sm:px-16 flex flex-col">
                            <label htmlFor="password" className={clsx(
                                "font-medium text-sm inline-block w-full",
                                {"text-red-600": formData.password.clientErrors}
                                )}>Password</label>
                                <div className="flex items-center border-slate-400 border rounded-md mt-2 mb-4 px-1">
                                    <input 
                                        onChange= {handleInputChange} 
                                        aria-describedby="name-error" 
                                        className="w-full px-2 py-1" 
                                        id="password" 
                                        name="password" 
                                        type={passwordVisible ? 'text' : 'password'} 
                                    />
                                    <button
                                        type="button"
                                        onClick={()=>setPasswordVisible(!passwordVisible)}
                                        className="ml-2"
                                    >
                                        {passwordVisible ? <EyeSlashIcon className="h-5 w-5 text-slate-400"/> : <EyeIcon className="h-5 w-5 text-slate-400"/>}
                                    </button>
                                </div>

                        </div>
                        <div id="password-error" className="px-4 sm:px-16 text-red-600" aria-live="polite" aria-atomic="true">
                            {apiState?.errors?.password?.[0] &&
                            apiState.errors.password.map((error:string) => (
                                <p className="text-red-600 my-2 text-sm" key={error}>
                                    {error.replace('String', 'Your password').replace('must', 'should')}
                                </p>
                            ))}
                            {formData.password.clientErrors &&
                                <p className="text-red-600 text-sm">
                                    {formData.password.clientErrors}
                                </p>
                            }
                        </div>
                    </div>
                    <div className="mt-4 px-4 sm:px-16 text-red-600">
                        {apiState?.errors?.form && 
                            <p aria-live="polite" role="status" className="text-red-600">
                                {apiState.errors.form}
                            </p>
                        }
                        {apiState.success === true && 
                            <p aria-live="polite" role="status" className="text-green-600">
                                The account was created.
                            </p>
                        }
                    </div>

                    <div className="mt-10 px-4 sm:px-16 justify-end flex md:justify-start">
                        <button className={clsx(
                            "bg-gray-300 text-white px-4 py-2 rounded-md w-full",
                            {
                                'hover:bg-indigo-300 bg-indigo-900': !apiState.submissionPending && fieldsValid && fieldsFilled,
                            }
                        )} disabled={apiState.submissionPending || !fieldsValid || !fieldsFilled}>Create account</button>
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