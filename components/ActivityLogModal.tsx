'use client'

import { X } from 'lucide-react'
import { useTaskContext } from '@/context/TaskContext'
import { formatDistanceToNow } from 'date-fns'

interface ActivityLogModalProps {
  isOpen: boolean
  onClose: () => void
}

function getActionColor(action: string) {
  switch (action) {
    case 'created':
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950'
    case 'edited':
      return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950'
    case 'moved':
      return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950'
    case 'deleted':
      return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950'
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950'
  }
}

function getActionEmoji(action: string) {
  switch (action) {
    case 'created':
      return '✨'
    case 'edited':
      return '✏️'
    case 'moved':
      return '→'
    case 'deleted':
      return '🗑️'
    default:
      return '📝'
  }
}

export default function ActivityLogModal({ isOpen, onClose }: ActivityLogModalProps) {
  const { activityLogs } = useTaskContext()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col animate-in slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-poppins font-bold text-foreground">Activity Log</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Activity List */}
        <div className="overflow-y-auto flex-1">
          {activityLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <span className="text-2xl">📭</span>
              </div>
              <p className="text-muted-foreground text-center">No activity yet. Start creating and managing tasks!</p>
            </div>
          ) : (
            <div className="space-y-2 p-6">
              {activityLogs.map((log) => (
                <div key={log.id} className={`p-4 rounded-lg border border-border ${getActionColor(log.action)}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{getActionEmoji(log.action)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <p className="font-medium capitalize">
                          {log.action}
                        </p>
                        <p className="truncate font-semibold text-foreground">
                          "{log.taskTitle}"
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                      </p>
                      {log.details && (
                        <p className="text-sm mt-2 text-muted-foreground">{log.details}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
