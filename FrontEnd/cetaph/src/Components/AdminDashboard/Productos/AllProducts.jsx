import React from 'react'
import { useState, useEffect } from 'react'
import './AllProductsStyle.scss'
import axios from 'axios'
import Loading from '../../Loading/Loading'
import { AlbumsAdmin } from './Albums/AlbumsAdmin'
import { ArtistasAdmin } from './Artistas/ArtistasAdmin'

import { filterCatalogue, getArtistas } from '../../../Redux/actions/catalogue'
import { getRol } from '../../../Redux/actions/user'
import { useDispatch, useSelector } from 'react-redux'
export const AllProducts = () => {
  const dispatch = useDispatch()
  const { filter, user } = useSelector(({ main }) => main)
  const [filters, setFilters] = useState({})
  const dividedGroups = () => {
    const start = Math.floor(filters.page / 4) * 4
    //console.log(filter.size.totalPages);
    return new Array(4).fill().map((_, i) => {
      let limit = start + i + 1
      return limit <= filter.size.totalPages && limit
    })
  }

  /* useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (!token || (token && !token.length)) navigate('/home')
    else {
      axios.get()
      if (role.admin) {
        dispatch(getAllProductsAdmin(token))
        dispatch(getLastSevenDaysOrders(token))
        dispatch(getAllOrders(token))
        dispatch(getAllGain(token))
        navigate('/home/admin/dashboard')
      } else if (role.admin === false) {
        navigate('/home')
      } else {
        dispatch(roleUser(token))
      }
    }
  }, [dispatch, navigate, role.admin, shoes.length]) */
  const goPage = (e) =>
    setFilters({ ...filters, page: Number(e.target.textContent) - 1 })
  const [showAlbums, setShowAlbums] = useState(true)

  return (
    <div className="AllProducts">
      <span className="select-products">
        <ul>
          <li
            className={showAlbums ? 'active' : 'inactive'}
            onClick={() => {
              setShowAlbums(true)
            }}
          >
            <h1>Albums</h1>
          </li>
          <li
            className={!showAlbums ? 'active' : 'inactive'}
            onClick={() => {
              setShowAlbums(false)
            }}
          >
            <h1>Artistas</h1>
          </li>
        </ul>
      </span>
      {showAlbums ? (
        <AlbumsAdmin></AlbumsAdmin>
      ) : (
        <ArtistasAdmin></ArtistasAdmin>
      )}
    </div>
  )
}
