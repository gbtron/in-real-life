import * as React from 'react'
import { ContactField } from '@/app/lib/definitions'
import { Html, Head, Preview, Body, Container, Section, Row, Text, Hr, Link} from '@react-email/components'

export const ContactUsEmail: React.FC<Readonly<ContactField>> = ({
    name, email, phone, message
}) => {
    const previewText = `${name} sent a message from the IRL website.`
    return (
    <Html lang="en" dir="ltr">
        <Head>
            <title> IRL Website Message </title>    
        </Head>
        <Preview>{previewText}</Preview>
        <Body >
            <Container >
                <Section >
                    <Row>
                        <Text> {name} sent a message </Text>
                        <Text> {message} </Text>
                        <Text >You can reply to the sender using their provided methods below.</Text>
                        <Text>Email: {email}</Text>
                        <Text>Phone: {phone}</Text>
                        <Hr />
                    </Row>
                </Section>
                <Section>
                    <Row>
                        <Text>
                            IRL, 1430 South Dixie Hwy, Coral Gables, FL 33146
                        </Text>
                        <Link href={process.env.APP_DOMAIN}> Go to website </Link>
                    </Row>
                </Section>
            </Container>
        </Body>
    </Html>
)}