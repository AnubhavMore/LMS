import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function SuperAdminWorkspace() {
  const {
    activeTab,
    companies, users, courses,
    editingCourseCode, setEditingCourseCode,
    builderActiveModule, setBuilderActiveModule,
    newModuleName, setNewModuleName,
    newLessonName, setNewLessonName,
    newLessonType, setNewLessonType,
    handleBuilderAddModule, handleBuilderAddLesson
  } = useAppContext();

  if (activeTab === "dashboard") {
    return (
      <div className="animate-fade-in">
        <div className="view-title-row">
          <h2>Super Admin Global Hub</h2>
          <p className="view-subtitle">Consolidated operational health index | EDGE Multi-tenant Systems</p>
        </div>

        <div className="grid-cols-3" style={{ marginBottom: '32px' }}>
          <div className="glass-card stat-card" style={{ borderColor: 'var(--color-primary)' }}>
            <span className="stat-label">Active Enterprises</span>
            <span className="stat-value">{companies.length}</span>
          </div>
          <div className="glass-card stat-card" style={{ borderColor: 'var(--color-success)' }}>
            <span className="stat-label">Global Active Learners</span>
            <span className="stat-value">{users.filter(u => u.role === "Learner" && u.status === "Active").length}</span>
          </div>
          <div className="glass-card stat-card" style={{ borderColor: 'var(--color-gold)' }}>
            <span className="stat-label">Academics Catalog</span>
            <span className="stat-value">{courses.length} Course(s)</span>
          </div>
        </div>

        <div className="glass-card" style={{ marginBottom: '32px' }}>
          <h4 style={{ marginBottom: '16px' }}>Tenant Management Index</h4>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Code</th>
                  <th>Industry</th>
                  <th>Account Tier</th>
                  <th>Seat Allocation</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {companies.map(c => {
                  const companyUsers = users.filter(u => u.company_code === c.company_code);
                  const companyLearners = companyUsers.filter(u => u.role === "Learner");
                  return (
                    <tr key={c.company_code}>
                      <td><strong>{c.company_name}</strong></td>
                      <td><span style={{ fontFamily: 'monospace' }}>{c.company_code}</span></td>
                      <td>{c.industry}</td>
                      <td><span className="badge badge-info">{c.plan}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="progress-track" style={{ width: '80px' }}>
                            <div className="progress-fill" style={{ width: `${(companyLearners.length / c.seat_limit) * 100}%` }}></div>
                          </div>
                          <span>{companyLearners.length} / {c.seat_limit}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${c.status === 'Active' ? 'badge-success' : 'badge-error'}`}>
                          {c.status}
                        </span>
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

  if (activeTab === "builder") {
    const course = courses.find(c => c.course_code === editingCourseCode);
    return (
      <div className="animate-fade-in">
        <div className="view-title-row">
          <h2>Accredited Course Outline Builder</h2>
          <p className="view-subtitle">Modify course module hierarchies, insert text chapters, Vimeo links, and quiz templates.</p>
        </div>

        <div className="glass-card" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Select Course to Edit</label>
            <select className="form-control" value={editingCourseCode} onChange={(e) => {
              setEditingCourseCode(e.target.value);
              const matched = courses.find(c => c.course_code === e.target.value);
              setBuilderActiveModule(matched?.modules[0]?.id || "");
            }}>
              {courses.map(c => (
                <option key={c.course_code} value={c.course_code}>{c.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid-cols-3">
          {/* Outline structure tree */}
          <div className="glass-card col-span-1">
            <h4>{course?.title} Tree</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
              {course?.modules.map(mod => (
                <div key={mod.id} style={{ background: builderActiveModule === mod.id ? 'var(--bg-card-hover)' : 'transparent', border: '1px solid var(--border-light)', padding: '12px', borderRadius: '10px', cursor: 'pointer' }} onClick={() => setBuilderActiveModule(mod.id)}>
                  <div className="flex-between">
                    <strong style={{ fontSize: '0.9rem' }}>{mod.title}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Index: {mod.order_index}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
                    {mod.lessons.map(less => (
                      <div key={less.id} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', paddingLeft: '10px' }}>
                        <span>• {less.title}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-primary)' }}>{less.lesson_type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module/Lesson Creator Form */}
          <div className="glass-card col-span-2">
            <h4>Append Curriculum Structures</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
              {/* Add Module Column */}
              <form onSubmit={handleBuilderAddModule} style={{ borderRight: '1px solid var(--border-light)', paddingRight: '20px' }}>
                <h5 style={{ marginBottom: '16px', color: 'var(--color-primary)' }}>+ Append New Module</h5>
                <div className="form-group">
                  <label className="form-label">Module Title</label>
                  <input className="form-control" type="text" placeholder="e.g. Module 3: Aligning Vision" value={newModuleName} onChange={(e) => setNewModuleName(e.target.value)} required />
                </div>
                <button type="submit" className="glass-button btn-primary w-full">
                  Append Module
                </button>
              </form>

              {/* Add Lesson Column */}
              <form onSubmit={handleBuilderAddLesson}>
                <h5 style={{ marginBottom: '16px', color: 'var(--color-gold)' }}>+ Insert Lesson into Selection</h5>
                <div className="form-group">
                  <label className="form-label">Target Module</label>
                  <select className="form-control" value={builderActiveModule} onChange={(e) => setBuilderActiveModule(e.target.value)}>
                    {course?.modules.map(mod => (
                      <option key={mod.id} value={mod.id}>{mod.title}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Lesson Title</label>
                  <input className="form-control" type="text" placeholder="e.g. 1.3 Strategic Delegation matrix" value={newLessonName} onChange={(e) => setNewLessonName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Lesson Type</label>
                  <select className="form-control" value={newLessonType} onChange={(e) => setNewLessonType(e.target.value)}>
                    <option value="Text">Text Chapter</option>
                    <option value="Video">Vimeo Video Embed</option>
                    <option value="PDF">Downloadable PDF</option>
                    <option value="Quiz Placeholder">Graded Quiz Template</option>
                  </select>
                </div>
                <button type="submit" className="glass-button btn-primary w-full" style={{ background: 'var(--color-gold)', borderColor: 'var(--color-gold)' }}>
                  Insert Lesson
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
