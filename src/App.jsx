import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
} from './store/slices/todoSlice'
import './App.css'

function App() {
    const [newTodo, setNewTodo] = useState('')
    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todos.items)

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        const response = await fetch('http://localhost:5002/todos')
        const data = await response.json()
        dispatch(setTodos(data))
    }

    const handleAddTodo = async () => {
        if (newTodo.trim() !== '') {
            const response = await fetch('http://localhost:5002/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newTodo }),
            })
            const data = await response.json()
            dispatch(addTodo(data))
            setNewTodo('')
        }
    }

    const handleToggleTodo = async (id) => {
        const response = await fetch(`http://localhost:5002/todos/${id}`, {
            method: 'PATCH',
        })
        const data = await response.json()
        dispatch(toggleTodo(data))
    }

    const handleDeleteTodo = async (id) => {
        await fetch(`http://localhost:5002/todos/${id}`, {
            method: 'DELETE',
        })
        dispatch(deleteTodo({ id }))
    }

    return (
        <div className="centeringContainer">
            <h1>Todo App</h1>
            <div>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={handleAddTodo}>Add Todo</button>

                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleTodo(todo.id)}
                            />
                            <span
                                style={{
                                    textDecoration: todo.completed
                                        ? 'line-through'
                                        : 'none',
                                }}
                            >
                                {todo.text}
                            </span>
                            <button onClick={() => handleDeleteTodo(todo.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default App
