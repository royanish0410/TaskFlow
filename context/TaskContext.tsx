'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'doing' | 'done'
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  tags?: string[]
  createdAt: string
}

export interface ActivityLog {
  id: string
  action: 'created' | 'edited' | 'moved' | 'deleted'
  taskTitle: string
  timestamp: string
  details?: string
}

interface TaskContextType {
  tasks: Task[]
  activityLogs: ActivityLog[]
  addTask: (task: Task) => void
  updateTask: (id: string, task: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, newStatus: Task['status']) => void
  resetBoard: () => void
  getFilteredAndSortedTasks: (searchTerm: string, priorityFilter: string | null, sortBy: string) => Task[]
  loadFromStorage: () => void
  saveToStorage: () => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design UI Components',
    description: 'Create beautiful and reusable UI components',
    status: 'doing',
    priority: 'high',
    dueDate: '2026-02-20',
    tags: ['design', 'ui'],
    createdAt: '2026-02-10',
  },
  {
    id: '2',
    title: 'Setup Database',
    description: 'Configure PostgreSQL database and migrations',
    status: 'done',
    priority: 'high',
    dueDate: '2026-02-15',
    tags: ['backend', 'database'],
    createdAt: '2026-02-08',
  },
  {
    id: '3',
    title: 'API Integration',
    description: 'Integrate REST API endpoints',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-02-22',
    tags: ['api', 'backend'],
    createdAt: '2026-02-10',
  },
  {
    id: '4',
    title: 'Testing',
    description: 'Write unit and integration tests',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-02-25',
    tags: ['testing', 'qa'],
    createdAt: '2026-02-11',
  },
  {
    id: '5',
    title: 'Documentation',
    description: 'Complete project documentation',
    status: 'todo',
    priority: 'low',
    dueDate: '2026-03-10',
    tags: ['documentation'],
    createdAt: '2026-02-11',
  },
]

const STORAGE_KEY = 'taskboard_tasks'
const ACTIVITY_KEY = 'taskboard_activity'

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    loadFromStorage()
    setIsHydrated(true)
  }, [])

  const loadFromStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const savedTasks = localStorage.getItem(STORAGE_KEY)
        const savedLogs = localStorage.getItem(ACTIVITY_KEY)
        
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks))
        } else {
          setTasks(INITIAL_TASKS)
        }
        
        if (savedLogs) {
          setActivityLogs(JSON.parse(savedLogs))
        }
      } catch (error) {
        console.error('Error loading from storage:', error)
        setTasks(INITIAL_TASKS)
      }
    }
  }

  const saveToStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
        localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activityLogs))
      } catch (error) {
        console.error('Error saving to storage:', error)
      }
    }
  }

  const addActivityLog = (action: ActivityLog['action'], taskTitle: string, details?: string) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      action,
      taskTitle,
      timestamp: new Date().toISOString(),
      details,
    }
    setActivityLogs(prev => [newLog, ...prev.slice(0, 19)])
  }

  const addTask = (task: Task) => {
    const newTasks = [...tasks, task]
    setTasks(newTasks)
    addActivityLog('created', task.title)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
  }

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    const task = tasks.find(t => t.id === id)
    const newTasks = tasks.map(t => 
      t.id === id ? { ...t, ...updatedFields } : t
    )
    setTasks(newTasks)
    if (task) {
      addActivityLog('edited', task.title, JSON.stringify(updatedFields))
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
  }

  const deleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id)
    const newTasks = tasks.filter(t => t.id !== id)
    setTasks(newTasks)
    if (task) {
      addActivityLog('deleted', task.title)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
  }

  const moveTask = (id: string, newStatus: Task['status']) => {
    const task = tasks.find(t => t.id === id)
    const newTasks = tasks.map(t => 
      t.id === id ? { ...t, status: newStatus } : t
    )
    setTasks(newTasks)
    if (task) {
      addActivityLog('moved', task.title, `Moved to ${newStatus}`)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
  }

  const resetBoard = () => {
    setTasks(INITIAL_TASKS)
    setActivityLogs([])
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS))
    localStorage.removeItem(ACTIVITY_KEY)
  }

  const getFilteredAndSortedTasks = (searchTerm: string, priorityFilter: string | null, sortBy: string) => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPriority = !priorityFilter || task.priority === priorityFilter
      return matchesSearch && matchesPriority
    })

    if (sortBy === 'duedate') {
      filtered.sort((a, b) => {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      })
    }

    return filtered
  }

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      activityLogs,
      addTask, 
      updateTask, 
      deleteTask, 
      moveTask,
      resetBoard,
      getFilteredAndSortedTasks,
      loadFromStorage,
      saveToStorage,
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider')
  }
  return context
}
