"use client"
import { useActionState, useState } from 'react';
import { submit } from '@/app/actions';
import { useFormStatus } from 'react-dom';

const initialState= {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className="bg-indigo-600 text-white p-4 rounded-md">
            {pending ? 'Sending...' : 'Send'}
        </button>
    );
}

export default function SubmitForm() {
    const [state, formAction] = useState(initialState);

    return (
        <form className="">
            <label htmlFor="firstName"></label>
            <div className="flex flex-col z-10">
                <input className="my-8 w-40" type="text" placeholder="First Name" id="firstName" name="firstName" required />
                <input className="my-8 w-40" type="text" placeholder="Last Name" id="lastName" name="lastName" required />
                <input className="my-8 w-80" type="email" placeholder="Email" id="email" name="email" required />
                <textarea className="my-8" placeholder="Message" id="message" name="message" required />
                <SubmitButton />
                <p aria-live="polite" role="status" className="text-red-600">{state?.message}</p>
            </div>
        </form>
    )
}