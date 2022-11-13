import { GET_LANDING, SET_LOADING } from '../types'
import axios from 'axios'
import { API_URL } from '../../config'
import { getLanding, setLoading } from '../reducers/mainReducer'
export const setLanding = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await axios.get(`${API_URL}album/getLanding`)
    dispatch(getLanding(res.data))
  } catch (err) {
    console.log(err)
  } finally {
    dispatch(setLoading(false))
  }
}
