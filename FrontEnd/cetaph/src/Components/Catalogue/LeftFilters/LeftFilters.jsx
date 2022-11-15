import { useState, useEffect } from "react";
import "./leftFilters.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCatalogue,
  getFormatos,
  getGenres,
} from "../../../Redux/actions/catalogue";
import Select from "react-select";
import chroma from "chroma-js";
import { setFilter } from "../../../Redux/reducers/mainReducer";
import MultiRangeSlider from "multi-range-slider-react";
import { act } from "react-dom/test-utils";
import FiltersItems from "./FiltersItems";
const LeftFilters = ({ setUpFilters, filters }) => {
  const dispatch = useDispatch();
  let { filter, genres, formatos } = useSelector(({ main }) => main);
  const [checkeds, setCheckeds] = useState([]);
  const [price, setPrice] = useState({
    min: 0,
    max: 5000,
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getFormatos());
  }, []);
  const handleCheckSelect = (key) => {
    setCheckeds(checkeds.filter((select) => select !== key));
  };

  const selectStyle = {
    control: () => ({
      display: "flex",
      width: "12rem",
      height: "2.rem",
      border: "2px solid black",
      borderRadius: ".5rem",
      padding: "0 0.5rem",
      backgroundColor: "#fefbf6",
      placeholder: "black",
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
      color: "black",
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
  const handlePrice = (e) => {
    setPrice({ min: e.minValue, max: e.maxValue });
  };
  return (
    <div className="filters-container">
      <h1>Filtros</h1>
      <button
        className="resetFilters"
        onClick={() => {
          dispatch(setFilter({
            genre: "",
            priceMin: "",
            priceMax: "",
            explicit: "",
            searchParam: "",
            formato: "",
            sort: "",
            direction: "",
            page: 0,
            size: {
              totalElements: 1,
              totalPages: 1,
            },
          }))
          setUpFilters({
            genre: "",
            priceMin: "",
            priceMax: "",
            explicit: "",
            searchParam: "",
            formato: "",
            sort: "",
            direction: "",
            page: 0,
            size: {
              totalElements: 1,
              totalPages: 1,
            },
          });
          setPrice({min: 0,
            max: 5000,});
        }}
      >
        Limpiar Filtros
      </button>
      <div className="price-filter">
        <h4>Precio</h4>
        <MultiRangeSlider
          min={0}
          max={5000}
          step={100}
          ruler={false}
          label={true}
          preventWheel={true}
          minValue={price.min}
          maxValue={price.max}
          onInput={(e) => {
            handlePrice(e);
          }}
        />
        <div className="prices-container">
          <span>
            Min
            <input
              type="number"
              value={price.min}
              onChange={(e) =>
                setPrice({ ...price, min: e.target.value })
              }
            />
          </span>
          <span>
            Max
            <input
              type="number"
              value={price.max}
              onChange={(e) =>
                setPrice({ ...price, max: e.target.value })
              }
            />
          </span>
          <button
            onClick={() => {
              setUpFilters({
                priceMin: price.min,
                priceMax: price.max,
              });
            }}
          >
            <i className="bi bi-caret-right-fill"></i>
          </button>
        </div>
      </div>
      <Select
        options={[
          {
            value: "genre",
            label: "Genero",
            isDisabled: true,
            isFixed: true,
          },
          ...genres.map(({ generoName: label }) => ({
            value: label,
            label:label.substring(0,1).toUpperCase() + label.substring(1),
          })),
        ]}
        onSelectResetsInput={false}
        onBlurResetsInput={false}
        styles={selectStyle}
        placeholder={"Genero"}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral50: "#1A1A1A", // Placeholder color
          },
        })}
        //defaultValue={{ value: "genre", label: "Genero" }}
        onChange={(e, { action }) => {
          console.log(action);
          if (action == "clear") {
            setUpFilters({ genre: "" });
            
          } else {
            setUpFilters({ genre: e.value });
          }
        }}
        isSearchable={false}
        isClearable
        value={
          filters.genre != ""
            ? { value: filters.genre, label: filters.genre?.substring(0,1).toUpperCase() + filters.genre?.substring(1)}
            : null
        }
      />
      <Select
        options={[
          {
            value: "formatos",
            label: "Formatos",
            isDisabled: true,
            isFixed: true,
          },
          ...formatos.map((formato) => ({
            value: formato,
            label: formato,
          })),
        ]}
        placeholder={"Formato"}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral50: "#1A1A1A", // Placeholder color
          },
        })}
        onSelectResetsInput={false}
        onBlurResetsInput={false}
        styles={selectStyle}
        isSearchable={false}
        onChange={(e, { action }) => {
          console.log(action);
          if (action == "clear") {
            setUpFilters({ formato: "" });
            
          } else {
            setUpFilters({ formato: e.value });
          }
        }}
        isClearable
        value={
          filters.formato != ""
            ? { value: filters.formato, label: filters.formato }
            : null
        }
      />
      <span className="explicit-filter">
        <label>Explicito</label>
        <ul>
          <li>
            Si
            <input
              type="checkbox"
              name="esExplicito"
              onChange={(e) => {
                if (filters.explicit === true) {
                  setUpFilters({
                    explicit: "",
                  });
                } else {
                  setUpFilters({
                    explicit: true,
                  });
                }
              }}
              checked={filters.explicit === "" ? false : filters.explicit}
            />
          </li>
          <li>
            No
            <input
              type="checkbox"
              name="esExplicito"
              onChange={(e) => {
                if (filters.explicit === false) {
                  setUpFilters({
                    explicit: "",
                  });
                } else {
                  setUpFilters({
                    explicit: false,
                  });
                }
              }}
              checked={
                filters.explicit === "" ? false : !filters.explicit
              }
            />
          </li>
        </ul>
      </span>
    </div>
  );
};

export default LeftFilters;
