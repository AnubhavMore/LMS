import { ProgramTemplate, Course, Module, Lesson, Quiz, Resource, QuizQuestion } from "@/types/schema"

export const seedProgramTemplates: ProgramTemplate[] = [
  { id: "pt_ftm", title: "First-Time Manager Journey", description: "Develop essential management skills to lead high-performing teams.", isInternal: false },
  { id: "pt_disc", title: "Everything DiSC Workplace Application", description: "Understand your DiSC style and build more effective relationships.", isInternal: false },
  { id: "pt_five", title: "Five Behaviors Team Journey", description: "Build a cohesive and effective team through trust, conflict, and commitment.", isInternal: false },
  { id: "pt_ai", title: "AI for Leaders", description: "Strategic adoption of artificial intelligence in business operations.", isInternal: false },
  { id: "pt_int_cs", title: "Consultative Selling using SOLUTION", description: "Internal sales training for Strengthscape consultants.", isInternal: true },
  { id: "pt_induction_2026", title: "New Joinee Induction 2026", description: "Comprehensive onboarding for new Strengthscape team members.", isInternal: true },
]

export const seedCourses: Course[] = [
  { id: "c_ftm_1", title: "Transitioning to Management", description: "The mindset shift from individual contributor to manager.", programTemplateId: "pt_ftm" },
  { id: "c_ftm_2", title: "Effective Delegation", description: "How to delegate tasks without micromanaging.", programTemplateId: "pt_ftm" },
  { id: "c_disc_1", title: "Discovering Your DiSC Style", description: "Introduction to the DiSC model.", programTemplateId: "pt_disc" },
  { id: "c_induction_1", title: "Consultative Selling", description: "Learn the consultative selling cycle.", programTemplateId: "pt_induction_2026" },
]

export const seedModules: Module[] = [
  // Course: Transitioning to Management
  { id: "m_ftm_1_1", courseId: "c_ftm_1", title: "The Manager Mindset", orderIndex: 1 },
  { id: "m_ftm_1_2", courseId: "c_ftm_1", title: "Building Your Foundation", orderIndex: 2 },
  { id: "m_ftm_1_3", courseId: "c_ftm_1", title: "Leading Conversations", orderIndex: 3 },
  // Course: Effective Delegation
  { id: "m_ftm_2_1", courseId: "c_ftm_2", title: "Why Delegation Matters", orderIndex: 1 },
  // Course: Consultative Selling (Induction)
  { id: "m_induction_1_1", courseId: "c_induction_1", title: "Selling Cycle", orderIndex: 1 },
]

