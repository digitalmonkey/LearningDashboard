import CourseListItem from '../CourseListItem/CourseListItem'
import styles from './Sidebar.module.css'

function Sidebar({ courses, selectedCourseId, onSelectCourse, onOpenModal, onSaveToFile, savedAt }) {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>My Courses</h2>
        <span className={styles.count}>{courses.length}</span>
      </div>

      <ul className={styles.list}>
        {courses.map((course) => (
          <CourseListItem
            key={course.id}
            course={course}
            isSelected={course.id === selectedCourseId}
            onSelect={() => onSelectCourse(course.id)}
          />
        ))}
      </ul>

      <div className={styles.footer}>
        <button className={styles.addButton} onClick={onOpenModal}>
          + Add Course
        </button>
        <button className={styles.saveButton} onClick={onSaveToFile}>
          Export Courses
        </button>
        {savedAt && (
          <p className={styles.savedAt}>
            Auto-saved {savedAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        )}
      </div>
    </nav>
  )
}

export default Sidebar
