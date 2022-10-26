import React, { useState, useEffect } from "react";
import "./CreateAlbumForm.scss";
import Select from "react-select";
import Creatable, { useCreatable } from "react-select/creatable";
import axios from "axios";
import Loading from "../Loading/Loading";
export const CreateAlbumForm = ({ albumObject }) => {
  const [generos, setGeneros] = useState([]);
  const [singles, setSingles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(
    albumObject
      ? albumObject
      : {
          images: [
            { url: "", image: "" },
            { url: "", image: "" },
            { url: "", image: "" },
            { url: "", image: "" },
          ],
          album: {
            nombre: "",
            precio: 0,
            stock: 0,
            fechaLanzamiento: "",
            duracion: 0,
            descripcion: "",
            esVinilo: true,
            explicit: false,
            genero: {
              id: 0,
              generoName: "",
            },
            imagenes: [{ id: 0, urlImg: "" }],
            singles: [
              {
                id: 1,
                nombre: "Pancakes & Pi",
                duracion: 380000,
                fechaLanzamiento: "01/08/2002",
                explicit: true,
                urlMusic:
                  "http://res.cloudinary.com/dknpio4ug/video/upload/v1666747139/gx0y1353mcq1gyz29pzj.mp3",
                genero_fk: {
                  id: 1,
                  generoName: "Rock",
                },
                cloudinaryId: "gx0y1353mcq1gyz29pzj",
              },
            ],
          },
        }
  );
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
    console.log("Inicio");
    axios({
      url: "http://localhost:9000/api/v1/genero",
      method: "GET",
    })
      .then(({ data }) => {
        let generosData = data.content.map((genero) => {
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
    axios({
      url: "http://localhost:9000/api/v1/singles/",
      method: "GET",
    })
      .then(({ data }) => {
        let singles = data.content.map((single) => {
          return {
            value: single,
            label:
              single.nombre.substring(0, 1).toUpperCase() +
              single.nombre.substring(1),
          };
        });
        setSingles(singles);
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
  const handleFileInput = async (e, i) => {
    //console.log("Cambiando Imagen");
    let imagesData = data.images;
    imagesData[i] = {
      url: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0],
    };
    setData({
      ...data,
      images: imagesData,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log(data.images[0]);
    for (let i = 0; i < data.images.length; i++) {
      formData.append("file", data.images[i].image);
    }
    setLoading(true);
    console.log("----------Form Data----------");
    console.log(data);
    axios({
      url: "http://localhost:9000/api/v1/img/uploadImg",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        handleData("imagenes", res.data);
        axios({
          url: "http://localhost:9000/api/v1/album",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: { ...data.album, imagenes: res.data },
        })
          .then((res) => {
            console.log(res.status);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    /*
     */
  };
  const deleteImage = (img) => {
    setData({
      ...data,
      images: data.images.map((i) =>
        i.url === img ? { url: "", form: "" } : i
      ),
    });
  };
  const selectStyle = {
    control: (provided, state) => ({
      display: "flex",
      width: "30rem",
      border: "2px solid black",
      borderRadius: 0,
    }),
    menu: (provided) => ({
      ...provided,
      width: "30rem",
      border: "2px solid black",
      borderRadius: 0,
      padding: 0,
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
        <section className="CreateAlbumForm">
          <h1 className="title">
            Create An Album
            <span>
              <button /*onClick={() => handleShoeDialog()}*/>
                <i className="bi bi-x-circle-fill"></i>Cancel
              </button>
              <button className="save-btn" onClick={handleSubmit}>
                <i className="bi bi-upload"></i>Save
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
                  />
                </div>
                <div className="input number">
                  <label htmlFor="">
                    <h4 className="input-name">
                      Duracion <p>{/*errors.images*/}</p>
                    </h4>
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      handleData("duracion", e.target.value);
                    }}
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
                    onChange={(param) =>
                      handleData("genero", {
                        id: param?.id,
                        generoName: param?.value,
                      })
                    }
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
              <div>
                <div className="images">
                  <h4 className="input-name">
                    Imagenes <p>{/*errors.images*/}</p>
                  </h4>
                  <div className="images-container">
                    {data.images.map((img, i) => {
                      return (
                        <div
                          className={img.url ? "imagent show" : "imagent"}
                          key={i}
                          style={{ backgroundImage: `url(${img.url})` }}
                        >
                          {img.url && (
                            <button
                              type="button"
                              className="delete-image-btn"
                              onClick={() => deleteImage(img.url)}
                            >
                              <i className="bi bi-x-circle-fill"></i>
                            </button>
                          )}

                          <label>
                            <input
                              type="file"
                              onChange={(e) => handleFileInput(e, i)}
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
                <div className="singles">
                  <h4 className="input-name">
                    Canciones <p>{/*errors.images*/}</p>
                  </h4>
                  <div className="canciones-container">
                    <Select
                      className="singles-select"
                      options={singles}
                      placeholder={"Elige una cancion creada"}
                      isClearable
                      onSelectResetsInput={true}
                      onBlurResetsInput={true}
                      styles={selectStyle}
                      onChange={(param, action) => {
                        console.log(action);
                        if (action.action === "select-option") {
                          let repetido = data.album.singles.find(
                            (single) => single.id === param.value.id
                          );
                          if (!repetido) {
                            setData({
                              ...data,
                              album: {
                                ...data.album,
                                singles: [...data.album.singles, param.value],
                              },
                            });
                          }
                        }
                      }}
                    />
                    <label>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <i className="bi bi-plus-circle-fill"></i>
                      </button>
                    </label>
                    {data.album.singles.map((e, i) => {
                      var minutes = Math.floor(e.duracion / 60000);
                      var seconds = ((e.duracion % 60000) / 1000).toFixed(0);
                      let tiempo =
                        seconds == 60
                          ? minutes + 1 + ":00"
                          : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
                      return (
                        <div key={i}>
                          {" "}
                          <h1>{e.nombre}</h1>{" "}
                          <h3>
                            {e.genero_fk.generoName}{" "}
                            {tiempo}
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      )}
    </>
  );
};
