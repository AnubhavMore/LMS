import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function Certificates() {
  const { certificates, courses, activeUser, pushToast } = useAppContext();
  const myCerts = certificates.filter(c => c.learner_id === activeUser.id);

  return (
    <div className="animate-fade-in">
      <div className="view-title-row">
        <h2>My Certificates</h2>
        <p className="view-subtitle">Accredited and downloadable certificates reflecting your leadership track competencies.</p>
      </div>
      {myCerts.length > 0 ? (
        <div className="cert-grid">
          {myCerts.map(cert => {
            const course = courses.find(c => c.course_code === cert.course_code);
            return (
              <div key={cert.id} className="glass-card cert-card">
                <div className="cert-card-header">
                  <div>
                    <h4 style={{ color: 'var(--color-gold)', fontSize: '1rem', marginBottom: '4px' }}>ACCREDITED PORTAL</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                      ID: {cert.certificate_id}
                    </span>
                  </div>
                  <div className="cert-stamp">★</div>
                </div>
                <div style={{ margin: '16px 0' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{course.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Recipient: {activeUser.full_name} | Issued: {cert.issued_at}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="glass-button" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => pushToast("Initiated high-res PDF print request...")}>
                    Download PDF
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="pdf-mock-container">
          <h4>No certificates generated yet.</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>
            Accredited certificates will populate here automatically once you complete a 100% learning track.
          </p>
        </div>
      )}
    </div>
  );
}
