'use server'

import {z} from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';

export type ContactState = {
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        message?: string[];
        form?: string;
    }, 
    submissionPending: boolean;
};

export type RegistrationState = {
    errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        phone?: string[];
        password?: string[];
        form?: string;
    }, 
    submissionPending: boolean;
};

export type LoginState = {
    errors?: {
        email?: string[];
        password?: string[];
        form?: string;
    }, 
    submissionPending: boolean;
};

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

const RegistrationFormSchema = z.object({
    id: z.string(),
    firstName: z.string()
        .min(2)
        .regex(/^[\p{L}\s'-]*$/u, {message: 'Please enter your name using Unicode letters, apostrophes, and hyphens'})
        .max(30),
    lastName: z.string()
        .min(2)
        .regex(/^[\p{L}\s'-]*$/u, {message: 'Please enter your name using Unicode letters, apostrophes, and hyphens'})
        .max(30),
    phone: z.string()
        .min(10)
        .max(29)
        .regex(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/, {message: 'Please enter your phone number using only numbers, spaces, hyphens, plus symbols, and parentheses'}),
    email: z.string()
        .email({message:'Please enter your email with valid recipient and domain names'})
        .max(50),
    password: z.string()
        .min(8)
        .max(50)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {message: 'Please enter a password with at least one lowercase letter, one uppercase letter, one number, and one special character'}),
    date: z.string().date(),
})

const LoginFormSchema = z.object({
    email: z.string()
        .email({message:'Please enter your email with valid recipient and domain names'})
        .max(50),
    password: z.string()
        .min(8)
        .max(50)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {message: 'Please enter a password with at least one lowercase letter, one uppercase letter, one number, and one special character'}),
})

const CreateUser = RegistrationFormSchema.omit({id: true, date: true}); 
const CreateLead = ContactFormSchema.omit({id: true, date: true});
const CreateLogin = LoginFormSchema;

export async function sendMessage(previousState: ContactState, formData: FormData) {
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

export async function createAccount(previousState: RegistrationState, formData: FormData) {
    const rawFirstName = formData.get('firstName') as string
    const rawLastName = formData.get('lastName') as string
    const rawEmail = formData.get('email') as string
    const rawPhone = formData.get('phone') as string
    const rawPassword = formData.get('password') as string

    const validatedFields = CreateUser.safeParse({
        firstName: rawFirstName,
        lastName: rawLastName,
        email: rawEmail,
        phone: rawPhone,
        password: rawPassword
    })

    if (!validatedFields.success) {
        const errors = {
            ...validatedFields.error.flatten().fieldErrors,
            form: ''
        }
        return {
            errors: errors, 
            submissionPending:false
        }
    }

    const {firstName, lastName, email, phone, password} = validatedFields.data
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
        INSERT INTO users(firstname, lastname, email, password, phone, date)
        VALUES (${firstName}, ${lastName}, ${email}, ${password}, ${phone}, ${date})
        `;  
    } catch (error){
        return {
            errors: {
                form: 'The account could not be created.'
            }, 
            submissionPending: false
        }
    }
    revalidatePath('/dashboard/registration');
    return {submissionPending: false};
}

export async function login(previousState: LoginState, formData: FormData) {
    const rawEmail = formData.get('email') as string
    const rawPassword = formData.get('password') as string

    const validatedFields = CreateLogin.safeParse({
        email: rawEmail,
        password: rawPassword
    })

    if (!validatedFields.success) {
        const errors = {
            ...validatedFields.error.flatten().fieldErrors,
            form: ''
        }
        return {
            errors: errors, 
            submissionPending:false
        }
    }

    const {email, password} = validatedFields.data

    try {
        await sql`
        SELECT * FROM users
        WHERE email = ${email}
        `;
    }
    catch (error) {
        return {
            errors: {
                form: 'No account is associated with this email. Please try again.'
            }, 
            submissionPending: false
        }
    }
    revalidatePath('/dashboard/login');
    return {submissionPending: false};
}