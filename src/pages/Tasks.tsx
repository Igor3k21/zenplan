import { useState } from 'react'
import { useApp } from '../context/AppContext'
import type { Task } from '../types'

export default function Tasks() {
  const { tasks, categories, addTask, toggleTask, deleteTask } = useApp()
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
      <div className="flex items-center justify-between mt-4 mb-2">
        <h1 className="text-xl font-bold hud-title">TAREFAS</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="hud-button w-10 h-10 flex items-center justify-center text-xl rounded-xl"
        >
          {showForm ? '×' : '+'}
        </button>
      </div>
      <div className="hud-line mb-4" />

      {showForm && (
        <div className="hud-card p-5 mb-4">
          <p className="text-xs font-semibold mb-4" style={{ color: '#00e5ff', letterSpacing: '1px' }}>NOVA TAREFA</p>

          <input
            type="text"
            placeholder="Nome da tarefa"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="hud-input mb-3"
          />

          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            className="hud-input mb-4"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>

          <button onClick={handleAdd} className="hud-button w-full p-3">
            SALVAR TAREFA
          </button>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="hud-card p-8 text-center mt-4">
          <p className="text-4xl mb-3">✅</p>
          <p className="text-xs" style={{ color: '#c7f7ff' }}>Nenhuma tarefa ainda</p>
          <p className="text-xs mt-1" style={{ color: '#00e5ff' }}>Toque no + para adicionar</p>
        </div>
      )}

      {pending.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold mb-3" style={{ color: '#00e5ff', letterSpacing: '2px' }}>PENDENTES</p>
          {categories.map(category => {
            const categoryTasks = pending.filter(t => t.categoryId === category.id)
            if (categoryTasks.length === 0) return null
            return (
              <div key={category.id} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{category.icon}</span>
                  <p className="text-xs font-semibold" style={{ color: '#c7f7ff' }}>{category.name}</p>
                </div>
                {categoryTasks.map(task => (
                  <div
                    key={task.id}
                    className="hud-card p-4 mb-2 flex items-center gap-3"
                  >
                    <div
                      onClick={() => toggleTask(task.id)}
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer"
                      style={{ borderColor: '#00e5ff' }}
                    />
                    <p
                      onClick={() => toggleTask(task.id)}
                      className="text-sm flex-1 cursor-pointer"
                      style={{ color: '#c7f7ff' }}
                    >
                      {task.title}
                    </p>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-xs px-2 py-1 rounded-lg transition-all hover:scale-105"
                      style={{ color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)' }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}

      {done.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-3" style={{ color: '#3b82f6', letterSpacing: '2px' }}>CONCLUÍDAS</p>
          {done.map(task => {
            const category = categories.find(c => c.id === task.categoryId)
            return (
              <div key={task.id} className="hud-card p-4 mb-2 flex items-center gap-3 opacity-50">
                <div
                  onClick={() => toggleTask(task.id)}
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer"
                  style={{ background: '#00e5ff', boxShadow: '0 0 6px #00e5ff' }}
                >
                  <span className="text-xs text-black font-bold">✓</span>
                </div>
                <p
                  onClick={() => toggleTask(task.id)}
                  className="text-sm flex-1 line-through cursor-pointer"
                  style={{ color: '#c7f7ff' }}
                >
                  {task.title}
                </p>
                <span className="text-xs" style={{ color: '#00e5ff' }}>{category?.icon}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-xs px-2 py-1 rounded-lg transition-all hover:scale-105"
                  style={{ color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)' }}
                >
                  ✕
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}