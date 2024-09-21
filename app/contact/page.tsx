
import ContactForm from '@/app/ui/contact-form';
import { Footer } from '../ui/Footer';

export default async function Contact() {
    return (
        <>
            <section className="z-10 text-slate-600 dark:text-slate-200 text-center py-10 px-4 ">
                <ContactForm/>
            </section>
            <Footer/>
        </>
    )
}