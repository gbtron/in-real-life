'use server'

import {z} from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import nodemailer from 'nodemailer';

export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        message?: string[];
        form?: string;
    };
};

const FormSchema = z.object({
    id: z.string(),
    name: z.string()
        .min(5)
        .regex(/^[\p{L}\s'-]*$/u, {message: 'Please enter your name using Unicode letters, apostrophes, and hyphens'})
        .max(30),
    phone: z.string()
        .min(10)
        .max(29)
        .regex(/^[\(\+]?\d*\)?[\s\d-]*$/, {message: 'Please enter your phone number using numbers, spaces, hyphens, and parentheses'}),
    message: z.string().max(200),
    date: z.string().date(),
    email: z.string()
        .email({message:'Please enter your email with valid recipient and domain names'})
        .max(50),
})

const CreateLead = FormSchema.omit({id: true, date: true}); 

export async function sendMessage(previousState: State, formData: FormData) {
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
            errors: errors
        }
    }

    const {name, email, phone, message} = validatedFields.data
    const date = new Date().toISOString().split('T')[0];

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECIPIENT,
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\n\nEmail:${email}\n\nPhone: ${phone}\n\n${message}`
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch {
        return {
            errors: {
                form: 'The message could not be sent.'
            }
        }
    }
    // insert into database
    // try {
    //     await sql`
    //     INSERT INTO leads(name, email, phone, message, date)
    //     VALUES (${name}, ${email}, ${phone}, ${message}, ${date})
    //     `;  
    // } catch (error){
    //     return {
    //         errors: {
    //             form: 'The message could not be sent.'
    //         }
    //     }
    // }
    revalidatePath('/contact');
    return {}
}