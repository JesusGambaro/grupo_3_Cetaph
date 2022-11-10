import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Loading from "../../../Loading/Loading";
import "./CreateArtista.scss";
import Creatable, { useCreatable } from "react-select/creatable";
import ReactSelect from "react-select";
import countryList from "react-select-country-list";
export const CreateArtista = ({
  artistObject,
  cancelFunc,
  isCreating,
  getArtists,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({
    deletedImages: [],
    deletedSingles: [],
    artist: {
      nombre: "",
      nacionalidad: "",
      descripcion: "",
      imagenes: {
        urlImg: "",
        file: "",
      },
      fechanacimiento: "",
    },
  });
  const options = useMemo(() => countryList().getData(), []);
  document.onkeydown = function (e) {
    //console.log(e.key);
    if (e.key == "Enter") {
      console.log("submit");
      handleSubmit();
    } else if (e.key == "Escape") {
      cancelFunc();
    }
  };
  useEffect(() => {
    //console.log(albumObject);
    if (artistObject) {
      setData({
        ...data,
        artist: artistObject,
      });
    }
    setLoading(false);
  }, []);
  const handleData = (property, value) => {
    setData({
      ...data,
      artist: {
        ...data.artist,
        [property]: value,
      },
    });
  };
  const handleFileInput = async (e) => {
    //console.log("Cambiando Imagen");
    let newImg = {
      urlImg: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    };

    setData({
      ...data,
      deletedImg: data.artist.imagenes.cloudinaryId && [
        data.artist.imagenes.cloudinaryId,
      ],
      artist: {
        ...data.artist,
        imagenes: newImg,
      },
    });
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    let formData = new FormData();
    if (data.artist.imagenes) {
      formData.append("Imagen", data.artist.imagenes.file);
    }
    let deletedImg = JSON.stringify(data.deletedImages);
    let newArtista = data.artist;
    newArtista.imagenes = newArtista.imagenes.cloudinaryId
      ? newArtista.imagenes
      : {};
    let artistAxios = JSON.stringify(newArtista);
    formData.append(
      "artista",
      new Blob([artistAxios], { type: "application/json" })
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
          "ImgsBorrada",
          new Blob([deletedImg], { type: "application/json" })
        );
      }
      console.log("AAaaa");
    }

    let url = isCreating
      ? "http://localhost:9000/api/v1/artista/createArtista"
      : "http://localhost:9000/api/v1/artista/updateArtista/" + data.artist.id;

    //console.log(localStorage.getItem("token"));
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
        cancelFunc();
        getArtists();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const deleteImage = (imagenData) => {
    setData({
      ...data,
      deletedImg: imagenData.cloudinaryId && [imagenData.cloudinaryId],
      artist: {
        ...data.artist,
        imagenes: {
          urlImg: "",
          file: "",
        },
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
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="CreateArtistForm">
          <h1 className="title">
            Crea un Artista
            <span>
              <button onClick={() => cancelFunc()}>
                <i className="bi bi-x-circle-fill"></i>Cancel
              </button>
              <button className="save-btn" onClick={handleSubmit}>
                <i className="fa-solid fa-floppy-disk"></i>Save
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
                    value={data.artist.nombre}
                  />
                </div>
                <div className="input date">
                  <label htmlFor="">
                    <h4 className="input-name">
                      Fehca De Nacimiento <p>{/*errors.images*/}</p>
                    </h4>{" "}
                  </label>
                  <input
                    type="date"
                    onChange={(e) => {
                      handleData(
                        "fechanacimiento",
                        e.target.value.replaceAll("-", "/")
                      );
                    }}
                    defaultValue={data.artist.fechanacimiento?.replaceAll(
                      "/",
                      "-"
                    )}
                  />
                </div>
                <div className="input genero">
                  <label htmlFor="">
                    <h4 className="input-name">
                      Genero <p>{/*errors.images*/}</p>
                    </h4>{" "}
                  </label>
                  <ReactSelect
                    placeholder={"Elige una nacionalidad"}
                    isClearable
                    styles={selectStyle}
                    options={options}
                    onChange={(param, { action }) => {
                      //console.log(param);
                      if (action === "clear") {
                        handleData("nacionalidad", "");
                      } else {
                        handleData("nacionalidad", param?.label);
                      }
                    }}
                    defaultValue={
                      data.artist.nacionalidad && {
                        label: data.artist.nacionalidad,
                        value: data.artist.nacionalidad,
                      }
                    }
                  ></ReactSelect>
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
                    Imagen <p>{/*errors.images*/}</p>
                  </h4>
                  <div className="images-container">
                    <div
                      className={
                        data.artist.imagenes.urlImg ? "imagent show" : "imagent"
                      }
                      style={{
                        backgroundImage: `url(${data.artist.imagenes.urlImg})`,
                      }}
                    >
                      {data.artist.imagenes.urlImg && (
                        <button
                          type="button"
                          className="delete-image-btn"
                          onClick={() => {
                            deleteImage(data.artist.imagenes);
                          }}
                        >
                          <i className="bi bi-x-circle-fill"></i>
                        </button>
                      )}

                      <label>
                        <input
                          type="file"
                          onChange={(e) => handleFileInput(e)}
                          accept="image/*"
                          placeholder="Choose Iamge"
                        />
                        <i className="bi bi-plus-circle-fill"></i>
                        <p>Add new image</p>
                      </label>
                    </div>
                  </div>
                </div>
                {/*-------------------------  IMAGENES  ---------------------------*/}
              </div>
            </div>
          </form>
        </section>
      )}
    </>
  );
};
