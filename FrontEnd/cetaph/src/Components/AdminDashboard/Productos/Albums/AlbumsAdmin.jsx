import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { CreateAlbumForm } from "../../Formulario/CreateAlbum/CreateAlbumForm";
export const AlbumsAdmin = ({ setLoading, disks, getAlbums }) => {
  const [formActive, setFormActive] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [albumObject, setAlbumObject] = useState();

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
  return (
    <>
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
            <h1>Albúms</h1>
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
              Crear Nuevo Album
            </button>
          </div>
          <div className="album-container">
            {disks.map((param, i) => {
              return (
                <div className="album-card" key={i}>
                  <div className="img">
                    <img src={param.imagenes[0]?.urlImg} alt="" />
                  </div>
                  <span className="title">
                    <h1>{param.nombre}</h1>
                    
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
          </div>
        </>
      )}
    </>
  );
};
