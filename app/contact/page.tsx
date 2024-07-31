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
        <section className="pt-20 bg-slate-100 py-300 z-20 h-[93vh] md:h-[94vh] overflow-y-clip">
            <div className="text-slate-600 pb-40 pl-8 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
                
                <div className="flex pt-20 sm:pt-40">
                    <div className="w-3/4 sm:w-2/3">
                        <SubmitForm/>
                    </div>
                </div>
            </div>
        </section>
    )
}