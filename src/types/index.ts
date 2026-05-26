export type Category = {
  id: string
  name: string
  color: string
  icon: string
}

export type Event = {
  id: string
  title: string
  categoryId: string
  date: string
  startTime: string
  endTime: string
  done: boolean
}

export type Task = {
  id: string
  title: string
  categoryId: string
  done: boolean
}