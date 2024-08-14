
import ContactForm from '@/app/ui/contact-form';
import { Footer } from '../ui/Footer';

export default async function Contact() {
    return (
        <>
            <section className="sm:pt-20 bg-slate-100 z-20 ">
                <div className="text-slate-600 mb-8 sm:mb-44 pl-4 sm:pl-8 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
                    <div className="flex pt-10 sm:pt-40">
                        <div className="w-[96%] sm:w-2/3">
                            <ContactForm/>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}