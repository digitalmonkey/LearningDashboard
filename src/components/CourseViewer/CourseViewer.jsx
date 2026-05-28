import styles from './CourseViewer.module.css'

const STATUS_LABELS = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'completed': 'Completed',
}

function CourseViewer({ course }) {
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

        <p className={styles.instructor}>
          by {course.instructor}
          {course.url && (
            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.courseLink}
            >
              Go to Course →
            </a>
          )}
        </p>

        <div className={styles.progressSection}>
          <div className={styles.progressLabel}>
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${course.progress}%` }}
            />
          </div>
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
