import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Loading from "../../../Loading/Loading";
import "./CreateArtista.scss";
import Creatable, { useCreatable } from "react-select/creatable";
import Select from "react-select";
import countryList from "react-select-country-list";

import { ErrorMessage, Field, Form, Formik, useField } from "formik";
export const CreateArtista = ({
  artistObject,
  cancelFunc,
  isCreating,
  getArtists,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [submiting, setSubmiting] = useState(false);
  
  const setInitialValues = () => {
    let initialValues = {
      deletedImages: [],
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
    };
    if (artistObject) {
      initialValues = {
        ...initialValues,
        artist: artistObject,
      };
    }
    return initialValues;
  };
  const [touchedInputs, setTouchedInput] = useState({
    images: false,
    nacionalidad: false
  });
  const paises = useMemo(() => countryList().getData(), []);
  /*document.onkeydown = function (e) {
    //console.log(e.key);
    if (e.key == "Enter") {
      console.log("submit");
      handleSubmit();
    } else if (e.key == "Escape") {
      cancelFunc();
    }
  };*/
  useEffect(() => {
    setLoading(false);
  }, []);

  const createArtistaBackend = (valores) => {
    let formData = new FormData();
    if (valores.artist.imagenes) {
      formData.append("Imagen", valores.artist.imagenes.file);
    }
    let deletedImg = JSON.stringify(valores.deletedImages);
    let newArtista = valores.artist;
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
      if (valores.deletedImages.length) {
        formData.append(
          "ImgsBorrada",
          new Blob([deletedImg], { type: "application/json" })
        );
      }
      console.log("AAaaa");
    }

    let url = isCreating
      ? "http://localhost:9000/api/v1/artista/createArtista"
      : "http://localhost:9000/api/v1/artista/updateArtista/" +
        valores.artist.id;

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
        <Formik
          initialValues={setInitialValues()}
          onSubmit={(valores, { resetForm }) => {
            //console.log(valores);
            //setSubmiting(true);
            //resetForm()
            createArtistaBackend(valores);
          }}
          validate={(valores) => {
            let errores = {};
            // Validacion nombre
            console.log(valores);
            if (!valores.artist.nombre || valores.artist.nombre == "") {
              errores.nombre = "Por favor ingresa un nombre";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.artist.nombre)) {
              errores.nombre =
                "El nombre solo puede contener letras y espacios";
            }

            // Validacion fecha de nacimiento
            if (
              !valores.artist.fechanacimiento ||
              valores.artist.fechanacimiento == ""
            ) {
              errores.fechanacimiento =
                "Por favor ingresa una fecha de lanzamiento";
            }

            // Validacion imagenes
            if (!valores.artist.imagenes.urlImg) {
              errores.images = "Por favor ingrese una imagen";
            }

            // Validacion formato
            if (!valores.artist.nacionalidad ||
              valores.artist.nacionalidad == "") {
              errores.nacionalidad = "Por favor ingrese una nacionalidad";
            }
            return errores;
          }}
        >
          {(props) => {
            const { values, handleBlur, setFieldValue, errors, touched } =
              props;

            return (
              <div className="CreateArtistForm">
                <Form className="form">
                  <header className="form-header">
                    <h1>Crea un artista</h1>
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
                          value={values.artist.nombre}
                          onChange={(e) => {
                            let inputName = e.target.name;
                            setFieldValue("artist", {
                              ...values.artist,
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
                          Fecha de nacimiento <p>{/*errors.images*/}</p>
                          </h4>{" "}
                        </label>
                        <Field
                          type="date"
                          id="fechanacimiento"
                          name="fechanacimiento"
                          value={values.artist.fechanacimiento.replaceAll(
                            "/",
                            "-"
                          )}
                          onChange={(e) => {
                            let inputName = e.target.name;
                            setFieldValue("artist", {
                              ...values.artist,
                              [inputName]: e.target.value.replaceAll("-", "/"),
                            });
                          }}
                        />
                        {(touched.fechanacimiento || submiting) &&
                          errors.fechanacimiento && (
                            <div className="error">
                              {errors.fechanacimiento}
                            </div>
                          )}
                      </div>
                      <div className="form-field">
                        <label htmlFor="">
                          <h4 className="input-name">Nacionalidad</h4>
                        </label>
                        <Select
                          name={"formato"}
                          options={paises}
                          placeholder={"Elige el pais de origen..."}
                          isClearable
                          onSelectResetsInput={false}
                          onBlurResetsInput={false}
                          styles={selectStyle}
                          defaultValue={
                            values.artist.nacionalidad && {
                              label: values.artist.nacionalidad,
                              value: values.artist.nacionalidad,
                            }
                          }
                          onChange={(option, { action }) => {
                            //console.log(action);
                            setTouchedInput({
                              ...touchedInputs,
                              nacionalidad: true,
                            });
                            if (action == "clear") {
                              setFieldValue("artist", {
                                ...values.artist,
                                nacionalidad: "",
                              });
                            } else {
                              setFieldValue("artist", {
                                ...values.artist,
                                nacionalidad: option.label,
                              });
                            }
                          }}
                          onMenuOpen={() => {
                            setTouchedInput({
                              ...touchedInputs,
                              nacionalidad: true,
                            });
                          }}
                        />
                        {(touchedInputs.nacionalidad || submiting) &&
                          errors.nacionalidad && (
                            <div className="error">{errors.nacionalidad}</div>
                          )}
                      </div>
                      <div className="form-field">
                        <label htmlFor="">
                          <h4 className="input-name">Descripcions</h4>
                        </label>
                        <Field
                          as="textarea"
                          name="descripcion"
                          id="descripcion"
                          cols="30"
                          rows="10"
                          value={values.artist.descripcion}
                          onChange={(e) => {
                            let inputName = e.target.name;
                            setFieldValue("artist", {
                              ...values.artist,
                              [inputName]: e.target.value,
                            });
                          }}
                        ></Field>
                      </div>
                    </section>
                    <section className="form-rigth">
                      {/*-------------------------  IMAGENES  ---------------------------*/}
                      <div className="images">
                        <h4 className="input-name">
                          Imagen
                          {(touchedInputs.images || submiting) &&
                            errors.images &&
                            errors.images && (
                              <div className="error">{errors.images}</div>
                            )}
                        </h4>
                        <div className="images-container">
                          <div
                            className={
                              values.artist.imagenes.urlImg
                                ? "imagent show"
                                : "imagent"
                            }
                            style={{
                              backgroundImage: `url(${values.artist.imagenes.urlImg})`,
                            }}
                          >
                            {values.artist.imagenes.urlImg && (
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
                                    values.artist.imagenes.id && values.artist.imagenes.id,
                                  ]);
                                  setFieldValue("artist", {
                                    ...values.artist,
                                    imagenes: { urlImg: "", file: "" },
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
                                    values.artist.imagenes.id && values.artist.imagenes.id,
                                  ]);
                                  setFieldValue("artist", {
                                    ...values.artist,
                                    imagenes: {
                                      urlImg: URL.createObjectURL(
                                        e.target.files[0]
                                      ),
                                      file: e.target.files[0],
                                    },
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
                              <p>Add new image</p>
                            </label>
                          </div>
                        </div>
                      </div>
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
