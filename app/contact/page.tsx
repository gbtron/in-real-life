import Form from '@/app/ui/submit-form';
import { fetchLeads } from '@/app/lib/data';
import { Lead } from '@/app/lib/definitions';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
}

export default async function Contact() {
    return (
        <section className="pt-20 bg-slate-100 pb-20 z-20 xl:h-[93vh] ">
            <div className="text-slate-600 pb-40 pl-8 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
                <div className="flex pt-20 sm:pt-40">
                    <div className="w-3/4 sm:w-2/3">
                        <Form/>
                    </div>
                </div>
            </div>
        </section>
    )
}