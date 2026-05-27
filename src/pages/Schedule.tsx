import { useState } from 'react'
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useApp } from '../context/AppContext'
import type { Event } from '../types'

export default function Schedule() {
  const { events, categories, addEvent, deleteEvent } = useApp()
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
      <div className="flex items-center justify-between mt-4 mb-2">
        <h1 className="text-xl font-bold hud-title">AGENDA</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="hud-button w-10 h-10 flex items-center justify-center text-xl rounded-xl"
        >
          {showForm ? '×' : '+'}
        </button>
      </div>
      <div className="hud-line mb-4" />

      {/* Navegação de semana */}
      <div className="hud-card flex items-center justify-between p-3 mb-3">
        <button
          onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          className="text-lg px-3 py-1 rounded-xl transition-colors"
          style={{ color: '#00e5ff' }}
        >
          ←
        </button>
        <p className="text-xs font-semibold capitalize" style={{ color: '#00e5ff', letterSpacing: '1px' }}>
          {format(selectedDate, "MMMM 'de' yyyy", { locale: ptBR })}
        </p>
        <button
          onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
          className="text-lg px-3 py-1 rounded-xl transition-colors"
          style={{ color: '#00e5ff' }}
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
              className="flex flex-col items-center py-2 rounded-xl flex-1 transition-all"
              style={
                isSelected
                  ? { background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', boxShadow: '0 0 12px rgba(0, 229, 255, 0.4)' }
                  : isToday
                  ? { background: 'rgba(0, 229, 255, 0.08)', border: '1px solid rgba(0, 229, 255, 0.3)' }
                  : { background: 'rgba(10, 20, 40, 0.5)' }
              }
            >
              <span className="text-xs font-medium" style={{ color: isSelected ? 'white' : '#c7f7ff' }}>
                {format(day, 'EEE', { locale: ptBR })}
              </span>
              <span className="text-sm font-bold mt-0.5" style={{ color: isSelected ? 'white' : isToday ? '#00e5ff' : '#c7f7ff' }}>
                {format(day, 'd')}
              </span>
            </button>
          )
        })}
      </div>

      {/* Data selecionada */}
      <p className="text-xs font-medium capitalize mb-4" style={{ color: '#00e5ff', letterSpacing: '1px' }}>
        {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
      </p>

      {/* Formulário */}
      {showForm && (
        <div className="hud-card p-5 mb-4">
          <p className="text-xs font-semibold mb-4" style={{ color: '#00e5ff', letterSpacing: '1px' }}>NOVO EVENTO</p>

          <input
            type="text"
            placeholder="Nome do evento"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="hud-input mb-3"
          />

          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            className="hud-input mb-3"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>

          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <p className="text-xs mb-1" style={{ color: '#00e5ff' }}>Início</p>
              <input
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="hud-input"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs mb-1" style={{ color: '#00e5ff' }}>Fim</p>
              <input
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="hud-input"
              />
            </div>
          </div>

          <button onClick={handleAdd} className="hud-button w-full p-3">
            SALVAR EVENTO
          </button>
        </div>
      )}

      {/* Eventos do dia */}
      {dayEvents.length === 0 ? (
        <div className="hud-card p-8 text-center mt-4">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-xs" style={{ color: '#c7f7ff' }}>Nenhum evento neste dia</p>
          <p className="text-xs mt-1" style={{ color: '#00e5ff' }}>Toque no + para adicionar</p>
        </div>
      ) : (
        <div>
          <p className="text-xs font-semibold mb-3" style={{ color: '#00e5ff', letterSpacing: '2px' }}>EVENTOS</p>
          {dayEvents
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map(event => {
              const category = categories.find(c => c.id === event.categoryId)
              return (
                <div key={event.id} className="hud-card p-4 mb-2 flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: 'rgba(0, 229, 255, 0.08)', border: '1px solid rgba(0, 229, 255, 0.2)' }}
                  >
                    {category?.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: '#c7f7ff' }}>{event.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#00e5ff' }}>{event.startTime} - {event.endTime}</p>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.25)', color: '#00e5ff' }}
                  >
                    {category?.name}
                  </span>
                  <button
                    onClick={() => deleteEvent(event.id)}
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