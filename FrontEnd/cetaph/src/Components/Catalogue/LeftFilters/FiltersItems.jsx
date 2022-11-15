import { useDispatch, useSelector } from 'react-redux'
import { deleteFilter } from '../../../Redux/reducers/mainReducer'

const FiltersItems = ({ filters, handleCheckSelect }) => {
  const dispatch = useDispatch()
  const { filter } = useSelector(({ main }) => main)
  return (
    <div className="filters-items-container">
      {/*
      genre: "",
      formato: "",
      explicit: "",
      price: {
        min: 0,
        max: 1000,
      },
    */}
      {Object.keys(filter).map((f, i) => {
        const filterValue =
          filter[f] &&
          (filter.priceMin !== 0 || filter.priceMax !== 0) &&
          f !== 'size'

        return filterValue ? (
          <div key={i} className="filter-card">
            <span>
              {`${f}`}
              <p>
                {/*  {el === "price"
                    ? `${filters[el].price.min} - ${filters[el].price.max}`
                    : el} 
                */}
              </p>
            </span>
            <button
              onClick={() => {
                dispatch(deleteFilter(f))
                handleCheckSelect(f)
              }}
            >
              <i className="bi bi-x-circle-fill"></i>
            </button>
          </div>
        ) : null
      })}
    </div>
  )
}
export default FiltersItems
