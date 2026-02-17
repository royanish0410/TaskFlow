'use client'

import { useState } from 'react'
import { Plus, Filter, Search, ArrowUpDown } from 'lucide-react'
import TaskColumn from './TaskColumn'
import AddTaskModal from './AddTaskModal'
import { useTaskContext, Task } from '@/context/TaskContext'

type PriorityFilter = 'all' | 'low' | 'medium' | 'high'
type SortOption = 'name' | 'duedate'

export default function TaskBoard() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const { tasks, getFilteredAndSortedTasks } = useTaskContext()

  const getFilteredTasks = (status: Task['status']) => {
    const filtered = getFilteredAndSortedTasks(
      searchTerm,
      priorityFilter === 'all' ? null : priorityFilter,
      sortBy
    )
    return filtered.filter(task => task.status === status)
  }

  const todoTasks = getFilteredTasks('todo')
  const doingTasks = getFilteredTasks('doing')
  const doneTasks = getFilteredTasks('done')

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'done').length,
    doing: tasks.filter(t => t.status === 'doing').length,
    todo: tasks.filter(t => t.status === 'todo').length,
  }

  return (
    <div className="min-h-[calc(100vh-120px)] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 fade-in">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-xs sm:text-sm font-medium opacity-90">Total Tasks</div>
            <div className="text-2xl sm:text-3xl font-poppins font-bold mt-1">{stats.total}</div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-xs sm:text-sm font-medium opacity-90">To Do</div>
            <div className="text-2xl sm:text-3xl font-poppins font-bold mt-1">{stats.todo}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-xs sm:text-sm font-medium opacity-90">Doing</div>
            <div className="text-2xl sm:text-3xl font-poppins font-bold mt-1">{stats.doing}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-xs sm:text-sm font-medium opacity-90">Done</div>
            <div className="text-2xl sm:text-3xl font-poppins font-bold mt-1">{stats.done}</div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col gap-4 mb-8 slide-up">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Priority Filter */}
              <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
                  className="text-sm bg-transparent border-none outline-none cursor-pointer font-medium text-foreground"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Sort Option */}
              <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-2">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-sm bg-transparent border-none outline-none cursor-pointer font-medium text-foreground"
                >
                  <option value="name">Sort by Name</option>
                  <option value="duedate">Sort by Due Date</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all hover:shadow-lg hover:scale-105 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 slide-up">
          <TaskColumn
            title="To Do"
            status="todo"
            tasks={todoTasks}
            color="from-amber-500 to-orange-500"
            cardColor="bg-amber-50 dark:bg-amber-950/20"
          />
          <TaskColumn
            title="Doing"
            status="doing"
            tasks={doingTasks}
            color="from-purple-500 to-pink-500"
            cardColor="bg-purple-50 dark:bg-purple-950/20"
          />
          <TaskColumn
            title="Done"
            status="done"
            tasks={doneTasks}
            color="from-green-500 to-emerald-500"
            cardColor="bg-green-50 dark:bg-green-950/20"
          />
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="mt-12 text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl sm:text-2xl font-poppins font-bold text-foreground mb-2">
              No Tasks Yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Create your first task to get started
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all"
            >
              Create Task
            </button>
          </div>
        )}
      </div>

      <AddTaskModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  )
}
