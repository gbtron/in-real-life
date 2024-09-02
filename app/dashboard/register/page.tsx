"use client"
import { handlee } from "@/app/ui/fonts"
import { useState, useActionState, startTransition, ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react"
import clsx from "clsx"
import Link from "next/link";
import { createAccount, RegistrationForm, checkUser } from "@/app/lib/actions";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { getClientSideValidation } from "@/app/lib/validation";
import { useDebouncedCallback } from "use-debounce"

export type RegistrationField = 'firstName' | 'lastName' | 'email' | 'phone' | 'password'
type RegistrationObject = {
    [F in RegistrationField]:string
}
type RegistrationDispatch = Dispatch<SetStateAction<RegistrationObject>>
type FormEventTarget = {name: RegistrationField, value:string}

export default function Register() {
    const fields: RegistrationField[] = ['firstName', 'lastName', 'email', 'phone', 'password']
    const initFieldObject = fields.reduce<Record<RegistrationField, string>>((obj, name) => {
        obj[name] = ''
        return obj
    }, {} as Record<RegistrationField, string>)
    const [fieldValues, setFieldValues] = useState(initFieldObject) as [RegistrationObject, RegistrationDispatch]
    const [fieldErrors, setFieldErrors] = useState(initFieldObject) as [RegistrationObject, RegistrationDispatch]

    // ui state
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [fieldsValid, setFieldsValid] = useState(false);
    const [fieldsFilled, setFieldsFilled] = useState(false);
    // api state
    const initState: RegistrationForm = { submissionPending:false }
    const [apiState, formAction] = useActionState(createAccount, initState)

    const slowlyValidate = useDebouncedCallback(
        async (name:RegistrationField, value: string) => {
            let error = fieldErrors[name]
            if (name === 'email') {
                const existingUserError = await checkUser(value)
                if (existingUserError) error = existingUserError
            }
            switch (name) {
                case 'email':
                    error = await checkUser(value)
                    break
                default:
                    error = getClientSideValidation(value, name, setFieldsValid)
                    setFieldErrors({
                        ...fieldErrors, 
                        [name]: error
                    })
            }
        }, 
        1000
    )
    const checkNoFieldsAreEmpty = () => {
        if (Object.values(fieldValues).every((field) => field !== '')) {
            setFieldsFilled(true)
        } else {
            setFieldsFilled(false)
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target as FormEventTarget
        slowlyValidate(name, value)
        
        setFieldValues({
            ...fieldValues,
            [name]: value
        })
        checkNoFieldsAreEmpty()
    }

    // const handleBlur = (e:FocusEvent<HTMLInputElement>) => {
    //     const {name, value} = e.target as FormEventTarget
    //     let clientErrors = getClientSideValidation(value, name, setFieldsValid)
    //     setBlurred({
    //         ...blurred,
    //         [name]: true
    //     })
        
    //     setFormData({
    //         ...formData, 
    //         [name]: {
    //             clientErrors: clientErrors, 
    //             value: value
    //         }
    //     })
    // }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData()
        data.append('firstName', fieldValues.firstName)
        data.append('lastName', fieldValues.lastName)
        data.append('email', fieldValues.email)
        data.append('phone', fieldValues.phone)
        data.append('password', fieldValues.password)
        startTransition(() => {
            apiState.submissionPending = true
            formAction(data);
        })
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
                    <div>
                        <h1 className="px-4 sm:px-16 text-2xl text-slate-900 font-semibold"> Create your IRL account</h1>
                        <div className="mt-6 px-4 sm:px-16 flex flex-col">
                            <label htmlFor="firstName" className={clsx(
                                "font-medium text-sm inline-block w-full", 
                                {"text-red-600": fieldErrors.firstName}
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
                            {fieldErrors.firstName &&
                                <p className="text-red-600 text-sm">
                                    {fieldErrors.firstName}
                                </p>
                            }
                        </div>
                        <div className="mt-6 px-4 sm:px-16 flex flex-col">
                            <label htmlFor="lastName" className={clsx(
                                "font-medium text-sm inline-block w-full",
                                {"text-red-600": fieldErrors.lastName}
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
                            {fieldErrors.lastName &&
                                <p className="text-red-600 text-sm">
                                    {fieldErrors.lastName}
                                </p>
                            }
                        </div>
                        <div className="mt-8 px-4 sm:px-16 flex flex-col ">
                            <label htmlFor="email" className={clsx(
                                "font-medium text-sm inline-block w-full",
                                {"text-red-600": fieldErrors.email}
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
                            {fieldErrors.email &&
                                <p className="text-red-600 text-sm">
                                    {fieldErrors.email}
                                </p>
                            }
                        </div>
                        <div className="mt-8 px-4 sm:px-16 flex flex-col ">
                            <label htmlFor="email" className={clsx(
                                "font-medium text-sm inline-block w-full",
                                {"text-red-600": fieldErrors.phone}
                            )}>Phone Number</label>
                            <input 
                                value={fieldValues.phone} onChange= {handleInputChange} aria-describedby="name-error" 
                                className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md" id="phone" name="phone" type="tel" />
                        </div>
                        <div id="phone-error" className="px-4 sm:px-16 text-red-600" aria-live="polite" aria-atomic="true">
                            {apiState?.errors?.phone?.[0] &&
                            apiState.errors.phone.map((error:string) => (
                                <p className="text-red-600 my-2 text-sm" key={error}>
                                    {error.replace('String', 'Your phone number').replace('must', 'should')}
                                </p>
                            ))}
                            {fieldErrors.phone &&
                                <p className="text-red-600 text-sm">
                                    {fieldErrors.phone}
                                </p>
                            }
                        </div>
                        <div className="mt-6 px-4 sm:px-16 flex flex-col">
                            <label htmlFor="password" className={clsx(
                                "font-medium text-sm inline-block w-full",
                                {"text-red-600": fieldErrors.password}
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
                            {fieldErrors.password &&
                                <p className="text-red-600 text-sm">
                                    {fieldErrors.password}
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