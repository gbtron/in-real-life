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
    }),
    phone: z.string({
        invalid_type_error: 'Please enter your phone number.'
    }),
    message: z.string({
        invalid_type_error: 'Please enter the message you would like to send us.'
    }),
    date: z.string(),
    email: z.string({
        invalid_type_error: "Please enter your email address."
    }),
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
            message: 'Missing Fields. Failed to Create Lead Message'
        }
    }
    console.log(validatedFields)
    const date = new Date().toISOString().split('T')[0];
    // try {
    //     await sql`
    //     INSERT INTO leads(name, email, phone, message, date)
    //     VALUES (${name}, ${email}, ${phone}, ${message}, ${date})
    //     `;  
    // } catch (error){
    //     return {
    //         message: "Database Error: Failed to create lead message"
    //     }
    // }
    
    revalidatePath('/contact');
    redirect('/contact');
}