'use client'

import { useState } from 'react'
import TaskBoard from '@/components/TaskBoard'
import Header from '@/components/Header'
import LoginPage from '@/components/LoginPage'
import { TaskProvider } from '@/context/TaskContext'
import { useAuth } from '@/context/AuthContext'

function HomeContent() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const { isAuthenticated } = useAuth()

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
    if (theme === 'light') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <TaskProvider>
      <div className={theme}>
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 dark:from-background dark:via-background dark:to-purple-950">
          <Header theme={theme} onThemeToggle={toggleTheme} />
          <TaskBoard />
        </main>
      </div>
    </TaskProvider>
  )
}

export default function Home() {
  return <HomeContent />
}
