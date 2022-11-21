import { useState, useEffect } from 'react'
import './upsidebar.scss'
import Select from 'react-select'

import { useDispatch, useSelector } from 'react-redux'
import { filterCatalogue } from '../../../Redux/actions/catalogue'
import { setFilter } from '../../../Redux/reducers/mainReducer'
import selectStyle from '../selectStyle'

const sortOptions = [
  {
    value: 'sort',
    label: 'Clasificar por',
    isDisabled: true,
    isFixed: true,
  },
  { value: 'precio', label: 'Precio', name: 'sort' },
  { value: 'nombre', label: 'Nombre', name: 'sort' },
  { value: 'lanzamiento', label: 'Fecha', name: 'sort' },
]
const orderOptions = [
  { value: 'direction', label: 'Orden', isDisabled: true },
  { value: 'asc', label: 'Ascendente', name: 'direction' },
  { value: 'desc', label: 'Descendente', name: 'direction' },
]

const UpSideBar = () => {
  const dispatch = useDispatch()
  const { filter } = useSelector(({ main }) => main)

  const [filters, setFilters] = useState({
    sort: '',
    direction: '',
  })

  const handleFilter = (e, action) => {
    if (action === 'clear') {
      setFilters({ sort: '', direction: 'asc' })
      return
    }
    const { name, value } = e
    setFilters({ ...filters, [name]: value })
  }

  useEffect(() => {
    dispatch(setFilter(filters))
    dispatch(filterCatalogue({ ...filter, ...filters }))
  }, [filters])

  const handleSearch = (e) => {
    e.preventDefault()
    setFilters({ ...filters, searchParam: e.target.search.value })
  }
  const [searchParam, setSearchParam] = useState(filter.searchParam)

  return (
    <div className="upside-bar-container">
      <form onSubmit={handleSearch}>
        <div className="search-disks">
          <input
            type="text"
            placeholder="Buscar"
            name="search"
            onChange={(e) => setSearchParam(e.target.value)}
            value={searchParam}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="sort-disks">
          <Select
            options={sortOptions}
            onSelectResetsInput={false}
            onBlurResetsInput={false}
            styles={selectStyle}
            placeholder={'Clasificar por'}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                neutral50: '#555',
              },
            })}
            onChange={(e, { action }) => handleFilter(e, action)}
            isSearchable={false}
            isClearable
            value={sortOptions.find((option) => option.value === filters.sort)}
          />
          {filters.sort && (
            <Select
              options={orderOptions}
              onSelectResetsInput={false}
              onBlurResetsInput={false}
              styles={selectStyle}
              placeholder={'Orden'}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral50: '#555',
                },
              })}
              onChange={(e, { action }) => handleFilter(e, action)}
              isSearchable={false}
            />
          )}
        </div>
      </form>
    </div>
  )
}

export default UpSideBar
