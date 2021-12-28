import { createSlice } from '@reduxjs/toolkit'
import { STATUS_FILTER } from '../constants'

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    status: STATUS_FILTER.ACTIVE
  },
  reducers: {
    updateStatusFilter:(state, action) => {
      state.status = action.payload
    },
  },
})

export const {
  updateStatusFilter
} = filterSlice.actions

export const filterReducer = filterSlice.reducer