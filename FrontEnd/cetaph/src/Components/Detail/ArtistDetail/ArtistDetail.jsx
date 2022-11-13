import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import "./ArtistDetail.scss";
import Card from "../../Card/Card";
import Loading from "../../Loading/Loading";
const ArtistDetail = () => {
  const { id } = useParams();
  const [artista, setArtista] = useState({});
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let artist;
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:9000/api/v1/artista/${id}`
        );
        artist = data;
        console.log(data);
        setArtista(data);
        (async () => {
          try {
            const { data } = await axios.get(
              `http://localhost:9000/api/v1/album/searchAlbumsbyArtist/${artist.id}`
            );
            console.log(data.content);
            setAlbums(data.content);
          } catch (e) {
            console.log(e);
          }
          setLoading(false);
        })();
      } catch (e) {
        console.log(e);
      }
    })();
  }, [id]);
  return (
    <>
      {loading ? (
        <Loading text={"Loading artist..."} />
      ) : (
        <div className="ArtistDetail">
          <section className="info"><span>
            <h1>{artista.nombre}</h1>
          </span></section>
          
          <div className="disks-container">
            {albums?.length > 0 ? (
              albums.map((disk, index) => (
                <Card key={index} color={"black"} data={disk} />
              ))
            ) : (
              <h1>No results</h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ArtistDetail;
