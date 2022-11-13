import { useState, useEffect, useCallback } from 'react'
import './upsidebar.scss'
import Select from 'react-select'
import chroma from 'chroma-js'
import { useDispatch, useSelector } from 'react-redux'
import { filterCatalogue } from '../../../Redux/actions/catalogue'
import { setFilter } from '../../../Redux/reducers/mainReducer'
const UpSideBar = ({ setUpFilters, handleSearch }) => {
  const selectStyle = {
    control: () => ({
      display: 'flex',
      width: '12rem',
      height: '2.rem',
      border: '2px solid black',
      borderRadius: '.5rem',
      padding: '0 0.5rem',
      backgroundColor: '#fefbf6',
    }),
    menu: (provided) => ({
      ...provided,
      width: '12rem',
      border: '1px solid black',
      borderRadius: '.5rem',
      padding: 0,
      position: 'absolute',
      botton: '-1rem',
      backgroundColor: '#fefbf6',
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      const color = chroma('#319da0')
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? color
          : isFocused
          ? '#319da0'
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? '#319da0'
            : 'black'
          : color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? '#319da0'
              : color.alpha(0.3).css()
            : undefined,
        },
      }
    },

    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: 'black',
      transition: 'all 0.3s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: 'black',
    }),
  }
  return (
    <div className="upside-bar-container">
      <form onSubmit={handleSearch}>
        <div className="search-disks">
          <input
            type="text"
            placeholder="Search"
            //onChange={(e) => setUpFilters({ searcParam: e.target.value })}
            name="search"
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="sort-disks">
          <Select
            options={[
              { value: 'order', label: 'Order', isDisabled: true },
              { value: 'asc', label: 'Ascending' },
              { value: 'desc', label: 'Descending' },
            ]}
            onSelectResetsInput={false}
            onBlurResetsInput={false}
            styles={selectStyle}
            defaultValue={{ value: 'order', label: 'Order' }}
            onChange={(e) => setUpFilters({ direction: e.value })}
            isSearchable={false}
          />
          <Select
            options={[
              {
                value: 'sortby',
                label: 'Sort by',
                isDisabled: true,
                isFixed: true,
              },
              { value: 'precio', label: 'Precio' },
              { value: 'nombre', label: 'Nombre' },
              { value: 'lanzamiento', label: 'Fecha' },
            ]}
            onSelectResetsInput={false}
            onBlurResetsInput={false}
            styles={selectStyle}
            defaultValue={{ value: 'sortby', label: 'Sort by' }}
            onChange={(e) => setUpFilters({ sort: e.value })}
            isSearchable={false}
          />
        </div>
      </form>
    </div>
  )
}

export default UpSideBar
