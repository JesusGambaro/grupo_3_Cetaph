import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateAlbumForm from "../../Formulario/CreateAlbum/CreateAlbumFormNew";
import { Link } from "react-router-dom";
import Select from "react-select";
import Loading from "../../../Loading/Loading";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
import { filterCatalogue,getArtistas } from "../../../../Redux/actions/catalogue";
import { useDispatch, useSelector } from "react-redux";
export const AlbumsAdmin = () => {
  const [formActive, setFormActive] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [albumObject, setAlbumObject] = useState();
  const [confirmDialog, setConfirmDialog] = useState({
    isActive: false,
    cancelFunc: null,
    aceptFunc: null,
  });
  const [artistas_select, setArtistasSelect] = useState([]);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const { catalogue, loading, filter,artistas } = useSelector(({ main }) => main);
  useEffect(() => {
    dispatch(filterCatalogue(filter));
    dispatch(getArtistas());
    setFilters(filter);
    console.log(catalogue);
    console.log(artistas);
    //console.log(filter);
  }, []);
  const deleteAlbum = (id) => {
    
    axios
      .delete("http://localhost:9000/api/v1/album/deleteComplete/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {})
      .finally(() => {
        setFilters({
          genre: "",
          priceMin: "",
          priceMax: "",
          explicit: "",
          searchParam: "",
          formato: "",
          sort: "",
          direction: "",
          page: 0,
        });
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
        }));
      });
  };
  
  useEffect(() => {
    if (artistas) {
      let artistasData = artistas.map((artista) => {
        return {
          value: artista.id,
          label:
            artista.nombre.substring(0, 1).toUpperCase() +
            artista.nombre.substring(1),
        };
      });
      setArtistasSelect(artistasData);
    }
  }, [artistas]);
  const selectStyle = {
    control: (provided, state) => ({
      display: "flex",
      width: "20rem",
      minHeight: "3rem",
      border: "2px solid black",
      borderRadius: "5px",
    }),
    menu: (provided, state) => ({
      ...provided,
      width: "20rem",
      border: "2px solid black",
      borderRadius: 0,
      padding: 0,
      position: "absolute",
      botton: "0",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "black",
      transition: "none",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "black",
    }),
  };
  const handleFilters = (newFiltros) => {
    setConfirmDialog(false);
    setCreating(false);
    setFormActive(false);
    //getAlbums();
  };
  return (
    <>
    <div className="wrapper">
      {formActive ? (
        <CreateAlbumForm
          cancelFunc={() => {
            setFormActive(!formActive);
            setAlbumObject(null);
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
            }));
          }}
          albumObject={albumObject}
          isCreating={isCreating}
          getAlbums={() => {
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
            }));
          }}
        />
      ) : (
        <>
          <div className="add-section">
            <form
              className="search-form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="text"
                placeholder="Nombre de album/cancion..."
                
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            <Select
              placeholder={"Filtrar por artista..."}
              isClearable
              onSelectResetsInput={false}
              onBlurResetsInput={false}
              styles={selectStyle}
              
              options={artistas?.map((artista) => {
                return {
                  value: artista.id,
                  label:
                    artista.nombre.substring(0, 1).toUpperCase() +
                    artista.nombre.substring(1),
                };
              })}
            ></Select>
            <button
              className="create-button"
              onClick={() => {
                setFormActive(!formActive);
                setCreating(true);
              }}
            >
              {" "}
              Crear Nuevo Album
            </button>
          </div>
          {loading ? (
            <Loading></Loading>
          ) : (
            <div className="album-container">
              {catalogue.map((param, i) => {
                return (
                  <div className="album-card" key={i}>
                    <div className="img">
                      <img src={param.imagenes[0]?.urlImg} alt="" />
                    </div>
                    <span className="title">
                      <h1>{param.nombre}</h1>
                      <span className="subtitle">
                        <div className="artista">
                          {param.formato}
                          <p>·</p>
                        </div>
                        {param.artistas.map((artista, id) => {
                          return (
                            <div key={id} className="artista">
                              {id > 0 && <p>·</p>}{" "}
                              <Link to={"/Artista/" + artista.id}>
                                {artista.nombre}
                              </Link>
                            </div>
                          );
                        })}
                      </span>
                    </span>
                    <div className="actions">
                      <button
                        onClick={() => {
                          setFormActive(!formActive);
                          setAlbumObject(param);
                          setCreating(false);
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
                                });
                              },
                              cancelFunc: () => {
                                setConfirmDialog({
                                  ...confirmDialog,
                                  isActive: false,
                                  aceptFunc: null,
                                  cancelFunc: null,
                                });
                              },
                            });
                          }
                        }}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
              <h1>{!catalogue.length && "No Hay Albums"}</h1>
            </div>
          )}
        </>
      )}
    </div>
    {confirmDialog.isActive && <ConfirmDialog cancelFunc={confirmDialog.cancelFunc} aceptFunc={confirmDialog.aceptFunc}></ConfirmDialog>}
    </>
  );
};
