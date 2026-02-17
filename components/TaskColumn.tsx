'use client'

import { Task } from '@/context/TaskContext'
import TaskCard from './TaskCard'

interface TaskColumnProps {
  title: string
  status: Task['status']
  tasks: Task[]
  color: string
  cardColor: string
}

export default function TaskColumn({
  title,
  status,
  tasks,
  color,
  cardColor,
}: TaskColumnProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className={`bg-gradient-to-r ${color} rounded-t-2xl p-4 text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-poppins font-bold">{title}</h2>
          <div className="bg-white/20 backdrop-blur-sm rounded-full w-7 h-7 flex items-center justify-center text-sm font-semibold">
            {tasks.length}
          </div>
        </div>
      </div>

      {/* Tasks Container */}
      <div className={`flex-1 ${cardColor} rounded-b-2xl p-4 overflow-y-auto transition-colors`}>
        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} status={status} />
            ))
          ) : (
            <div className="h-32 flex items-center justify-center rounded-lg border-2 border-dashed border-border/50">
              <div className="text-center">
                <p className="text-sm text-muted-foreground font-medium">
                  No tasks yet
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Drag tasks here or create new ones
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
