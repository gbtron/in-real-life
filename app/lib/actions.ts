'use server'
import {z} from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';
import { ContactResponse } from '@/app/lib/definitions';

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
export async function sendMessage(previousState: ContactResponse, formData: FormData) {
    const rawName = formData.get('name') as string
    const rawEmail = formData.get('email') as string
    const rawPhone = formData.get('phone') as string
    const rawMessage = formData.get('message') as string

    const validatedFields = CreateLead.safeParse({
        name: rawName,
        email: rawEmail,
        phone: rawPhone,
        message: rawMessage
    })

    if (!validatedFields.success) {
        const errors = {
            ...validatedFields.error.flatten().fieldErrors,
            form: ''
        }
        return {
            errors: errors, 
            submissionPending: false
        }
    }
    const {name, email, phone, message} = validatedFields.data
    const date = new Date().toISOString().split('T')[0];

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: `"Rafa Wiza" <${process.env.EMAIL_USER}>`,
        to: "thero@irl.com",
        subject: `IRL Website Message`,
        text: `Name: ${name}\n\nEmail:${email}\n\nPhone: ${phone}\n\n${message}`, 
        html:`<p>${message} <br> <br> ${name} <br> ${email} <br> ${phone}</p> <br>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        await sql`
        INSERT INTO leads(name, email, phone, message, date)
        VALUES (${name}, ${email}, ${phone}, ${message}, ${date})
        `;  
    } catch (error) {
        return { 
            errors: { form: 'The message was not sent. Please try again later' },
            submissionPending: false 
        };
    }
    
    revalidatePath('/contact');
    return {submissionPending: false};
}