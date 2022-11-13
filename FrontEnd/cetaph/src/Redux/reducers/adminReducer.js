import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  products: [],
}
export const adminReducer = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export default adminReducer.reducer

export const { setLoading } = adminReducer.actions
