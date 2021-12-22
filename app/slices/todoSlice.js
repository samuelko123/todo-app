import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const item = action.payload
      state.push(item)
    },
    deleteTodo: (state, action) => {
      const index = action.payload
      state.splice(index, 1)
    },
    toggleTodo: (state, action) => {
      const index = action.payload
      state[index].completed = !state[index].completed
    }
  },
})

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
} = todoSlice.actions

export const selectTodos = (state) => state.todos
export const todosReducer = todoSlice.reducer