import axios from 'axios'
import { API_URL } from '../../config'
import { getCatalogue, setLoading } from '../reducers/mainReducer'

export const setCatalogue = () => async (dispatch) => {
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

export const filterCatalogue = (filter) => async (dispatch) => {
  const {
    genre,
    priceMin,
    priceMax,
    explicit,
    searchParam,
    formato,
    order,
    direction,
  } = filter
  dispatch(setLoading(true))
  try {
    const res = await axios.get(
      `${API_URL}album/searchAlbums?nombre=${searchParam}&min=${priceMin}&max=${priceMax}&explicito=${explicit}&formato=${formato}&genero=${genre}&sort=${order},${direction}`,
    )
    dispatch(getCatalogue(res.data.content))
  } catch (err) {
    console.log(err)
  } finally {
    dispatch(setLoading(false))
  }
}
