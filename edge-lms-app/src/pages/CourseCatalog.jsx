import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function CourseCatalog() {
  const { 
    courses, 
    enrollments, 
    activeUser, 
    setEnrollments, 
    pushToast, 
    setCurrentEnrollmentId, 
    setCurrentLessonId 
  } = useAppContext();

  const learnerEnrollments = enrollments.filter(e => e.learner_id === activeUser.id);

  return (
    <div className="animate-fade-in">
      <div className="view-title-row">
        <h2>Course Catalog</h2>
        <p className="view-subtitle">Accredited behavioral science and leadership pathways available for your company.</p>
      </div>
      <div className="course-grid">
        {courses.filter(c => c.status === 'Published').map(course => {
          const userEnrollment = learnerEnrollments.find(e => e.course_code === course.course_code);
          return (
            <div key={course.course_code} className="glass-card course-card">
              <div className="course-thumb-container" style={{ backgroundImage: `url(${course.thumbnail})` }}></div>
              <div className="course-details">
                <div className="course-info-head">
                  <span className="course-category">{course.category}</span>
                  <h4 className="course-title">{course.title}</h4>
                  <p className="course-desc">{course.short_description}</p>
                </div>
                <div className="course-footer">
                  <span className="course-meta">⏳ {course.estimated_duration_mins} Mins</span>
                  {userEnrollment ? (
                    <button
                      className="glass-button btn-primary"
                      onClick={() => {
                        setCurrentEnrollmentId(userEnrollment.id);
                        const firstLesson = course.modules[0].lessons[0].id;
                        setCurrentLessonId(firstLesson);
                      }}
                    >
                      Open Course
                    </button>
                  ) : (
                    <button
                      className="glass-button"
                      onClick={() => {
                        // Quick enroll
                        const newEn = {
                          id: `e-${Date.now()}`,
                          learner_id: activeUser.id,
                          course_code: course.course_code,
                          company_code: activeUser.company_code,
                          status: "In Progress",
                          completion_percentage: 0,
                          assigned_by: "Self Enrollment",
                          assigned_at: new Date().toISOString().split('T')[0],
                          due_date: "2026-07-30",
                          progress: []
                        };
                        setEnrollments(prev => [...prev, newEn]);
                        pushToast(`Successfully enrolled in ${course.title}!`);
                      }}
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
