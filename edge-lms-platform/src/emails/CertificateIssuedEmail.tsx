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

interface CertificateIssuedEmailProps {
  userName: string
  programName: string
  certificateUrl: string
}

export const CertificateIssuedEmail = ({
  userName = "Learner",
  programName = "Leadership Development Program",
  certificateUrl = "https://lms.edge.com/learner/certificates"
}: CertificateIssuedEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Congratulations! Your certificate for {programName} is ready.</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Congratulations, <strong>{userName}!</strong>
              </Heading>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              You have successfully completed <strong>{programName}</strong>. 
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Your official certificate of completion has been generated and is now available to download or share from your dashboard.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#10B981] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={certificateUrl}
              >
                View Your Certificate
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Great job on completing your learning journey! Keep up the excellent work.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default CertificateIssuedEmail
