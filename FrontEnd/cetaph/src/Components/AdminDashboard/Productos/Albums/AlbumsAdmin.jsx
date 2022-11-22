import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CreateAlbumForm from '../../Formulario/CreateAlbum/CreateAlbumFormNew'
import Loading from '../../../Loading/Loading'
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog'
import { searchAlbums } from '../../../../Redux/actions/admin'
import { getUser } from '../../../../Redux/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { API_URL } from '../../../../utils/config'
import usePagination from '../../../../hooks/usePagination'
export const AlbumsAdmin = () => {
  const navigate = useNavigate()
  const [formActive, setFormActive] = useState(false)
  const [isCreating, setCreating] = useState(false)
  const [albumObject, setAlbumObject] = useState()
  const [searchTerm, setSearchTerm] = useState()
  const [searhTimeOut, setSearhTimeOut] = useState()
  const { albums } = useSelector(({ admin }) => admin)
  const [confirmDialog, setConfirmDialog] = useState({
    isActive: false,
    cancelFunc: null,
    aceptFunc: null,
  })
  const [artistas_select, setArtistasSelect] = useState([])
  const dispatch = useDispatch()
  const [filters, setFilters] = useState({})
  const { album, loading, filterAlbums, artistas } = useSelector(
    ({ admin }) => admin,
  )
  const { user } = useSelector(({ main }) => main)
  useEffect(() => {
    dispatch(
      searchAlbums({
        genre: '',
        priceMin: '',
        priceMax: '',
        explicit: '',
        searchParam: '',
        formato: '',
        sort: '',
        direction: '',
        page: 0,
      }),
    )
    setFilters(filterAlbums)
  }, [])
  useEffect(() => {
    dispatch(getUser(localStorage.getItem('token')))
  }, [])
  useEffect(() => {
    if (user.rol != 'Admin') {
      navigate('/')
    }
  }, [user])
  const deleteAlbum = (id) => {
    axios
      .delete(API_URL + 'album/deleteComplete/' + id)
      .then((res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Album borrado con exito',
          showConfirmButton: false,
          timer: 1000,
        })
      })
      .finally(() => {
        setFilters({
          genre: '',
          priceMin: '',
          priceMax: '',
          explicit: '',
          searchParam: '',
          formato: '',
          sort: '',
          direction: '',
          page: 0,
        })
        dispatch(
          searchAlbums({
            genre: '',
            priceMin: '',
            priceMax: '',
            explicit: '',
            searchParam: '',
            formato: '',
            sort: '',
            direction: '',
            page: 0,
          }),
        )
      })
  }

  const selectStyle = {
    control: (provided, state) => ({
      display: 'flex',
      width: '20rem',
      minHeight: '3rem',
      border: '2px solid black',
      borderRadius: '5px',
    }),
    menu: (provided, state) => ({
      ...provided,
      width: '20rem',
      border: '2px solid black',
      borderRadius: 0,
      padding: 0,
      position: 'absolute',
      botton: '0',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: 'black',
      transition: 'none',
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: 'black',
    }),
  }
  useEffect(() => {
    dispatch(searchAlbums({ ...filterAlbums, ...filters }))
    window.scrollTo(0, 0)
  }, [filters])

  const setUpFilters = (props) => {
    setFilters((prev) => {
      let copy = { ...prev, ...props }
      return copy
    })
  }

  const { Pagination } = usePagination(filterAlbums, true)
  return (
    <>
      <div className="wrapper">
        {formActive ? (
          <CreateAlbumForm
            cancelFunc={() => {
              setFormActive(!formActive)
              setAlbumObject(null)
              dispatch()
              /*    filterCatalogue({
                  genre: '',
                  priceMin: '',
                  priceMax: '',
                  explicit: '',
                  searchParam: '',
                  formato: '',
                  sort: '',
                  direction: '',
                  page: 0,
                }), */
            }}
            albumObject={albumObject}
            isCreating={isCreating}
            getAlbums={() => {
              dispatch()
              /* filterCatalogue({
                  genre: '',
                  priceMin: '',
                  priceMax: '',
                  explicit: '',
                  searchParam: '',
                  formato: '',
                  sort: '',
                  direction: '',
                  page: 0,
                }), */
            }}
          />
        ) : (
          <>
            <div className="add-section">
              <form
                className="search-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  setUpFilters({ searchParam: searchTerm })
                }}
              >
                <input
                  type="text"
                  placeholder="Nombre de album/cancion..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                  }}
                />
                <button type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>

              <button
                className="create-button"
                onClick={() => {
                  setFormActive(!formActive)
                  setCreating(true)
                }}
              >
                {' '}
                Crear Nuevo Album
              </button>
            </div>
            {loading ? (
              <Loading></Loading>
            ) : (
              <div className="album-container">
                {albums.map((param, i) => {
                  return (
                    <div className="album-card" key={i}>
                      <div className="img">
                        <img src={param.imagenes[0]?.urlImg} alt="" />
                      </div>
                      <span className="title">
                        <h1>{param.nombre}</h1>
                        <p className="subtitle">{param.formato}</p>
                        <span className="subtitle">
                          {param.artistas.map((artista, id) => {
                            return (
                              <p key={artista.nombre}>
                                {id > 0 && <mark>·</mark>}
                                {artista.nombre}
                              </p>
                            )
                          })}
                        </span>
                      </span>
                      <div className="actions">
                        <button
                          onClick={() => {
                            setFormActive(!formActive)
                            setAlbumObject(param)
                            setCreating(false)
                          }}
                        >
                          <i className="bi bi-pen"></i>Edit
                        </button>
                        <button
                          onClick={() => {
                            if (!confirmDialog.isActive) {
                              setConfirmDialog({
                                isActive: true,
                                aceptFunc: () => {
                                  deleteAlbum(param.id)
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
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  )
                })}
                <h1>{!albums.length && 'No Hay Albums'}</h1>
              </div>
            )}
          </>
        )}
      </div>
      {confirmDialog.isActive && (
        <ConfirmDialog
          cancelFunc={confirmDialog.cancelFunc}
          aceptFunc={confirmDialog.aceptFunc}
        ></ConfirmDialog>
      )}
      {loading ? null : <Pagination></Pagination>}
    </>
  )
}
