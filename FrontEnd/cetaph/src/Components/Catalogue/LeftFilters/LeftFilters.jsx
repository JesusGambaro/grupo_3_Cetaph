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

const LeftFilters = ({ setUpFilters }) => {
  const dispatch = useDispatch();
  let { filter, genres, formatos } = useSelector(({ main }) => main);
  const [leftFilter, setLeftFilter] = useState({
    genre: "",
    formato: "",
    explicit: "",
    price: {
      min: 0,
      max: 0,
    },
  });
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getFormatos());
    leftFilter.explicit = filter.explicit;
  }, []);

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

  return (
    <div className="filters-container">
      <button
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
              max: 0,
            },
          });
        }}
      >
        Reset Filters
      </button>
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
        defaultValue={{ value: "genre", label: "Genero" }}
        onChange={(e) => {
          setUpFilters({ genre: e.value });
          setLeftFilter({ ...leftFilter, genre: e.value });
        }}
        isSearchable={false}
        value={
          leftFilter.genre === ""
            ? { value: "genre", label: "Genero" }
            : { value: leftFilter.genre, label: leftFilter.genre }
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
        onSelectResetsInput={false}
        onBlurResetsInput={false}
        styles={selectStyle}
        defaultValue={{ value: "formatos", label: "Formatos" }}
        onChange={(e) => {
          setUpFilters({ formato: e.value });
          setLeftFilter({ ...leftFilter, formato: e.value });
        }}
        isSearchable={false}
        value={
          leftFilter.formato === ""
            ? { value: "formatos", label: "Formatos" }
            : { value: leftFilter.formato, label: leftFilter.formato }
        }
      />
      <span>
        <label>Explicit</label>
        <input
          type="checkbox"
          name="esExplicito"
          onChange={(e) => {
            setUpFilters({
              explicit:
                leftFilter.explicit === "" ? true : !leftFilter.explicit,
            });
            setLeftFilter({
              ...leftFilter,
              explicit:
                leftFilter.explicit === "" ? true : !leftFilter.explicit,
            });
          }}
          checked={leftFilter.explicit === "" ? false : leftFilter.explicit}
        />
      </span>
    </div>
  );
};

export default LeftFilters;
