import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', icon: '🏠', label: 'Início' },
  { to: '/schedule', icon: '📅', label: 'Agenda' },
  { to: '/tasks', icon: '✅', label: 'Tarefas' },
  { to: '/categories', icon: '🗂️', label: 'Categorias' },
]

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 z-50"
      style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(0,0,0,0.06)' }}
    >
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-4 py-1 rounded-2xl transition-all ${
              isActive ? 'text-indigo-600' : 'text-gray-400'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`text-xl transition-transform ${isActive ? 'scale-110' : ''}`}>{link.icon}</span>
              <span className={`text-xs font-medium ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>{link.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}