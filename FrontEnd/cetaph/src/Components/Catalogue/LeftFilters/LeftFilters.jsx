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
const LeftFilters = ({ setUpFilters }) => {
  const dispatch = useDispatch();
  let { filter, genres, formatos } = useSelector(({ main }) => main);
  const [checkeds, setCheckeds] = useState([]);
  const [leftFilter, setLeftFilter] = useState({
    genre: "",
    formato: "",
    explicit: "",
    price: {
      min: 0,
      max: 1000,
    },
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getFormatos());
    leftFilter.explicit = filter.explicit;
    if (!leftFilter.length) setCheckeds([]);
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
    setLeftFilter({
      ...leftFilter,
      price: { min: e.minValue, max: e.maxValue },
    });
  };
  return (
    <div className="filters-container">
      <FiltersItems
        filters={leftFilter}
        handleCheckSelect={(key) => handleCheckSelect(key)}
      />
      <button
        className="resetFilters"
        onClick={() => {
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
          });
          setLeftFilter({
            genre: "",
            formato: "",
            explicit: "",
            price: {
              min: 0,
              max: 1000,
            },
          });
        }}
      >
        Reseteo de Filtros
      </button>
      <div className="price-filter">
        <h4>Precio</h4>
        <MultiRangeSlider
          min={0}
          max={1000}
          step={10}
          ruler={false}
          label={true}
          preventWheel={true}
          minValue={leftFilter.price.min}
          maxValue={leftFilter.price.max}
          onInput={(e) => {
            handlePrice(e);
          }}
        />
        <div className="prices-container">
          <span>
            Min
            <input
              type="number"
              value={leftFilter.price.min}
              onChange={(e) =>
                setLeftFilter({
                  ...leftFilter,
                  price: { ...leftFilter.price, min: e.target.value },
                })
              }
            />
          </span>
          <span>
            Max
            <input
              type="number"
              value={leftFilter.price.max}
              onChange={(e) =>
                setLeftFilter({
                  ...leftFilter,
                  price: { ...leftFilter.price, max: e.target.value },
                })
              }
            />
          </span>
          <button
            onClick={() => {
              setUpFilters({
                priceMin: leftFilter.price.min,
                priceMax: leftFilter.price.max,
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
            label,
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
            setLeftFilter({ ...leftFilter, genre: "" });
          } else {
            setUpFilters({ genre: e.value });
            setLeftFilter({ ...leftFilter, genre: e.value });
          }
        }}
        isSearchable={false}
        isClearable
        value={
          leftFilter.genre != ""
            ? { value: leftFilter.genre, label: leftFilter.genre }
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
        onChange={(e, { action }) => {
          console.log(action);
          if (action == "clear") {
            setUpFilters({ formato: "" });
            setLeftFilter({ ...leftFilter, formato: "" });
          } else {
            setUpFilters({ formato: e.value });
            setLeftFilter({ ...leftFilter, formato: e.value });
          }
        }}
        isSearchable={false}
        isClearable
        value={
          leftFilter.formato != ""
            ? { value: leftFilter.formato, label: leftFilter.formato }
            : null
        }
      />
      <span>
        <label>Explicito</label>
        <ul>
          <li>
            <label>Si</label>
            <input
              type="checkbox"
              name="esExplicito"
              onChange={(e) => {
                if (leftFilter.explicit === true) {
                  setUpFilters({
                    explicit: "",
                  });
                  setLeftFilter({
                    ...leftFilter,
                    explicit: "",
                  });
                } else {
                  setUpFilters({
                    explicit: true,
                  });
                  setLeftFilter({
                    ...leftFilter,
                    explicit: true,
                  });
                }
              }}
              checked={leftFilter.explicit === "" ? false : leftFilter.explicit}
            />
          </li>
          <li>
            <label>No</label>
            <input
              type="checkbox"
              name="esExplicito"
              onChange={(e) => {
                if (leftFilter.explicit === false) {
                  setUpFilters({
                    explicit: "",
                  });
                  setLeftFilter({
                    ...leftFilter,
                    explicit: "",
                  });
                } else {
                  setUpFilters({
                    explicit: false,
                  });
                  setLeftFilter({
                    ...leftFilter,
                    explicit: false,
                  });
                }
              }}
              checked={
                leftFilter.explicit === "" ? false : !leftFilter.explicit
              }
            />
          </li>
        </ul>
      </span>
    </div>
  );
};

export default LeftFilters;
