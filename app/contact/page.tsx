
import ContactForm from '@/app/ui/contact-form';
import { Footer } from '../ui/Footer';

export default async function Contact() {
    return (
        <>
            <section className="bg-beige-100 dark:bg-brown-100 z-10 ">
                <div className="text-slate-600 dark:text-slate-200 pl-4 sm:mb-20 sm:pl-8 sm:px-[--columnPaddingNormal] sm:mx-auto sm:max-w-[calc(var(--columnPaddingNormal)*2+var(--layoutWidthMax))]">
                    <div className="flex pt-10">
                        <div className="w-[96%]">
                            <ContactForm/>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}