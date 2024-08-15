'use client'
import { handlee } from "@/app/ui/fonts"
import Link from "next/link"
import { useActionState, useState, startTransition } from "react"
import { LoginState, login } from "@/app/lib/actions"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

export default function Login() {
    const initialState: LoginState = {errors: {}, submissionPending: false}
    const [fieldsValid, setFieldsValid] = useState(false)
    const [fieldsFilled, setFieldsFilled] = useState(false)
    const [clientErrors, setClientErrors] = useState({
        email: '',
        password: ''
    })
    const [state, formAction] = useActionState(login, initialState)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [blurred, setBlurred] = useState({
        email: false,
        password: false
    })
    const [passwordVisible, setPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name]: value
        })
        switch (name) {
            case 'email':
            case 'password':
                if (blurred[name]) {
                    clientSideValidation(name, value)
                }
                break
        }
    }

    const clientSideValidation = (name: string, value: string) => {
        switch (name) {
            case 'email':
                if (value.length === 0) {
                    setClientErrors({
                        ...clientErrors,
                        email: 'Email is required'
                    })
                } else {
                    setClientErrors({
                        ...clientErrors,
                        email: ''
                    })
                }
                break
            case 'password':
                if (value.length === 0) {
                    setClientErrors({
                        ...clientErrors,
                        password: 'Password is required'
                    })
                } else {
                    setClientErrors({
                        ...clientErrors,
                        password: ''
                    })
                }
                break
        }
    }

    return (
        <div className="flex flex-col sm:flex-row px-4 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
            <div className="sm:block w-3/4 sm:w-1/2 pl-4 sm:pr-44 sm:pt-36 pt-8 text-slate-600">
                <div className={`${handlee.className} text-4xl lg:text-6xl text-slate-600 font-semibold `}>
                    IRL
                </div>  
            </div>  
            <div className="bg-white sm:mt-12 mt-4 sm:w-3/6 sm:pt-16 pt-8 pb-1 rounded-md border-black">
                <form onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const data = new FormData()
                    data.append('email', formData.email)
                    data.append('password', formData.password)
                    startTransition(() => {
                        state.submissionPending = true
                        formAction(data);
                    })
                }}>
                    <div onBlur= {(e:React.FocusEvent<HTMLInputElement>) => {
                        setBlurred({
                            ...blurred,
                            [e.target.name]: true
                        })
                        clientSideValidation(e.target.value, e.target.name)
                    }}>
                        <h1 className="px-4 sm:px-16 text-2xl text-slate-900 font-semibold"> Log in to your IRL account</h1>
                        <div className="mt-6 px-4 sm:px-16 flex flex-col">
                            <label htmlFor="email" className="font-medium text-sm inline-block w-full">Email</label>
                            <input 
                                aria-describedby="email-error"
                                className="w-full px-2 py-1 mt-2 mb-4 border-slate-400 border rounded-md"
                                id="email"
                                name="email"
                                type="email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mt-6 px-4 sm:px-16 flex flex-col">
                            <label htmlFor="password" className="font-medium text-sm inline-block w-full">Password</label>
                            <div className="flex items-center border-slate-400 border rounded-md mt-2 mb-4 px-1">
                                <input 
                                    aria-describedby="password-error"
                                    className="w-full px-2 py-1"
                                    id="password"
                                    name="password"
                                    type={passwordVisible ? 'text' : 'password'}
                                    onChange={handleInputChange}
                                />
                                <button 
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="ml-2"
                                    >
                                        {passwordVisible ? <EyeSlashIcon className="h-5 w-5 text-slate-400" /> : <EyeIcon className="h-5 w-5 text-slate-400" />}
                                    </button>
                            </div>

                        </div>
                        <div className="mt-10 px-4 sm:px-16 justify-end flex md:justify-start">
                            <button className="bg-indigo-900 text-white px-4 py-2 rounded-md w-full">Log in</button>
                        </div>
                        <div className="p-6 rounded bg-lightTan mt-12 mx-1 text-center text-sm text-slate-600">
                            Don&apos;t have an account?  {' '}
                            <Link href="/dashboard/register" className="text-indigo-500 hover:text-indigo-900">
                                Register
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}