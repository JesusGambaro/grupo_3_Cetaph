import React from "react";
import { useState, useEffect } from "react";
import "./AllProductsStyle.scss";
import axios from "axios";
import Loading from "../../Loading/Loading";
import { AlbumsAdmin } from "./Albums/AlbumsAdmin";
import { ArtistasAdmin } from "./Artistas/ArtistasAdmin";

import { filterCatalogue,getArtistas } from "../../../Redux/actions/catalogue";
import { useDispatch, useSelector } from "react-redux";
export const AllProducts = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector(({ main }) => main);
  const [filters, setFilters] = useState({});
  const dividedGroups = () => {
    const start = Math.floor(filters.page / 4) * 4;
    //console.log(filter.size.totalPages);
    return new Array(4).fill().map((_, i) => {
      let limit = start + i + 1;
      return limit <= filter.size.totalPages && limit;
    });
  };
  const goPage = (e) =>
    setFilters({ ...filters, page: Number(e.target.textContent) - 1 });
  const [showAlbums, setShowAlbums] = useState(true);
  

  
  return (
    <div className="AllProducts">
      <span className="select-products">
        <ul>
          <li
            className={showAlbums ? "active" : "inactive"}
            onClick={() => {
              setShowAlbums(true);
            }}
          >
            <h1>Albums</h1>
          </li>
          <li
            className={!showAlbums ? "active" : "inactive"}
            onClick={() => {
              setShowAlbums(false);
            }}
          >
            <h1>Artistas</h1>
          </li>
        </ul>
      </span>
      {showAlbums ? (
          <AlbumsAdmin
          ></AlbumsAdmin>
        ) : (
          <ArtistasAdmin
          ></ArtistasAdmin>
        )}
      
    </div>
  );
};
