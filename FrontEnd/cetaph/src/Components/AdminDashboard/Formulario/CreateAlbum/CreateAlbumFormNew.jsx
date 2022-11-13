import React, { useState, useEffect } from "react";
import "./CreateAlbumFormNew.scss";
import Select from "react-select";
import Creatable, { useCreatable } from "react-select/creatable";
import axios from "axios";
import Loading from "../../../Loading/Loading";
import { CreateSingle } from "../CreateSingle/CreateSingle";
import { useRef } from "react";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
const CreateAlbumFormNew = ({
  albumObject,
  cancelFunc,
  isCreating,
  getAlbums,
}) => {
  const [generos, setGeneros] = useState([]);
  const [formatos, setFormatos] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [touchedInputs, setTouchedInput] = useState({
    images: false,
    genero: false,
    artista: false,
    singles: false,
    formato: false,
  });
  const [isLoading, setLoading] = useState(true);
  const [submiting, setSubmiting] = useState(false);
  const [isCreatingSingle, setCreatingSingle] = useState(false);
  const setInitialValues = () => {
    let initialValues = {
      deletedImages: [],
      deletedSingles: [],
      newArtists: [],
      album: {
        nombre: "",
        precio: 0,
        stock: 0,
        fechaLanzamiento: "",
        duracion: 0,
        descripcion: "",
        formato: "",
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
        artistas: [],
      },
    };
    if (albumObject) {
      let imgs = initialValues.album.imagenes;
      for (let index = 0; index < albumObject.imagenes.length; index++) {
        imgs[index] = albumObject.imagenes[index];
      }
      let artistas = albumObject.artistas.map((a) => {
        return a.id;
      });
      initialValues = {
        ...initialValues,
        album: { ...albumObject, imagenes: imgs },
        newArtists: artistas,
      };
    }
    return initialValues;
  };
  const createAlbumBackEnd = (valores) => {
    let formData = new FormData();
    valores.album.imagenes.map((img) => {
      if (img.file) {
        formData.append("Imagenes", img.file);
      }
    });
    valores.album.singles.map((single) => {
      if (single.file) {
        formData.append("musicFiles", single.file);
      }
    });
    let album = valores.album;
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
    let albumAxios = JSON.stringify(album);
    let singlesListAxios = JSON.stringify(singlesList);
    let deletedImgs = JSON.stringify(valores.deletedImages);
    let newArtists = JSON.stringify(valores.newArtists);
    let deletedSingles = JSON.stringify(valores.deletedSingles);
    formData.append(
      "Album",
      new Blob([albumAxios], { type: "application/json" })
    );
    formData.append(
      "SinglesList",
      new Blob([singlesListAxios], { type: "application/json" })
    );
    formData.append(
      "idArtista",
      new Blob([newArtists], { type: "application/json" })
    );
    setLoading(true);
    //console.log(data.album);
    //console.log(formData.getAll("Album"));

    if (isCreating) {
      console.log("creating");
    } else {
      console.log("updating");
      if (valores.deletedImages.length) {
        formData.append(
          "ImgsBorradas",
          new Blob([deletedImgs], { type: "application/json" })
        );
      }
      if (valores.deletedSingles.length) {
        formData.append(
          "CancionesBorradas",
          new Blob([deletedSingles], { type: "application/json" })
        );
      }
    }

    let url = isCreating
      ? "http://localhost:9000/api/v1/album/upload"
      : "http://localhost:9000/api/v1/album/update/" + valores.album.id;

    axios({
      url: url,
      method: isCreating ? "POST" : "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formData,
    })
      .then((res) => {
        console.log(res.data);
        cancelFunc();
        getAlbums({
          albumNombre: "",
          artista: { id: "", nombre: "" },
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    //console.log(albumObject);

    axios({
      url: "http://localhost:9000/api/v1/artista/",
      method: "GET",
    })
      .then(({ data }) => {
        let artistasData = data.content.map((artista) => {
          return {
            value: artista.id,
            label:
              artista.nombre.substring(0, 1).toUpperCase() +
              artista.nombre.substring(1),
          };
        });
        setArtistas(artistasData);
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      url: "http://localhost:9000/api/v1/album/formatos",
      method: "GET",
    })
      .then(({ data }) => {
        let newFormatos = data.map((f) => {
          return {
            value: f,
            label:f,
          };
        });
        setFormatos(newFormatos);
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      url: "http://localhost:9000/api/v1/genero",
      method: "GET",
    })
      .then(({ data }) => {
        let generosData = data.content.map((genero) => {
          return {
            value: genero,
            label:
              genero.generoName.substring(0, 1).toUpperCase() +
              genero.generoName.substring(1),
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
            let generosData = data.content.map((genero) => {
              return {
                value: genero,
                label:
                  genero.generoName.substring(0, 1).toUpperCase() +
                  genero.generoName.substring(1),
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
  const selectStyle = {
    control: (provided, state) => ({
      display: "flex",
      width: "20rem",
      minheight: "2.5rem",
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
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={setInitialValues()}
          onSubmit={(valores, { resetForm }) => {
            //console.log(valores);
            //setSubmiting(true);
            //resetForm()
            createAlbumBackEnd(valores);
          }}
          validate={(valores) => {
            let errores = {};
            console.log(valores.album.genero);
            // Validacion nombre
            if (!valores.album.nombre || valores.album.nombre == "") {
              errores.nombre = "Por favor ingresa un nombre";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.album.nombre)) {
              errores.nombre =
                "El nombre solo puede contener letras y espacios";
            }

            // Validacion precio
            if (!valores.album.precio) {
              errores.precio = "Por favor ingresa un precio";
            } else if (valores.album.precio < 1) {
              errores.precio = "El precio debe ser mayor a 0";
            }

            // Validacion precio
            if (!valores.album.stock || valores.album.stock < 1) {
              errores.stock = "Por favor ingresa un stock";
            } else if (valores.album.stock < 1) {
              errores.stock = "El stock debe ser mayor a 0";
            }

            // Validacion fecha de lanzamiento
            if (
              !valores.album.fechaLanzamiento ||
              valores.album.fechaLanzamiento == ""
            ) {
              errores.fechaLanzamiento =
                "Por favor ingresa una fecha de lanzamiento";
            }

            // Validacion fecha de lanzamiento
            if (!valores.album.genero.id) {
              errores.genero = "Por favor ingrese un genero";
            }

            // Validacion formato
            if (valores.album.formato == "") {
              errores.formato = "Por favor ingrese un formato";
            }

            // Validacion fecha de lanzamiento
            if (!valores.newArtists.length) {
              errores.artista = "Por favor ingrese un artista";
            }

            // Validacion imagenes
            let hasImg = false;
            valores.album.imagenes.map((i) => {
              if (i.urlImg != "") {
                hasImg = true;
              }
            });
            if (!hasImg) {
              errores.images = "Por favor ingrese una imagen";
            }

            // Validacion canciones
            if (!valores.album.singles.length) {
              errores.singles = "Por favor ingrese canciones";
            }

            console.log(errores);
            return errores;
          }}
        >
          {(props) => {
            const {
              values,
              handleSubmit,
              handleBlur,
              setFieldValue,
              errors,
              touched,
            } = props;

            return (
              <div className="CreateAlbumForm">
                <Form className="form" onSubmit={handleSubmit}>
                  <header className="form-header">
                    <h1>Create An Album</h1>
                    <span>
                      <button onClick={() => cancelFunc()}>
                        <i className="bi bi-x-circle-fill"></i>Cancel
                      </button>
                      <button
                        className="save-btn"
                        type="submit"
                        onClick={() => {
                          setSubmiting(true);
                        }}
                      >
                        <i className="fa-solid fa-floppy-disk"></i>Save
                      </button>
                    </span>
                  </header>
                  <div className="wrapper">
                    <section className="form-left">
                      <div className="form-field">
                        <label>
                          <h4 className="input-name">
                            Nombre <p>{/*errors.images*/}</p>
                          </h4>
                        </label>
                        <Field
                          type="text"
                          id="nombre"
                          name="nombre"
                          placeholder="Red Roses..."
                          value={values.album.nombre}
                          onChange={(e) => {
                            let inputName = e.target.name;
                            setFieldValue("album", {
                              ...values.album,
                              [inputName]: e.target.value,
                            });
                          }}
                        />
                        {(touched.nombre || submiting) && errors.nombre && (
                          <div className="error">{errors.nombre}</div>
                        )}
                      </div>
                      <div className="form-field">
                        <label htmlFor="">
                          <h4 className="input-name">
                            Precio <p>{/*errors.images*/}</p>
                          </h4>
                        </label>
                        <Field
                          type="number"
                          id="precio"
                          name="precio"
                          placeholder="999..."
                          value={values.album.precio > 0 && values.album.precio}
                          onChange={(e) => {
                            let inputName = e.target.name;
                            setFieldValue("album", {
                              ...values.album,
                              [inputName]: e.target.value,
                            });
                          }}
                        />
                        {(touched.precio || submiting) && errors.precio && (
                          <div className="error">{errors.precio}</div>
                        )}
                      </div>
                      <div className="form-field">
                        <label htmlFor="">
                          <h4 className="input-name">
                            Stock <p>{/*errors.images*/}</p>
                          </h4>
                        </label>
                        <Field
                          type="number"
                          id="stock"
                          name="stock"
                          placeholder="999..."
                          value={values.album.stock > 0 && values.album.stock}
                          onChange={(e) => {
                            let inputName = e.target.name;
                            setFieldValue("album", {
                              ...values.album,
                              [inputName]: e.target.value,
                            });
                          }}
                        />
                        {(touched.stock || submiting) && errors.stock && (
                          <div className="error">{errors.stock}</div>
                        )}
                      </div>
                      <div className="form-field">
                        <label htmlFor="">
                          <h4 className="input-name">
                            Explicito <p>{/*errors.images*/}</p>
                          </h4>
                        </label>
                        <Field
                          type="checkbox"
                          id="explicit"
                          name="explicit"
                          checked={values.album.explicit}
                          onChange={(e) => {
                            let inputName = e.target.name;
                            setFieldValue("album", {
                              ...values.album,
                              [inputName]: !values.album.explicit,
                            });
                          }}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="">
                          <h4 className="input-name">
                            Lanzamiento <p>{/*errors.images*/}</p>
                          </h4>{" "}
                        </label>
                        <Field
                          type="date"
                          id="fechaLanzamiento"
                          name="fechaLanzamiento"
                          value={values.album.fechaLanzamiento.replaceAll(
                            "/",
                            "-"
                          )}
                          onChange={(e) => {
                            let inputName = e.target.name;
                            setFieldValue("album", {
                              ...values.album,
                              [inputName]: e.target.value.replaceAll("-", "/"),
                            });
                          }}
                        />
                        {(touched.fechaLanzamiento || submiting) &&
                          errors.fechaLanzamiento && (
                            <div className="error">
                              {errors.fechaLanzamiento}
                            </div>
                          )}
                      </div>
                      <div className="form-field">
                        <label htmlFor="">
                          <h4 className="input-name">Genero</h4>{" "}
                        </label>
                        <Creatable
                          name={"genero"}
                          onChange={(option, { action }) => {
                            //console.log(action);
                            setTouchedInput({ ...touchedInputs, genero: true });
                            if (action == "clear") {
                              setFieldValue("album", {
                                ...values.album,
                                genero: {},
                              });
                            } else {
                              setFieldValue("album", {
                                ...values.album,
                                genero: option.value,
                              });
                            }
                          }}
                          placeholder={"Elige o Escribe un genero..."}
                          options={generos}
                          onBlur={handleBlur}
                          isClearable
                          onCreateOption={(param) => {
                            crearGenero(param);
                          }}
                          defaultValue={
                            values.album.genero.generoName && {
                              label: values.album.genero.generoName,
                              value: values.album.genero,
                            }
                          }
                          styles={selectStyle}
                          onMenuOpen={() => {
                            setTouchedInput({ ...touchedInputs, genero: true });
                          }}
                        />

                        {(touchedInputs.genero || submiting) &&
                          errors.genero && (
                            <div className="error">{errors.genero}</div>
                          )}
                      </div>
                      <div className="form-field">
                        <label htmlFor="">
                          <h4 className="input-name">Formato</h4>
                        </label>
                        <Select
                          name={"formato"}
                          options={formatos}
                          placeholder={"Elige el formato..."}
                          isClearable
                          onSelectResetsInput={false}
                          onBlurResetsInput={false}
                          styles={selectStyle}
                          defaultValue={
                            values.album.formato && {
                              label:  values.album.formato,
                              value:  values.album.formato
                            }
                          }
                          onChange={(option, { action }) => {
                            //console.log(action);
                            setTouchedInput({ ...touchedInputs, formato: true });
                            if (action == "clear") {
                              setFieldValue("album", {
                                ...values.album,
                                formato: "",
                              });
                            } else {
                              setFieldValue("album", {
                                ...values.album,
                                formato: option.value,
                              });
                            }
                          }}
                          onMenuOpen={() => {
                            setTouchedInput({
                              ...touchedInputs,
                              formato: true,
                            });
                          }}
                        />
                        {(touchedInputs.formato || submiting) &&
                          errors.formato && (
                            <div className="error">{errors.formato}</div>
                          )}
                      </div>
                      <div className="form-field">
                        <label htmlFor="">
                          <h4 className="input-name">Artista</h4>
                        </label>
                        <Select
                          name={"artista"}
                          options={artistas}
                          placeholder={"Elige el/los artistas..."}
                          isClearable
                          onSelectResetsInput={false}
                          onBlurResetsInput={false}
                          styles={selectStyle}
                          defaultValue={values.album.artistas.map((artist) => {
                            return {
                              label: artist.nombre,
                              value: artist.id,
                            };
                          })}
                          onChange={(param, { action }) => {
                            //console.log(action);
                            setTouchedInput({
                              ...touchedInputs,
                              artista: true,
                            });
                            if (action === "clear") {
                              setFieldValue("newArtists", []);
                            } else {
                              setFieldValue(
                                "newArtists",
                                param.map((artist) => {
                                  return artist.value;
                                })
                              );
                            }
                          }}
                          onMenuOpen={() => {
                            setTouchedInput({
                              ...touchedInputs,
                              artista: true,
                            });
                          }}
                          isMulti
                        />
                        {(touchedInputs.artista || submiting) &&
                          errors.artista && (
                            <div className="error">{errors.artista}</div>
                          )}
                      </div>
                      <div className="form-field">
                        <label htmlFor="">
                          <h4 className="input-name">
                            Descripcion <p>{/*errors.images*/}</p>
                          </h4>
                        </label>
                        <Field
                          as="textarea"
                          name="descripcion"
                          id="descripcion"
                          cols="30"
                          rows="10"
                        ></Field>
                      </div>
                    </section>
                    <section className="form-rigth">
                      {/*-------------------------  IMAGENES  ---------------------------*/}
                      <div className="images">
                        <h4 className="input-name">
                          Imagenes{" "}
                          {(touchedInputs.images || submiting) &&
                            errors.images &&
                            errors.images && (
                              <div className="error">{errors.images}</div>
                            )}
                        </h4>
                        <div className="images-container">
                          {values.album.imagenes.map((img, index) => {
                            return (
                              <div
                                className={
                                  img.urlImg ? "imagent show" : "imagent"
                                }
                                key={index}
                                style={{
                                  backgroundImage: `url(${img.urlImg})`,
                                }}
                              >
                                {img.urlImg && (
                                  <button
                                    type="button"
                                    className="delete-image-btn"
                                    onClick={() => {
                                      setTouchedInput({
                                        ...touchedInputs,
                                        images: true,
                                      });
                                      setFieldValue("deletedImages", [
                                        ...values.deletedImages,
                                        img.cloudinaryId && img.cloudinaryId,
                                      ]);
                                      setFieldValue("album", {
                                        ...values.album,
                                        imagenes: values.album.imagenes.map(
                                          (i) => {
                                            if (i.urlImg == img.urlImg) {
                                              i = { urlImg: "", file: "" };
                                            }
                                            return i;
                                          }
                                        ),
                                      });
                                    }}
                                  >
                                    <i className="bi bi-x-circle-fill"></i>
                                  </button>
                                )}

                                <label>
                                  <input
                                    type="file"
                                    onChange={(e) => {
                                      setFieldValue("deletedImages", [
                                        ...values.deletedImages,
                                        img.id && img.id,
                                      ]);
                                      setFieldValue("album", {
                                        ...values.album,
                                        imagenes: values.album.imagenes.map(
                                          (i, id) => {
                                            if (id == index) {
                                              i = {
                                                urlImg: URL.createObjectURL(
                                                  e.target.files[0]
                                                ),
                                                file: e.target.files[0],
                                              };
                                            }
                                            return i;
                                          }
                                        ),
                                      });
                                    }}
                                    onClick={() => {
                                      setTouchedInput({
                                        ...touchedInputs,
                                        images: true,
                                      });
                                    }}
                                    accept="image/png, image/jpeg"
                                  />
                                  <i className="bi bi-plus-circle-fill"></i>
                                  <p>Añadir una imagen</p>
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
                          Canciones
                          {(touchedInputs.singles || submiting) &&
                            errors.singles && (
                              <div className="error">{errors.singles}</div>
                            )}
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
                              <p>Crea una cancion</p>

                              <i className="bi bi-plus-circle-fill"></i>
                            </button>
                          </label>
                        </div>
                        <div className="canciones-container">
                          {values.album.singles.map((e, i) => {
                            var minutes = Math.floor(e.duracion / 60000);
                            var seconds = ((e.duracion % 60000) / 1000).toFixed(
                              0
                            );
                            let tiempo =
                              seconds == 60
                                ? minutes + 1 + ":00"
                                : minutes +
                                  ":" +
                                  (seconds < 10 ? "0" : "") +
                                  seconds;
                            return (
                              <div key={i} className="cancion-card">
                                {" "}
                                <span>
                                  <label>Nombre: </label>
                                  <h1>{e.nombre}</h1>
                                </span>
                                <span>
                                  <label>Duracion: </label>
                                  <h3>{tiempo}</h3>
                                </span>
                                <SongPlayer
                                  urlMusic={e.urlMusic}
                                  file={e.file}
                                  single={e}
                                  id={i}
                                  deleteSingle={(single) => {
                                    setTouchedInput({
                                      ...touchedInputs,
                                      singles: true,
                                    });
                                    setFieldValue("deletedSingles", [
                                      ...values.deletedSingles,
                                      single.cloudinaryId &&
                                        single.cloudinaryId,
                                    ]);
                                    setFieldValue("album", {
                                      ...values.album,
                                      singles: values.album.singles.filter(
                                        (s) => {
                                          return s != single;
                                        }
                                      ),
                                    });
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {/*-------------------------  SINGLES  ---------------------------*/}

                      {isCreatingSingle && (
                        <CreateSingle
                          closeFunc={() => {
                            setCreatingSingle(false);
                            setTouchedInput({
                              ...touchedInputs,
                              singles: true,
                            });
                          }}
                          addSingleFunc={(singleData) => {
                            setFieldValue("album", {
                              ...values.album,
                              singles: [...values.album.singles, singleData],
                            });
                            setTouchedInput({
                              ...touchedInputs,
                              singles: true,
                            });
                          }}
                        />
                      )}
                    </section>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default CreateAlbumFormNew;
const SongPlayer = ({ urlMusic, file, single, id, deleteSingle }) => {
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
          deleteSingle(single);
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
