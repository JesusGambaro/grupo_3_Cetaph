import { useState, useEffect, useCallback } from "react";
import "./upsidebar.scss";
import Select from "react-select";
import chroma from "chroma-js";
import { useDispatch, useSelector } from "react-redux";
import { filterCatalogue } from "../../../Redux/actions/catalogue";
import { setFilter } from "../../../Redux/reducers/mainReducer";
const UpSideBar = ({ changeFilters, handleSearch, setUpFilters, filters }) => {
  const selectStyle = {
    control: () => ({
      display: "flex",
      width: "12rem",
      height: "2.rem",
      border: "2px solid black",
      borderRadius: ".5rem",
      padding: "0 0.5rem",
      backgroundColor: "#fefbf6",
    }),
    menu: (provided) => ({
      ...provided,
      width: "12rem",
      border: "1px solid black",
      borderRadius: ".5rem",
      padding: 0,
      position: "absolute",
      botton: "-1rem",
      backgroundColor: "#fefbf6",
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      const color = chroma("#319da0");
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? color
          : isFocused
          ? "#319da0"
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "#319da0"
            : "black"
          : color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? "#319da0"
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },

    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "black",
      transition: "all 0.3s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "black",
    }),
  };
  const dispatch = useDispatch();
  return (
    <div className="upside-bar-container">
      <form onSubmit={handleSearch}>
        <div className="search-disks">
          <input
            type="text"
            placeholder="Buscar"
            name="search"
            value={filters.searchParam}
            onChange={(e) => {
              setUpFilters({ searchParam: e.target.value });
            }}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="sort-disks">
          <Select
            options={[
              { value: "order", label: "Orden", isDisabled: true },
              { value: "asc", label: "Ascendente" },
              { value: "desc", label: "Descendente" },
            ]}
            onSelectResetsInput={false}
            onBlurResetsInput={false}
            styles={selectStyle}
            //onChange={(e) => setUpFilters({ direction: e.value })}
            placeholder={"Orden"}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                neutral50: "#1A1A1A", // Placeholder color
              },
            })}
            onChange={(e, { action }) => {
              console.log(action);
              if (action == "clear") {
                setUpFilters({ direction: "" });
              } else {
                setUpFilters({ direction: e.value });
              }
            }}
            isClearable
            value={
              filters.direction != ""
                ? { value: filters.direction, label: filters.direction?.substring(0,1).toUpperCase() + filters.direction?.substring(1)}
                : null
            }
            isSearchable={false}
          />
          <Select
            options={[
              {
                value: "sortby",
                label: "Ordenar Por",
                isDisabled: true,
                isFixed: true,
              },
              { value: "precio", label: "Precio" },
              { value: "nombre", label: "Nombre" },
              { value: "lanzamiento", label: "Fecha" },
            ]}
            onSelectResetsInput={false}
            onBlurResetsInput={false}
            styles={selectStyle}
            //onChange={(e) => setUpFilters({ sort: e.value })}
            placeholder={"Sort by"}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                neutral50: "#1A1A1A", // Placeholder color
              },
            })}
            onChange={(e, { action }) => {
              console.log(action);
              if (action == "clear") {
                setUpFilters({ sort: "" });
              } else {
                setUpFilters({ sort: e.value });
              }
            }}
            isClearable
            value={
              filters.sort != ""
                ? { value: filters.sort, label: filters.sort?.substring(0,1).toUpperCase() + filters.sort?.substring(1)}
                : null
            }
            isSearchable={false}
          />
        </div>
      </form>
    </div>
  );
};

export default UpSideBar;
