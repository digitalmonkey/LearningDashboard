import { useState, useEffect } from 'react'
import styles from './AddCourseModal.module.css'

const EMPTY_FORM = {
  title: '',
  instructor: '',
  organization: '',
  url: '',
  description: '',
  topics: '',
  totalLessons: '',
  currentLesson: '',
  progress: 0,
  status: 'not-started',
}

function AddCourseModal({ onAddCourse, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const totalLessons = Number(form.totalLessons) || 0
    const currentLesson = Number(form.currentLesson) || 0
    const progress = totalLessons > 0 ? Math.round((currentLesson / totalLessons) * 100) : Number(form.progress)
    const status = progress === 0 ? 'not-started' : progress === 100 ? 'completed' : 'in-progress'
    const newCourse = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      instructor: form.instructor.trim(),
      organization: form.organization.trim(),
      url: form.url.trim(),
      description: form.description.trim(),
      topics: form.topics
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      totalLessons,
      currentLesson,
      progress,
      status,
    }
    onAddCourse(newCourse)
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add New Course</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="title">Course Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={form.title}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g. Introduction to TypeScript"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="instructor">Instructor</label>
              <input
                id="instructor"
                name="instructor"
                type="text"
                value={form.instructor}
                onChange={handleChange}
                className={styles.input}
                placeholder="e.g. Jane Smith"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="organization">Organisation</label>
              <input
                id="organization"
                name="organization"
                type="text"
                value={form.organization}
                onChange={handleChange}
                className={styles.input}
                placeholder="e.g. Udemy"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="url">Course URL</label>
            <input
              id="url"
              name="url"
              type="url"
              value={form.url}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g. https://www.udemy.com/course/..."
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className={styles.textarea}
              rows={3}
              placeholder="What is this course about?"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="topics">
              Topics <span className={styles.hint}>(comma-separated)</span>
            </label>
            <input
              id="topics"
              name="topics"
              type="text"
              value={form.topics}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g. Variables, Functions, Classes"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="currentLesson">Current Lesson</label>
              <input
                id="currentLesson"
                name="currentLesson"
                type="number"
                min={0}
                value={form.currentLesson}
                onChange={handleChange}
                className={styles.input}
                placeholder="0"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="totalLessons">Total Lessons</label>
              <input
                id="totalLessons"
                name="totalLessons"
                type="number"
                min={0}
                value={form.totalLessons}
                onChange={handleChange}
                className={styles.input}
                placeholder="0"
              />
            </div>
          </div>

          {!form.totalLessons && (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="progress">
                Progress <span className={styles.hint}>({form.progress}%)</span>
              </label>
              <input
                id="progress"
                name="progress"
                type="range"
                min={0}
                max={100}
                value={form.progress}
                onChange={handleChange}
                className={styles.range}
              />
            </div>
          )}

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCourseModal
