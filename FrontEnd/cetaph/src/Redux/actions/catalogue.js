import axios from 'axios'
import { API_URL } from '../../utils/config'
import {
  setCatalogue,
  setFilter,
  setFormatos,
  setGenres,
  setLoading,
  setArtistas,
} from '../reducers/mainReducer'

export const getCatalogue = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await axios.get(`${API_URL}album`)
    dispatch(getCatalogue(res.data.content))
  } catch (err) {
    console.log(err)
  } finally {
    dispatch(setLoading(false))
  }
}

export const getArtistas = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await axios.get(`${API_URL}artista`)
    dispatch(setArtistas(res.data.content))
  } catch (err) {
    console.log(err)
  } finally {
    dispatch(setLoading(false))
  }
}

export const filterCatalogue = (filter, isPagination) => async (dispatch) => {
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
      setFilter({
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
      setFilter({
        size: {
          totalElements: res.data.totalElements,
          totalPages: res.data.totalPages,
        },
      }),
    )
    dispatch(setCatalogue(res.data.content))
  } catch (err) {
    console.log(err)
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
    console.log(err)
  } finally {
    dispatch(setLoading(false))
  }
}

export const getFormatos = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await axios.get(`${API_URL}album/formatos`)
    dispatch(setFormatos(res.data))
  } catch (err) {
    console.log(err)
  } finally {
    dispatch(setLoading(false))
  }
}
