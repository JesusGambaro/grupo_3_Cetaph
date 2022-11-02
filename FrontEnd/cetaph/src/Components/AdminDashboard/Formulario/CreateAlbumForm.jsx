import React, { useState, useEffect } from "react";
import "./CreateAlbumForm.scss";
import Select from "react-select";
import Creatable, { useCreatable } from "react-select/creatable";
import axios from "axios";
import Loading from "../../Loading/Loading";
import { CreateSingle } from "./CreateSingle/CreateSingle";
import { useRef } from "react";
export const CreateAlbumForm = ({
  albumObject,
  cancelFunc,
  isCreating,
  getAlbums,
}) => {
  const [generos, setGeneros] = useState([]);
  const [singles, setSingles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isCreatingSingle, setCreatingSingle] = useState(false);
  const [data, setData] = useState({
    deletedImages: [],
    deletedSingles: [],
    album: {
      nombre: "",
      precio: 0,
      stock: 0,
      fechaLanzamiento: "",
      duracion: 0,
      descripcion: "",
      esVinilo: true,
      explicit: false,
      genero: {},
      imagenes: [
        {
          urlImg: "",
          file: "",
        },
        {
          urlImg: "",
          file: "",
        },
        {
          urlImg: "",
          file: "",
        },
        {
          urlImg: "",
          file: "",
        },
      ],
      singles: [],
    },
  });
  const crearGenero = (value) => {
    axios({
      url: "http://localhost:9000/api/v1/genero",
      method: "POST",
      data: {
        generoName: value,
      },
    })
      .then(() => {
        axios({
          url: "http://localhost:9000/api/v1/genero",
          method: "GET",
        })
          .then(({ data }) => {
            //console.log(data);
            let generosData = data.map((genero) => {
              return {
                value: genero.generoName,
                label:
                  genero.generoName.substring(0, 1).toUpperCase() +
                  genero.generoName.substring(1),
                id: genero.id,
              };
            });
            setGeneros(generosData);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => {});
  };
  useEffect(() => {
    //console.log(albumObject);
    if (albumObject) {
      let imgs = data.album.imagenes;
      for (let index = 0; index < albumObject.imagenes.length; index++) {
        imgs[index] = albumObject.imagenes[index];
      }
      setData({
        ...data,
        album: { ...albumObject, imagenes: imgs },
      });
    }
    axios({
      url: "http://localhost:9000/api/v1/genero",
      method: "GET",
    })
      .then(({ data }) => {
        let generosData = data.map((genero) => {
          return {
            value: genero.generoName,
            label:
              genero.generoName.substring(0, 1).toUpperCase() +
              genero.generoName.substring(1),
            id: genero.id,
          };
        });
        setGeneros(generosData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleData = (property, value) => {
    setData({
      ...data,
      album: {
        ...data.album,
        [property]: value,
      },
    });
  };
  const handleFileInput = async (e, index) => {
    //console.log("Cambiando Imagen");
    let newImgs = data.album.imagenes;
    let newDeletedImages;
    if (newImgs[index].id) {
      newDeletedImages = [...data.deletedImages, newImgs[index].id];
    }

    newImgs[index] = {
      urlImg: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    };

    setData({
      ...data,
      deletedImages: newDeletedImages ? newDeletedImages : data.deletedImages,
      album: {
        ...data.album,
        imagenes: newImgs,
      },
    });
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    let formData = new FormData();
    data.album.imagenes.map((img) => {
      if (img.file) {
        formData.append("file", img.file);
      }
    });
    data.album.singles.map((single) => {
      if (single.file) {
        formData.append("musicFiles", single.file);
      }
    });
    let album = data.album;
    let milis = 0;
    album.singles.map((single) => {
      milis += single.duracion;
    });
    let singlesList = [];
    album.singles.map((single) => {
      if (single.file) {
        singlesList = [
          ...singlesList,
          {
            nombre: single.nombre,
            duracion: single.duracion,
            explicit: single.explicit,
          },
        ];
      }
    });
    album.duracion = milis;
    album.singles = album.singles.filter((single) => {
      return single.cloudinaryId;
    });
    console.log(album.singles);
    let albumAxios = JSON.stringify(album);
    let singlesListAxios = JSON.stringify(singlesList);
    let deletedImgs = JSON.stringify(data.deletedImages);
    let deletedSingles = JSON.stringify(data.deletedSingles);
    formData.append(
      "Album",
      new Blob([albumAxios], { type: "application/json" })
    );
    formData.append(
      "SinglesList",
      new Blob([singlesListAxios], { type: "application/json" })
    );
    setLoading(true);
    console.log("----------Form Data----------");
    //console.log(data.album);
    //console.log(formData.getAll("Album"));

    if (isCreating) {
      console.log("creating");
    } else {
      console.log("updating");
      if (data.deletedImages.length) {
        formData.append(
          "ImgsBorradas",
          new Blob([deletedImgs], { type: "application/json" })
        );
      }
      if (data.deletedSingles.length) {
        formData.append(
          "CancionesBorradas",
          new Blob([deletedSingles], { type: "application/json" })
        );
      }

      console.log("AAaaa");
    }

    let url = isCreating
      ? "http://localhost:9000/api/v1/album/upload"
      : "http://localhost:9000/api/v1/album/update/" + data.album.id;

    console.log(localStorage.getItem("token"));
    axios({
      url: url,
      method: isCreating ? "POST" : "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formData,
    })
      .then((res) => {
        console.log(res.data);
        cancelFunc();
        getAlbums();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const deleteImage = (imagenData, index) => {
    let newImgs = data.album.imagenes.map((img, i) => {
      return imagenData.urlImg == img.urlImg ? { urlImg: "", file: "" } : img;
    });
    let newDeletedImages = [...data.deletedImages, imagenData.id];

    setData({
      ...data,
      deletedImages: imagenData.cloudinaryId
        ? newDeletedImages
        : data.deletedImages,
      album: {
        ...data.album,
        imagenes: newImgs,
      },
    });
  };
  const deleteSingle = (singleData, index) => {
    let newSingles = data.album.singles.filter((single) => {
      return data.album.singles.indexOf(single) != index;
    });
    let newDeletedSingles = [...data.deletedSingles, singleData.id];

    setData({
      ...data,
      deletedSingles: singleData.cloudinaryId
        ? newDeletedSingles
        : data.deletedSingles,
      album: {
        ...data.album,
        singles: newSingles,
      },
    });
  };
  const selectStyle = {
    control: (provided, state) => ({
      display: "flex",
      width: "20rem",
      height: "2.5rem",
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
      top: "2rem",
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
  document.onkeydown = function (e) {
    console.log(e.key);
    if (!isCreatingSingle) {
      if (e.key == "Enter") {
        console.log("submit");
        handleSubmit();
      } else if (e.key == "Escape") {
        cancelFunc();
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="CreateAlbumForm">
          <h1 className="title">
            Create An Album
            <span>
              <button onClick={() => cancelFunc()}>
                <i className="bi bi-x-circle-fill"></i>Cancel
              </button>
              <button className="save-btn" onClick={handleSubmit}>
                <i class="fa-solid fa-floppy-disk"></i>Save
              </button>
            </span>
          </h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="wrapper">
              <div className="input-wrapper">
                <div className="input text">
                  <label htmlFor="">
                    <h4 className="input-name">
                      Nombre <p>{/*errors.images*/}</p>
                    </h4>{" "}
                  </label>
                  <input
                    type="text"
                    onChange={(e) => {
                      handleData("nombre", e.target.value);
                    }}
                    value={data.album.nombre}
                  />
                </div>
                <div className="input number">
                  <label htmlFor="">
                    <h4 className="input-name">
                      Precio <p>{/*errors.images*/}</p>
                    </h4>
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      handleData("precio", e.target.value);
                    }}
                    value={data.album.precio}
                  />
                </div>
                <div className="input number">
                  <label htmlFor="">
                    <h4 className="input-name">
                      Stock <p>{/*errors.images*/}</p>
                    </h4>
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      handleData("stock", e.target.value);
                    }}
                    value={data.album.stock}
                  />
                </div>
                <div className="input checkbox">
                  <label htmlFor="">
                    <h4 className="input-name">
                      Explicito <p>{/*errors.images*/}</p>
                    </h4>
                  </label>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      handleData("explicit", !data.album.explicit);
                    }}
                    checked={data.album.explicit}
                  />
                </div>
                <div className="input date">
                  <label htmlFor="">
                    <h4 className="input-name">
                      Lanzamiento <p>{/*errors.images*/}</p>
                    </h4>{" "}
                  </label>
                  <input
                    type="date"
                    onChange={(e) => {
                      handleData(
                        "fechaLanzamiento",
                        e.target.value.replaceAll("-", "/")
                      );
                    }}
                    value={data.album.fechaLanzamiento.replaceAll("/", "-")}
                  />
                </div>
                <div className="input genero">
                  <label htmlFor="">
                    <h4 className="input-name">
                      Genero <p>{/*errors.images*/}</p>
                    </h4>{" "}
                  </label>
                  <Creatable
                    className="generos-select"
                    options={generos}
                    placeholder={"Elige o Crea un genero"}
                    isClearable
                    onSelectResetsInput={false}
                    onBlurResetsInput={false}
                    styles={selectStyle}
                    defaultValue={
                      data.album.genero.generoName && {
                        label: data.album.genero.generoName,
                        value: data.album.genero.generoName,
                      }
                    }
                    onChange={(param, { action }) => {
                      console.log(action);
                      if (action === "clear") {
                        handleData("genero", {
                          id: null,
                          generoName: "",
                        });
                      } else {
                        handleData("genero", {
                          id: param?.id,
                          generoName: param?.value,
                        });
                      }
                    }}
                    onCreateOption={(param) => {
                      console.log(param);
                      crearGenero(param);
                    }}
                  />
                </div>
                <div className="input descripcion">
                  <label htmlFor="">
                    <h4 className="input-name">
                      Descripcion <p>{/*errors.images*/}</p>
                    </h4>
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    onChange={(e) => {
                      handleData("descripcion", e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <div className="rigth-inputs">
                {/*-------------------------  IMAGENES  ---------------------------*/}
                <div className="images">
                  <h4 className="input-name">
                    Imagenes <p>{/*errors.images*/}</p>
                  </h4>
                  <div className="images-container">
                    {data.album.imagenes.map((img, index) => {
                      return (
                        <div
                          className={img.urlImg ? "imagent show" : "imagent"}
                          key={index}
                          style={{ backgroundImage: `url(${img.urlImg})` }}
                        >
                          {img.urlImg && (
                            <button
                              type="button"
                              className="delete-image-btn"
                              onClick={() => {
                                deleteImage(img, index);
                              }}
                            >
                              <i className="bi bi-x-circle-fill"></i>
                            </button>
                          )}

                          <label>
                            <input
                              type="file"
                              onChange={(e) => handleFileInput(e, index)}
                              accept="image/*"
                              placeholder="Choose Iamge"
                            />
                            <i className="bi bi-plus-circle-fill"></i>
                            <p>Add new image</p>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/*-------------------------  IMAGENES  ---------------------------*/}
                {/*-------------------------  SINGLES  ---------------------------*/}
                <div className="singles">
                  <h4 className="input-name">
                    Canciones <p>{/*errors.images*/}</p>
                  </h4>
                  <div className="cancion-input">
                    <label>
                      <button
                        className="btn"
                        onClick={(e) => {
                          setCreatingSingle(true);
                          e.preventDefault();
                        }}
                      >
                        <p>Crear Una Cancion</p>

                        <i className="bi bi-plus-circle-fill"></i>
                      </button>
                    </label>
                  </div>
                  <div className="canciones-container">
                    {data.album.singles.map((e, i) => {
                      var minutes = Math.floor(e.duracion / 60000);
                      var seconds = ((e.duracion % 60000) / 1000).toFixed(0);
                      let tiempo =
                        seconds == 60
                          ? minutes + 1 + ":00"
                          : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
                      return (
                        <div key={i} className="cancion-card">
                          {" "}
                          <span><label>Nombre: </label><h1>{e.nombre}</h1></span>
                          <span><label>Duracion: </label><h3>{tiempo}</h3></span>
                          
                          
                          <SongPlayer urlMusic={e.urlMusic} file={e.file} single={e} id={i} deleteSingle={deleteSingle} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/*-------------------------  SINGLES  ---------------------------*/}
              </div>

              {isCreatingSingle && (
                <CreateSingle
                  closeFunc={() => {
                    setCreatingSingle(false);
                  }}
                  addSingleFunc={(singleData) => {
                    setData({
                      ...data,
                      album: {
                        ...data.album,
                        singles: [...data.album.singles, singleData],
                      },
                    });
                  }}
                />
              )}
            </div>
          </form>
        </section>
      )}
    </>
  );
};

const SongPlayer = ({ urlMusic, file, single,id,deleteSingle }) => {
  const [isPlaying, setPlaying] = useState(false);
  if (file) {
    file = URL.createObjectURL(file);
  }
  let audioRef = useRef(new Audio(urlMusic != null ? urlMusic : file));
  return (
    <div>
      <button
        type="button"
        className="delete-image-btn"
        onClick={() => {
          deleteSingle(single, id);
          audioRef.current.pause();
        }}
      >
        <i className="bi bi-x-circle-fill"></i>
      </button>
      <button
        type="button"
        className="play-btn"
        onClick={() => {
          if (isPlaying) {
            setPlaying(false);
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          } else {
            setPlaying(true);
            audioRef.current.play();
          }
        }}
      >
        <i className={`bi bi-${isPlaying ? "pause" : "play"}-circle`} />
      </button>
    </div>
  );
};
