import * as React from 'react'
import { ContactField } from '@/app/lib/definitions'
import { 
    Html, 
    Head, 
    Preview, 
    Body, 
    Container, 
    Section, 
    Row, 
    Text, 
    Hr, 
    Link, 
    Tailwind,
    Font
} from '@react-email/components'

export const ContactUsEmail: React.FC<Readonly<ContactField>> = ({
    name, email, phone, message
}) => {
    const previewText = `${name} sent a message from the IRL website.`
    return (
        <Tailwind
          config={{
            theme: {
              extend: {
                colors: {
                  beige:'#EAE2D4'
                }
              }
            }
          }}>
            <Html lang="en" dir="ltr">
                <Head>
                    <Font
                        fontFamily='body'
                        fallbackFontFamily='Verdana'
                        webFont={{
                            url:'./public/fonts/AcuminVariableConcept_2.otf', 
                            format:'opentype'
                        }}
                        fontWeight={400}
                        fontStyle='normal'
                    />
                    <title> IRL Website Message </title>    
                </Head>
                <Preview>{previewText}</Preview>
                <Body className="bg-beige">
                    <Container className='px-4'>
                        <Section>
                            <Row>
                                <Text className='text-2xl font-bold mt-12'>Here&apos;s what {name} wrote</Text>
                                <Text className='bg-slate-100 p-6 rounded text-xl leading-snug'> {message} </Text>
                                <Text className='text-slate-600 text-lg italic leading-normal'>Contact information</Text>
                                <Text className="text-slate-600 " >{email}</Text>
                                <Text className='text-slate-600 '>{phone}</Text>
                            </Row>
                        </Section>
                        <Hr />
                        <Text>
                            <Link   
                                href="https://in-real-life.vercel.app/"
                                target="_blank"
                                className="text-zinc-500 font-md underline decoration-2"
                            >
                                IRL Miami
                            </Link>
                            <br />
                            1430 South Dixie Hwy, Coral Gables, FL 33146
                        </Text>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    )
}