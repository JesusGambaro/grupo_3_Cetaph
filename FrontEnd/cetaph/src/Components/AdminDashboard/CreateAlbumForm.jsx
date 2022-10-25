import React, { useState, useEffect } from "react";
import "./CreateAlbumForm.scss";
import Select from "react-select";
import Creatable, { useCreatable } from "react-select/creatable";
import axios from "axios";
import Loading from "../Loading/Loading";
export const CreateAlbumForm = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [generos, setGeneros] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const handleGenero = (value) => {
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [data, setData] = useState({
    images: [],
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
    },
  });

  const handleData = (property, value) => {
    setData({
      ...data,
      album: {
        ...data.album,
        [property]: value,
      },
    });
  };
  const handleFileInput = async (e) => {
    //console.log("Cambiando Imagen");
    setData({
      ...data,
      images: [
        ...data.images,
        {
          url: URL.createObjectURL(e.target.files[0]),
          image: e.target.files[0],
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    console.log(data.images[0]);
    for (let i = 0; i < data.images.length; i++) {
      formData.append("file", data.images[i].image);
    }
    setLoading(true);
    axios({
      url: "http://localhost:9000/api/v1/img/uploadImg",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        console.log(res.data);
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
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    /*
     */
  };
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected && "blue",
    }),
    control: (provided,state) => ({
      ...provided,
      // none of react-select's styles are passed to <Control />
      width: "30rem",
      border: state.isSelected && "1px solid red",
      
    }),
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="CreateAlbumForm">
          <h1>Create An Album</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <div className="input text">
                <label htmlFor="">Nombre </label>
                <input
                  type="text"
                  onChange={(e) => {
                    handleData("nombre", e.target.value);
                  }}
                />
              </div>
              <div className="input number">
                <label htmlFor="">Duracion </label>
                <input
                  type="number"
                  onChange={(e) => {
                    handleData("duracion", e.target.value);
                  }}
                />
              </div>
              <div className="input number">
                <label htmlFor="">Precio $</label>
                <input
                  type="number"
                  onChange={(e) => {
                    handleData("precio", e.target.value);
                  }}
                />
              </div>
              <div className="input number">
                <label htmlFor="">Stock </label>
                <input
                  type="number"
                  onChange={(e) => {
                    handleData("stock", e.target.value);
                  }}
                />
              </div>
              <div className="input checkbox">
                <label htmlFor="">Explicito </label>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    handleData("explicit", !data.album.explicit);
                  }}
                />
              </div>
              <div className="input date">
                <label htmlFor="">Lanzamiento </label>
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
              <div className="input file">
                <input
                  type="file"
                  onChange={(e) => handleFileInput(e)}
                  accept="image/*"
                  placeholder="Choose Iamge"
                />
                {data.images.length ? (
                  data.images.map((img) => {
                    return (
                      <div
                        className={"album-img " + (img.url ? "on" : "off")}
                        style={
                          img.url ? { backgroundImage: `url(${img.url})` } : {}
                        }
                      />
                    );
                  })
                ) : (
                  <div className={"album-img off"} />
                )}
              </div>
              <div className="input genero">
                <label htmlFor="">Genero </label>
                <Creatable
                  className="generos-select"
                  options={generos}
                  placeholder={"Elige o Crea un genero"}
                  isClearable
                  onSelectResetsInput={false}
                  onBlurResetsInput={false}
                  styles={customStyles}
                  onChange={(param) =>
                    handleData("genero", {
                      id: param?.id,
                      generoName: param?.value,
                    })
                  }
                  onCreateOption={(param) => {
                    console.log(param);
                    handleGenero(param);
                  }}
                />
              </div>
              <div className="input descripcion">
                <label htmlFor="">Descripcion </label>
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
            <button>Enviar</button>
          </form>
        </section>
      )}
    </>
  );
};