export const seedLessons: Lesson[] = [
  // Module: The Manager Mindset
  {
    id: "l_ftm_1_1_1", moduleId: "m_ftm_1_1", title: "Welcome to Management", type: "Video", orderIndex: 1,
    videoUrl: "https://vimeo.com/mock1", estimatedMinutes: 12,
    contentMarkdown: "In this video, you will learn about the critical mindset shifts required when transitioning from an individual contributor to a people leader. We cover the three pillars of effective management: **empathy**, **accountability**, and **strategic thinking**.",
    keyTakeaway: "Management is not about doing more work — it's about enabling others to do their best work."
  },
  {
    id: "l_ftm_1_1_2", moduleId: "m_ftm_1_1", title: "The Transition Toolkit", type: "Text", orderIndex: 2,
    estimatedMinutes: 8,
    contentMarkdown: "## Your First 90 Days\n\nThe first 90 days as a new manager are crucial. Here's a framework:\n\n### Days 1–30: Listen & Learn\n- Schedule 1:1s with every team member\n- Understand existing workflows and pain points\n- Identify quick wins\n\n### Days 31–60: Build & Align\n- Establish team norms and communication cadence\n- Set clear expectations with your manager\n- Begin delegating meaningful tasks\n\n### Days 61–90: Lead & Iterate\n- Conduct your first performance check-in\n- Solicit feedback on your leadership style\n- Refine your management approach based on data",
    keyTakeaway: "Use the 30-60-90 framework to structure your first quarter as a manager."
  },
  {
    id: "l_ftm_1_1_3", moduleId: "m_ftm_1_1", title: "Mindset Check", type: "Quiz", orderIndex: 3,
    estimatedMinutes: 5,
    contentMarkdown: "Test your understanding of the manager mindset with this quick quiz.",
    keyTakeaway: "Self-assessment is the first step to growth."
  },
  {
    id: "l_ftm_1_1_4", moduleId: "m_ftm_1_1", title: "Reflection: My Leadership Identity", type: "Reflection", orderIndex: 4,
    estimatedMinutes: 10,
    contentMarkdown: "Take a moment to reflect on your leadership journey so far.\n\n**Prompt:** What kind of leader do you want to be? Think about the best manager you've ever had — what qualities made them effective? How can you embody those qualities in your own unique way?\n\nWrite at least 3 sentences.",
    keyTakeaway: "Intentional self-reflection builds self-aware leaders."
  },

  // Module: Building Your Foundation
  {
    id: "l_ftm_1_2_1", moduleId: "m_ftm_1_2", title: "Understanding Team Dynamics", type: "Video", orderIndex: 1,
    videoUrl: "https://vimeo.com/mock2", estimatedMinutes: 15,
    contentMarkdown: "Learn how to read your team's dynamics and identify strengths, gaps, and potential friction points early.",
    keyTakeaway: "Every team has a unique DNA — your job is to understand it before trying to change it."
  },
  {
    id: "l_ftm_1_2_2", moduleId: "m_ftm_1_2", title: "Setting Expectations", type: "Text", orderIndex: 2,
    estimatedMinutes: 7,
    contentMarkdown: "## The Art of Setting Clear Expectations\n\nAmbiguity is the enemy of performance. Use the **SMART** framework:\n\n- **S**pecific: What exactly needs to be done?\n- **M**easurable: How will success be measured?\n- **A**chievable: Is this realistic given current resources?\n- **R**elevant: Does this align with team and company goals?\n- **T**ime-bound: What is the deadline?\n\n> \"People don't fail because they lack talent. They fail because they lack clarity.\"",
    keyTakeaway: "Use SMART goals to eliminate ambiguity in your team."
  },
  {
    id: "l_ftm_1_2_3", moduleId: "m_ftm_1_2", title: "Resource Pack: Templates", type: "Resource", orderIndex: 3,
    estimatedMinutes: 3,
    contentMarkdown: "Download the manager toolkit templates including 1:1 agenda, goal-setting worksheet, and feedback framework.",
    keyTakeaway: "Tools and templates reduce friction in new management routines."
  },

  // Module: Leading Conversations
  {
    id: "l_ftm_1_3_1", moduleId: "m_ftm_1_3", title: "Prep for Your First Live Session", type: "LiveSessionPrep", orderIndex: 1,
    estimatedMinutes: 5,
    contentMarkdown: "Your first live session with facilitator **Vikram Singh** is coming up. Here's how to prepare:\n\n1. Review the case study: *The Reluctant Team Member*\n2. Prepare your 2-minute introduction\n3. Write down one leadership challenge you're currently facing\n4. Test your video and audio before joining",
    keyTakeaway: "Preparation is the foundation of an impactful live session."
  },
  {
    id: "l_ftm_1_3_2", moduleId: "m_ftm_1_3", title: "Difficult Conversations Framework", type: "Video", orderIndex: 2,
    videoUrl: "https://vimeo.com/mock3", estimatedMinutes: 18,
    contentMarkdown: "Learn the SBI (Situation-Behavior-Impact) model for delivering feedback that lands without creating defensiveness.",
    keyTakeaway: "Use the SBI model: describe the Situation, the Behavior, and its Impact."
  },
  
  // Module: Selling Cycle (Induction)
  {
    id: "l_induction_1_1_1", moduleId: "m_induction_1_1", title: "Consultative Selling Process", type: "Video", orderIndex: 1,
    videoUrl: "https://strengthscapeadmin-my.sharepoint.com/personal/akash_chander_strengthscape_com/_layouts/15/stream.aspx?id=%2Fpersonal%2Fakash%5Fchander%5Fstrengthscape%5Fcom%2FDocuments%2FStrengthscape%20Library%2F04%20Human%20Resources%2FHR%20%2D%202026%2FNew%20Joinee%20Induction%202026%2FStrengthscape%5FInduction%5FVideos%2F04%20Selling%20Cycle%2F01%20Consultative%5FSelling%2Emp4&ga=1", estimatedMinutes: 45,
    contentMarkdown: "Welcome to the Consultative Selling module of the New Joinee Induction 2026. Watch the video above to learn the core principles of the Strengthscape selling cycle.",
    keyTakeaway: "Consultative selling focuses on uncovering client needs rather than pushing products."
  },
]

