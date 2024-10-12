
import ContactForm from '@/app/ui/contact-form';
import { Footer } from '@/app/ui/Footer';
import { Banner } from '@/app/ui/Banner';
import React from 'react';

export default async function Contact() {
    return (
        <>
            <Banner/>
            <section className="relative z-10 text-slate-600 dark:text-slate-200 text-center px-4 pt-10">
                <ContactForm/>
            </section>
            <Footer/>
        </>
    )
}