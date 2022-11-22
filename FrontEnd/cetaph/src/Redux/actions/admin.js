import axios from 'axios'
import { API_URL } from '../../utils/config'
import {
  setLoading,
  setFilterArtist,
  setFilterAlbums,
  setArtistas,
  setAlbums,
  setGenres,
  setFormats,
} from '../reducers/adminReducer'

export const getArtistas = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await axios.get(`${API_URL}artista`)
    dispatch(setArtistas(res.data.content))
  } catch (err) {
    console.error(err)
  } finally {
    dispatch(setLoading(false))
  }
}
export const getAlbums = (filter) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await axios.get(`${API_URL}album`)
    dispatch(setArtistas(res.data.content))
  } catch (err) {
    console.error(err)
  } finally {
    dispatch(setLoading(false))
  }
}

export const searchAlbums = (filter, isPagination) => async (dispatch) => {
  let {
    genero = '',
    precio = { min: 0, max: 0 },
    explicito = '',
    searchParam = '',
    formato = '',
    sort = 'asc',
    direction = '',
  } = filter

  const page = isPagination ? filter.page : 0

  if (!isPagination) {
    dispatch(
      setFilterAlbums({
        page: 0,
      }),
    )
  }
  dispatch(setLoading(true))

  try {
    const res = await axios.get(
      `${API_URL}album/searchAlbums?page=${page}&size=${6}&nombre=${searchParam}&min=${
        precio.min || ''
      }&max=${
        precio.max || ''
      }&explicito=${explicito}&formato=${formato}&genero=${genero}&sort=${sort},${direction}`,
    )
    dispatch(
      setFilterAlbums({
        size: {
          totalElements: res.data.totalElements,
          totalPages: res.data.totalPages,
        },
      }),
    )

    dispatch(setAlbums(res.data.content))
  } catch (err) {
    console.error(err)
  } finally {
    dispatch(setLoading(false))
  }
}
export const searchArtist = (artistName = '') => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await axios.get(
      API_URL + 'artista/searchArtist?name=' + artistName,
    )
    dispatch(
      setFilterArtist({
        size: {
          totalElements: res.data.totalElements,
          totalPages: res.data.totalPages,
        },
      }),
    )
    dispatch(setArtistas(res.data))
  } catch (err) {
    console.error(err)
  } finally {
    dispatch(setLoading(false))
  }
}

export const getGenres = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await axios.get(`${API_URL}genero/normal`)

    dispatch(setGenres(res.data))
  } catch (err) {
    console.error(err)
  } finally {
    dispatch(setLoading(false))
  }
}

export const getFormatos = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await axios.get(`${API_URL}album/formatos`)
    dispatch(setFormats(res.data))
  } catch (err) {
    console.error(err)
  } finally {
    dispatch(setLoading(false))
  }
}
