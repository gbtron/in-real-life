import * as React from 'react'
import { ContactFormData } from '@/app/lib/definitions'
import { Html, Button, Head, Preview, Body, Container, Section, Img, Row, Text} from '@react-email/components'
import { acumen } from "@/app/ui/fonts"

export const EmailTemplate: React.FC<Readonly<ContactFormData>> = ({
    name, email, phone, message
}) => {
    const previewText = `${name} sent a message from the IRL website.`
    return (
    <Html lang="en" dir="ltr">
        <Head>
            <title> Contact Form </title>
        </Head>
        <Preview>{previewText}</Preview>
        <Body className={`${acumen.className} bg-beige-100`}>
            <Container className="mx-auto pt-8 px-20 w-3/4">
                <Section>
                    <Img
                        src="/assets/IRL_Logo_Final_Main.png"
                        width="96"
                        height="96"
                        alt="IRL"
                    >
                    </Img>
                </Section>
                <Section className="pb-10">
                    <Row>
                        <Text> Here's what {name} wrote </Text>
                        <Text className="text-lg p-8 "> {message} </Text>
                    </Row>
                </Section>
            </Container>
        </Body>
        <h1>Message been sent to you. </h1>
        <Button 
            href={process.env.APP_DOMAIN}
            className="bg-tangerine-100 p-1 mt-8"
        >
                IRL
            </Button>
    </Html>
)}