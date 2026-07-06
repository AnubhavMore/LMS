export const initialCompanies = [
  { company_name: "Strengthscape Internal", company_code: "STRNG", status: "Active", seat_limit: 500, is_demo: false, industry: "L&D Consulting", account_type: "Enterprise", active_status: true, plan: "Internal Academy" },
  { company_name: "Acme Learning Co", company_code: "COMA", status: "Active", seat_limit: 50, is_demo: false, industry: "Technology", account_type: "Standard", active_status: true, plan: "Client Portal Standard" },
  { company_name: "Beta Corp L&D", company_code: "COMB", status: "Active", seat_limit: 25, is_demo: true, industry: "Finance", account_type: "Premium", active_status: true, plan: "Client Portal Advanced" }
];

export const initialUsers = [
  { id: "u-1", email: "superadmin@test.com", full_name: "Super Admin", role: "Super Admin", company_code: "STRNG", status: "Active", job_title: "Platform Director", department: "Ops" },
  { id: "u-2", email: "clientadmin1@companyA.com", full_name: "Sarah Jenkins", role: "Client Admin", company_code: "COMA", status: "Active", job_title: "L&D Manager", department: "Human Resources" },
  { id: "u-3", email: "clientadmin2@companyB.com", full_name: "David Miller", role: "Client Admin", company_code: "COMB", status: "Active", job_title: "HR Director", department: "People & Culture" },
  { id: "u-4", email: "facilitator@strengthscape.com", full_name: "Facilitator One", role: "Facilitator", company_code: "STRNG", status: "Active", job_title: "Senior Consultant", department: "Delivery" },
  { id: "u-5", email: "learner1@companyA.com", full_name: "Learner One A", role: "Learner", company_code: "COMA", status: "Active", job_title: "Software Engineer", department: "Engineering" },
  { id: "u-6", email: "learner2@companyB.com", full_name: "Learner Two B", role: "Learner", company_code: "COMB", status: "Active", job_title: "Financial Analyst", department: "Corporate Finance" },
  { id: "u-7", email: "learner3@companyA.com", full_name: "Alex Rivera", role: "Learner", company_code: "COMA", status: "Active", job_title: "Product Manager", department: "Product" }
];

