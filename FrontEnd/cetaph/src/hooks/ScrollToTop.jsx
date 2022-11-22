import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { filterCatalogue } from '../Redux/actions/catalogue'
import { initialState, setFilter } from '../Redux/reducers/mainReducer'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (pathname !== '/catalogue') {
      dispatch(setFilter(initialState.filter))
      dispatch(filterCatalogue(initialState.filter))
    }
  }, [pathname])

  return null
}
