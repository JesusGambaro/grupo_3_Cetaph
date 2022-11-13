import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  landing: [],
  catalogue: [],
  genres: [],
  formatos: [],
  filter: {
    genre: '',
    priceMin: '',
    priceMax: '',
    explicit: '',
    searchParam: '',
    formato: '',
    sort: '',
    direction: '',
  },
  cart: [],
}
export const mainReducer = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setLanding: (state, action) => {
      state.landing = action.payload
    },
    setCatalogue: (state, action) => {
      state.catalogue = action.payload
    },
    setFilter: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state.filter[key] = payload[key]
      })
    },
    setGenres: (state, action) => {
      state.genres = action.payload
    },
    setFormatos: (state, action) => {
      state.formatos = action.payload
    },
  },
})

export default mainReducer.reducer

export const {
  setLoading,
  setLanding,
  setCatalogue,
  setFilter,
  setGenres,
  setFormatos,
} = mainReducer.actions
