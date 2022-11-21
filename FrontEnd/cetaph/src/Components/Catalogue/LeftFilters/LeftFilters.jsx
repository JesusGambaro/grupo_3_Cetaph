import { useState, useEffect } from 'react'
import './leftFilters.scss'
import { useDispatch, useSelector } from 'react-redux'
import { filterCatalogue } from '../../../Redux/actions/catalogue'
import Select from 'react-select'
import MultiRangeSlider from 'multi-range-slider-react'
import { selectStyle } from '../selectStyle'
import { setFilter } from '../../../Redux/reducers/mainReducer'
import FiltersItems from './FiltersItems'
import 'react-widgets/scss/styles.scss'
import { NumberPicker } from 'react-widgets'
const LeftFilters = () => {
  const dispatch = useDispatch()
  let { filter, genres, formatos } = useSelector(({ main }) => main)

  const [precio, setPrecio] = useState({
    min: 0,
    max: 0,
  })

  const [filters, setFilters] = useState({
    explicito: '',
    formato: filter.formato,
    genero: filter.genero,
  })

  const handleFilter = (e) => {
    const { name, value } = e
    setFilters({ ...filters, [name]: value })
  }

  useEffect(() => {
    dispatch(setFilter(filters))
    dispatch(filterCatalogue({ ...filter, ...filters }))
    window.scrollTo(0, 0)
  }, [filters])

  const handlePrice = (e) => {
    e.preventDefault()
    setFilters({ ...filters, precio })
  }
  const handleFiltersChange = (newFilters) => {
    if (newFilters.hasOwnProperty('precio')) setPrecio({ ...newFilters.precio })
    setFilters(newFilters)
  }
  const genresOptions = [
    {
      value: '',
      label: 'Todos',
      isDisabled: true,
      isFixed: true,
    },
    ...genres.map(({ generoName: label }) => ({
      value: label,
      label: label.substring(0, 1).toUpperCase() + label.substring(1),
      name: 'genero',
    })),
  ]
  const formatosOptions = [
    {
      value: '',
      label: 'Todos',
      isDisabled: true,
      isFixed: true,
    },
    ...formatos.map((formato) => ({
      value: formato,
      label: formato,
      name: 'formato',
    })),
  ]

  return (
    <div className="filters-container">
      <h1>Filtros</h1>
      {Object.keys(filters).some((f) => filters[f] !== '') && (
        <FiltersItems filters={filters} setLeftFilters={handleFiltersChange} />
      )}
      <div className="price-filter">
        <h3>Precio</h3>
        <MultiRangeSlider
          min={0}
          max={10000}
          step={100}
          ruler={false}
          label={true}
          preventWheel={true}
          minValue={precio.min}
          maxValue={precio.max}
          onInput={(e) => setPrecio({ min: e.minValue, max: e.maxValue })}
        />
        <form className="prices-container" onSubmit={handlePrice}>
          <span>
            Min
            <NumberPicker
              defaultValue={0}
              value={precio.min}
              min={0}
              max={precio.max}
              format={{
                minimumFractionDigits: 0,
              }}
              onChange={(value) => {
                console.clear()
                setPrecio({ ...precio, min: value })
              }}
            />
          </span>
          <span>
            Max
            <NumberPicker
              defaultValue={0}
              value={precio.max}
              min={precio.min}
              max={10000}
              format={{
                minimumFractionDigits: 0,
              }}
              onChange={(value) => {
                console.clear()
                setPrecio({ ...precio, max: value })
              }}
            />
          </span>
          <button type="submit" className="price-btn">
            <i className="fa-solid fa-square-caret-right"></i>
          </button>
        </form>
      </div>
      <div className="genre-filter">
        <h3>Género</h3>
        <Select
          options={genresOptions}
          onSelectResetsInput={false}
          onBlurResetsInput={false}
          styles={selectStyle}
          placeholder={'Genero'}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              neutral50: '#555',
            },
          })}
          onChange={handleFilter}
          value={
            genresOptions.find((g) => g?.value === filters.genero) ??
            genresOptions[0]
          }
          isSearchable
        />
      </div>
      <div className="genre-filter">
        <h3>Formato</h3>
        <Select
          options={formatosOptions}
          placeholder={'Formato'}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              neutral50: '#555',
            },
          })}
          value={
            formatosOptions.find((f) => f?.value === filters.formato) ??
            formatosOptions[0]
          }
          onSelectResetsInput={false}
          onBlurResetsInput={false}
          styles={selectStyle}
          isSearchable
          onChange={handleFilter}
        />
      </div>
      <div className="explicit-filter">
        <h3>Explícito</h3>
        <div className="radio-buttons">
          <span>
            <input
              type="radio"
              name="explicit"
              onChange={() => setFilters({ ...filters, explicito: true })}
              checked={filters.explicito === true}
            />
            <label htmlFor="explicit">Si</label>
          </span>
          <span>
            <input
              type="radio"
              name="explicit"
              id="no-explicit"
              onChange={() => setFilters({ ...filters, explicito: false })}
              checked={filters.explicito === false}
            />
            <label htmlFor="no-explicit">No</label>
          </span>
        </div>
      </div>
    </div>
  )
}

export default LeftFilters
