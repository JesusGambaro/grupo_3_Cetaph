import React, { Fragment } from "react";
import "./DetailStyle.scss";
import NavBar from "../Navbar/NavBar";
import { useState } from "react";
const Detail = () => {
  let imagenes = [
    "https://lh3.googleusercontent.com/NzpxsXd1zYI-wjKRtdOlS3XCJK7mslbm2UFiU83vg4Vq_S-gQAF5otMl94-HzVmLuovwXdGzBeB29Uw=w544-h544-l90-rj",
    "https://tn.com.ar/resizer/H64og2Tlc1kKD6F2vDMdzx6QMrc=/767x0/smart/cloudfront-us-east-1.images.arcpublishing.com/artear/7U4BHNDEDNEVTKQSY76JBXRWII.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  const HandleCurrentState = (params) => {
    setCurrentImage(params);
  };
  //console.log("Detail");
  return (
    <>
      <div className="Detail">
        <div className="ImagenDisco">
          <img className="DiskImg" src={imagenes[currentImage]} alt="" />
          <div className="Vynil_disk">
            <img
              src="https://down.imgspng.com/download/0720/vinyl_PNG102.png"
              alt=""
            />
          </div>
          <div className="ExtraImagenesContainer">
            {imagenes.map((url, id) => {
              return (
                <div
                  className="ExtraImagenes"
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
          <h1 className="ArtistName">Imagine Dragons</h1>
          <span>
            <label>Nombre:</label>
            <h1>Disco Rojo</h1>
          </span>
          <span>
            <label>Año de lanzamiento::</label>
            <h1>26/06/2001</h1>
          </span>
          <span>
            <label>Nacionalidad:</label>
            <h1>Peru</h1>
          </span>

          <h1 className="PrecioText">$500</h1>
          <div className="Buttons">
            <button>Añadir al carrito</button>
            <button>
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
        <div className="ExtraInfo">
          <h1 className="StockText">
            In Stock<i class="fa-solid fa-check"></i>
          </h1>
          <h1 className="Delivery">
            <i class="fa-solid fa-box-open"></i>Delivery in 10 Days
          </h1>
          <h1 className="Protected">
            <i class="fa-solid fa-shield-heart"></i>Protected until payment
          </h1>
        </div>
      </div>
    </>
  );
};

export default Detail;
