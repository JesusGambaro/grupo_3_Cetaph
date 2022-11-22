import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import './ArtistDetail.scss'
import Card from '../../Card/Card'
import Loading from '../../Loading/Loading'
import { API_URL } from '../../../utils/config'
const ArtistDetail = () => {
  const { id } = useParams()
  const [artista, setArtista] = useState({})
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let artist
    ;(async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`${API_URL}artista/${id}`)
        artist = data
        setArtista(data)
        ;(async () => {
          try {
            const { data } = await axios.get(
              `${API_URL}album/searchAlbumsbyArtist/${artist.id}`,
            )
            setAlbums(data.content)
          } catch (err) {
            console.error(err)
          }
          setLoading(false)
        })()
      } catch (err) {
        console.error(err)
      }
    })()
  }, [id])
  return (
    <>
      <div className="ArtistDetail">
        <div className="wrapper">
          {loading ? (
            <Loading text={'Loading artist...'} />
          ) : (
            <>
              <section className="imagen-container">
                <img src={artista?.imagenes?.urlImg} />
              </section>
              <section className="info">
                <span className="info-artista">
                  <label>Nombre:</label>
                  <p>{artista.nombre}</p>
                </span>
                <span className="info-artista">
                  <label>Descripcion:</label>
                  <p>{artista.descripcion}</p>
                </span>
                <span className="info-artista">
                  <label>Nacionalidad:</label>
                  <p>{artista.nacionalidad}</p>
                </span>
                <span className="info-artista">
                  <label>Fecha de nacimiento:</label>
                  <p>{artista.fechanacimiento}</p>
                </span>
              </section>
              <div className="disks-container">
                {albums?.length > 0 ? (
                  <>
                    <label>Albums</label>
                    <div className="disks-wrapper">
                      {albums.map((disk, index) => (
                        <Card key={index} color={'black'} data={disk} />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h1>Este artista no tiene albums por el momento</h1>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ArtistDetail
