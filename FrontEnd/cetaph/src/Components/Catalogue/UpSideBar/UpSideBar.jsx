import React from "react";
import "./upsidebar.scss";
import Select from "react-select";
import {useState} from "react";
import axios from "axios";
const UpSideBar = ({setData}) => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [basicFilter, setBasicFilter] = useState("");
  const handleSearch = (e) => {
    console.log(order + search);
    e.preventDefault();
    axios
      .get(
        `http://localhost:9000/api/v1/album/searchAlbums?V&Name=${search}&Max&Min&Exp`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };
  return (
    <div className="upside-bar-container">
      <form onSubmit={handleSearch}>
        <div className="search-disks">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="sort-disks">
          <Select
            id="order"
            name="order"
            isSearchable={false}
            onChange={(e) => setOrder(e.value)}
            defaultValue={{value: "order", label: "Order By"}}
            options={[
              {value: "order", label: "Order", isDisabled: true},
              {value: "asc", label: "Ascending"},
              {value: "desc", label: "Descending"},
            ]}
            className="react-select-container"
            classNamePrefix="react-select"
            theme={(theme) => ({
              ...theme,
              borderRadius: ".5rem",
              f: (base) => console.log(theme),
              colors: {
                ...theme.colors,
                primary25: "hotpink",
                primary: "black",
              },
            })}
          />

          <Select
            id="sort"
            isSearchable={false}
            defaultValue={{value: "sortby", label: "Sort by"}}
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                value: "sortby",
                label: "Sort by",
                isDisabled: true,
                isFixed: true,
              },
              {value: "price", label: "Price"},
              {value: "name", label: "Name"},
              {value: "date", label: "Date"},
            ]}
            theme={(theme) => ({
              ...theme,
              borderRadius: ".5rem",
              colors: {
                ...theme.colors,
                primary25: "hotpink",
                primary: "black",
              },
            })}
          />
        </div>
      </form>
    </div>
  );
};

export default UpSideBar;
