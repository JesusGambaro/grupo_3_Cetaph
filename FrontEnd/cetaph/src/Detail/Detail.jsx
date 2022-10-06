import React, {Fragment, useEffect, useRef} from "react";
import "./DetailStyle.scss";
import Footer from "../Footer/Footer";
import {useState} from "react";
import {useParams} from "react-router";
import axios from "axios";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-h5-audio-player/lib/styles.css";
import SongPlayer from "./SongPlayer/SongPlayer";
const Detail = () => {
  const {id} = useParams();
  const [disk, setDisk] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const {data} = await axios.get(
          `http://localhost:3001/data?id=${id}`
        );
        setDisk(data[0]);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [id]);
  const [currentImage, setCurrentImage] = useState(0);

  const HandleCurrentState = (params) => {
    setCurrentImage(params);
  };
  //console.log("Detail");
  const toMinsAndSecs = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  //song player
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentSong, setCurrentSong] = useState(null);
  const audio = useRef(null);

  const tracksContainer = useRef(null);
  const handleSong = (song) => {
    setCurrentSong(song);
    //audio.current.src = song.preview_url;
  };

  const handleSongChange = (dir) => {
    const index = disk.tracks.items.findIndex(
      (song) => song.id === currentSong.id
    );
    let newIndex = index + dir;
    if (newIndex < 0) {
      newIndex = disk.tracks.items.length - 1;
    } else if (newIndex > disk.tracks.items.length - 1) {
      newIndex = 0;
    }
    tracksContainer.current.scrollTo({
      top: newIndex * 60 + 60 * 2 - 300,
      behavior: "smooth",
    });
    handleSong(disk.tracks.items[newIndex]);
  };

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="Detail">
          <div className="album-info">
            <div className="ImagenDisco">
              <img
                className="DiskImg"
                src={disk.images[currentImage].url}
                alt=""
              />
              <div className="Vynil_disk">
                <img
                  src="https://down.imgspng.com/download/0720/vinyl_PNG102.png"
                  alt=""
                />
              </div>
              <div className="ExtraImagenesContainer">
                {disk.images.map(({url}, id) => {
                  return (
                    <div
                      className="ExtraImagenes"
                      key={"ExtraImagenes" + id}
                      onClick={() => {
                        HandleCurrentState(id);
                      }}
                    >
                      <img src={url} alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="DiscoInfo">
              <h1 className="ArtistName">{disk?.artists[0]?.name}</h1>
              <span>
                <label>Nombre:</label>
                <h1>{disk?.name}</h1>
              </span>
              <span>
                <label>Año de lanzamiento::</label>
                <h1>{disk?.release_date}</h1>
              </span>
              <span>
                <label>Nacionalidad:</label>
                <h1>Peru</h1>
              </span>
              <span>
                <label>Canciones:</label>
                <h1>{disk?.total_tracks}</h1>
              </span>
              <h1 className="PrecioText">$500</h1>
              <div className="Buttons">
                <button>Añadir al carrito</button>
                <button>
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
            </div>
            <div className="ExtraInfo">
              <h1 className="StockText">
                In Stock<i className="fa-solid fa-check"></i>
              </h1>
              <h1 className="Delivery">
                <i className="fa-solid fa-box-open"></i>Delivery in 10 Days
              </h1>
              <h1 className="Protected">
                <i className="fa-solid fa-shield-heart"></i>Protected until
                payment
              </h1>
            </div>
          </div>
          <div className="tracks-list">
            <h1>Track List</h1>
            <div className="tracks">
              <ScrollContainer
                innerRef={tracksContainer}
                className="tracks-container"
                hideScrollbars={false}
                vertical={true}
              >
                {disk?.tracks?.items.map((track, id) => {
                  return (
                    <div
                      className={
                        "track" +
                        (currentSong?.id === track.id ? " playing" : "")
                      }
                      key={"track" + id}
                    >
                      <p className="track-number">{id + 1}</p>
                      <h2 className="track-name">{track.name}</h2>
                      <p className="track-duration">
                        {toMinsAndSecs(track.duration_ms)}
                      </p>
                      <i
                        className="fa-regular fa-circle-play"
                        onClick={() => handleSong(track)}
                      ></i>
                    </div>
                  );
                })}
              </ScrollContainer>
              <div className="player-container">
                {currentSong ? (
                  <SongPlayer
                    track={currentSong}
                    handleSongChange={handleSongChange}
                  />
                ) : (
                  <h1>Selecciona una cancion</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Detail;
