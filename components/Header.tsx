'use client'

import { useState } from 'react'
import { Moon, Sun, LogOut, RotateCcw, History } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTaskContext } from '@/context/TaskContext'
import ActivityLogModal from './ActivityLogModal'

interface HeaderProps {
  theme: 'light' | 'dark'
  onThemeToggle: () => void
}

export default function Header({ theme, onThemeToggle }: HeaderProps) {
  const { logout, email } = useAuth()
  const { resetBoard, activityLogs } = useTaskContext()
  const [showActivityLog, setShowActivityLog] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleReset = () => {
    resetBoard()
    setShowResetConfirm(false)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-poppins font-bold text-lg">TB</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground">
                  Task Board
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {email}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Activity Log Button */}
              <button
                onClick={() => setShowActivityLog(true)}
                className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors shadow-md hover:shadow-lg relative"
                aria-label="View activity log"
                title="Activity Log"
              >
                <History className="w-5 h-5" />
                {activityLogs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {Math.min(activityLogs.length, 9)}+
                  </span>
                )}
              </button>

              {/* Reset Button */}
              <button
                onClick={() => setShowResetConfirm(true)}
                className="p-2.5 rounded-lg bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 text-orange-600 dark:text-orange-400 transition-colors shadow-md hover:shadow-lg"
                aria-label="Reset board"
                title="Reset Board"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={onThemeToggle}
                className="p-2.5 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors shadow-md hover:shadow-lg"
                aria-label="Toggle theme"
                title="Toggle Theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-colors shadow-md hover:shadow-lg"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Activity Log Modal */}
      <ActivityLogModal isOpen={showActivityLog} onClose={() => setShowActivityLog(false)} />

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-in fade-in slide-up">
            <h2 className="text-xl font-poppins font-bold text-foreground mb-2">Reset Board?</h2>
            <p className="text-muted-foreground mb-6">This will delete all tasks and reset the board to its initial state. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
