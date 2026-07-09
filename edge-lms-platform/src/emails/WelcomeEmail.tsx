import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'

interface WelcomeEmailProps {
  userName: string
  companyName: string
  loginUrl: string
}

export const WelcomeEmail = ({
  userName = "Learner",
  companyName = "Edge LMS",
  loginUrl = "https://lms.edge.com/login"
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {companyName} on Edge LMS</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Welcome to <strong>Edge LMS</strong>
              </Heading>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {userName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{companyName}</strong> has invited you to join their learning program on Edge LMS. We are excited to have you on board!
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#2D4569] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={loginUrl}
              >
                Log In to Your Dashboard
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <a href={loginUrl} className="text-blue-600 no-underline">
                {loginUrl}
              </a>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you have any questions, reply to this email to get in touch with our support team.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default WelcomeEmail
