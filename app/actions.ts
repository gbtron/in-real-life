'use server'

import {z} from 'zod';

const schema = z.object({
    email: z.string({invalid_type_error: "Invalid Email"}),
})

export async function sendMessage(formData: FormData) {
    const validateFields = schema.safeParse({
        email: formData.get('email')
    });

    // Return early if form data is invalid
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
        }
    }
    return {
        message:"Please enter a valid email"
    }
}