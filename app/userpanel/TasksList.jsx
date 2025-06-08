'use client'

import { useState } from 'react'

export default function TasksList({ tasks, editTaskAction, toggleTaskAction, deleteTaskAction }) {
  const [editStates, setEditStates] = useState({})
  const [inputs, setInputs] = useState(
    Object.fromEntries(tasks.map((task) => [task.id, task.title]))
  )

  const toggleEdit = (id) => {
    setEditStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleChange = (id, value) => {
    setInputs((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  return (
    <ul className="w-full max-w-md space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="border border-neutral-700 p-4 rounded-lg shadow-sm bg-neutral-900 text-white space-y-3"
        >
          <form action={editTaskAction} className="flex items-center gap-3">
            <input type="hidden" name="id" value={task.id} />
            <input
              type="text"
              name="title"
              value={inputs[task.id]}
              onChange={(e) => handleChange(task.id, e.target.value)}
              disabled={!editStates[task.id]}
              className={`flex-grow px-3 py-2 rounded-md text-sm bg-neutral-800 border transition-all
                ${
                  editStates[task.id]
                    ? 'border-indigo-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    : 'border-neutral-700 text-neutral-400 cursor-default'
                }
                ${task.is_done && 'line-through text-neutral-500'}
              `}
            />

            <button
              type="button"
              onClick={() => toggleEdit(task.id)}
              className="px-3 py-1 rounded text-xs border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition"
            >
              {editStates[task.id] ? 'Cancel' : 'Edit'}
            </button>

            {editStates[task.id] && (
              <button
                type="submit"
                className="px-3 py-1 rounded text-xs bg-green-600 text-white hover:bg-green-700 transition"
              >
                Save
              </button>
            )}
          </form>

          <div className="flex justify-between items-center">
            <form action={toggleTaskAction}>
              <input type="hidden" name="id" value={task.id} />
              <button
                type="submit"
                className="text-xs text-blue-400 hover:text-blue-200 underline"
              >
                {task.is_done ? 'Mark as Undone' : 'Mark as Done'}
              </button>
            </form>

            <form action={deleteTaskAction}>
              <input type="hidden" name="id" value={task.id} />
              <button
                type="submit"
                className="text-xs text-red-400 hover:text-red-200 underline"
              >
                Delete
              </button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  )
}
