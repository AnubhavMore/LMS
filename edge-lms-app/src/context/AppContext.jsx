import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  initialCompanies,
  initialUsers,
  initialCourses,
  initialEnrollments,
  initialCertificates,
  initialInsightQuestions,
  initialInsights,
  initialActionPlans,
  initialCohorts,
  initialSessions,
  initialFeedback
} from '../seedData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // --- APPLICATION STATE (Mock Database) ---
  const [companies, setCompanies] = useState(initialCompanies);
  const [users, setUsers] = useState(initialUsers);
  const [courses, setCourses] = useState(initialCourses);
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [insights, setInsights] = useState(initialInsights);
  const [actionPlans, setActionPlans] = useState(initialActionPlans);
  const [cohorts, setCohorts] = useState(initialCohorts);
  const [sessions, setSessions] = useState(initialSessions);
  const [feedback, setFeedback] = useState(initialFeedback);

  // --- ACTIVE WORKSPACE & NAVIGATION ---
  const [currentRole, setCurrentRole] = useState("Learner"); // Roles: Learner, Client Admin, Super Admin, Facilitator
  const [activeTab, setActiveTab] = useState("dashboard"); // Tab depends on role
  const [toasts, setToasts] = useState([]);

  // --- ACTIVE TRANSITIONAL STATES (Course Player & Quiz Engine) ---
  const [currentEnrollmentId, setCurrentEnrollmentId] = useState(null);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);
  const [quizAttempted, setQuizAttempted] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [notesText, setNotesText] = useState("");

  // --- GUIDED AI STATES ---
  const [aiStep, setAiStep] = useState(1);
  const [aiCohort, setAiCohort] = useState("coh-1");
  const [aiCourse, setAiCourse] = useState("DSC-300");
  const [aiRole, setAiRole] = useState("First-time Manager");
  const [aiChallenge, setAiChallenge] = useState("New Team Formation");
  const [aiQuestionId, setAiQuestionId] = useState("1");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // --- ADMIN / MODALS ---
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("Learner");

  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignLearnerId, setAssignLearnerId] = useState("");
  const [assignCourseCode, setAssignCourseCode] = useState("");
  const [assignDueDate, setAssignDueDate] = useState("2026-06-30");

  // --- COURSE BUILDER ---
  const [editingCourseCode, setEditingCourseCode] = useState("FTM-101");
  const [newModuleName, setNewModuleName] = useState("");
  const [newLessonName, setNewLessonName] = useState("");
  const [newLessonType, setNewLessonType] = useState("Text");
  const [builderActiveModule, setBuilderActiveModule] = useState("m1");

  // --- REPORT FILTER STATE ---
  const [reportCourseFilter, setReportCourseFilter] = useState("ALL");
  const [reportStatusFilter, setReportStatusFilter] = useState("ALL");

  // --- CONTEXT SENSITIVE USER SIMULATION ---
  const activeUser = useMemo(() => {
    switch (currentRole) {
      case "Learner": return users.find(u => u.email === "learner1@companyA.com");
      case "Client Admin": return users.find(u => u.email === "clientadmin1@companyA.com");
      case "Super Admin": return users.find(u => u.email === "superadmin@test.com");
      case "Facilitator": return users.find(u => u.email === "facilitator@strengthscape.com");
      default: return users[0];
    }
  }, [currentRole, users]);

  const activeCompany = useMemo(() => {
    return companies.find(c => c.company_code === activeUser.company_code) || companies[0];
  }, [activeUser, companies]);

  // --- HELPER FUNCTION: PUSH TOAST ---
  const pushToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // --- STATE MUTATION HANDLERS (Simulating Bubble.io database workflows) ---

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    setCurrentEnrollmentId(null);
    setCurrentLessonId(null);
    setActiveQuiz(null);
    setAiResult(null);
    setAiStep(1);
    if (role === "Learner") setActiveTab("dashboard");
    else if (role === "Client Admin") setActiveTab("dashboard");
    else if (role === "Super Admin") setActiveTab("dashboard");
    else if (role === "Facilitator") setActiveTab("cohorts");
    pushToast(`Switched view context to ${role} workspace`);
  };

  // 1. Learner completes lesson
  const markLessonComplete = (enrollmentId, lessonId) => {
    setEnrollments(prev => {
      return prev.map(enrollment => {
        if (enrollment.id !== enrollmentId) return enrollment;

        const isAlreadyComplete = enrollment.progress.includes(lessonId);
        let updatedProgress = [...enrollment.progress];
        if (!isAlreadyComplete) {
          updatedProgress.push(lessonId);
        }

        // Get actual course for total lessons calculation
        const course = courses.find(c => c.course_code === enrollment.course_code);
        const totalLessonsCount = course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
        const completionPercentage = Math.round((updatedProgress.length / totalLessonsCount) * 100);

        let status = "In Progress";
        let completedAt = enrollment.completed_at;

        if (completionPercentage === 100) {
          status = "Completed";
          completedAt = new Date().toISOString().split('T')[0];
          
          // Trigger Certificate issuance if not already created
          const alreadyHasCert = certificates.some(cert => cert.enrollment_id === enrollmentId);
          if (!alreadyHasCert) {
            const certId = `EDGE-LMS-${enrollment.course_code}-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.random().toString(36).substring(2,8).toUpperCase()}`;
            const newCert = {
              id: `c-${Date.now()}`,
              certificate_id: certId,
              learner_id: enrollment.learner_id,
              course_code: enrollment.course_code,
              enrollment_id: enrollmentId,
              company_code: enrollment.company_code,
              issued_at: new Date().toISOString().split('T')[0],
              valid_until: "No Expiry",
              html_preview: `${course.title} Professional Certificate`
            };
            setCertificates(prevCerts => [...prevCerts, newCert]);
            setTimeout(() => {
              pushToast(`🏆 Congratulations! You earned a professional certificate for ${course.title}!`);
            }, 500);
          }
        }

        return {
          ...enrollment,
          progress: updatedProgress,
          completion_percentage: completionPercentage,
          status,
          completed_at: completedAt
        };
      });
    });

    pushToast("Lesson progress marked complete!");
  };

  // 2. Graded Quiz submission
  const submitQuiz = () => {
    if (!activeQuiz) return;
    const questions = activeQuiz.questions;
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct_option) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    setQuizScore(score);
    setQuizAttempted(true);

    if (score >= activeQuiz.passing_score) {
      // Mark the quiz lesson complete
      markLessonComplete(currentEnrollmentId, currentLessonId);
      pushToast(`Quiz Passed with ${score}%! Excellent work.`);
    } else {
      pushToast(`Quiz Failed with ${score}%. Minimum passing grade is ${activeQuiz.passing_score}%.`);
    }
  };

  // 3. Admin invites learner
  const handleInviteLearner = (e) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;

    const newUser = {
      id: `u-${Date.now()}`,
      email: inviteEmail,
      full_name: inviteName,
      role: inviteRole,
      company_code: activeUser.company_code,
      status: "Invited",
      job_title: "Invited Professional",
      department: "Pending"
    };

    setUsers(prev => [...prev, newUser]);
    setInviteEmail("");
    setInviteName("");
    setInviteModalOpen(false);
    pushToast(`Invitation email successfully dispatched to ${inviteName}!`);
  };

  // 4. Admin assigns course
  const handleAssignCourse = (e) => {
    e.preventDefault();
    if (!assignLearnerId || !assignCourseCode) return;

    const matchedLearner = users.find(u => u.id === assignLearnerId);
    
    // Check if already enrolled
    const exists = enrollments.some(en => en.learner_id === assignLearnerId && en.course_code === assignCourseCode);
    if (exists) {
      pushToast("Learner is already enrolled in this course.");
      setAssignModalOpen(false);
      return;
    }

    const newEnrollment = {
      id: `e-${Date.now()}`,
      learner_id: assignLearnerId,
      course_code: assignCourseCode,
      company_code: matchedLearner.company_code,
      status: "Not Started",
      completion_percentage: 0,
      assigned_by: activeUser.full_name,
      assigned_at: new Date().toISOString().split('T')[0],
      due_date: assignDueDate,
      progress: []
    };

    setEnrollments(prev => [...prev, newEnrollment]);
    setAssignModalOpen(false);
    pushToast("Course assigned and learner notified!");
  };

  // 5. Guided AI insights simulation
  const handleGenerateAI = () => {
    setAiGenerating(true);
    setAiResult(null);

    setTimeout(() => {
      setAiGenerating(false);
      let res = "";
      const q = initialInsightQuestions.find(qi => qi.display_order.toString() === aiQuestionId);
      
      if (q.category === "Rituals") {
        res = `For the Acme Sales Academy team (containing predominantly Influential 'i' DiSC styles), we highly recommend establishing a weekly 15-minute standing ritual called 'Feedback Friday'. At 4:30 PM, hold a rapid peer alignment session where team members highlight who supported them this week. This caters directly to high-trust verbal needs. For the logical Conscientious 'C' styles in your cohort, allow anonymous digital Slack submissions to eliminate public speaking pressure.`;
      } else if (q.category === "Risks") {
        res = `WARNING: Active behavior drift identified. The Acme leadership cohort contains 3 dominant 'D' profiles. They are currently showing standard signs of task overload and micromanagement. The primary risk in the next 30 days is that these managers will slide back into doing the technical tasks themselves rather than coaching. Suggest reinforcing the FTM delegation checklist and tracking manager alignment index in HR monitoring dashboard.`;
      } else {
        res = `L&D Advisory Recommendation: Within the next 30 days, first-time managers should hold structured 1-on-1 career path alignment sessions using our visual guide. Establish a bi-weekly cadence of 30 minutes, structured as 15 minutes of employee-led questions and 15 minutes of career growth coaching. Avoid task list monitoring during this specific session.`;
      }

      setAiResult({
        question: q.standard_question,
        category: q.category,
        response: res
      });
      pushToast("AI Advisory completed! Behavioral rituals generated.");
    }, 1500);
  };

  // 6. Convert AI Insight to Action Plan
  const convertInsightToActionPlan = () => {
    if (!aiResult) return;
    
    const newPlan = {
      id: `ap-${Date.now()}`,
      company_code: activeUser.company_code,
      title: `AI Action Plan: ${aiResult.category} Alignment`,
      description: aiResult.response,
      owner_id: activeUser.id,
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days later
      status: "In Progress"
    };

    setActionPlans(prev => [...prev, newPlan]);
    pushToast("Converted to active team Action Plan!");
    setActiveTab("dashboard");
  };

  // 7. Course Outline Editor: Add Module
  const handleBuilderAddModule = (e) => {
    e.preventDefault();
    if (!newModuleName) return;

    setCourses(prev => {
      return prev.map(course => {
        if (course.course_code !== editingCourseCode) return course;
        
        const newMod = {
          id: `m-${Date.now()}`,
          title: newModuleName,
          order_index: course.modules.length + 1,
          description: "Newly created module",
          lessons: []
        };

        return {
          ...course,
          modules: [...course.modules, newMod]
        };
      });
    });

    setNewModuleName("");
    pushToast("New curriculum module appended!");
  };

  // 8. Course Outline Editor: Add Lesson
  const handleBuilderAddLesson = (e) => {
    e.preventDefault();
    if (!newLessonName) return;

    setCourses(prev => {
      return prev.map(course => {
        if (course.course_code !== editingCourseCode) return course;

        const updatedModules = course.modules.map(mod => {
          if (mod.id !== builderActiveModule) return mod;

          const newLess = {
            id: `l-${Date.now()}`,
            title: newLessonName,
            lesson_type: newLessonType,
            order_index: mod.lessons.length + 1,
            is_required: true,
            completion_rule: newLessonType === "Quiz Placeholder" ? "Quiz Pass" : "Manual",
            content: "<h2>New Lesson Core Contents</h2><p>Provide training context, checklists, or video URLs to wire this lesson into the learner's track.</p>"
          };

          return {
            ...mod,
            lessons: [...mod.lessons, newLess]
          };
        });

        return {
          ...course,
          modules: updatedModules
        };
      });
    });

    setNewLessonName("");
    pushToast("Curriculum lesson wired successfully!");
  };

  // --- REPORT EXPORT LOGIC ---
  const reportData = useMemo(() => {
    return enrollments
      .filter(e => {
        if (currentRole === "Client Admin") {
          return e.company_code === activeUser.company_code;
        }
        return true;
      })
      .filter(e => {
        if (reportCourseFilter !== "ALL" && e.course_code !== reportCourseFilter) return false;
        if (reportStatusFilter !== "ALL" && e.status !== reportStatusFilter) return false;
        return true;
      })
      .map(e => {
        const student = users.find(u => u.id === e.learner_id) || {};
        const course = courses.find(c => c.course_code === e.course_code) || {};
        return {
          learner_name: student.full_name || "Unknown",
          learner_email: student.email || "",
          course_title: course.title || "",
          due_date: e.due_date,
          completion: e.completion_percentage,
          status: e.status
        };
      });
  }, [enrollments, currentRole, activeUser, reportCourseFilter, reportStatusFilter, users, courses]);

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Learner Name,Email,Course,Completion %,Due Date,Status\n";

    reportData.forEach(row => {
      csvContent += `"${row.learner_name}","${row.learner_email}","${row.course_title}",${row.completion},"${row.due_date}","${row.status}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `EDGE-LMS-Report-${activeCompany.company_code}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    pushToast("CSV Report compiled and downloaded!");
  };

  const contextValue = {
    companies, setCompanies,
    users, setUsers,
    courses, setCourses,
    enrollments, setEnrollments,
    certificates, setCertificates,
    insights, setInsights,
    actionPlans, setActionPlans,
    cohorts, setCohorts,
    sessions, setSessions,
    feedback, setFeedback,
    
    currentRole, setCurrentRole,
    activeTab, setActiveTab,
    toasts, setToasts,
    currentEnrollmentId, setCurrentEnrollmentId,
    currentLessonId, setCurrentLessonId,
    activeQuiz, setActiveQuiz,
    selectedAnswers, setSelectedAnswers,
    quizScore, setQuizScore,
    quizAttempted, setQuizAttempted,
    videoPlaying, setVideoPlaying,
    notesText, setNotesText,
    
    aiStep, setAiStep,
    aiCohort, setAiCohort,
    aiCourse, setAiCourse,
    aiRole, setAiRole,
    aiChallenge, setAiChallenge,
    aiQuestionId, setAiQuestionId,
    aiGenerating, setAiGenerating,
    aiResult, setAiResult,
    
    inviteModalOpen, setInviteModalOpen,
    inviteEmail, setInviteEmail,
    inviteName, setInviteName,
    inviteRole, setInviteRole,
    
    assignModalOpen, setAssignModalOpen,
    assignLearnerId, setAssignLearnerId,
    assignCourseCode, setAssignCourseCode,
    assignDueDate, setAssignDueDate,
    
    editingCourseCode, setEditingCourseCode,
    newModuleName, setNewModuleName,
    newLessonName, setNewLessonName,
    newLessonType, setNewLessonType,
    builderActiveModule, setBuilderActiveModule,
    
    reportCourseFilter, setReportCourseFilter,
    reportStatusFilter, setReportStatusFilter,
    
    activeUser,
    activeCompany,
    reportData,
    
    pushToast,
    handleRoleChange,
    markLessonComplete,
    submitQuiz,
    handleInviteLearner,
    handleAssignCourse,
    handleGenerateAI,
    convertInsightToActionPlan,
    handleBuilderAddModule,
    handleBuilderAddLesson,
    handleExportCSV,
    initialInsightQuestions
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
