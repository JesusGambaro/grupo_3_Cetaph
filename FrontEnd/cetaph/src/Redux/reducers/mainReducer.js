import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  landing: [],
  catalogue: [],
  cart: [],
  filter: {
    genre: '',
    priceMin: '',
    priceMax: '',
    explicit: '',
    searchParam: '',
    formato: '',
    order: '',
    direction: '',
  },
}

export const mainReducer = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    getLanding: (state, action) => {
      state.landing = action.payload
    },
    getCatalogue: (state, action) => {
      state.catalogue = action.payload
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
  },
})

export default mainReducer.reducer

export const {
  setLoading,
  getLanding,
  getCatalogue,
  setFilter,
} = mainReducer.actions
