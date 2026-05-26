import { useState } from 'react'
import { useApp } from '../context/AppContext'
import type { Category } from '../types'

const ICONS = ['📚', '💪', '⛪', '🎮', '🎵', '💼', '🏠', '✈️', '🍎', '💰', '🎯', '🧘']
const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316']

export default function Categories() {
  const { categories, addCategory } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('📚')
  const [color, setColor] = useState('#6366F1')

  function handleAdd() {
    if (!name.trim()) return
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      icon,
      color,
    }
    addCategory(newCategory)
    setName('')
    setIcon('📚')
    setColor('#6366F1')
    setShowForm(false)
  }

  return (
    <div className="p-5 max-w-lg mx-auto">
      <div className="flex items-center justify-between mt-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Categorias</h1>
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
          <h2 className="font-semibold text-gray-700 mb-4">Nova categoria</h2>

          <input
            type="text"
            placeholder="Nome da categoria"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-3 mb-4 text-sm outline-none focus:border-indigo-300"
          />

          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Ícone</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {ICONS.map(i => (
              <button
                key={i}
                onClick={() => setIcon(i)}
                className={`text-xl p-2 rounded-xl transition-all ${icon === i ? 'bg-indigo-100 scale-110' : 'bg-gray-50'}`}
              >
                {i}
              </button>
            ))}
          </div>

          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Cor</p>
          <div className="flex gap-2 mb-5">
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                className={`w-8 h-8 rounded-full transition-all ${color === c ? 'scale-125 ring-2 ring-offset-2 ring-gray-300' : ''}`}
              />
            ))}
          </div>

          <button
            onClick={handleAdd}
            className="w-full text-white rounded-2xl p-3 font-semibold shadow-sm transition-transform active:scale-95"
            style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
          >
            Salvar categoria
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {categories.map(category => (
          <div
            key={category.id}
            className="bg-white rounded-3xl p-4 text-center shadow-sm"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2"
              style={{ backgroundColor: category.color + '18' }}
            >
              {category.icon}
            </div>
            <p className="text-xs font-semibold text-gray-600">{category.name}</p>
            <div className="w-6 h-1 rounded-full mx-auto mt-2" style={{ backgroundColor: category.color }} />
          </div>
        ))}
      </div>
    </div>
  )
}