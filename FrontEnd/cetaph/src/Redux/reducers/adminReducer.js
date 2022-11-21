import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  albums: [],
  artists: [],
  genres: [],
  formats: [],
  filterAlbums: {
    searchParam: '',
    page: 0,
    size: {
      totalElements: 0,
      totalPages: 0,
    },
  },
  filterArtist: {
    searchParam: '',
    page: 0,
    size: {
      totalElements: 0,
      totalPages: 0,
    },
  },
}
export const adminReducer = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setArtistas: (state, action) => {
      state.artistas = action.payload
    },
    setAlbums: (state, action) => {
      state.albums = action.payload
    },
    setFilterAlbums: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state.filterAlbums[key] = payload[key]
      })
    },
    setFilterArtist: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state.filterArtist[key] = payload[key]
      })
    },
    setGenres: (state, action) => {
      state.genres = action.payload
    },
    setFormats: (state, action) => {
      state.formats = action.payload
    },
  },
})

export default adminReducer.reducer

export const {
  setLoading,
  setFilterAlbums,
  setFilterArtist,
  setArtistas,
  setAlbums,
  setGenres,
  setFormats,
} = adminReducer.actions
