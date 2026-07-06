import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function FacilitatorWorkspace() {
  const {
    activeTab,
    activeUser,
    cohorts,
    companies,
    courses,
    users,
    sessions,
    pushToast
  } = useAppContext();

  if (activeTab === "cohorts") {
    const assignedCohorts = cohorts.filter(c => c.facilitator_id === activeUser.id);
    return (
      <div className="animate-fade-in">
        <div className="view-title-row">
          <h2>Facilitator Workspace</h2>
          <p className="view-subtitle">Assigned Client Cohorts and Upcoming Live Sessions | Delivery Management</p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px' }}>My Assigned Cohorts</h3>
          <div className="course-grid">
            {assignedCohorts.map(coh => {
              const company = companies.find(cp => cp.company_code === coh.company_code);
              const course = courses.find(cr => cr.course_code === coh.course_code);
              const cohortStudents = users.filter(u => u.company_code === coh.company_code && u.role === "Learner");

              return (
                <div key={coh.id} className="glass-card">
                  <div className="flex-between">
                    <span className="badge badge-info">{coh.cohort_type}</span>
                    <span className="badge badge-success">{coh.status}</span>
                  </div>
                  <h4 style={{ fontSize: '1.2rem', margin: '12px 0 6px 0' }}>{coh.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    🏢 Company: <strong>{company.company_name}</strong><br/>
                    📘 Journey: <strong>{course.title}</strong>
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>👨‍🎓 {cohortStudents.length} Learners</span>
                    <button className="glass-button" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => pushToast("Roster review checklist launched...")}>
                      Review Cohort
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3>Upcoming Virtual Sessions</h3>
          <div className="glass-card" style={{ marginTop: '16px' }}>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Session Topic</th>
                    <th>Cohort</th>
                    <th>Scheduled Date & Time</th>
                    <th>Location / Meeting Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.filter(s => s.facilitator_id === activeUser.id).map(ses => {
                    const cohort = cohorts.find(ch => ch.id === ses.cohort_id);
                    return (
                      <tr key={ses.id}>
                        <td><strong>{ses.title}</strong><br/><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ses.session_notes}</span></td>
                        <td>{cohort.name}</td>
                        <td>{ses.start_datetime.replace("T", " ")}</td>
                        <td>
                          <a href={ses.location_or_link} target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                            Join Zoom Meeting Link
                          </a>
                        </td>
                        <td>
                          <button className="glass-button" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => {
                            pushToast("Attendance logged for scheduled session!");
                          }}>
                            Mark Attendance
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
      </div>
    );
  }

  return null;
}
