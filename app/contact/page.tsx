
import ContactForm from '@/app/ui/contact-form';
import { Footer } from '../ui/Footer';
import React from 'react';
import Image from 'next/image'

export default async function Contact() {
    return (
        <>
            <Image
                fill={true}
                style={{
                    objectFit:'contain', 
                    objectPosition:'right top'
                }}
                sizes="(max-width: 540px) 25vw, 70vw"
                src='/assets/PalmLeaf.avif'
                alt='palm tree'
                priority={true}
                className='z-0'
            />
            <section className="relative z-10 text-slate-600 dark:text-slate-200 text-center px-4 sm:pb-48">
                <ContactForm/>
            </section>
            <Footer/>
        </>
    )
}