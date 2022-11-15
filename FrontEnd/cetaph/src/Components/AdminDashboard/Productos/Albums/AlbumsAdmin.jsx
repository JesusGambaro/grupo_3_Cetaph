import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateAlbumForm from "../../Formulario/CreateAlbum/CreateAlbumFormNew";
import Select from "react-select";
import Loading from "../../../Loading/Loading";
import ConfirmDialog from "../../ConfirmDialog/ConfirmDialog";
import {
  filterCatalogue,
  getArtistas,
} from "../../../../Redux/actions/catalogue";
import { getRol } from "../../../../Redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
export const AlbumsAdmin = () => {
  const navigate = useNavigate();
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
  const { catalogue, loading, filter, artistas, user } = useSelector(
    ({ main }) => main
  );
  useEffect(() => {
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
    dispatch(getArtistas());
    setFilters(filter);
    console.log(catalogue);
    console.log(artistas);
    //console.log(filter);
  }, []);
  useEffect(() => {
    dispatch(getRol(localStorage.getItem("token")));
  }, []);
  useEffect(() => {
    if (user.role != "Admin") {
      navigate("/");
    }
  }, [user]);
  const deleteAlbum = (id) => {
    axios
      .delete("http://localhost:9000/api/v1/album/deleteComplete/" + id)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Album borrado con exito",
          showConfirmButton: false,
          timer: 1000,
        });
      })
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
        dispatch(
          filterCatalogue({
            genre: "",
            priceMin: "",
            priceMax: "",
            explicit: "",
            searchParam: "",
            formato: "",
            sort: "",
            direction: "",
            page: 0,
          })
        );
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
  useEffect(() => {
    dispatch(filterCatalogue({ ...filter, ...filters }));
    window.scrollTo(0, 0);
  }, [filters]);
  const dividedGroups = () => {
    const start = Math.floor(filters.page / 4) * 4;
    //console.log(filter.size.totalPages);
    return new Array(4).fill().map((_, i) => {
      let limit = start + i + 1;
      return limit <= filter.size.totalPages && limit;
    });
  };
  const goPage = (e) =>
    setFilters({ ...filters, page: Number(e.target.textContent) - 1 });
  const setUpFilters = (props) => {
    setFilters((prev) => {
      let copy = { ...prev, ...props };
      return copy;
    });
  };
  return (
    <>
      <div className="wrapper">
        {formActive ? (
          <CreateAlbumForm
            cancelFunc={() => {
              setFormActive(!formActive);
              setAlbumObject(null);
              dispatch(
                filterCatalogue({
                  genre: "",
                  priceMin: "",
                  priceMax: "",
                  explicit: "",
                  searchParam: "",
                  formato: "",
                  sort: "",
                  direction: "",
                  page: 0,
                })
              );
            }}
            albumObject={albumObject}
            isCreating={isCreating}
            getAlbums={() => {
              dispatch(
                filterCatalogue({
                  genre: "",
                  priceMin: "",
                  priceMax: "",
                  explicit: "",
                  searchParam: "",
                  formato: "",
                  sort: "",
                  direction: "",
                  page: 0,
                })
              );
            }}
          />
        ) : (
          <>
            <div className="add-section">
              <form
                className="search-form"
                value={filters.searchParam}
                onChange={(e) => {
                  setUpFilters({ searchParam: e.target.value });
                }}
              >
                <input type="text" placeholder="Nombre de album/cancion..." />
                <button type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>

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
                        <p className="subtitle">
                          {param.formato}
                        </p>
                        <p className="subtitle">
                          {param.artistas.map((artista,id) => {
                            return <>
                            {id > 0 && <mark>·</mark>}
                            {artista.nombre}</>;
                          })}
                        </p>
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
                                  deleteAlbum(param.id);
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
      {confirmDialog.isActive && (
        <ConfirmDialog
          cancelFunc={confirmDialog.cancelFunc}
          aceptFunc={confirmDialog.aceptFunc}
        ></ConfirmDialog>
      )}
      <div className="pagination-container">
        <div className="selectionOwn">
          <button
            className="btnOwn prev"
            onClick={() => {
              setFilters({ ...filters, page: filters.page - 1 });
            }}
            disabled={filters.page === 0}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          {dividedGroups().map((e, i) => {
            //console.log(e, " ");
            return (
              e && (
                <button
                  className={
                    filters.page === e - 1 ? "btnOwn active" : "btnOwn"
                  }
                  key={i}
                  onClick={goPage}
                >
                  {e}
                </button>
              )
            );
          })}

          <button
            className="btnOwn next"
            onClick={() => {
              setFilters({ ...filters, page: filters.page + 1 });
            }}
            disabled={filters.page === filter.size.totalPages - 1}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};
