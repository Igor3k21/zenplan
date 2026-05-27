import { useState } from 'react'
import { useApp } from '../context/AppContext'
import type { Category } from '../types'

const ICONS = ['📚', '💪', '⛪', '🎮', '🎵', '💼', '🏠', '✈️', '🍎', '💰', '🎯', '🧘']
const COLORS = ['#00e5ff', '#3b82f6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#F97316']

export default function Categories() {
  const { categories, addCategory, deleteCategory } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('📚')
  const [color, setColor] = useState('#00e5ff')

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
    setColor('#00e5ff')
    setShowForm(false)
  }

  return (
    <div className="p-5 max-w-lg mx-auto">
      <div className="flex items-center justify-between mt-4 mb-2">
        <h1 className="text-xl font-bold hud-title">CATEGORIAS</h1>
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
          <p className="text-xs font-semibold mb-4" style={{ color: '#00e5ff', letterSpacing: '1px' }}>NOVA CATEGORIA</p>

          <input
            type="text"
            placeholder="Nome da categoria"
            value={name}
            onChange={e => setName(e.target.value)}
            className="hud-input mb-4"
          />

          <p className="text-xs font-semibold mb-2" style={{ color: '#00e5ff', letterSpacing: '1px' }}>ÍCONE</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {ICONS.map(i => (
              <button
                key={i}
                onClick={() => setIcon(i)}
                className="text-xl p-2 rounded-xl transition-all"
                style={icon === i ? { background: 'rgba(0, 229, 255, 0.15)', border: '1px solid rgba(0, 229, 255, 0.5)' } : { background: 'rgba(10, 20, 40, 0.5)' }}
              >
                {i}
              </button>
            ))}
          </div>

          <p className="text-xs font-semibold mb-2" style={{ color: '#00e5ff', letterSpacing: '1px' }}>COR</p>
          <div className="flex gap-2 mb-5">
            {COLORS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-8 h-8 rounded-full transition-all"
                style={{
                  backgroundColor: c,
                  boxShadow: color === c ? `0 0 10px ${c}` : 'none',
                  transform: color === c ? 'scale(1.2)' : 'scale(1)',
                  border: color === c ? `2px solid white` : 'none'
                }}
              />
            ))}
          </div>

          <button onClick={handleAdd} className="hud-button w-full p-3">
            SALVAR CATEGORIA
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        {categories.map(category => (
          <div key={category.id} className="hud-card p-4 text-center relative">
            <button
              onClick={() => deleteCategory(category.id)}
              className="absolute top-2 right-2 text-xs w-5 h-5 flex items-center justify-center rounded-full transition-all hover:scale-110"
              style={{ color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)', fontSize: '10px' }}
            >
              ✕
            </button>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-2"
              style={{ background: 'rgba(0, 229, 255, 0.08)', border: '1px solid rgba(0, 229, 255, 0.2)' }}
            >
              {category.icon}
            </div>
            <p className="text-xs font-medium" style={{ color: '#c7f7ff' }}>{category.name}</p>
            <div className="w-6 h-0.5 rounded-full mx-auto mt-2" style={{ background: category.color, boxShadow: `0 0 6px ${category.color}` }} />
          </div>
        ))}
      </div>
    </div>
  )
}