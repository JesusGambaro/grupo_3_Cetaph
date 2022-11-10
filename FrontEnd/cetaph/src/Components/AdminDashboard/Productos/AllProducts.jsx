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
  const [showAlbums, setShowAlbums] = useState(true);
  useEffect(() => {
    getAlbums();
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
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="AllProducts">
          <span className="select-products">
            <ul >
              <li ><h1>Albums</h1></li>
              <li ><h1>Artistas</h1></li>
            </ul>
          </span>
          <AlbumsAdmin
            setLoading={(value) => {
              setLoading(value);
            }}
            disks={disks}
            getAlbums={() => {
              getAlbums();
            }}
          ></AlbumsAdmin>
          <ArtistasAdmin
            artistas={artistas}
            setLoading={(value) => {
              setLoading(value);
            }}
            getArtistas={() => {
              getArtistas();
            }}
          ></ArtistasAdmin>
        </div>
      )}
    </>
  );
};
