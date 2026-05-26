import { useState } from 'react'
import { useApp } from '../context/AppContext'
import type { Task } from '../types'

export default function Tasks() {
  const { tasks, categories, addTask, toggleTask } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')

  function handleAdd() {
    if (!title.trim() || !categoryId) return
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      categoryId,
      done: false,
    }
    addTask(newTask)
    setTitle('')
    setCategoryId('')
    setShowForm(false)
  }

  const pending = tasks.filter(t => !t.done)
  const done = tasks.filter(t => t.done)

  return (
    <div className="p-5 max-w-lg mx-auto">
      <div className="flex items-center justify-between mt-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tarefas</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-white rounded-2xl w-10 h-10 flex items-center justify-center text-xl shadow-md transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
        >
          {showForm ? '×' : '+'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl p-5 mb-5 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">Nova tarefa</h2>

          <input
            type="text"
            placeholder="Nome da tarefa"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-3 mb-3 text-sm outline-none focus:border-indigo-300"
          />

          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-3 mb-4 text-sm outline-none focus:border-indigo-300"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>

          <button
            onClick={handleAdd}
            className="w-full text-white rounded-2xl p-3 font-semibold shadow-sm transition-transform active:scale-95"
            style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
          >
            Salvar tarefa
          </button>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="text-center text-gray-400 mt-16">
          <p className="text-5xl mb-3">✅</p>
          <p className="font-medium">Nenhuma tarefa ainda</p>
          <p className="text-sm mt-1">Toque no + para adicionar</p>
        </div>
      )}

      {pending.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Pendentes</p>
          {categories.map(category => {
            const categoryTasks = pending.filter(t => t.categoryId === category.id)
            if (categoryTasks.length === 0) return null
            return (
              <div key={category.id} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{category.icon}</span>
                  <p className="text-sm font-semibold text-gray-600">{category.name}</p>
                </div>
                {categoryTasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="bg-white rounded-2xl p-4 mb-2 flex items-center gap-3 cursor-pointer shadow-sm active:scale-95 transition-transform"
                  >
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: category.color }}>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{task.title}</p>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}

      {done.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Concluídas</p>
          {done.map(task => {
            const category = categories.find(c => c.id === task.categoryId)
            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="bg-white rounded-2xl p-4 mb-2 flex items-center gap-3 cursor-pointer opacity-50 shadow-sm"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: category?.color }}>
                  <span className="text-white text-xs">✓</span>
                </div>
                <p className="text-sm text-gray-400 line-through">{task.title}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}