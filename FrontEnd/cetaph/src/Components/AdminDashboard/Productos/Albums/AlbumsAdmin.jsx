import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateAlbumForm from "../../Formulario/CreateAlbum/CreateAlbumFormNew";
import { Link } from "react-router-dom";
import Select from "react-select";
import Loading from "../../../Loading/Loading";
export const AlbumsAdmin = ({
  setLoading,
  disks,
  getAlbums,
  artistas,
  setFiltros,
  filtros,
  isLoading,
}) => {
  const [formActive, setFormActive] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [albumObject, setAlbumObject] = useState();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [artistas_select, setArtistasSelect] = useState([]);
  const deleteAlbum = (id) => {
    setLoading(true);
    axios
      .delete("http://localhost:9000/api/v1/album/deleteComplete/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {})
      .finally(() => {
        getAlbums();
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
  }, []);
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
    getAlbums();
  };
  return (
    <div className="wrapper">
      {formActive ? (
        <CreateAlbumForm
          cancelFunc={() => {
            setFormActive(!formActive);
            setAlbumObject(null);
          }}
          albumObject={albumObject}
          isCreating={isCreating}
          getAlbums={getAlbums}
        />
      ) : (
        <>
          <div className="add-section">
            <form
              className="search-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleFilters(filtros);
              }}
            >
              <input
                type="text"
                placeholder="Nombre de album/cancion..."
                onChange={(e) => {
                  if (e.target.value === "" || !e.target.value.length) {
                    setFiltros({ ...filtros, albumNombre: "" });
                  } else {
                    setFiltros({ ...filtros, albumNombre: e.target.value });
                  }
                }}
                value={filtros.albumNombre}
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
              onChange={async (param, { action }) => {
                console.log(action);
                let newFiltros = filtros;
                if (action === "clear") {
                  setFiltros({ ...filtros, artista: { id: "", nombre: "" } });
                  newFiltros.artista = { id: "", nombre: "" };
                } else {
                  setFiltros({
                    ...filtros,
                    artista: { id: param.value, nombre: param.label },
                  });
                  newFiltros.artista = { id: param.value, nombre: param.label };
                }
                handleFilters(newFiltros);
              }}
              defaultValue={
                filtros.artista.nombre && {
                  label: filtros.artista.nombre,
                  value: filtros.artista.id,
                }
              }
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
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <div className="album-container">
              {disks.map((param, i) => {
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
                          deleteAlbum(param.id);
                        }}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
              <h1>{!disks.length && "No Hay Albums"}</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};
