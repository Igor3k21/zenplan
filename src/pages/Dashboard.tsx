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
        <p className="text-sm font-medium capitalize" style={{ color: '#9B8EC4' }}>
          {format(today, "EEEE, dd 'de' MMMM", { locale: ptBR })}
        </p>
        <h1 className="text-3xl font-bold text-gray-800 mt-1">Olá, bem-vindo! 👋</h1>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-3xl p-5" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
          <p className="text-indigo-200 text-xs font-medium mb-1">Eventos hoje</p>
          <p className="text-4xl font-bold text-white">{todayEvents.length}</p>
        </div>
        <div className="rounded-3xl p-5" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
          <p className="text-emerald-200 text-xs font-medium mb-1">Tarefas pendentes</p>
          <p className="text-4xl font-bold text-white">{pendingTasks.length}</p>
        </div>
      </div>

      {/* Progresso de tarefas */}
      {tasks.length > 0 && (
        <div className="bg-white rounded-3xl p-5 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-gray-700">Progresso geral</p>
            <p className="text-sm font-bold text-indigo-600">{progress}%</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">{doneTasks.length} de {tasks.length} tarefas concluídas</p>
        </div>
      )}

      {/* Eventos de hoje */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-700 mb-3">Hoje</h2>
        {todayEvents.length === 0 ? (
          <div className="bg-white rounded-3xl p-5 text-center border border-gray-100">
            <p className="text-3xl mb-1">🌤️</p>
            <p className="text-gray-400 text-sm">Nenhum evento para hoje</p>
          </div>
        ) : (
          todayEvents.map(event => {
            const category = categories.find(c => c.id === event.categoryId)
            return (
              <div key={event.id} className="bg-white rounded-3xl p-4 mb-2 shadow-sm flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: (category?.color ?? '#6366F1') + '22' }}
                >
                  {category?.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{event.title}</p>
                  <p className="text-xs text-gray-400">{event.startTime} - {event.endTime}</p>
                </div>
                <span
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: (category?.color ?? '#6366F1') + '18', color: category?.color }}
                >
                  {category?.name}
                </span>
              </div>
            )
          })
        )}
      </div>

      {/* Categorias */}
      <div>
        <h2 className="text-base font-semibold text-gray-700 mb-3">Suas categorias</h2>
        <div className="grid grid-cols-3 gap-3">
          {categories.map(category => (
            <div
              key={category.id}
              className="bg-white rounded-3xl p-4 text-center shadow-sm"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2"
                style={{ backgroundColor: category.color + '18' }}
              >
                {category.icon}
              </div>
              <p className="text-xs font-semibold text-gray-600">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}