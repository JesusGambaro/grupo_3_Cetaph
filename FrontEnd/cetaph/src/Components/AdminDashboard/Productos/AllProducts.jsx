import React from 'react'
import { useState, useEffect } from 'react'
import './AllProductsStyle.scss'
import { AlbumsAdmin } from './Albums/AlbumsAdmin'
import { ArtistasAdmin } from './Artistas/ArtistasAdmin'
export const AllProducts = () => {
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
