import { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import CourseViewer from './components/CourseViewer/CourseViewer'
import AddCourseModal from './components/AddCourseModal/AddCourseModal'
import initialCourses from './data/initialCourses'
import styles from './App.module.css'

function App() {
  const [courses, setCourses] = useState(initialCourses)
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourses[0]?.id ?? null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) ?? null

  function handleAddCourse(newCourse) {
    setCourses((prev) => [...prev, newCourse])
    setSelectedCourseId(newCourse.id)
    setIsModalOpen(false)
  }

  return (
    <div className={styles.layout}>
      <Sidebar
        courses={courses}
        selectedCourseId={selectedCourseId}
        onSelectCourse={setSelectedCourseId}
        onOpenModal={() => setIsModalOpen(true)}
      />
      <CourseViewer course={selectedCourse} />
      {isModalOpen && (
        <AddCourseModal
          onAddCourse={handleAddCourse}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default App
