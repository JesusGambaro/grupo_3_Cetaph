import { useDispatch, useSelector } from 'react-redux'
import { deleteFilter } from '../../../Redux/reducers/mainReducer'

const filtersList = ['genero', 'explicito', 'formato', 'precio']

const FiltersItems = ({ filters, setLeftFilters }) => {
  const dispatch = useDispatch()
  const { filter } = useSelector(({ main }) => main)
  if (filters?.precio?.min === 0 && filters?.precio?.max === 0)
    delete filters.precio
  const handleDeleteFilter = (filter) => {
    if (filter === 'precio') {
      setLeftFilters({ ...filters, precio: { min: 0, max: 0 } })
    } else {
      setLeftFilters({ ...filters, [filter]: '' })
    }
    dispatch(deleteFilter(filter))
  }

  return (
    <div className="filters-items-container">
      {Object.keys(filters)
        .reverse()
        .map((f, i) => {
          const filterValue = filter[f] !== '' && filtersList.includes(f)
          return filterValue ? (
            <div key={i} className="filter-card">
              <span>
                <b>{f}</b>
                <p>
                  {f === 'precio'
                    ? `${('$' + filter[f].min).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        '.',
                      )} - ${('$' + filter[f].max).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        '.',
                      )}`
                    : f === 'explicito'
                    ? filter[f] === true
                      ? 'Si'
                      : 'No'
                    : filter[f]}
                </p>
              </span>
              <button onClick={() => handleDeleteFilter(f)}>
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          ) : null
        })}
    </div>
  )
}
export default FiltersItems
