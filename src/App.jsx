import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import CourseViewer from './components/CourseViewer/CourseViewer'
import AddCourseModal from './components/AddCourseModal/AddCourseModal'
import initialCourses from './data/initialCourses'
import styles from './App.module.css'

const STORAGE_KEY = 'learning-dashboard-courses'

function loadFromLocalStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore parse errors
  }
  return initialCourses
}

async function loadFromFile() {
  try {
    const res = await fetch('/api/courses')
    if (!res.ok) return null
    const data = await res.json()
    return data
  } catch {
    return null
  }
}

async function saveToFile(courses) {
  try {
    await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courses, null, 2),
    })
  } catch {
    // silently fail — localStorage still has the data
  }
}

function App() {
  const [courses, setCourses] = useState(loadFromLocalStorage)
  const [selectedCourseId, setSelectedCourseId] = useState(() => loadFromLocalStorage()[0]?.id ?? null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) ?? null

  const sortedCourses = [...courses].sort((a, b) => {
    if (!a.lastVisited && !b.lastVisited) return 0
    if (!a.lastVisited) return 1
    if (!b.lastVisited) return -1
    return new Date(b.lastVisited) - new Date(a.lastVisited)
  })

  // On startup, load from file and override local state if data exists
  useEffect(() => {
    loadFromFile().then((data) => {
      if (data && data.length > 0) {
        setCourses(data)
        setSelectedCourseId((prev) => data.find((c) => c.id === prev)?.id ?? data[0]?.id ?? null)
      }
    })
  }, [])

  // On every change, persist to both localStorage and courses.json
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses))
    saveToFile(courses)
  }, [courses])

  function handleAddCourse(newCourse) {
    setCourses((prev) => [...prev, newCourse])
    setSelectedCourseId(newCourse.id)
    setIsModalOpen(false)
  }

  function handleVisitCourse(courseId) {
    setCourses((prev) =>
      prev.map((c) => c.id === courseId ? { ...c, lastVisited: new Date().toISOString() } : c)
    )
  }

  function handleUpdateProgress(courseId, progress) {
    const status = progress === 0 ? 'not-started' : progress === 100 ? 'completed' : 'in-progress'
    setCourses((prev) =>
      prev.map((c) => c.id === courseId ? { ...c, progress, status } : c)
    )
  }

  function handleToggleComplete(courseId) {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c
        if (c.status === 'completed') {
          const progress = Math.min(c.progress, 99)
          return { ...c, progress, status: progress === 0 ? 'not-started' : 'in-progress', completedAt: null }
        }
        return { ...c, progress: 100, status: 'completed', completedAt: new Date().toISOString() }
      })
    )
  }

  function handleUpdateUrl(courseId, url) {
    setCourses((prev) =>
      prev.map((c) => c.id === courseId ? { ...c, url } : c)
    )
  }

  function handleDeleteCourse(courseId) {
    const remaining = courses.filter((c) => c.id !== courseId)
    setCourses(remaining)
    if (selectedCourseId === courseId) {
      setSelectedCourseId(remaining[0]?.id ?? null)
    }
  }

  function handleUpdateLessons(courseId, currentLesson, totalLessons) {
    const progress = totalLessons > 0 ? Math.round((currentLesson / totalLessons) * 100) : 0
    const status = progress === 0 ? 'not-started' : progress === 100 ? 'completed' : 'in-progress'
    setCourses((prev) =>
      prev.map((c) => c.id === courseId ? { ...c, currentLesson, totalLessons, progress, status } : c)
    )
  }

  return (
    <div className={styles.layout}>
      <Sidebar
        courses={sortedCourses}
        selectedCourseId={selectedCourseId}
        onSelectCourse={setSelectedCourseId}
        onOpenModal={() => setIsModalOpen(true)}
      />
      <CourseViewer course={selectedCourse} onVisit={handleVisitCourse} onUpdateProgress={handleUpdateProgress} onUpdateLessons={handleUpdateLessons} onUpdateUrl={handleUpdateUrl} onToggleComplete={handleToggleComplete} onDeleteCourse={handleDeleteCourse} />
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
