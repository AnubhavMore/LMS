import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function ClientAdminWorkspace() {
  const {
    activeTab, setActiveTab,
    activeUser, activeCompany,
    enrollments, users, certificates, actionPlans, courses, insights,
    setInviteModalOpen, setAssignLearnerId, setAssignCourseCode, setAssignModalOpen,
    reportCourseFilter, setReportCourseFilter,
    reportStatusFilter, setReportStatusFilter,
    reportData, handleExportCSV, setUsers, pushToast,
    aiStep, setAiStep,
    aiCohort, setAiCohort,
    aiCourse, setAiCourse,
    aiRole, setAiRole,
    aiChallenge, setAiChallenge,
    aiQuestionId, setAiQuestionId,
    handleGenerateAI, convertInsightToActionPlan,
    aiGenerating, aiResult, initialInsightQuestions
  } = useAppContext();

  // Acme metrics scoped to COMA
  const scopedEnrollments = enrollments.filter(e => e.company_code === activeUser.company_code);
  const companyLearners = users.filter(u => u.company_code === activeUser.company_code && u.role === "Learner");
  const activeLearnersCount = companyLearners.filter(l => l.status === "Active").length;
  const avgCompletion = scopedEnrollments.length > 0
    ? Math.round(scopedEnrollments.reduce((sum, e) => sum + e.completion_percentage, 0) / scopedEnrollments.length)
    : 0;
  const overdueCount = scopedEnrollments.filter(e => e.status === "Overdue").length;
  const certsIssuedCount = certificates.filter(c => c.company_code === activeUser.company_code).length;

  // Actions Plans
  const companyPlans = actionPlans.filter(ap => ap.company_code === activeUser.company_code);

  if (activeTab === "dashboard") {
    return (
      <div className="animate-fade-in">
        <div className="view-title-row">
          <h2>L&D Operations Hub</h2>
          <p className="view-subtitle">Dashboard metrics for {activeCompany.company_name} | Scoped Tenant Portal</p>
        </div>

        <div className="grid-cols-4" style={{ marginBottom: '32px' }}>
          <div className="glass-card stat-card">
            <span className="stat-label">Active Learners</span>
            <span className="stat-value">{activeLearnersCount}</span>
          </div>
          <div className="glass-card stat-card" style={{ borderColor: 'var(--color-primary)' }}>
            <span className="stat-label">Average Completion</span>
            <span className="stat-value">{avgCompletion}%</span>
          </div>
          <div className="glass-card stat-card" style={{ borderColor: 'var(--color-error)' }}>
            <span className="stat-label">Overdue Tracks</span>
            <span className="stat-value">{overdueCount}</span>
          </div>
          <div className="glass-card stat-card" style={{ borderColor: 'var(--color-gold)' }}>
            <span className="stat-label">Certificates Issued</span>
            <span className="stat-value">{certsIssuedCount}</span>
          </div>
        </div>

        <div className="grid-cols-3" style={{ marginBottom: '32px' }}>
          <div className="glass-card col-span-1" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4>Quick Operations</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Displace invitations or allocate course assignments.</p>
            <button className="glass-button btn-primary" onClick={() => setInviteModalOpen(true)}>
              Invite New Learner
            </button>
            <button className="glass-button" onClick={() => {
              setAssignLearnerId(companyLearners[0]?.id || "");
              setAssignCourseCode(courses[0]?.course_code || "");
              setAssignModalOpen(true);
            }}>
              Assign Journey Track
            </button>
            <button className="glass-button" onClick={() => setActiveTab("reports")}>
              View Analytical Reports
            </button>
          </div>

          <div className="glass-card col-span-2">
            <h4>Academy Journey Health</h4>
            <div className="chart-container">
              <div className="chart-bar-wrapper">
                <div className="chart-bar" style={{ height: `${avgCompletion}%` }}>
                  <span className="chart-bar-val">{avgCompletion}%</span>
                </div>
                <span className="chart-label">Avg Completion</span>
              </div>
              <div className="chart-bar-wrapper">
                <div className="chart-bar" style={{ height: `${(activeLearnersCount / activeCompany.seat_limit) * 100}%`, background: 'var(--color-gold)' }}>
                  <span className="chart-bar-val">{activeLearnersCount}</span>
                </div>
                <span className="chart-label">Seats Allocated ({activeCompany.seat_limit} Max)</span>
              </div>
              <div className="chart-bar-wrapper">
                <div className="chart-bar" style={{ height: `${overdueCount * 25}%`, background: 'var(--color-error)' }}>
                  <span className="chart-bar-val">{overdueCount}</span>
                </div>
                <span className="chart-label">Overdue Alert</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-cols-2">
          <div className="glass-card">
            <div className="flex-between" style={{ marginBottom: '16px' }}>
              <h4>Operational Action Plans</h4>
              <span className="badge badge-info">{companyPlans.length} Active</span>
            </div>
            {companyPlans.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {companyPlans.map(ap => (
                  <div key={ap.id} style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                    <div className="flex-between">
                      <h5 style={{ fontSize: '0.95rem' }}>{ap.title}</h5>
                      <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{ap.status}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{ap.description}</p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', display: 'flex', gap: '12px' }}>
                      <span>📅 Due: {ap.due_date}</span>
                      <span>Owner: {users.find(u => u.id === ap.owner_id)?.full_name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No action plans created. Go to Guided AI to analyze assessment trends.</p>
            )}
          </div>

          <div className="glass-card">
            <h4>L&D Behavioral Insights</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Accredited leadership insights generated from program reports.
            </p>
            {insights.filter(i => i.company_code === activeUser.company_code).map(ins => (
              <div key={ins.id} style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '12px' }}>
                <div className="flex-between">
                  <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>{ins.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ins.submitted_at}</span>
                </div>
                <h5 style={{ fontSize: '0.9rem', margin: '6px 0' }}>{ins.question_text}</h5>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ins.response_text.substring(0, 160)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "learners") {
    return (
      <div className="animate-fade-in">
        <div className="flex-between" style={{ marginBottom: '24px' }}>
          <div>
            <h2>Learner Roster</h2>
            <p className="view-subtitle">Directory of active learners, seat allocations, and overall course timeline status.</p>
          </div>
          <button className="glass-button btn-primary" onClick={() => setInviteModalOpen(true)}>
            + Add Learner
          </button>
        </div>

        <div className="glass-card">
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Learner Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Active Enrollments</th>
                  <th>Avg Completion</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {companyLearners.map(l => {
                  const studentEnrollments = enrollments.filter(e => e.learner_id === l.id);
                  const avgStudentComp = studentEnrollments.length > 0
                    ? Math.round(studentEnrollments.reduce((sum, e) => sum + e.completion_percentage, 0) / studentEnrollments.length)
                    : 0;
                  return (
                    <tr key={l.id}>
                      <td><strong>{l.full_name}</strong><br/><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{l.job_title}</span></td>
                      <td>{l.email}</td>
                      <td>
                        <span className={`badge ${l.status === 'Active' ? 'badge-success' : 'badge-gold'}`}>
                          {l.status}
                        </span>
                      </td>
                      <td>{studentEnrollments.length} Course(s)</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="progress-track" style={{ width: '60px' }}>
                            <div className="progress-fill" style={{ width: `${avgStudentComp}%` }}></div>
                          </div>
                          <span>{avgStudentComp}%</span>
                        </div>
                      </td>
                      <td>
                        <button className="glass-button" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => {
                          setUsers(prev => prev.map(u => u.id === l.id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
                          pushToast(`Toggled activation status for ${l.full_name}`);
                        }}>
                          Toggle Access
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "reports") {
    return (
      <div className="animate-fade-in">
        <div className="flex-between" style={{ marginBottom: '24px' }}>
          <div>
            <h2>Analytical Reports</h2>
            <p className="view-subtitle">Acme Learning Co program performance data | Real-time audit metrics</p>
          </div>
          <button className="glass-button btn-success" onClick={handleExportCSV}>
            Export Scoped Data (CSV)
          </button>
        </div>

        <div className="glass-card" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Course Category</label>
            <select className="form-control" value={reportCourseFilter} onChange={(e) => setReportCourseFilter(e.target.value)}>
              <option value="ALL">All Journeys</option>
              {courses.map(c => (
                <option key={c.course_code} value={c.course_code}>{c.title}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Track Status</label>
            <select className="form-control" value={reportStatusFilter} onChange={(e) => setReportStatusFilter(e.target.value)}>
              <option value="ALL">All Statuses</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="glass-card">
          <h4 style={{ marginBottom: '16px' }}>Enrolled Track Roster ({reportData.length} Records)</h4>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Learner Name</th>
                  <th>Email</th>
                  <th>Course Track</th>
                  <th>Track Progress</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row.learner_name}</strong></td>
                    <td>{row.learner_email}</td>
                    <td>{row.course_title}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="progress-track" style={{ width: '80px' }}>
                          <div className="progress-fill" style={{ width: `${row.completion}%` }}></div>
                        </div>
                        <span>{row.completion}%</span>
                      </div>
                    </td>
                    <td>{row.due_date}</td>
                    <td>
                      <span className={`badge ${
                        row.status === 'Completed' ? 'badge-success' :
                        row.status === 'Overdue' ? 'badge-error' :
                        row.status === 'In Progress' ? 'badge-info' : 'badge-gold'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {reportData.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '36px' }}>
                      No records match the current reporting scope filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "insights") {
    const standardQuestions = initialInsightQuestions;
    return (
      <div className="animate-fade-in">
        <div className="view-title-row">
          <h2>Guided AI Advisor</h2>
          <p className="view-subtitle">Generate behavioral science rituals and leader messaging templates from assessment metrics.</p>
        </div>

        <div className="grid-cols-3">
          <div className="glass-card col-span-1">
            <h4 style={{ marginBottom: '20px' }}>AI Parameter Selector</h4>
            
            <div className="wizard-progress">
              <div className={`wizard-step ${aiStep === 1 ? 'active' : ''} ${aiStep > 1 ? 'completed' : ''}`}>1</div>
              <div className={`wizard-step ${aiStep === 2 ? 'active' : ''} ${aiStep > 2 ? 'completed' : ''}`}>2</div>
              <div className={`wizard-step ${aiStep === 3 ? 'active' : ''} ${aiStep > 3 ? 'completed' : ''}`}>3</div>
            </div>

            {aiStep === 1 && (
              <div>
                <div className="form-group">
                  <label className="form-label">1. Target Cohort</label>
                  <select className="form-control" value={aiCohort} onChange={(e) => setAiCohort(e.target.value)}>
                    <option value="coh-1">Acme Sales Academy 2026</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">2. Target Course</label>
                  <select className="form-control" value={aiCourse} onChange={(e) => setAiCourse(e.target.value)}>
                    {courses.map(c => (
                      <option key={c.course_code} value={c.course_code}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <button className="glass-button btn-primary w-full" style={{ marginTop: '12px' }} onClick={() => setAiStep(2)}>
                  Next Step: Behavioral Context
                </button>
              </div>
            )}

            {aiStep === 2 && (
              <div>
                <div className="form-group">
                  <label className="form-label">1. Role Context</label>
                  <select className="form-control" value={aiRole} onChange={(e) => setAiRole(e.target.value)}>
                    <option value="First-time Manager">First-time Manager</option>
                    <option value="Team Leader">Team Leader</option>
                    <option value="Senior Leader">Senior Leader</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">2. Operational Challenge</label>
                  <select className="form-control" value={aiChallenge} onChange={(e) => setAiChallenge(e.target.value)}>
                    <option value="New Team Formation">New Team Formation</option>
                    <option value="Performance Gap">Performance Gap</option>
                    <option value="Culture Change">Culture Change</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="glass-button w-full" onClick={() => setAiStep(1)}>
                    Back
                  </button>
                  <button className="glass-button btn-primary w-full" onClick={() => setAiStep(3)}>
                    Next: AI Query
                  </button>
                </div>
              </div>
            )}

            {aiStep === 3 && (
              <div>
                <div className="form-group">
                  <label className="form-label">Select L&D Advisory Question</label>
                  <select className="form-control" value={aiQuestionId} onChange={(e) => setAiQuestionId(e.target.value)}>
                    {standardQuestions.map(q => (
                      <option key={q.display_order} value={q.display_order}>{q.standard_question}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="glass-button w-full" onClick={() => setAiStep(2)}>
                    Back
                  </button>
                  <button className="glass-button btn-primary w-full" onClick={handleGenerateAI}>
                    Generate AI Ritual
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="glass-card col-span-2">
            <h4 style={{ marginBottom: '20px' }}>Advisory Output Preview</h4>
            {aiGenerating ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '240px' }}>
                <div style={{ border: '3px solid rgba(255,255,255,0.05)', borderTop: '3px solid var(--color-primary)', borderRadius: '50%', width: '48px', height: '48px', animation: 'spin 1s linear infinite' }} className="loader"></div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '16px' }}>
                  Generating behavioral rituals from target cohort DiSC styles...
                </p>
              </div>
            ) : aiResult ? (
              <div className="ai-ritual-box animate-fade-in">
                <div className="flex-between" style={{ borderBottom: '1px solid rgba(14, 165, 233, 0.2)', paddingBottom: '12px', marginBottom: '16px' }}>
                  <div>
                    <span className="badge badge-info" style={{ marginBottom: '4px' }}>{aiResult.category}</span>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{aiResult.question}</h4>
                  </div>
                  <span className="badge badge-gold">AI Recommended</span>
                </div>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#E2E8F0', whiteSpace: 'pre-line' }}>
                  {aiResult.response}
                </p>
                <div style={{ borderTop: '1px solid rgba(14, 165, 233, 0.1)', paddingTop: '20px', marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button className="glass-button" onClick={() => useAppContext().setAiResult(null)}>
                    Discard
                  </button>
                  <button className="glass-button btn-primary" onClick={convertInsightToActionPlan}>
                    Convert to Action Plan Tasks
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '240px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-dark)', marginBottom: '12px' }}>
                  <path d="M12 2a10 10 0 0 1 7.54 14.15l-1.42-1.42A8 8 0 1 0 6.64 8.78L5.22 7.36A10 10 0 0 1 12 2z" />
                  <path d="M12 8a4 4 0 1 1-4 4 4 4 0 0 1 4-4z" />
                </svg>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Select parameters and prompt the L&D Advisor to view tailored behavioral alignment rituals.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
