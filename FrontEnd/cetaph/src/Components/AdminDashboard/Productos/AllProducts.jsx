import React from "react";
import { useState, useEffect } from "react";
import "./AllProductsStyle.scss";
import axios from "axios";
import Loading from "../../Loading/Loading";
import { AlbumsAdmin } from "./Albums/AlbumsAdmin";
import { ArtistasAdmin } from "./Artistas/ArtistasAdmin";
export const AllProducts = () => {
  const [disks, setDisks] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    albumNombre: "",
    artista: { id: "", nombre: "" },
  });
  const [showAlbums, setShowAlbums] = useState(true);
  useEffect(() => {
    getConFiltros(filtros);
    getArtistas();
  }, []);
  const getAlbums = () => {
    setLoading(true);
    axios
      .get("http://localhost:9000/api/v1/album")
      .then((res) => {
        setDisks(res.data.content);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const getConFiltros = (newfiltros) => {
    setLoading(true);
    axios
      .get(
        `http://localhost:9000/api/v1/album/searchAlbums?V=&Name=${newfiltros.albumNombre}&Max=&Min=&Exp=&IdArtista=${newfiltros.artista.id}`
      )
      .then((res) => {
        setDisks(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const getArtistas = () => {
    setLoading(true);
    axios
      .get("http://localhost:9000/api/v1/artista/")
      .then((res) => {
        setArtistas(res.data.content);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="AllProducts">
      <span className="select-products">
        <ul>
          <li
            className={showAlbums ? "active" : "inactive"}
            onClick={() => {
              setShowAlbums(true);
            }}
          >
            <h1>Albums</h1>
          </li>
          <li
            className={!showAlbums ? "active" : "inactive"}
            onClick={() => {
              setShowAlbums(false);
            }}
          >
            <h1>Artistas</h1>
          </li>
        </ul>
      </span>
      {showAlbums ? (
          <AlbumsAdmin
            setLoading={(value) => {
              setLoading(value);
            }}
            disks={disks}
            getAlbums={(filtros) => {
              getConFiltros(filtros);
            }}
            setFiltros={(newFiltros) => {
              setFiltros(newFiltros);
            }}
            filtros={filtros}
            artistas={artistas}
          ></AlbumsAdmin>
        ) : (
          <ArtistasAdmin
            artistas={artistas}
            setLoading={(value) => {
              setLoading(value);
            }}
            getArtistas={() => {
              getArtistas();
            }}
          ></ArtistasAdmin>
        )}
      
    </div>
  );
};
