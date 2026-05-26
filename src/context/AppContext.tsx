import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Category, Event, Task } from '../types'

type AppContextType = {
  categories: Category[]
  events: Event[]
  tasks: Task[]
  addCategory: (category: Category) => void
  addEvent: (event: Event) => void
  addTask: (task: Task) => void
  toggleTask: (id: string) => void
}

const AppContext = createContext<AppContextType>({} as AppContextType)

export function AppProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories')
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Estudos', color: '#4F46E5', icon: '📚' },
      { id: '2', name: 'Academia', color: '#10B981', icon: '💪' },
      { id: '3', name: 'Igreja', color: '#F59E0B', icon: '⛪' },
    ]
  })

  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('events')
    return saved ? JSON.parse(saved) : []
  })

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function addCategory(category: Category) {
    setCategories(prev => [...prev, category])
  }

  function addEvent(event: Event) {
    setEvents(prev => [...prev, event])
  }

  function addTask(task: Task) {
    setTasks(prev => [...prev, task])
  }

  function toggleTask(id: string) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  return (
    <AppContext.Provider value={{ categories, events, tasks, addCategory, addEvent, addTask, toggleTask }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}