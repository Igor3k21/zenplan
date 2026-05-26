# 🗓️ Zenplan

A personal schedule organizer for study, gym, church and daily routines — built with React + TypeScript.

![Zenplan Preview](https://img.shields.io/badge/status-in%20development-6366F1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)

## ✨ Features

- 📅 **Weekly calendar** — navigate between weeks and days
- ✅ **Task manager** — organize tasks by category with completion tracking
- 🗂️ **Custom categories** — create categories with custom icons and colors
- 📊 **Dashboard** — daily summary with progress tracking
- 💾 **Local storage** — all data persists in the browser

## 🚀 Tech Stack

- **React 18** with functional components and hooks
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **React Router v6** for navigation
- **date-fns** for date manipulation
- **Vite** for fast development and build

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/Igor3k21/zenplan

# Navigate to the project folder
cd zenplan

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/     # Reusable components (Navbar)
├── context/        # Global state with React Context
├── pages/          # Application pages
│   ├── Dashboard.tsx
│   ├── Schedule.tsx
│   ├── Tasks.tsx
│   └── Categories.tsx
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## 🛣️ Roadmap

- [ ] Delete events and tasks
- [ ] Recurring events
- [ ] Backend integration (Supabase)
- [ ] Dark mode
- [ ] Mobile app (React Native)

## 📄 License

MIT