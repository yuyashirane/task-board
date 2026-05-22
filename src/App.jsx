import { useState } from 'react'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  const addTask = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setTasks([
      ...tasks,
      { id: Date.now(), text, done: false },
    ])
    setInput('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  return (
    <main className="app">
      <h1>Task Board</h1>

      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新しいタスクを入力"
          aria-label="新しいタスク"
        />
        <button type="submit">追加</button>
      </form>

      <ul className="task-list">
        {tasks.length === 0 && (
          <li className="empty">タスクはまだありません</li>
        )}
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.done ? 'done' : ''}`}
          >
            <label className="task-label">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-text">{task.text}</span>
            </label>
            <button
              type="button"
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
              aria-label={`${task.text} を削除`}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
