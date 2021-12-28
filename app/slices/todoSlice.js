import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const item = {
        id: Date.now(),
        ...action.payload
      }
      state.push(item)
    },
    deleteTodo: (state, action) => {
      const id = action.payload
      for (let i = state.length - 1; i >= 0; i--){
        if (state[i].id === id){
          state.splice(i, 1)
        }
      }
    },
    toggleTodo: (state, action) => {
      const id = action.payload
      for(const item of state){
        if (item.id === id){
          item.completed = !item.completed
        }
      }
    }
  },
})

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
} = todoSlice.actions

export const todosReducer = todoSlice.reducer