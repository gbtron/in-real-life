'use server'

import {z} from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        message?: string[];
    };
    message?: string | null;
};

const FormSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Please enter your full name.'
    }).min(5).regex(/^[\p{L}\s'-]*$/u).max(30),
    phone: z.string({
        invalid_type_error: 'Please enter a valid phone number.'
    }).min(10).max(29).regex(/^[\(\+]?\d{0,14}\)?[\s\d-]{9,28}$/),
    message: z.string({
        invalid_type_error: 'Please enter the message you would like to send us.'
    }).max(200),
    date: z.string().date(),
    email: z.string({
        invalid_type_error: "Please enter a valid email address."
    }).email().max(50),
})

const CreateLead = FormSchema.omit({id: true, date: true}); 

export async function sendMessage(prevState: State, formData: FormData) {
    const validatedFields = CreateLead.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    })
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Some of the fields are invalid. Please correct them and try again.', 
        }
    }

    const {name, email, phone, message} = validatedFields.data
    
    const date = new Date().toISOString().split('T')[0];
    try {
        await sql`
        INSERT INTO leads(name, email, phone, message, date)
        VALUES (${name}, ${email}, ${phone}, ${message}, ${date})
        `;  
    } catch (error){
        console.error("Database error", error);
        return {
            errors: {},
            message: "The message could not be sent."
        }
    }
    return {
        errors:{},
        message: "The message was sent successfully."
    }
    
}