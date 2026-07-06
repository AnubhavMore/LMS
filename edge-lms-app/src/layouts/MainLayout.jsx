import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function MainLayout({ children }) {
  const {
    currentRole, handleRoleChange,
    activeTab, setActiveTab,
    toasts,
    activeUser, activeCompany,
    inviteModalOpen, setInviteModalOpen,
    inviteEmail, setInviteEmail,
    inviteName, setInviteName,
    inviteRole, setInviteRole,
    handleInviteLearner,
    assignModalOpen, setAssignModalOpen,
    assignLearnerId, setAssignLearnerId,
    assignCourseCode, setAssignCourseCode,
    assignDueDate, setAssignDueDate,
    handleAssignCourse,
    users, courses,
    activeQuiz, setActiveQuiz,
    quizAttempted, setQuizAttempted,
    quizScore,
    selectedAnswers, setSelectedAnswers,
    submitQuiz, setCurrentEnrollmentId
  } = useAppContext();

  const companyLearners = users.filter(u => u.company_code === activeUser.company_code && u.role === "Learner");

  return (
    <div className="app-container">
      {/* Toast popup manager */}
      <div className="toast-overlay">
        {toasts.map(toast => (
          <div key={toast.id} className="toast-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--color-primary)' }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Dynamic Workspace Sidebar */}
      <aside className="app-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <span className="brand-text">EDGE LMS 2030</span>
        </div>
        
        <ul className="sidebar-menu">
          {currentRole === "Learner" && (
            <>
              <li className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveTab('dashboard'); setCurrentEnrollmentId(null); }}>
                Dashboard
              </li>
              <li className={`menu-item ${activeTab === 'catalog' ? 'active' : ''}`} onClick={() => { setActiveTab('catalog'); setCurrentEnrollmentId(null); }}>
                Course Catalog
              </li>
              <li className={`menu-item ${activeTab === 'certificates' ? 'active' : ''}`} onClick={() => { setActiveTab('certificates'); setCurrentEnrollmentId(null); }}>
                Certificates
              </li>
            </>
          )}

          {currentRole === "Client Admin" && (
            <>
              <li className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                L&D Dashboard
              </li>
              <li className={`menu-item ${activeTab === 'learners' ? 'active' : ''}`} onClick={() => setActiveTab('learners')}>
                Manage Learners
              </li>
              <li className={`menu-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
                Analytical Reports
              </li>
              <li className={`menu-item ${activeTab === 'insights' ? 'active' : ''}`} onClick={() => setActiveTab('insights')}>
                Guided AI Advisor
              </li>
            </>
          )}

          {currentRole === "Super Admin" && (
            <>
              <li className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                Overview Hub
              </li>
              <li className={`menu-item ${activeTab === 'builder' ? 'active' : ''}`} onClick={() => setActiveTab('builder')}>
                Curriculum Builder
              </li>
            </>
          )}

          {currentRole === "Facilitator" && (
            <>
              <li className={`menu-item ${activeTab === 'cohorts' ? 'active' : ''}`} onClick={() => setActiveTab('cohorts')}>
                Cohorts & Sessions
              </li>
            </>
          )}
        </ul>

        <div className="sidebar-footer">
          <div className="user-profile-widget">
            <div className="widget-avatar">
              {activeUser.full_name[0]}
            </div>
            <div className="widget-info">
              <h5 className="widget-name">{activeUser.full_name}</h5>
              <span className="widget-role">{activeUser.job_title}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="app-content">
        {/* Sticky Header with Switcher */}
        <header className="app-header">
          <div className="header-tenant">
            <div className="tenant-logo-stub">{activeCompany.company_code}</div>
            <span className="tenant-name">{activeCompany.company_name}</span>
          </div>

          <div className="header-actions">
            <div className="role-switcher-container">
              <span className="role-switcher-label">Switch Workspace View:</span>
              <select className="role-select" value={currentRole} onChange={(e) => handleRoleChange(e.target.value)}>
                <option value="Learner">Learner Persona</option>
                <option value="Client Admin">Client Admin (Sarah Acme)</option>
                <option value="Super Admin">Super Admin (Strengthscape)</option>
                <option value="Facilitator">Facilitator One</option>
              </select>
            </div>
          </div>
        </header>

        {/* Dynamic content rendering area */}
        <section className="workspace-view">
          {children}
        </section>
      </main>

      {/* MODALS WINDOWS */}
      {inviteModalOpen && (
        <div className="modal-overlay">
          <div className="quiz-modal" style={{ width: '480px' }}>
            <div className="quiz-modal-header">
              <h3>Invite New Learner</h3>
              <button className="glass-button" style={{ border: 'none', padding: '0 4px', fontSize: '1.25rem' }} onClick={() => setInviteModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleInviteLearner}>
              <div className="quiz-modal-body">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-control" type="text" placeholder="e.g. Jonathan Doe" value={inviteName} onChange={(e) => setInviteName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Work Email</label>
                  <input className="form-control" type="email" placeholder="e.g. jdoe@company.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Assigned Role</label>
                  <select className="form-control" value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}>
                    <option value="Learner">Learner</option>
                    <option value="Client Admin">Client Admin</option>
                  </select>
                </div>
              </div>
              <div className="quiz-modal-footer">
                <button type="button" className="glass-button" onClick={() => setInviteModalOpen(false)}>Cancel</button>
                <button type="submit" className="glass-button btn-primary">Dispatch Invitation</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {assignModalOpen && (
        <div className="modal-overlay">
          <div className="quiz-modal" style={{ width: '480px' }}>
            <div className="quiz-modal-header">
              <h3>Allocate Academy Track</h3>
              <button className="glass-button" style={{ border: 'none', padding: '0 4px', fontSize: '1.25rem' }} onClick={() => setAssignModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleAssignCourse}>
              <div className="quiz-modal-body">
                <div className="form-group">
                  <label className="form-label">Select Employee</label>
                  <select className="form-control" value={assignLearnerId} onChange={(e) => setAssignLearnerId(e.target.value)} required>
                    <option value="" disabled>Select Learner Profile</option>
                    {companyLearners.map(l => (
                      <option key={l.id} value={l.id}>{l.full_name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Select Academy Course</label>
                  <select className="form-control" value={assignCourseCode} onChange={(e) => setAssignCourseCode(e.target.value)} required>
                    <option value="" disabled>Select Course Outline</option>
                    {courses.map(c => (
                      <option key={c.course_code} value={c.course_code}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Target Completion Due Date</label>
                  <input className="form-control" type="date" value={assignDueDate} onChange={(e) => setAssignDueDate(e.target.value)} required />
                </div>
              </div>
              <div className="quiz-modal-footer">
                <button type="button" className="glass-button" onClick={() => setAssignModalOpen(false)}>Cancel</button>
                <button type="submit" className="glass-button btn-primary">Allocate Course Track</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeQuiz && (
        <div className="modal-overlay">
          <div className="quiz-modal">
            <div className="quiz-modal-header">
              <div>
                <span className="course-category" style={{ fontSize: '0.7rem' }}>Assessment Layer</span>
                <h3 style={{ fontSize: '1.15rem' }}>{activeQuiz.title}</h3>
              </div>
              {!quizAttempted && (
                <button className="glass-button" style={{ border: 'none', padding: '0 4px', fontSize: '1.25rem' }} onClick={() => setActiveQuiz(null)}>×</button>
              )}
            </div>
            <div className="quiz-modal-body">
              {quizAttempted ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: quizScore >= activeQuiz.passing_score ? 'var(--color-success-glow)' : 'var(--color-error-glow)', border: `2.5px solid ${quizScore >= activeQuiz.passing_score ? 'var(--color-success)' : 'var(--color-error)'}`, display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 24px auto', fontSize: '1.8rem', fontWeight: '700', color: quizScore >= activeQuiz.passing_score ? 'var(--color-success)' : 'var(--color-error)', justifyContent: 'center' }}>
                    {quizScore}%
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                    {quizScore >= activeQuiz.passing_score ? 'Assessment Passed! 🎉' : 'Assessment Failed ⚠️'}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 24px auto', lineHeight: '1.5' }}>
                    {quizScore >= activeQuiz.passing_score 
                      ? `Stellar performance! You scored ${quizScore}%, which meets the required passing grade of ${activeQuiz.passing_score}%. This lesson has been logged as completed.` 
                      : `You scored ${quizScore}%, which does not meet the passing grade of ${activeQuiz.passing_score}%. Review the text chapters and playbook templates and try again.`
                    }
                  </p>
                  {quizScore >= activeQuiz.passing_score ? (
                    <button className="glass-button btn-success" onClick={() => { setActiveQuiz(null); setQuizAttempted(false); }}>
                      Confirm & Resume Course
                    </button>
                  ) : (
                    <button className="glass-button" onClick={() => { setQuizAttempted(false); setSelectedAnswers({}); }}>
                      Try Again
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  {activeQuiz.questions.map((q, idx) => (
                    <div key={q.id} className="quiz-question-card">
                      <h4 className="quiz-question-text">
                        <span style={{ color: 'var(--color-primary)', marginRight: '6px' }}>Q{idx + 1}.</span> 
                        {q.question}
                      </h4>
                      <div className="quiz-options-list">
                        <div className={`quiz-option-card ${selectedAnswers[q.id] === 'A' ? 'selected' : ''}`} onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: 'A' }))}>
                          <span className="quiz-option-letter">A</span>
                          <span>{q.option_a}</span>
                        </div>
                        <div className={`quiz-option-card ${selectedAnswers[q.id] === 'B' ? 'selected' : ''}`} onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: 'B' }))}>
                          <span className="quiz-option-letter">B</span>
                          <span>{q.option_b}</span>
                        </div>
                        <div className={`quiz-option-card ${selectedAnswers[q.id] === 'C' ? 'selected' : ''}`} onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: 'C' }))}>
                          <span className="quiz-option-letter">C</span>
                          <span>{q.option_c}</span>
                        </div>
                        <div className={`quiz-option-card ${selectedAnswers[q.id] === 'D' ? 'selected' : ''}`} onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: 'D' }))}>
                          <span className="quiz-option-letter">D</span>
                          <span>{q.option_d}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {!quizAttempted && (
              <div className="quiz-modal-footer">
                <button className="glass-button" onClick={() => setActiveQuiz(null)}>Cancel</button>
                <button 
                  className="glass-button btn-primary" 
                  disabled={Object.keys(selectedAnswers).length < activeQuiz.questions.length} 
                  onClick={submitQuiz}
                >
                  Submit Graded Assessment
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
