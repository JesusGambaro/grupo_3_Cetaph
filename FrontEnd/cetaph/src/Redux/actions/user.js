import axios from 'axios'
import { API_URL } from '../../config'
import { setRole, setLoading } from '../reducers/mainReducer'

export const getRol = (token) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await axios.get(`${API_URL}verify/?token=${token}`)
    //console.log('res', res.data[0])
    dispatch(setRole(res.data[0]))
  } catch (err) {
    console.log(err)
  } finally {
    dispatch(setLoading(false))
  }
}
