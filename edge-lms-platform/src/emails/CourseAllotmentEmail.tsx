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

interface CourseAllotmentEmailProps {
  courseName: string
  courseDescription: string
  userName: string
  loginUrl: string
}

export const CourseAllotmentEmail = ({
  courseName = "New Course",
  courseDescription = "We have assigned a new learning path for you to complete.",
  userName = "Learner",
  loginUrl = "https://lms.edge.com/login"
}: CourseAllotmentEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>You have been assigned a new course: {courseName}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                New Course Assignment
              </Heading>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {userName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              You have been enrolled in a new course on Edge LMS:
            </Text>
            <Section className="bg-gray-50 rounded p-4 my-4 border border-gray-100">
              <Text className="text-black text-[16px] font-semibold leading-[24px] m-0">
                {courseName}
              </Text>
              <Text className="text-gray-600 text-[14px] leading-[24px] mt-2 mb-0">
                {courseDescription}
              </Text>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#2D4569] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={loginUrl}
              >
                Start Learning
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

export default CourseAllotmentEmail
