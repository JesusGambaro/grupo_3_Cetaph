import axios from 'axios'
import { API_URL } from '../../utils/config'
import { setUser } from '../reducers/mainReducer'

export const getUser = (token) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}verify/?token=${token}`)
    dispatch(setUser(res.data))
  } catch (err) {
    console.error(err)
  }
}
