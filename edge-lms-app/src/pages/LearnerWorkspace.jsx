import React from 'react';
import { useAppContext } from '../context/AppContext';
import CoursePlayer from './CoursePlayer';
import CourseCatalog from './CourseCatalog';
import Certificates from './Certificates';

export default function LearnerWorkspace() {
  const { 
    activeTab, 
    setActiveTab, 
    currentEnrollmentId, 
    setCurrentEnrollmentId,
    setCurrentLessonId,
    enrollments, 
    courses, 
    activeUser 
  } = useAppContext();

  const learnerEnrollments = enrollments.filter(e => e.learner_id === activeUser.id);

  if (currentEnrollmentId) {
    return <CoursePlayer />;
  }

  if (activeTab === "dashboard") {
    const activeEnrollments = learnerEnrollments.filter(e => e.status !== "Completed");
    const completedEnrollments = learnerEnrollments.filter(e => e.status === "Completed");

    return (
      <div className="animate-fade-in">
        {/* Welcome banner */}
        <div className="hero-card">
          <div className="hero-text">
            <h2>Welcome back, {activeUser.full_name}! 👋</h2>
            <p>Your leadership academy track is fully active. Complete lessons to earn accredited certifications.</p>
          </div>
          <div>
            <span className="badge badge-info" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              Active Plan: Acme Standard
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>My Active Journeys</h3>
          {activeEnrollments.length > 0 ? (
            <div className="course-grid">
              {activeEnrollments.map(e => {
                const course = courses.find(c => c.course_code === e.course_code);
                return (
                  <div key={e.id} className="glass-card course-card">
                    <div className="course-thumb-container" style={{ backgroundImage: `url(${course.thumbnail})` }}>
                      <div className="course-badge-overlay">
                        <span className={`badge ${e.status === 'Overdue' ? 'badge-error' : 'badge-info'}`}>
                          {e.status}
                        </span>
                      </div>
                    </div>
                    <div className="course-details">
                      <div className="course-info-head">
                        <span className="course-category">{course.category}</span>
                        <h4 className="course-title">{course.title}</h4>
                        <p className="course-desc">{course.short_description}</p>
                      </div>
                      <div>
                        <div className="progress-container" style={{ marginBottom: '16px' }}>
                          <div className="progress-label-row">
                            <span>Track Progress</span>
                            <span>{e.completion_percentage}%</span>
                          </div>
                          <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${e.completion_percentage}%` }}></div>
                          </div>
                        </div>
                        <div className="course-footer">
                          <span className="course-meta">⏰ Due: {e.due_date}</span>
                          <button
                            className="glass-button btn-primary"
                            onClick={() => {
                              setCurrentEnrollmentId(e.id);
                              const firstLesson = course.modules[0].lessons[0].id;
                              setCurrentLessonId(firstLesson);
                            }}
                          >
                            Continue Journey
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="pdf-mock-container">
              <h4>All clear! No active courses pending.</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>
                Explore the Course Catalog to enroll in dynamic leadership modules.
              </p>
            </div>
          )}
        </div>

        <div>
          <h3 style={{ marginBottom: '16px' }}>Completed Academy Tracks</h3>
          {completedEnrollments.length > 0 ? (
            <div className="course-grid">
              {completedEnrollments.map(e => {
                const course = courses.find(c => c.course_code === e.course_code);
                return (
                  <div key={e.id} className="glass-card course-card" style={{ borderColor: 'var(--color-success)' }}>
                    <div className="course-thumb-container" style={{ backgroundImage: `url(${course.thumbnail})` }}>
                      <div className="course-badge-overlay">
                        <span className="badge badge-success">COMPLETED</span>
                      </div>
                    </div>
                    <div className="course-details">
                      <div className="course-info-head">
                        <span className="course-category">{course.category}</span>
                        <h4 className="course-title">{course.title}</h4>
                        <p className="course-desc">{course.short_description}</p>
                      </div>
                      <div>
                        <div className="course-footer">
                          <span className="course-meta">🏆 Accredited Certificate Ready</span>
                          <button
                            className="glass-button"
                            onClick={() => setActiveTab("certificates")}
                          >
                            View Certificate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No courses completed yet.</p>
          )}
        </div>
      </div>
    );
  }

  if (activeTab === "catalog") {
    return <CourseCatalog />;
  }

  if (activeTab === "certificates") {
    return <Certificates />;
  }

  return null;
}
