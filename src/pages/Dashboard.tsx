import { useApp } from '../context/AppContext'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function Dashboard() {
  const { categories, tasks, events } = useApp()

  const today = new Date()
  const todayStr = format(today, 'yyyy-MM-dd')

  const todayEvents = events.filter(e => e.date === todayStr)
  const pendingTasks = tasks.filter(t => !t.done)
  const doneTasks = tasks.filter(t => t.done)
  const progress = tasks.length > 0 ? Math.round((doneTasks.length / tasks.length) * 100) : 0

  return (
    <div className="p-5 max-w-lg mx-auto">
      {/* Cabeçalho */}
      <div className="mb-6 mt-4">
        <p className="text-xs font-medium capitalize" style={{ color: '#00e5ff', textShadow: '0 0 8px #00e5ff', letterSpacing: '2px' }}>
          {format(today, "EEEE, dd 'de' MMMM", { locale: ptBR })}
        </p>
        <div className="hud-line mt-2" />
        <h1 className="text-xl font-bold mt-2 hud-title">ZENPLAN</h1>
        <p className="text-xs mt-1" style={{ color: '#c7f7ff' }}>Olá, bem-vindo de volta 👋</p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="hud-card p-5">
          <p className="text-xs mb-1" style={{ color: '#00e5ff', letterSpacing: '1px' }}>EVENTOS HOJE</p>
          <p className="text-4xl font-bold" style={{ color: '#00e5ff', textShadow: '0 0 12px #00e5ff' }}>{todayEvents.length}</p>
        </div>
        <div className="hud-card p-5">
          <p className="text-xs mb-1" style={{ color: '#3b82f6', letterSpacing: '1px' }}>PENDENTES</p>
          <p className="text-4xl font-bold" style={{ color: '#3b82f6', textShadow: '0 0 12px #3b82f6' }}>{pendingTasks.length}</p>
        </div>
      </div>

      {/* Progresso */}
      {tasks.length > 0 && (
        <div className="hud-card p-5 mb-5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-semibold" style={{ color: '#00e5ff', letterSpacing: '1px' }}>PROGRESSO GERAL</p>
            <p className="text-sm font-bold" style={{ color: '#00e5ff', textShadow: '0 0 8px #00e5ff' }}>{progress}%</p>
          </div>
          <div className="w-full rounded-full h-2" style={{ background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', boxShadow: '0 0 8px #00e5ff' }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: '#c7f7ff' }}>{doneTasks.length} de {tasks.length} tarefas concluídas</p>
        </div>
      )}

      {/* Eventos de hoje */}
      <div className="mb-5">
        <p className="text-xs font-semibold mb-3" style={{ color: '#00e5ff', letterSpacing: '2px' }}>HOJE</p>
        {todayEvents.length === 0 ? (
          <div className="hud-card p-5 text-center">
            <p className="text-3xl mb-2">🌤️</p>
            <p className="text-xs" style={{ color: '#c7f7ff' }}>Nenhum evento para hoje</p>
          </div>
        ) : (
          todayEvents.map(event => {
            const category = categories.find(c => c.id === event.categoryId)
            return (
              <div key={event.id} className="hud-card p-4 mb-2 flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.2)' }}
                >
                  {category?.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: '#c7f7ff' }}>{event.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#00e5ff' }}>{event.startTime} - {event.endTime}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.25)', color: '#00e5ff' }}>
                  {category?.name}
                </span>
              </div>
            )
          })
        )}
      </div>

      {/* Categorias */}
      <div>
        <p className="text-xs font-semibold mb-3" style={{ color: '#00e5ff', letterSpacing: '2px' }}>CATEGORIAS</p>
        <div className="grid grid-cols-3 gap-3">
          {categories.map(category => (
            <div key={category.id} className="hud-card p-4 text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-2"
                style={{ background: 'rgba(0, 229, 255, 0.08)', border: '1px solid rgba(0, 229, 255, 0.2)' }}
              >
                {category.icon}
              </div>
              <p className="text-xs font-medium" style={{ color: '#c7f7ff' }}>{category.name}</p>
              <div className="w-6 h-0.5 rounded-full mx-auto mt-2" style={{ background: '#00e5ff', boxShadow: '0 0 6px #00e5ff' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}