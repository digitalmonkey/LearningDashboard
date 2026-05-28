import { useState } from 'react'
import styles from './CourseViewer.module.css'

const STATUS_LABELS = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'completed': 'Completed',
}

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function CourseViewer({ course, onVisit, onUpdateProgress, onUpdateLessons, onUpdateUrl, onToggleComplete }) {
  const [editingUrl, setEditingUrl] = useState(false)
  const [urlDraft, setUrlDraft] = useState('')

  function startEditUrl() {
    setUrlDraft(course.url ?? '')
    setEditingUrl(true)
  }

  function saveUrl() {
    onUpdateUrl(course.id, urlDraft.trim())
    setEditingUrl(false)
  }

  function handleUrlKeyDown(e) {
    if (e.key === 'Enter') saveUrl()
    if (e.key === 'Escape') setEditingUrl(false)
  }

  if (!course) {
    return (
      <main className={styles.viewer}>
        <div className={styles.empty}>
          <p>Select a course to get started</p>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.viewer}>
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>{course.title}</h1>
          <span className={`${styles.badge} ${styles[course.status.replace('-', '')]}`}>
            {STATUS_LABELS[course.status]}
          </span>
        </div>

        <div className={styles.instructorRow}>
          <p className={styles.instructor}>
            by {course.instructor}
            {course.url && !editingUrl && (
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.courseLink}
                onClick={() => onVisit(course.id)}
              >
                Go to Course →
              </a>
            )}
          </p>
          {!editingUrl && (
            <button className={styles.editUrlBtn} onClick={startEditUrl} title="Edit course URL">
              {course.url ? 'Edit URL' : '+ Add URL'}
            </button>
          )}
        </div>

        {editingUrl && (
          <div className={styles.urlEditRow}>
            <input
              type="url"
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              onKeyDown={handleUrlKeyDown}
              className={styles.urlInput}
              placeholder="https://..."
              autoFocus
            />
            <button className={styles.urlSaveBtn} onClick={saveUrl}>Save</button>
            <button className={styles.urlCancelBtn} onClick={() => setEditingUrl(false)}>Cancel</button>
          </div>
        )}

        {course.lastVisited && (
          <p className={styles.lastVisited}>
            Last visited: {formatDate(course.lastVisited)}
          </p>
        )}

        <div className={styles.progressSection}>
          <div className={styles.lessonRow}>
            <div className={styles.lessonField}>
              <label className={styles.lessonLabel} htmlFor="currentLesson">Current Lesson</label>
              <input
                id="currentLesson"
                type="number"
                min={0}
                max={course.totalLessons || undefined}
                value={course.currentLesson ?? ''}
                onChange={(e) => {
                  const val = Math.max(0, Number(e.target.value))
                  onUpdateLessons(course.id, val, course.totalLessons ?? 0)
                }}
                className={styles.lessonInput}
                placeholder="0"
              />
            </div>
            <span className={styles.lessonSeparator}>/</span>
            <div className={styles.lessonField}>
              <label className={styles.lessonLabel} htmlFor="totalLessons">Total Lessons</label>
              <input
                id="totalLessons"
                type="number"
                min={0}
                value={course.totalLessons ?? ''}
                onChange={(e) => {
                  const val = Math.max(0, Number(e.target.value))
                  onUpdateLessons(course.id, course.currentLesson ?? 0, val)
                }}
                className={styles.lessonInput}
                placeholder="0"
              />
            </div>
          </div>

          <div className={styles.progressLabel}>
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={course.progress}
            onChange={(e) => onUpdateProgress(course.id, Number(e.target.value))}
            disabled={course.totalLessons > 0}
            className={`${styles.progressSlider} ${course.totalLessons > 0 ? styles.progressSliderDisabled : ''}`}
          />
          {course.totalLessons > 0 && (
            <p className={styles.progressNote}>Progress is calculated from lesson count.</p>
          )}
        </div>

        <div className={styles.completeRow}>
          <label className={styles.completeLabel}>
            <input
              type="checkbox"
              checked={course.status === 'completed'}
              onChange={() => onToggleComplete(course.id)}
              className={styles.completeCheckbox}
            />
            Mark as completed
          </label>
          {course.completedAt && (
            <span className={styles.completedAt}>Completed on {formatDate(course.completedAt)}</span>
          )}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>About this course</h2>
          <p className={styles.description}>{course.description}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Topics covered</h2>
          <ol className={styles.topicList}>
            {course.topics.map((topic, i) => (
              <li key={i} className={styles.topic}>{topic}</li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  )
}

export default CourseViewer
