import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Cart.scss'
import Loading from '../Loading/Loading'
import ConfirmDialog from '../AdminDashboard/ConfirmDialog/ConfirmDialog'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import ConfirmAlert from '../../hooks/ConfirmAlert'
const Cart = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState({
    isActive: false,
    cancelFunc: null,
    aceptFunc: null,
  })
  const [total, setTotal] = useState(0)
  const [albumsCart, setAlbumsCart] = useState([
    {
      id: 1,
      nombre: 'Mercury',
      precio: 123,
      stock: 123,
      fechaLanzamiento: '2022/11/13',
      duracion: '0',
      descripcion: '',
      formato: 'DVD',
      imagenes: [
        {
          id: 5,
          urlImg:
            'http://res.cloudinary.com/dsqpyqpnq/image/upload/v1668385581/imgs/ntyf2qvaasozrniqnjth.jpg',
          cloudinaryId: 'imgs/ntyf2qvaasozrniqnjth',
        },
      ],
      explicit: true,
      genero: {
        id: 1,
        generoName: 'Rock Pop',
      },
      artistas: [
        {
          id: 3,
          nombre: 'Imagine Dragons',
          nacionalidad: 'United States',
          fechanacimiento: '2022/11/13',
          descripcion: '',
          imagenes: {
            id: 3,
            urlImg:
              'http://res.cloudinary.com/dsqpyqpnq/image/upload/v1668385312/imgs/pmle1ndykunlzaodsqxa.jpg',
            cloudinaryId: 'imgs/pmle1ndykunlzaodsqxa',
          },
        },
        {
          id: 3,
          nombre: 'Imagine Dragons',
          nacionalidad: 'United States',
          fechanacimiento: '2022/11/13',
          descripcion: '',
          imagenes: {
            id: 3,
            urlImg:
              'http://res.cloudinary.com/dsqpyqpnq/image/upload/v1668385312/imgs/pmle1ndykunlzaodsqxa.jpg',
            cloudinaryId: 'imgs/pmle1ndykunlzaodsqxa',
          },
        },
        {
          id: 3,
          nombre: 'Imagine Dragons',
          nacionalidad: 'United States',
          fechanacimiento: '2022/11/13',
          descripcion: '',
          imagenes: {
            id: 3,
            urlImg:
              'http://res.cloudinary.com/dsqpyqpnq/image/upload/v1668385312/imgs/pmle1ndykunlzaodsqxa.jpg',
            cloudinaryId: 'imgs/pmle1ndykunlzaodsqxa',
          },
        },
        {
          id: 3,
          nombre: 'Imagine Dragons',
          nacionalidad: 'United States',
          fechanacimiento: '2022/11/13',
          descripcion: '',
          imagenes: {
            id: 3,
            urlImg:
              'http://res.cloudinary.com/dsqpyqpnq/image/upload/v1668385312/imgs/pmle1ndykunlzaodsqxa.jpg',
            cloudinaryId: 'imgs/pmle1ndykunlzaodsqxa',
          },
        },
      ],
      singles: [
        {
          id: 1,
          nombre: 'Sharks',
          duracion: 0,
          explicit: false,
          urlMusic:
            'http://res.cloudinary.com/dsqpyqpnq/video/upload/v1668385583/musica/kt1u28sjkqceftgyrcnj.mp3',
          cloudinaryId: 'musica/kt1u28sjkqceftgyrcnj',
        },
      ],
    },
  ])

  useEffect(() => {
    let t = 0
    albumsCart.map((album) => {
      t += album.precio
    })
    setTotal(t)
  }, [albumsCart])
  useEffect(() => {
    getCart()
  }, [])
  const getCart = () => {
    setLoading(true)
    axios
      .get(
        'http://localhost:9000/api/v1/cart/get?token=' +
          localStorage.getItem('token'),
      )
      .then(({ data }) => {
        console.log(data)
        setAlbumsCart(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const vaciarCarrito = (text) => {
    setLoading(true)
    axios
      .put(
        'http://localhost:9000/api/v1/cart/cleanCart?token=' +
          localStorage.getItem('token'),
      )
      .then(() => {
        getCart()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: text ? text : 'Se vacio el carrito',
          showConfirmButton: false,
          timer: 1000,
        })
      })
  }
  const toMinsAndSecs = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  const delCart = (idCart) => {
    setLoading(true)
    axios
      .put(
        `http://localhost:9000/api/v1/cart/deleteAlbum/?idAlbumBorrado=${idCart}&token=${localStorage.getItem(
          'token',
        )}`,
      )
      .then((res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se elimino el album del carrito',
          showConfirmButton: false,
          timer: 1000,
        })
        getCart()
      })
      .catch((res) => {
        console.log(res)
      })
  }
  return (
    <>
      <section className={'Cart'}>
        {albumsCart.length ? (
          <>
            {' '}
            <header className={'cart-header'}>
              <h1>Carrito de compra</h1>
              <span className="buttons">
                <button
                  className="options"
                  onClick={() => {
                    vaciarCarrito('La compra se realizo con exito')
                  }}
                >
                  <i class="fa-regular fa-credit-card"></i>
                  Comprar
                </button>
                <button
                  className="options"
                  onClick={() => {
                    if (!confirmDialog.isActive) {
                      setConfirmDialog({
                        isActive: true,
                        aceptFunc: () => {
                          vaciarCarrito()
                          setConfirmDialog({
                            ...confirmDialog,
                            isActive: false,
                            aceptFunc: null,
                            cancelFunc: null,
                          })
                        },
                        cancelFunc: () => {
                          setConfirmDialog({
                            ...confirmDialog,
                            isActive: false,
                            aceptFunc: null,
                            cancelFunc: null,
                          })
                        },
                      })
                    }
                  }}
                >
                  <i class="fa-solid fa-trash"></i>
                  Vaciar carrito
                </button>
              </span>
            </header>
            <div className={'albums-container'}>
              {loading ? (
                <Loading text={'Cargando carrito'} />
              ) : (
                <>
                  <div className="wrapper">
                    {albumsCart.map((album, key) => {
                      return (
                        <div className={'cart-card'} key={key}>
                          <div className="body">
                            <div className="imagen-album">
                              <img src={album.imagenes[0].urlImg} />
                            </div>
                            <div className="info">
                              <span className="title">
                                <h1>{album.nombre}</h1>
                              </span>
                              <span className="title">
                                <h1>${album.precio}</h1>
                              </span>
                              <div className="canciones-container">
                                <span className="subtitle">
                                  <h1>
                                    {album.singles.length}
                                    {' cancion/es'}
                                  </h1>
                                </span>
                                <span className="subtitle">
                                  <h1>
                                    {toMinsAndSecs(album.duracion)}
                                    {' duracion'}
                                  </h1>
                                </span>
                              </div>

                              <div className="artistas-container">
                                {album.artistas.map((ar, key) => {
                                  return (
                                    <span
                                      key={'artist ' + key}
                                      className="subtitle"
                                    >
                                      {key % 2 !== 0 && (
                                        <p key={Math.random * 99999}>·</p>
                                      )}
                                      <h1 className="artista">{ar.nombre}</h1>
                                    </span>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="buttons-container">
                            <button
                              onClick={() => {
                                ConfirmAlert({
                                  confirm: () => {
                                    delCart(album.id)
                                    setConfirmDialog({
                                      ...confirmDialog,
                                      isActive: false,
                                      aceptFunc: null,
                                      cancelFunc: null,
                                    })
                                  },
                                  cancel: () => {},
                                })
                              }}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <label className="totalprice">Total:${total}</label>
                </>
              )}
            </div>
          </>
        ) : (
          <header className="cart-header empty">
            <h1>Carrito de compra</h1>
            <h3
              onClick={() => {
                navigate('/Catalogue')
              }}
            >
              Click aqui para ir al catalogo
            </h3>
          </header>
        )}
      </section>
      {confirmDialog.isActive && (
        <ConfirmDialog
          cancelFunc={() => {
            confirmDialog.cancelFunc()
          }}
          aceptFunc={() => {
            confirmDialog.aceptFunc()
          }}
        ></ConfirmDialog>
      )}
    </>
  )
}

export default Cart
