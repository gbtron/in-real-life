import { EmailTemplate } from "@/app/ui/email-template";
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
    try {
        console.log('resend key- ', process.env.RESEND_API_KEY)
        const { data, error } = await resend.emails.send({
            from: 'IRL <contact-us@irlmiami.com', 
            to: ['josephrfuentes@gmail.com'], 
            subject: 'IRL - Contact Form', 
            react: EmailTemplate({ firstName: "Testson" })
        })

        if (error) {
            return Response.json({ error }, { status: 500 })
        }
        return Response.json(data)
    }
    catch (error) {
        return Response.json({ error }, { status:500 })
    }
}