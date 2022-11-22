import { useState, useEffect, useRef } from 'react'
import './DetailStyle.scss'
import { useParams } from 'react-router'
import axios from 'axios'
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-h5-audio-player/lib/styles.css'
import SongPlayer from './SongPlayer/SongPlayer'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import Swal from 'sweetalert2'
import AlertNeedToLogIng from '../../hooks/AlertNeedToLogIng'
import { useNavigate } from 'react-router'
import { API_URL } from '../../utils/config'
const Detail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [disk, setDisk] = useState({})
  const [loading, setLoading] = useState(true)
  const addCart = (idCart) => {
    axios
      .post(
        `${API_URL}cart/add?idAlbum=${idCart}&token=${localStorage.getItem(
          'token',
        )}`,
      )
      .then((res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se añadio al carrito correctamente',
          showConfirmButton: false,
          timer: 1000,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`${API_URL}album/${id}`)
        setDisk(data)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    })()
  }, [id])
  const [currentImage, setCurrentImage] = useState(0)

  const HandleCurrentState = (params) => {
    setCurrentImage(params)
  }
  const toMinsAndSecs = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const [currentSong, setCurrentSong] = useState(null)

  const tracksContainer = useRef(null)
  const handleSong = (song) => {
    setCurrentSong(song)
  }

  const handleSongChange = (dir) => {
    const index = disk.singles.findIndex((song) => song.id === currentSong.id)
    let newIndex = index + dir
    if (newIndex < 0) {
      newIndex = disk.singles.length - 1
    } else if (newIndex > disk.singles.length - 1) {
      newIndex = 0
    }
    tracksContainer.current.scrollTo({
      top: newIndex * 60 + 60 * 2 - 300,
      behavior: 'smooth',
    })
    handleSong(disk.singles[newIndex])
  }

  return (
    <>
      <div className="detail-container">
        {loading ? (
          <Loading text="Cargando album..." />
        ) : (
          <>
            <div className="album-info">
              <div className="imagen-disco">
                <img
                  className="disk-image"
                  src={disk?.imagenes[currentImage]?.urlImg}
                  alt=""
                />
                <div className="vinyl-disk">
                  <img
                    src="https://down.imgspng.com/download/0720/vinyl_PNG102.png"
                    alt=""
                  />
                </div>
                <div className="gallery-container">
                  {disk.imagenes.map(({ urlImg }, id) => {
                    return (
                      <div
                        className="gallery-item"
                        key={'ExtraImagenes' + id}
                        onClick={() => {
                          HandleCurrentState(id)
                        }}
                      >
                        <img src={urlImg} alt="" />
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="disco-info">
                <div className="info-wrapper">
                  <div className="info-column">
                    <span className="info-item">
                      <label>Nombre:</label>
                      <p>{disk?.nombre}</p>
                    </span>
                    <span className="info-item">
                      <label>Año de lanzamiento:</label>
                      <p>{disk?.fechaLanzamiento}</p>
                    </span>
                    <span className="info-item">
                      <label>Duracion:</label>
                      <p>{toMinsAndSecs(disk.duracion)}</p>
                    </span>
                    <span className="info-item">
                      <label>Canciones:</label>
                      <p>{disk?.singles.length}</p>
                    </span>
                  </div>
                  <div className="info-column">
                    <span className="info-item">
                      <label>Formato:</label>
                      <p>{disk?.formato}</p>
                    </span>
                    <span className="info-item">
                      <label>Artistas:</label>
                      <div className="wrapper">
                        {disk.artistas.map((artista, id) => {
                          return (
                            <p key={id} className={'artista-name'}>
                              {id > 0 && <div className="dot"></div>}
                              <Link to={'/Artista/' + artista.id}>
                                {artista.nombre}
                              </Link>
                            </p>
                          )
                        })}
                      </div>
                    </span>
                    <span className="info-item">
                      <label>Formato:</label>
                      <p>${disk?.precio}</p>
                    </span>

                    <span className="info-item">
                      <label>Descripción:</label>
                      <p>{disk?.descripcion}</p>
                    </span>
                  </div>
                </div>
                <div className="buttons-container">
                  <button
                    onClick={() => {
                      if (localStorage.getItem('token') == null) {
                        AlertNeedToLogIng({
                          confirm: () => {
                            navigate('/login')
                          },
                        })
                      } else {
                        addCart(disk.id)
                      }
                    }}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
            <div className="tracks-list">
              <h1>Lista de Canciones</h1>
              <div className="tracks">
                <ScrollContainer
                  innerRef={tracksContainer}
                  className="tracks-container"
                  hideScrollbars={false}
                  vertical={true}
                >
                  {disk?.singles?.map((track, id) => {
                    return (
                      <div
                        className={
                          'track' +
                          (currentSong?.id === track.id ? ' playing' : '')
                        }
                        key={'track' + id}
                      >
                        <p className="track-number">{id + 1}</p>
                        <h2 className="track-name">{track.nombre}</h2>
                        <p className="track-duration">
                          {toMinsAndSecs(track.duracion)}
                        </p>
                        <i
                          className="fa-regular fa-circle-play"
                          onClick={() => handleSong(track)}
                        ></i>
                      </div>
                    )
                  })}
                </ScrollContainer>
                <div className="player-container">
                  {currentSong ? (
                    <SongPlayer
                      prevSong={disk?.singles?.length == 1}
                      nextSong={
                        disk.singles.findIndex(
                          (c) => c.id === currentSong.id,
                        ) ===
                        disk.singles.length - 1
                      }
                      track={{ ...currentSong }}
                      handleSongChange={handleSongChange}
                    />
                  ) : (
                    <h1>Selecciona una canción</h1>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Detail
