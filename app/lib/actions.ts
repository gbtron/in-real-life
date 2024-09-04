'use server'

import {z} from 'zod';
import bcrypt from 'bcrypt'
import { QueryResultRow, sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import nodemailer from 'nodemailer';
import {RegistrationField} from '@/app/dashboard/register/page'

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

const LoginFormSchema = z.object({
    email: z.string()
        .email({message:'Please enter your email with valid recipient and domain names'})
        .max(50),
    password: z.string()
        .min(8)
        .max(50)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {message: 'Please enter a password with at least one lowercase letter, one uppercase letter, one number, and one special character'}),
})
const CreateLead = ContactFormSchema.omit({id: true, date: true});
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

const CreateLogin = LoginFormSchema;

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
    account_created: z.string().date(),
})
const CreateUser = RegistrationFormSchema.omit({id: true, account_created: true}); 

export type RegistrationErrors = {
    [F in RegistrationField]?: string[] | undefined
} & {
    form?: string
}
export type RegistrationForm = {
    errors?: RegistrationErrors
    submissionPending: boolean, 
    success?:boolean
};

export async function createAccount(previousState: RegistrationForm, formData: FormData) {
    const rawFirstName = formData.get('firstName') 
    const rawLastName = formData.get('lastName')
    const rawEmail = formData.get('email') 
    const rawPhone = formData.get('phone') 
    const rawPassword = formData.get('password')
    const validatedFields = CreateUser.safeParse({
        firstName: rawFirstName,
        lastName: rawLastName,
        email: rawEmail,
        phone: rawPhone,
        password: rawPassword
    })
    const state: RegistrationForm = {
        submissionPending: false, 
        success:false
    }
    if (!validatedFields.success) {
        state.errors = validatedFields.error.flatten().fieldErrors
        return state
    }

    const {firstName, lastName, email, phone, password} = validatedFields.data
    const date = new Date().toISOString().split('T')[0];
    try {
        await sql`
        INSERT INTO accounts(first_name, last_name, email, password, phone, account_created, type, member_status)
        VALUES (${firstName}, ${lastName}, ${email}, ${password}, ${phone}, ${date}, 'user', 'inactive')
        `;  
    } catch (error){
        let errorMessage:string;
        if (typeof error === 'string') {
            errorMessage = error;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An error occurred';
        }
        if (errorMessage.includes('violates unique constraint "users_email_key"')) {
            state.errors = {
                email: ['This email is already associated with an account. Please sign in with your credentials.']
            }
            return state
        }
        // Check that env file contains all api keys
        state.errors = {
            form: 'The account could not be created.'
        }
        return state
    }
    revalidatePath('/dashboard/registration');
    state.success = true
    return state
}

export type LoginState = {
    errors?: {
        email?: string[]
        password?: string[]
        form?: string
    }, 
    submissionPending: boolean, 
    success? : boolean
};

export async function login(previousState: LoginState, formData: FormData) {
    const rawEmail = formData.get('email') as string
    const rawPassword = formData.get('password') as string

    const validatedFields = CreateLogin.safeParse({
        email: rawEmail,
        password: rawPassword
    })

    let state: LoginState = {
        submissionPending: false, 
        success:false
    }

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
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await sql`
        SELECT * FROM accounts
        WHERE email = ${email}
        `;
    }
    catch (error) {
        let errorMessage:string;
        if (typeof error === 'string') {
            errorMessage = error;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = 'An error occurred';
        }
        if (errorMessage.includes('violates unique constraint') || errorMessage.includes('No account is associated with this email')) {
            state.errors = { form: 'No account is associated with this email. Please try again.'}
            return state
        }
        state.errors= {
            form: 'The account could not be accesssed. Please try again.'
        }
        return state
    }
    revalidatePath('/dashboard/login');
    state.success = true
    return state
}

export async function checkUser(email:string) {
    let user:QueryResultRow
    let errorMessage = ''
    try {
        user = await sql `
        SELECT * FROM accounts
        WHERE email = ${email}
        `
    } catch {
        return errorMessage
    }
    if (user && user.rows.length !== 0) {
        errorMessage = 'This account is already registered for an account. Please sign in.'
    } else {
        errorMessage = ''
    }
    return errorMessage
}