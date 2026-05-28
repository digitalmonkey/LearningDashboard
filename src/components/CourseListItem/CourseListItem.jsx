import styles from './CourseListItem.module.css'

function formatLastVisited(iso) {
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

const STATUS_LABELS = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'completed': 'Completed',
}

function CourseListItem({ course, isSelected, onSelect }) {
  return (
    <li
      className={`${styles.item} ${isSelected ? styles.active : ''}`}
      onClick={onSelect}
    >
      <div className={styles.title}>{course.title}</div>
      <div className={styles.meta}>
        <span className={`${styles.badge} ${styles[course.status.replace('-', '')]}`}>
          {STATUS_LABELS[course.status]}
        </span>
        {course.status !== 'not-started' && (
          <span className={styles.progress}>{course.progress}%</span>
        )}
      </div>
      {course.lastVisited && (
        <div className={styles.lastVisited}>
          Visited {formatLastVisited(course.lastVisited)}
        </div>
      )}
    </li>
  )
}

export default CourseListItem
