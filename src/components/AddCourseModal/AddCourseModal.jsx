import { useState, useEffect } from 'react'
import styles from './AddCourseModal.module.css'

const EMPTY_FORM = {
  title: '',
  instructor: '',
  url: '',
  description: '',
  topics: '',
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
    const newCourse = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      instructor: form.instructor.trim(),
      url: form.url.trim(),
      description: form.description.trim(),
      topics: form.topics
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      progress: Number(form.progress),
      status: form.status,
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
              <label className={styles.label} htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

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
          </div>

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