export const seedQuizzes: Quiz[] = [
  { id: "q_ftm_1_1_3", lessonId: "l_ftm_1_1_3", title: "Mindset Check Quiz", passingScore: 80 }
]

export const seedQuizQuestions: QuizQuestion[] = [
  {
    id: "qq_1", quizId: "q_ftm_1_1_3", orderIndex: 1,
    questionText: "What is the primary mindset shift when transitioning from individual contributor to manager?",
    options: [
      "Doing more work yourself to set an example",
      "Enabling others to do their best work",
      "Becoming the technical expert on every task",
      "Minimizing team interaction to focus on strategy"
    ],
    correctIndex: 1,
    explanationText: "Management is about enabling others, not doing more yourself. The key shift is from personal output to team output."
  },
  {
    id: "qq_2", quizId: "q_ftm_1_1_3", orderIndex: 2,
    questionText: "Which of the following is NOT one of the three pillars of effective management discussed in the lesson?",
    options: [
      "Empathy",
      "Accountability", 
      "Technical Mastery",
      "Strategic Thinking"
    ],
    correctIndex: 2,
    explanationText: "The three pillars are Empathy, Accountability, and Strategic Thinking. Technical mastery is valuable but not a core management pillar."
  },
  {
    id: "qq_3", quizId: "q_ftm_1_1_3", orderIndex: 3,
    questionText: "In the 30-60-90 framework, what should a new manager focus on during Days 1–30?",
    options: [
      "Conduct performance reviews",
      "Restructure the team",
      "Listen, learn, and schedule 1:1s with every team member",
      "Implement new processes immediately"
    ],
    correctIndex: 2,
    explanationText: "The first 30 days are about listening and learning. Schedule 1:1s, understand workflows, and identify quick wins."
  },
  {
    id: "qq_4", quizId: "q_ftm_1_1_3", orderIndex: 4,
    questionText: "What is the recommended approach to delegation for new managers?",
    options: [
      "Delegate only trivial tasks to maintain control",
      "Delegate meaningful tasks without micromanaging",
      "Avoid delegation until trust is fully established",
      "Delegate everything and focus solely on strategy"
    ],
    correctIndex: 1,
    explanationText: "Effective delegation involves assigning meaningful tasks while providing support, not micromanaging or holding back."
  },
  {
    id: "qq_5", quizId: "q_ftm_1_1_3", orderIndex: 5,
    questionText: "Why is self-reflection important for new managers?",
    options: [
      "It helps fill out performance review forms",
      "It's required by HR policy",
      "It builds self-awareness which is the foundation of effective leadership",
      "It reduces the need for team feedback"
    ],
    correctIndex: 2,
    explanationText: "Intentional self-reflection builds self-aware leaders who can adapt their style and grow continuously."
  }
]

export const seedResources: Resource[] = [
  { id: "res_1", lessonId: "l_ftm_1_2_3", courseId: "c_ftm_1", title: "1:1 Meeting Agenda Template", fileUrl: "/downloads/1on1-template.pdf", type: "PDF" },
  { id: "res_2", lessonId: "l_ftm_1_2_3", courseId: "c_ftm_1", title: "Goal Setting Worksheet", fileUrl: "/downloads/goal-worksheet.pdf", type: "PDF" },
  { id: "res_3", lessonId: "l_ftm_1_2_3", courseId: "c_ftm_1", title: "Feedback Framework Guide", fileUrl: "/downloads/feedback-framework.pdf", type: "PDF" },
  { id: "res_4", courseId: "c_ftm_1", title: "First-Time Manager Reading List", fileUrl: "https://strengthscape.com/resources/ftm-reading-list", type: "Link" },
  { id: "res_5", courseId: "c_disc_1", title: "DiSC Assessment Guide", fileUrl: "/downloads/disc-guide.pdf", type: "PDF" },
]
