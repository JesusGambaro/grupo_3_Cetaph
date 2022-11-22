import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Cart.scss'
import Loading from '../Loading/Loading'
import ConfirmDialog from '../AdminDashboard/ConfirmDialog/ConfirmDialog'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import ConfirmAlert from '../../hooks/ConfirmAlert'
import { API_URL } from '../../utils/config'
const Cart = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [albumsCart, setAlbumsCart] = useState([])

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
      .get(API_URL + 'cart/get', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
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
        API_URL + 'cart/cleanCart',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
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
        API_URL + `cart/deleteAlbum/?idAlbumBorrado=${idCart}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
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
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <section className={'Cart'}>
        {albumsCart.length ? (
          <>
            <header className={'cart-header'}>
              <h1>Carrito de compra</h1>
              <span className="buttons">
                <button
                  className="options"
                  onClick={() => {
                    vaciarCarrito('La compra se realizo con exito')
                  }}
                >
                  <i className="fa-regular fa-credit-card"></i>
                  Comprar
                </button>
                <button
                  className="options"
                  onClick={() => {
                    ConfirmAlert({
                      confirm: () => {
                        vaciarCarrito()
                      },
                      cancel: () => {},
                    })
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
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
    </>
  )
}

export default Cart
