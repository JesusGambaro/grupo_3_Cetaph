import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import './ArtistDetail.scss'
import Card from '../../Card/Card'
import Loading from '../../Loading/Loading'
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
        const { data } = await axios.get(
          `http://localhost:9000/api/v1/artista/${id}`,
        )
        artist = data
        console.log(data)
        setArtista(data)
        ;(async () => {
          try {
            const { data } = await axios.get(
              `http://localhost:9000/api/v1/album/searchAlbumsbyArtist/${artist.id}`,
            )
            console.log(data.content)
            setAlbums(data.content)
          } catch (e) {
            console.log(e)
          }
          setLoading(false)
        })()
      } catch (e) {
        console.log(e)
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
              {' '}
              <section className="imagen-container">
                <img src={artista?.imagenes?.urlImg} />
              </section>
              <section className="info">
                <span>
                  <label>Nombre:</label>
                  <h1>{artista.nombre}</h1>
                </span>
                <span>
                  <label>Descripcion:</label>
                  <h1>{artista.descripcion}</h1>
                </span>
                <span>
                  <label>Nacionalidad:</label>
                  <h1>{artista.nacionalidad}</h1>
                </span>
                <span>
                  <label>Fecha de nacimiento:</label>
                  <h1>{artista.fechanacimiento}</h1>
                </span>
              </section>
              <div className="disks-container">
                {albums?.length > 0 ? (
                  <>
                    <label>Albums:</label>
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
