'use client'

import { useState } from 'react'
import { X, Calendar, Flag } from 'lucide-react'
import { Task, useTaskContext } from '@/context/TaskContext'

interface TaskDetailModalProps {
  task: Task
  isOpen: boolean
  onClose: () => void
}

const statusColors = {
  'todo': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  'doing': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'done': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
}

const priorityColors = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
}

export default function TaskDetailModal({ task, isOpen, onClose }: TaskDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)
  const { updateTask, moveTask } = useTaskContext()

  const handleSave = () => {
    updateTask(task.id, editedTask)
    setIsEditing(false)
  }

  const handleStatusChange = (newStatus: Task['status']) => {
    moveTask(task.id, newStatus)
    setEditedTask({ ...editedTask, status: newStatus })
  }

  const formatDate = (date?: string) => {
    if (!date) return 'Not set'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const daysUntilDue = (date?: string) => {
    if (!date) return null
    const due = new Date(date)
    const today = new Date()
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-poppins font-bold text-foreground">
            Task Details
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Title Section */}
          {isEditing ? (
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="w-full text-2xl font-poppins font-bold px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ) : (
            <h3 className="text-2xl font-poppins font-bold text-foreground">
              {task.title}
            </h3>
          )}

          {/* Status and Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Status
              </label>
              <div className="flex gap-2 flex-wrap">
                {(['todo', 'doing', 'done'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      editedTask.status === status
                        ? statusColors[status]
                        : 'bg-muted text-muted-foreground hover:bg-border'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Priority
              </label>
              {isEditing ? (
                <select
                  value={editedTask.priority}
                  onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as Task['priority'] })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              ) : (
                <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${priorityColors[task.priority]}`}>
                  <Flag className="w-3 h-3 inline mr-1" />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Description
            </label>
            {isEditing ? (
              <textarea
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            ) : (
              <p className="text-foreground bg-secondary/50 rounded-lg p-3">
                {task.description || 'No description provided'}
              </p>
            )}
          </div>

          {/* Tags */}
          {(editedTask.tags && editedTask.tags.length > 0) && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {editedTask.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dates Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Created
              </label>
              <p className="text-foreground bg-secondary/50 rounded-lg p-3 text-sm">
                {formatDate(task.createdAt)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Due Date
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedTask.dueDate || ''}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <div className="text-foreground bg-secondary/50 rounded-lg p-3 text-sm">
                  {formatDate(task.dueDate)}
                  {task.dueDate && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {daysUntilDue(task.dueDate)! > 0
                        ? `${daysUntilDue(task.dueDate)} days remaining`
                        : daysUntilDue(task.dueDate) === 0
                        ? 'Due today'
                        : `${Math.abs(daysUntilDue(task.dueDate)!)} days overdue`
                      }
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-all font-medium"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-all font-medium"
                >
                  Edit Task
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
