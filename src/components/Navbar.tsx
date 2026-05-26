import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
      <NavLink to="/" className={({ isActive }) => isActive ? 'flex flex-col items-center text-indigo-600' : 'flex flex-col items-center text-gray-400'}>
        <span className="text-xl">🏠</span>
        <span className="text-xs">Início</span>
      </NavLink>
      <NavLink to="/schedule" className={({ isActive }) => isActive ? 'flex flex-col items-center text-indigo-600' : 'flex flex-col items-center text-gray-400'}>
        <span className="text-xl">📅</span>
        <span className="text-xs">Agenda</span>
      </NavLink>
      <NavLink to="/tasks" className={({ isActive }) => isActive ? 'flex flex-col items-center text-indigo-600' : 'flex flex-col items-center text-gray-400'}>
        <span className="text-xl">✅</span>
        <span className="text-xs">Tarefas</span>
      </NavLink>
      <NavLink to="/categories" className={({ isActive }) => isActive ? 'flex flex-col items-center text-indigo-600' : 'flex flex-col items-center text-gray-400'}>
        <span className="text-xl">🗂️</span>
        <span className="text-xs">Categorias</span>
      </NavLink>
    </nav>
  )
}