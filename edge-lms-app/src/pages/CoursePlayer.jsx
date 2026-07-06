import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function CoursePlayer() {
  const { 
    currentEnrollmentId, setCurrentEnrollmentId,
    currentLessonId, setCurrentLessonId,
    enrollments, courses,
    activeQuiz, setActiveQuiz,
    videoPlaying, setVideoPlaying,
    markLessonComplete, pushToast,
    setSelectedAnswers, setQuizScore, setQuizAttempted
  } = useAppContext();

  const enrollment = enrollments.find(e => e.id === currentEnrollmentId);
  const course = courses.find(c => c.course_code === enrollment.course_code);
  const activeLesson = course.modules.flatMap(m => m.lessons).find(l => l.id === currentLessonId);

  return (
    <div className="player-container animate-fade-in">
      {/* Left panel tree */}
      <div className="player-outline-panel">
        <div className="player-outline-header">
          <h3>{course.title} Outline</h3>
          <div className="progress-container">
            <div className="progress-label-row">
              <span>Course Progress</span>
              <span>{enrollment.completion_percentage}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${enrollment.completion_percentage}%` }}></div>
            </div>
          </div>
        </div>
        <div className="player-outline-content">
          {course.modules.map(mod => (
            <div key={mod.id} className="outline-module">
              <span className="module-title-tab">{mod.title}</span>
              <div className="outline-lessons-list">
                {mod.lessons.map(less => {
                  const isComplete = enrollment.progress.includes(less.id);
                  return (
                    <div
                      key={less.id}
                      className={`outline-lesson-item ${currentLessonId === less.id ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentLessonId(less.id);
                        setActiveQuiz(null);
                        setVideoPlaying(false);
                      }}
                    >
                      <div className={`lesson-check-ring ${isComplete ? 'completed' : ''}`}>
                        {isComplete && <span className="lesson-check-icon">✓</span>}
                      </div>
                      <span className="outline-lesson-label">{less.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="sidebar-footer" style={{ borderBottom: 'none' }}>
          <button className="glass-button w-full" onClick={() => setCurrentEnrollmentId(null)}>
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Center Main panel */}
      <div className="player-main-panel">
        <div className="player-body">
          {activeLesson ? (
            <div>
              <span className="course-category" style={{ marginBottom: '12px', display: 'block' }}>
                {activeLesson.lesson_type} Lesson
              </span>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>{activeLesson.title}</h2>

              {activeLesson.lesson_type === "Text" && (
                <div className="lesson-rich-content" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
              )}

              {activeLesson.lesson_type === "Video" && (
                <div>
                  <div className="video-mock-container">
                    {videoPlaying ? (
                      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <iframe 
                          src={`https://player.vimeo.com/video/${activeLesson.video_url}?autoplay=1&background=0`} 
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          allow="autoplay; fullscreen; picture-in-picture" 
                          allowFullScreen
                          title={activeLesson.title}
                          style={{ position: 'absolute', top: 0, left: 0 }}
                        ></iframe>
                      </div>
                    ) : (
                      <>
                        <div className="video-play-btn" onClick={() => setVideoPlaying(true)}>▶</div>
                        <span style={{ marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          Click to Play Vimeo Masterclass Embed
                        </span>
                      </>
                    )}
                  </div>
                  <div className="lesson-rich-content" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
                </div>
              )}

              {activeLesson.lesson_type === "PDF" && (
                <div>
                  <div className="pdf-mock-container">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-primary)', marginBottom: '12px' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    <h4>{activeLesson.resource_file}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px', marginBottom: '16px' }}>
                      Interactive executive playbook template resource ready.
                    </p>
                    <a href="#" className="glass-button btn-primary" onClick={(e) => { e.preventDefault(); pushToast(`Downloaded: ${activeLesson.resource_file}`); }}>
                      Download Playbook PDF
                    </a>
                  </div>
                  <div className="lesson-rich-content" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
                </div>
              )}

              {activeLesson.lesson_type === "Quiz Placeholder" && (
                <div className="pdf-mock-container" style={{ borderStyle: 'solid', borderColor: 'rgba(139,92,246,0.3)' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-gold)', marginBottom: '12px' }}>
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  <h4>{activeLesson.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px', marginBottom: '20px' }}>
                    This graded quiz requires a minimum passing score of <strong>70%</strong> to complete the module.
                  </p>
                  <button 
                    className="glass-button btn-primary" 
                    onClick={() => {
                      setActiveQuiz(activeLesson.quiz);
                      setSelectedAnswers({});
                      setQuizScore(null);
                      setQuizAttempted(false);
                    }}
                  >
                    Start Graded Assessment
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>Loading course timeline...</p>
          )}
        </div>
        
        <div className="player-footer">
          <button 
            className="glass-button" 
            disabled={activeLesson?.order_index === 1}
            onClick={() => {
              const flattened = course.modules.flatMap(m => m.lessons);
              const idx = flattened.findIndex(l => l.id === currentLessonId);
              if (idx > 0) setCurrentLessonId(flattened[idx-1].id);
              setActiveQuiz(null);
              setVideoPlaying(false);
            }}
          >
            ← Previous
          </button>
          
          {activeLesson && activeLesson.lesson_type !== "Quiz Placeholder" && (
            <button 
              className="glass-button btn-success"
              onClick={() => markLessonComplete(enrollment.id, activeLesson.id)}
            >
              Mark Complete & Next ✓
            </button>
          )}

          <button 
            className="glass-button" 
            onClick={() => {
              const flattened = course.modules.flatMap(m => m.lessons);
              const idx = flattened.findIndex(l => l.id === currentLessonId);
              if (idx < flattened.length - 1) setCurrentLessonId(flattened[idx+1].id);
              setActiveQuiz(null);
              setVideoPlaying(false);
            }}
          >
            Skip Next →
          </button>
        </div>
      </div>
    </div>
  );
}
