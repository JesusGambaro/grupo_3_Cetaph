import React from "react";
import "./upsidebar.scss";
import Select from "react-select";
import {useState} from "react";

const UpSideBar = () => {
  return (
    <div className="upside-bar-container">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="search-disks">
          <input type="text" placeholder="Search" />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="sort-disks">
          <Select
            id="order"
            name="order"
            isSearchable={false}
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
