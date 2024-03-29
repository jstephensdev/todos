import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
    },
    reducers: {
        setTodos: (state, action) => {
            state.items = action.payload
        },
        addTodo: (state, action) => {
            state.items.push(action.payload)
        },
        toggleTodo: (state, action) => {
            const todo = state.items.find(
                (item) => item.id === action.payload.id
            )
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        updateTodo: (state, action) => {
            const todo = state.items.find(
                (item) => item.id === action.payload.id
            )
            if (todo) {
                todo.text = action.payload.text
            }
        },
        deleteTodo: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
            )
        },
    },
})

export const { setTodos, addTodo, toggleTodo, deleteTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer
