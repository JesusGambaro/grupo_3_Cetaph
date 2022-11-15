import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  landing: [],
  catalogue: [],
  genres: [],
  artistas: [],
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
    page: 0,
    size: {
      totalElements: 0,
      totalPages: 0,
    },
  },
  pageble: {
    size: 0,
  },
  user: {
    role: '',
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
    setRole: (state, action) => {
      state.user.role = action.payload
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
      console.log(action.payload)
      state.filter = {
        ...state.filter,
        [action.payload]:
          action.payload === 'price' ? { priceMin: '', priceMax: '' } : '',
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
  setRole,
  deleteFilter,
} = mainReducer.actions
