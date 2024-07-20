"use client"
import SubmitForm from '@/app/submit-form';
const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
}

export default function Contact() {

    return (
        <section className="pt-20 bg-slate-100 py-300">
            <div className="text-slate-600 pb-40 pl-8 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
                
                <div className="flex pt-20 sm:pt-40">
                    <div className="w-3/4 sm:w-2/3">
                        <h1 className="pt-6 font-heading text-indigo-600 font-semibold text-xl sm:text-3xl">Contact Us</h1>
                        
                        <SubmitForm/>
                    </div>
                </div>
            </div>
        </section>
    )
}