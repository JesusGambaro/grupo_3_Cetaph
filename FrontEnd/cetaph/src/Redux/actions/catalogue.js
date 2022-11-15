import axios from 'axios'
import { API_URL } from '../../config'
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

export const filterCatalogue = (filter) => async (dispatch) => {
  const {
    genre,
    priceMin,
    priceMax,
    explicit,
    searchParam,
    formato,
    sort,
    direction,
    page,
  } = filter
  dispatch(setLoading(true))

  try {
    const res = await axios.get(
      `${API_URL}album/searchAlbums?page=${page}&size=${6}&nombre=${searchParam}&min=${priceMin}&max=${priceMax}&explicito=${explicit}&formato=${formato}&genero=${genre}&sort=${sort},${direction}`,
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
