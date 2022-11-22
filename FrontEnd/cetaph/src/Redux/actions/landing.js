import axios from 'axios'
import { API_URL } from '../../utils/config'
import { setLanding, setLoading } from '../reducers/mainReducer'

export const getLanding = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const res = await axios.get(`${API_URL}album/getLanding`)
    dispatch(setLanding(res.data))
  } catch (err) {
    console.log(err)
  } finally {
    dispatch(setLoading(false))
  }
}
