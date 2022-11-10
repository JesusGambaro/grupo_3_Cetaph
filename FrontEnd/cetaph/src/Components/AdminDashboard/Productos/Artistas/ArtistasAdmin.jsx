import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { CreateArtista } from "../../Formulario/CreateArtista/CreateArtista";
export const ArtistasAdmin = ({ setLoading, artistas, getArtistas }) => {
  const [formActive, setFormActive] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [artistaObject, setArtistaObject] = useState();

  const deleteArtista = (id) => {
    setLoading(true);
    axios
      .delete("http://localhost:9000/api/v1/artista/deleteArtist/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {})
      .finally(() => {
        getArtistas();
      });
  };
  return (
    <div className="wrapper">
      {formActive ? (
        <CreateArtista
          cancelFunc={() => {
            setFormActive(!formActive);
            setArtistaObject(null);
          }}
          artistObject={artistaObject}
          isCreating={isCreating}
          getArtists={getArtistas}
        ></CreateArtista>
      ) : (
        <>
          <div className="add-section">
            <form
              className="searchOwn"
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
                placeholder="SEARCH"
                //value={searchParam}
                //onChange={(e) => setSearchParam(e.target.value)}
              />
            </form>
            <button
              className="create-button"
              onClick={() => {
                setFormActive(!formActive);
                setCreating(true);
              }}
            >
              {" "}
              Crear un nuevo artista
            </button>
          </div>
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
                        setFormActive(!formActive);
                        setArtistaObject(param);
                        setCreating(false);
                      }}
                    >
                      <i className="bi bi-pen"></i>Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteArtista(param.id);
                      }}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </div>
              );
            })}
            <h1>{!artistas.length && "No Hay Artistas"}</h1>
          </div>
        </>
      )}
    </div>
  );
};
