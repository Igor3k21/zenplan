import { useState } from 'react'
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useApp } from '../context/AppContext'
import type { Event } from '../types'

export default function Schedule() {
  const { events, categories, addEvent } = useApp()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 0 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd')
  const dayEvents = events.filter(e => e.date === selectedDateStr)

  function handleAdd() {
    if (!title.trim() || !categoryId || !startTime || !endTime) return
    const newEvent: Event = {
      id: Date.now().toString(),
      title,
      categoryId,
      date: selectedDateStr,
      startTime,
      endTime,
      done: false,
    }
    addEvent(newEvent)
    setTitle('')
    setCategoryId('')
    setStartTime('')
    setEndTime('')
    setShowForm(false)
  }

  return (
    <div className="p-5 max-w-lg mx-auto">
      <div className="flex items-center justify-between mt-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Agenda</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-white rounded-2xl w-10 h-10 flex items-center justify-center text-xl shadow-md transition-transform active:scale-95"
          style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
        >
          {showForm ? '×' : '+'}
        </button>
      </div>

      {/* Navegação de semana */}
      <div className="flex items-center justify-between mb-3 bg-white rounded-2xl p-2 shadow-sm">
        <button
          onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          className="text-gray-400 hover:text-indigo-600 text-lg px-3 py-1 rounded-xl transition-colors"
        >
          ←
        </button>
        <p className="text-sm font-semibold text-gray-600 capitalize">
          {format(selectedDate, "MMMM 'de' yyyy", { locale: ptBR })}
        </p>
        <button
          onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
          className="text-gray-400 hover:text-indigo-600 text-lg px-3 py-1 rounded-xl transition-colors"
        >
          →
        </button>
      </div>

      {/* Dias da semana */}
      <div className="flex gap-1 mb-4">
        {weekDays.map(day => {
          const isSelected = isSameDay(day, selectedDate)
          const isToday = isSameDay(day, new Date())
          return (
            <button
              key={day.toISOString()}
              onClick={() => {
                setSelectedDate(day)
                setCurrentWeek(day)
              }}
              className={`flex flex-col items-center py-2 rounded-2xl flex-1 transition-all ${
                isSelected
                  ? 'text-white shadow-md'
                  : isToday
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-400 bg-white'
              }`}
              style={isSelected ? { background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' } : {}}
            >
              <span className="text-xs font-medium">{format(day, 'EEE', { locale: ptBR })}</span>
              <span className="text-sm font-bold mt-0.5">{format(day, 'd')}</span>
            </button>
          )
        })}
      </div>

      {/* Data selecionada */}
      <p className="text-sm font-medium capitalize mb-4" style={{ color: '#9B8EC4' }}>
        {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
      </p>

      {/* Formulário */}
      {showForm && (
        <div className="bg-white rounded-3xl p-5 mb-4 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">Novo evento</h2>

          <input
            type="text"
            placeholder="Nome do evento"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-3 mb-3 text-sm outline-none focus:border-indigo-300"
          />

          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-3 mb-3 text-sm outline-none focus:border-indigo-300"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>

          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <p className="text-xs text-gray-400 font-medium mb-1">Início</p>
              <input
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-3 text-sm outline-none focus:border-indigo-300"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 font-medium mb-1">Fim</p>
              <input
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="w-full border border-gray-100 bg-gray-50 rounded-2xl p-3 text-sm outline-none focus:border-indigo-300"
              />
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="w-full text-white rounded-2xl p-3 font-semibold shadow-sm transition-transform active:scale-95"
            style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
          >
            Salvar evento
          </button>
        </div>
      )}

      {/* Eventos do dia */}
      {dayEvents.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <p className="text-5xl mb-3">📅</p>
          <p className="font-medium">Nenhum evento neste dia</p>
          <p className="text-sm mt-1">Toque no + para adicionar</p>
        </div>
      ) : (
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Eventos</p>
          {dayEvents
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map(event => {
              const category = categories.find(c => c.id === event.categoryId)
              return (
                <div key={event.id} className="bg-white rounded-3xl p-4 mb-2 shadow-sm flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: (category?.color ?? '#6366F1') + '18' }}
                  >
                    {category?.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{event.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{event.startTime} - {event.endTime}</p>
                  </div>
                  <span
                    className="text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ backgroundColor: (category?.color ?? '#6366F1') + '18', color: category?.color }}
                  >
                    {category?.name}
                  </span>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}