export const initialCourses = [
  {
    course_code: "FTM-101",
    title: "First Time Manager Essentials",
    status: "Published",
    category: "Leadership",
    estimated_duration_mins: 120,
    certificate_enabled: true,
    is_internal: false,
    short_description: "Learn critical skills to transition from individual contributor to team leader.",
    description: "This course is specifically designed for newly promoted managers. You will master standard team leadership skills including giving feedback, delegation, and managing remote team members. Learn to lead workshops, resolve performance issues, and align goals.",
    thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    modules: [
      {
        id: "m1",
        title: "Module 1: The Shift in Mindset",
        order_index: 1,
        description: "Moving from individual contributor to leading others.",
        lessons: [
          {
            id: "l1-1",
            title: "1.1 The Manager Shift Identity Matrix",
            lesson_type: "Text",
            order_index: 1,
            is_required: true,
            completion_rule: "Manual",
            content: "<h2>Understanding Your New Role</h2><p>As a first-time manager, your success is no longer measured by your personal output. Instead, it is defined by the <strong>collective output and growth</strong> of your team.</p><p>This requires a fundamental shift in identity from an 'Expert Doer' to a 'Facilitator of Success'. You must learn to allocate time for team alignment, coaching, and strategic planning, rather than focusing entirely on technical deliverables.</p><h3>Key Transitions:</h3><ul><li><strong>Individual Contributor:</strong> Focuses on personal excellence, technical skills, and speed of execution.</li><li><strong>Manager:</strong> Focuses on team capacity, coaching, motivation, and strategic alignment.</li></ul>"
          },
          {
            id: "l1-2",
            title: "1.2 Video Masterclass: Leadership Transitions",
            lesson_type: "Video",
            order_index: 2,
            is_required: true,
            completion_rule: "Manual",
            video_url: "769798715", // Mock Vimeo ID
            content: "<p>Watch this video guide summarizing the top 3 mistakes made by first-time managers and how to avoid them during your first 90 days.</p>"
          }
        ]
      },
      {
        id: "m2",
        title: "Module 2: Practical Team Execution",
        order_index: 2,
        description: "Mastering standard leadership rituals and communication flows.",
        lessons: [
          {
            id: "l2-1",
            title: "2.1 Manager Playbook PDF",
            lesson_type: "PDF",
            order_index: 1,
            is_required: true,
            completion_rule: "Manual",
            resource_file: "manager_playbook_2030.pdf",
            content: "<p>Download this executive playbook containing 12 high-performance templates for holding 1-on-1 meetings, setting OKRs, and handling team feedback cycles.</p>"
          },
          {
            id: "l2-2",
            title: "2.2 Graded Assessment: Leadership Essentials",
            lesson_type: "Quiz Placeholder",
            order_index: 2,
            is_required: true,
            completion_rule: "Quiz Pass",
            quiz: {
              id: "q1",
              title: "Leadership Essentials Quiz",
              passing_score: 70,
              questions: [
                {
                  id: "q-1",
                  question: "As a first-time manager, what is your primary metric of success?",
                  option_a: "Your individual speed of completing assignments",
                  option_b: "The collective output, growth, and alignment of your team",
                  option_c: "Being the smartest technical expert in every conversation",
                  option_d: "Agreeing with all demands made by direct reports",
                  correct_option: "B",
                  explanation: "A manager's success is defined by their team's performance, alignment, and enablement, not individual technical output."
                },
                {
                  id: "q-2",
                  question: "What is the recommended frequency for holding high-fidelity 1-on-1 alignment sessions?",
                  option_a: "Once a year during performance appraisal",
                  option_b: "Every day for 30 minutes",
                  option_c: "Weekly or bi-weekly for 30-45 minutes",
                  option_d: "Only when a major problem or conflict occurs",
                  correct_option: "C",
                  explanation: "Weekly or bi-weekly 1-on-1s ensure consistent alignment, early course correction, and career progression trust without micromanaging."
                },
                {
                  id: "q-3",
                  question: "When a team member makes a technical execution mistake, what is the best first step?",
                  option_a: "Take over their work immediately and do it yourself",
                  option_b: "Reprimand them publicly to set an example",
                  option_c: "Ignore it and hope it self-corrects next time",
                  option_d: "Hold a private coaching feedback session to explore the root cause",
                  correct_option: "D",
                  explanation: "A private coaching session allows both sides to identify gaps (skill, resources, or understanding) and build a collaborative path forward."
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    course_code: "DSC-300",
    title: "Everything DiSC Workplace Journey",
    status: "Published",
    category: "Culture",
    estimated_duration_mins: 180,
    certificate_enabled: true,
    is_internal: false,
    short_description: "Build a highly collaborative, empathetic workplace culture by understanding behavioral differences.",
    description: "The DiSC program helps participants build professional relationship skills by analyzing dominant behavioral styles: Dominance (D), Influence (i), Steadiness (S), and Conscientiousness (C). Learn to communicate across styles, reduce friction, and boost productivity.",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400",
    modules: [
      {
        id: "m3",
        title: "Module 1: The DiSC Model",
        order_index: 1,
        description: "Introduction to the four quadrants.",
        lessons: [
          {
            id: "l3-1",
            title: "1.1 Navigating Behavioral Styles",
            lesson_type: "Text",
            order_index: 1,
            is_required: true,
            completion_rule: "Manual",
            content: "<h2>Understanding behavioral style differences</h2><p>DiSC is a personal assessment tool used to improve work productivity, teamwork, and communication. It profiles four primary styles:</p><ul><li><strong>D (Dominance):</strong> Active, direct, results-oriented, strong-willed.</li><li><strong>I (Influence):</strong> Outgoing, enthusiastic, optimistic, lively.</li><li><strong>S (Steadiness):</strong> Thoughtful, steady, cooperative, supportive.</li><li><strong>C (Conscientiousness):</strong> Analytic, precise, systematic, private.</li></ul>"
          }
        ]
      }
    ]
  }
];

export const initialEnrollments = [
  {
    id: "e-1",
    learner_id: "u-5", // Learner One A (Company: COMA)
    course_code: "FTM-101",
    company_code: "COMA",
    status: "In Progress",
    completion_percentage: 50,
    assigned_by: "Sarah Jenkins",
    assigned_at: "2026-05-10",
    due_date: "2026-06-15",
    progress: ["l1-1"] // l1-1 is complete, l1-2 is not, l2-1 is not, l2-2 is not
  },
  {
    id: "e-2",
    learner_id: "u-6", // Learner Two B (Company: COMB)
    course_code: "FTM-101",
    company_code: "COMB",
    status: "Not Started",
    completion_percentage: 0,
    assigned_by: "David Miller",
    assigned_at: "2026-05-20",
    due_date: "2026-06-30",
    progress: []
  },
  {
    id: "e-3",
    learner_id: "u-5", // Learner One A (Company: COMA)
    course_code: "DSC-300",
    company_code: "COMA",
    status: "Completed",
    completion_percentage: 100,
    assigned_by: "Sarah Jenkins",
    assigned_at: "2026-04-01",
    due_date: "2026-05-01",
    completed_at: "2026-04-28",
    progress: ["l3-1"]
  },
  {
    id: "e-4",
    learner_id: "u-7", // Alex Rivera (Company: COMA)
    course_code: "FTM-101",
    company_code: "COMA",
    status: "Overdue",
    completion_percentage: 25,
    assigned_by: "Sarah Jenkins",
    assigned_at: "2026-04-10",
    due_date: "2026-05-15",
    progress: ["l1-1"]
  }
];

export const initialCertificates = [
  {
    id: "c-1001",
    certificate_id: "EDGE-LMS-DSC-300-20260428-ABC789",
    learner_id: "u-5",
    course_code: "DSC-300",
    enrollment_id: "e-3",
    company_code: "COMA",
    issued_at: "2026-04-28",
    valid_until: "No Expiry",
    html_preview: "Everything DiSC Workplace Journey Certificate"
  }
];

export const initialInsightQuestions = [
  { display_order: 1, standard_question: "What should this team do in the next 30 days?", category: "Next 30 Days", active: true, default_prompt: "Suggest concrete actions." },
  { display_order: 2, standard_question: "What rituals should this team create?", category: "Rituals", active: true, default_prompt: "Suggest repeatable team rituals." },
  { display_order: 3, standard_question: "What risks should we watch for?", category: "Risks", active: true, default_prompt: "Identify behavior risks and mitigations." },
  { display_order: 4, standard_question: "How should a first-time manager apply this?", category: "Manager Application", active: true, default_prompt: "Translate learning into manager behaviors." },
  { display_order: 5, standard_question: "What should leaders communicate next?", category: "Leader Communication", active: true, default_prompt: "Draft leader messaging." }
];

export const initialInsights = [
  {
    id: "ins-1",
    company_code: "COMA",
    course_code: "DSC-300",
    question_text: "What rituals should this team create?",
    category: "Rituals",
    role_context: "First-time Manager",
    challenge_context: "New Team Formation",
    response_text: "The Acme Sales Leadership team should establish 'Feedback Friday' rituals. Based on their dominant 'i' (Influence) styles, they thrive in highly verbal and expressive settings. We recommend a 15-minute standing ritual at 4:30 PM where team members call out peer support. For the 'C' styles in the team, allow written submissions in a digital Slack channel.",
    submitted_by: "Sarah Jenkins",
    submitted_at: "2026-05-18",
    ai_generated: true,
    status: "Submitted"
  },
  {
    id: "ins-2",
    company_code: "COMA",
    course_code: "FTM-101",
    question_text: "What risks should we watch for?",
    category: "Risks",
    role_context: "Team Leader",
    challenge_context: "Performance Gap",
    response_text: "High risk of micromanagement from newly promoted managers with dominant 'D' styles. They tend to revert to doing the technical work themselves rather than coaching. We suggest reinforcing delegation checklists and measuring manager contribution vs manager alignment.",
    submitted_by: "Facilitator One",
    submitted_at: "2026-05-22",
    ai_generated: true,
    status: "Converted to Action Plan"
  }
];

export const initialActionPlans = [
  {
    id: "ap-1",
    company_code: "COMA",
    title: "Implement Manager Delegation Checklists",
    description: "Provide newly promoted managers with dominant 'D' styles with weekly delegation checklists and hold 1-on-1 reviews focusing on manager alignment vs contribution.",
    owner_id: "u-2", // Sarah Jenkins
    due_date: "2026-06-30",
    status: "In Progress",
    source_insight_id: "ins-2"
  }
];

export const initialCohorts = [
  { id: "coh-1", name: "Acme Sales Academy 2026", company_code: "COMA", course_code: "FTM-101", facilitator_id: "u-4", start_date: "2026-05-01", end_date: "2026-07-01", status: "Active", cohort_type: "Client Cohort" },
  { id: "coh-2", name: "Beta Corp Executive FastTrack", company_code: "COMB", course_code: "FTM-101", facilitator_id: "u-4", start_date: "2026-05-15", end_date: "2026-07-15", status: "Active", cohort_type: "Certification Cohort" }
];

export const initialSessions = [
  { id: "ses-1", title: "Acme FTM - Kickoff & Mindset Shift", company_code: "COMA", cohort_id: "coh-1", course_code: "FTM-101", facilitator_id: "u-4", start_datetime: "2026-05-28T14:30:00", end_datetime: "2026-05-28T16:00:00", location_or_link: "https://zoom.us/j/987654321", status: "Planned", session_notes: "Focus on the managers identity shift model." },
  { id: "ses-2", title: "Beta Corp - DiSC Interpretation", company_code: "COMB", cohort_id: "coh-2", course_code: "FTM-101", facilitator_id: "u-4", start_datetime: "2026-05-30T10:00:00", end_datetime: "2026-05-30T11:30:00", location_or_link: "https://zoom.us/j/123456789", status: "Planned", session_notes: "Understanding dominance vs conscientiousness in team performance." }
];

export const initialFeedback = [
  { id: "fb-1", feedback_form_title: "FTM Kickoff Feedback", company_code: "COMA", cohort_id: "coh-1", session_id: "ses-1", facilitator_id: "u-4", learner_id: "u-5", rating: 5, nps: 10, comments: "Absolutely stellar session. The identity matrix really helped me understand why my habits need to shift.", submitted_at: "2026-05-29T16:15:00" }
];
