import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', icon: '🏠', label: 'Início' },
  { to: '/schedule', icon: '📅', label: 'Agenda' },
  { to: '/tasks', icon: '✅', label: 'Tarefas' },
  { to: '/categories', icon: '🗂️', label: 'Categorias' },
]

export default function Navbar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 z-50"
      style={{
        background: 'rgba(2, 12, 27, 0.85)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(0, 229, 255, 0.25)',
        boxShadow: '0 0 20px rgba(0, 229, 255, 0.1)'
      }}
    >
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-4 py-1 rounded-2xl transition-all ${
              isActive ? '' : 'opacity-40'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`text-xl transition-transform ${isActive ? 'scale-110' : ''}`}>{link.icon}</span>
              <span
                className="text-xs font-medium"
                style={isActive ? { color: '#00e5ff', textShadow: '0 0 8px #00e5ff' } : { color: '#c7f7ff' }}
              >
                {link.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}