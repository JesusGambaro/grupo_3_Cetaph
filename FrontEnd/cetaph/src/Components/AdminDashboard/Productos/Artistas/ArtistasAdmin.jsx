import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { CreateArtista } from '../../Formulario/CreateArtista/CreateArtista'
import Loading from '../../../Loading/Loading'
import {
  filterCatalogue,
  getArtistas,
} from '../../../../Redux/actions/catalogue'
import { useDispatch, useSelector } from 'react-redux'

import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog'
import Swal from 'sweetalert2'
export const ArtistasAdmin = ({}) => {
  const [formActive, setFormActive] = useState(false)
  const [isCreating, setCreating] = useState(false)
  const [artistaObject, setArtistaObject] = useState()
  const dispatch = useDispatch()
  const [filters, setFilters] = useState({})
  const [confirmDialog, setConfirmDialog] = useState({
    isActive: false,
    cancelFunc: null,
    aceptFunc: null,
  })
  const { loading, filter, artistas } = useSelector(({ main }) => main)
  useEffect(() => {
    dispatch(getArtistas())
    setFilters(filter)
    dispatch(filterCatalogue({
      genre: "",
      priceMin: "",
      priceMax: "",
      explicit: "",
      searchParam: "",
      formato: "",
      sort: "",
      direction: "",
      page: 0,
      size: {
        totalElements: 1,
        totalPages: 1,
      },
    }))
    //console.log(filter);
  }, [])
  const deleteArtista = (id) => {
    axios
      .delete('http://localhost:9000/api/v1/artista/deleteArtist/' + id)
      .then((res) => {
        console.log(res)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Artista borrado con exito',
          showConfirmButton: false,
          timer: 1000,
        })
      })
      .catch((err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al borrar el artista',
          showConfirmButton: false,
          timer: 1000,
        })
      })
      .finally(() => {
        dispatch(getArtistas())
      })
  }
  return (
    <>
      <div className="wrapper">
        {formActive ? (
          <CreateArtista
            cancelFunc={() => {
              setFormActive(!formActive)
              setArtistaObject(null)
              dispatch(getArtistas())
            }}
            artistObject={artistaObject}
            isCreating={isCreating}
            getArtists={() => {
              dispatch(getArtistas())
            }}
          ></CreateArtista>
        ) : (
          <>
            <div className="add-section">
              <form
                className="search-form"
                onClick={() => {
                  //dispatch(resetState());
                  //dispatch(resetFilters());
                }}
              >
                <button type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <input
                  type="text"
                  placeholder="Nombre de artista..."
                  //value={searchParam}
                  //onChange={(e) => setSearchParam(e.target.value)}
                />
              </form>
              <button
                className="create-button artist"
                onClick={() => {
                  setFormActive(!formActive)
                  setCreating(true)
                  setArtistaObject(null)
                }}
              >
                Crear un nuevo artista
              </button>
            </div>
            {loading ? (
              <Loading></Loading>
            ) : (
              <div className="artistas-container">
                {artistas.map((param, i) => {
                  return (
                    <div className="artista-card" key={i}>
                      <div className="img">
                        <img src={param.imagenes.urlImg} alt="" />
                      </div>
                      <span className="title">
                        <span className="subtitle">
                          <h3>{param.nombre}</h3>
                        </span>
                      </span>
                      <div className="actions">
                        <button
                          onClick={() => {
                            setFormActive(!formActive)
                            setArtistaObject(param)
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
                                  deleteArtista(param.id)
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
                <h1>{!artistas.length && 'No Hay Artistas'}</h1>
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
    </>
  )
}
