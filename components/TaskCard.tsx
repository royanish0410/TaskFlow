'use client'

import { useState } from 'react'
import { Trash2, ChevronRight, Calendar } from 'lucide-react'
import { Task, useTaskContext } from '@/context/TaskContext'
import TaskDetailModal from './TaskDetailModal'

interface TaskCardProps {
  task: Task
  status: Task['status']
}

const priorityColors = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
}

const priorityBorders = {
  high: 'border-l-4 border-red-500',
  medium: 'border-l-4 border-yellow-500',
  low: 'border-l-4 border-green-500',
}

export default function TaskCard({ task, status }: TaskCardProps) {
  const [showDetailModal, setShowDetailModal] = useState(false)
  const { deleteTask, moveTask } = useTaskContext()

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    deleteTask(task.id)
  }

  const handleMoveNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextStatus: Record<string, Task['status']> = {
      'todo': 'doing',
      'doing': 'done',
      'done': 'todo',
    }
    moveTask(task.id, nextStatus[status])
  }

  const formatDate = (date?: string) => {
    if (!date) return null
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <>
      <div
        onClick={() => setShowDetailModal(true)}
        className={`${priorityBorders[task.priority]} bg-card rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 group card-hover`}
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-foreground text-sm flex-1 group-hover:text-primary transition-colors line-clamp-2">
            {task.title}
          </h3>
          <button
            onClick={handleDelete}
            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {task.description}
        </p>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                {tag}
              </span>
            ))}
            {task.tags.length > 2 && (
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                +{task.tags.length - 2}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>

          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-full">
              <Calendar className="w-3 h-3" />
              {formatDate(task.dueDate)}
            </div>
          )}
        </div>

        {status !== 'done' && (
          <button
            onClick={handleMoveNext}
            className="mt-3 w-full flex items-center justify-center gap-1 text-xs font-medium py-2 bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/40 hover:to-secondary/40 text-primary rounded-lg transition-all"
          >
            <span>Move Next</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <TaskDetailModal
        task={task}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </>
  )
}
