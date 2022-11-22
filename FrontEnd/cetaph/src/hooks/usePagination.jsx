import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { filterCatalogue } from '../Redux/actions/catalogue'
import { searchAlbums } from '../Redux/actions/admin'
import { setFilter } from '../Redux/reducers/mainReducer'
import { setFilterAlbums } from '../Redux/reducers/adminReducer'

const usePagination = (filter, admin = false) => {
  const dispatch = useDispatch()

  let pageLimit = 4

  const nextPage = () => {
    if (admin) {
      dispatch(setFilterAlbums({ ...filter, page: filter.page + 1 }))
      dispatch(searchAlbums({ ...filter, page: filter.page + 1 }, true))
    } else {
      dispatch(setFilter({ ...filter, page: filter.page + 1 }))

      dispatch(filterCatalogue({ ...filter, page: filter.page + 1 }, true))
    }
  }

  const prevPage = () => {
    if (admin) {
      dispatch(setFilterAlbums({ ...filter, page: filter.page - 1 }))
      dispatch(searchAlbums({ ...filter, page: filter.page - 1 }, true))
    } else {
      dispatch(setFilter({ ...filter, page: filter.page - 1 }))
      dispatch(filterCatalogue({ ...filter, page: filter.page - 1 }, true))
    }
  }

  const goPage = ({ target }) => {
    if (admin) {
      dispatch(
        setFilterAlbums({ ...filter, page: Number(target.textContent) - 1 }),
      )
      dispatch(
        searchAlbums({ ...filter, page: Number(target.textContent) - 1 }, true),
      )
    } else {
      dispatch(setFilter({ ...filter, page: Number(target.textContent) - 1 }))
      dispatch(
        filterCatalogue(
          { ...filter, page: Number(target.textContent) - 1 },
          true,
        ),
      )
    }
  }

  const dividedGroups = () => {
    const start = Math.floor(filter.page / pageLimit) * pageLimit
    return new Array(pageLimit).fill().map((_, i) => {
      let limit = start + i + 1
      return limit <= filter.size.totalPages && limit
    })
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [filter.page])

  const Pagination = () => {
    return (
      <div className="pagination-container">
        {filter.size.totalPages ? (
          <div className="selectionOwn">
            <button
              className="btnOwn prev"
              onClick={prevPage}
              disabled={filter.page === 0}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>
            {dividedGroups().map((e, i) => {
              return (
                e && (
                  <button
                    className={
                      filter.page + 1 === e ? 'btnOwn active' : 'btnOwn'
                    }
                    key={i}
                    onClick={goPage}
                  >
                    {e}
                  </button>
                )
              )
            })}

            <button
              className="btnOwn next"
              onClick={nextPage}
              disabled={filter.page === filter.size.totalPages - 1}
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        ) : null}
      </div>
    )
  }
  return { Pagination }
}

export default usePagination
