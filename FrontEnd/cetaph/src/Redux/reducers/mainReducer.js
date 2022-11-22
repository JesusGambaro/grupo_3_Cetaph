import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  loading: false,
  landing: [],
  catalogue: [],
  genres: [],
  artistas: [],
  formatos: [],
  filter: {
    genero: '',
    precio: {
      min: 0,
      max: 0,
    },
    explicito: '',
    searchParam: '',
    formato: '',
    sort: '',
    direction: '',
    page: 0,
    size: {
      totalElements: 0,
      totalPages: 0,
    },
  },
  user: {
    username: '',
    rol: '',
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
    setArtistas: (state, action) => {
      state.artistas = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
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
    deleteFilter: (state, action) => {
      state.filter = {
        ...state.filter,
        [action.payload]: action.payload === 'precio' ? { min: 0, max: 0 } : '',
      }
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
  setArtistas,
  setUser,
  deleteFilter,
} = mainReducer.actions
