import { createSlice } from "@reduxjs/toolkit";

const todoList = createSlice({
    name: 'todoList',
    initialState: {
        loading: false,
        content: []
    },
    reducers: {
        loadTodos: (state, action) => {
            state.content = localStorage.getItem('content') ? JSON.parse(localStorage.getItem('content')) : []
        },
        addTodo: (state, action) => {
            state.content.push(action.payload)
            localStorage.setItem('content', JSON.stringify(state.content))
        },
        changeTodo: (state, action) => {
            const find = state.content.find((item) => {
                return item.id === action.payload
            })
            find.completed = true
            localStorage.setItem('content', JSON.stringify(state.content))
        },
        deleteTodo: (state, action) => {
            state.content = state.content.filter(item => item.id !== action.payload)
            localStorage.setItem('content', JSON.stringify(state.content))
        }
    }
})

export const { addTodo, changeTodo, deleteTodo, loadTodos } = todoList.actions
export default todoList.reducer