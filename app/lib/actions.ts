'use server'
import {z} from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { ContactResponse } from '@/app/lib/definitions';
import { EmailTemplate } from "@/app/ui/email-template";
import { Resend } from 'resend'

export async function sendMessage(previousState: ContactResponse, formData: FormData) {
    const rawName = formData.get('name') as string
    const rawEmail = formData.get('email') as string
    const rawPhone = formData.get('phone') as string
    const rawMessage = formData.get('message') as string

    const ContactFormSchema = z.object({
        id: z.string(),
        name: z.string()
            .min(5)
            .regex(/^[\p{L}\s'-]*$/u, {message: 'Please enter your name using Unicode letters, apostrophes, and hyphens'})
            .max(30),
        email: z.string()
            .email({message:'Please enter your email with valid recipient and domain names'})
            .max(50),
        phone: z.string()
            .min(10)
            .max(29)
            .regex(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/, {message: 'Please enter your phone number using numbers, spaces, hyphens, dots, and parentheses'}),
        message: z.string().max(200).min(10),
        date: z.string().date(),
    })
    
    const CreateLead = ContactFormSchema.omit({id: true, date: true});

    const validatedFields = CreateLead.safeParse({
        name: rawName,
        email: rawEmail,
        phone: rawPhone,
        message: rawMessage
    })

    const apiResponse:ContactResponse = {
        submissionPending: false, 
        messageSent:false
    }

    if (!validatedFields.success) {
        const errors = {
            ...validatedFields.error.flatten().fieldErrors,
            form: ''
        }
        apiResponse.errors = errors
        return apiResponse
    }
    const {name, email, phone, message} = validatedFields.data
    const date = new Date().toISOString().split('T')[0];

    // store message in vercel table
    try {
        await sql`
        INSERT INTO leads(name, email, phone, message, date)
        VALUES (${name}, ${email}, ${phone}, ${message}, ${date})
        `;  
    } catch (error) {
        apiResponse.errors = { form: 'The message could not be saved.' }
        return apiResponse
    }

    // send message via emal
    const resend = new Resend(process.env.RESEND_API_KEY)
    try {
        const { data, error } = await resend.emails.send({
            from: `${name} <contact-us@irlmiami.com>`, 
            to: ['josephrfuentes@gmail.com'], 
            subject: 'IRL - Contact Form', 
            react: EmailTemplate({ name: name, email: email, phone: phone, message:message })
        })

        if (error) {
            apiResponse.errors = { form: error.message }
            return apiResponse
        }
        apiResponse.messageSent=true
    }
    catch (error) {
        return apiResponse
    }
    
    revalidatePath('/contact');
    return apiResponse
}