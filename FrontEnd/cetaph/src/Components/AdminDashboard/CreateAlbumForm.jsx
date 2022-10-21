import React, { useState,useEffect } from "react";
import "./CreateAlbumForm.scss";
import Select from "react-select";
import Creatable, { useCreatable } from "react-select/creatable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
export const CreateAlbumForm = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [generos, setGeneros] = useState([]);
  useEffect(() => {
    console.log("Inicio");
    axios({
      url: "http://localhost:9000/api/v1/genero",
      method: "GET",
    })
      .then(({data}) => {
        console.log(data);
        let generosData = data.map((genero) => {
          return ({
            value: genero.generoName,
            label: genero.generoName.substring(0,1).toUpperCase() + genero.generoName.substring(1),
            id: genero.id
          })
        })
        setGeneros(generosData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [data, setData] = useState({
    images: { url: "", image: "" },
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
    },
  });
  //(property, value )
  /*setData({

      ...data,
      data.
  })
  
  */
  const sendData = () => {};
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
    console.log("Cambiando Imagen");
    setData({
      ...data,
      images: {
        url: URL.createObjectURL(e.target.files[0]),
        image: e.target.files[0],
      },
    });
  };
  const onInputChange = (inputValue, { action, prevInputValue }) => {
    if (action === "set-value") {
      console.log("entre");
      console.log(inputValue.value);
      return inputValue;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", data.images.image);
    formData.append("album", data.album);

    axios({
      url: "http://localhost:9000/api/v1/album",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data.album,
    })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="CreateAlbumForm">
      <h1>Create An Album</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            className="input text"
            type="text"
            placeholder="Nombre..."
            onChange={(e) => {
              handleData("nombre", e.target.value);
            }}
          />
          <input
            className="input number"
            type="number"
            placeholder="Duracion..."
            onChange={(e) => {
              handleData("duracion", e.target.value);
            }}
          />
          <input
            className="input number"
            type="number"
            placeholder="Precio..."
            onChange={(e) => {
              handleData("precio", e.target.value);
            }}
          />
          <input
            type="number"
            className="input number"
            placeholder="Stock..."
            onChange={(e) => {
              handleData("stock", e.target.value);
            }}
          />
          <div className="input checkbox">
            <label htmlFor="">isExplicit? </label>
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
          <input
            className="input file"
            type="file"
            onChange={(e) => handleFileInput(e)}
            accept="image/*"
            placeholder="Choose Iamge"
          />
          <div
            className={"album-img " + (data.images.url ? "on" : "off")}
            style={
              data.images.url
                ? { backgroundImage: `url(${data.images.url})` }
                : {}
            }
          />
          <Creatable
            options={generos}
            placeholder={"Genero..."}
            isClearable
            onChange={(param) => handleData("genero", {id:param.id,generoName:param.value})}
          />

          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Descripcion..."
            onChange={(e) => {
              handleData("descripcion", e.target.value);
            }}
          ></textarea>
        </div>
        <button>Enviar</button>
      </form>
    </section>
  );
};
