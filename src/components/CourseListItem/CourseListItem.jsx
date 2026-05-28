import styles from './CourseListItem.module.css'

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
    </li>
  )
}

export default CourseListItem
