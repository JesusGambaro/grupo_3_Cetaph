import { useState, useEffect, useRef } from 'react'
import Loading from '../Loading/Loading'
import Card from '../Card/Card'
import LeftFilters from './LeftFilters/LeftFilters'
import './catalogue.scss'
import UpSideBar from './UpSideBar/UpSideBar'
import { filterCatalogue } from '../../Redux/actions/catalogue'
import { useDispatch, useSelector } from 'react-redux'

const Catalogue = () => {
  const dispatch = useDispatch()
  const { catalogue, loading, filter } = useSelector(({ main }) => main)
  useEffect(() => {
    dispatch(filterCatalogue(filter))
  }, [])

  //#region Filters
  const firstRender = useRef(true)
  const [filters, setFilters] = useState({
    searchParam: '',
    direction: 'asc',
    sort: '',
  })

  const handleSearch = (e) => {
    e.preventDefault()
    const { value } = e.target.search
    setFilters({ ...filters, searchParam: value })
  }
  //#endregion
  useEffect(() => {
    dispatch(filterCatalogue({ ...filter, ...filters }))
  }, [filters])
  return (
    <div className="catalogue-container">
      <LeftFilters />
      <main>
        <UpSideBar
          handleSearch={handleSearch}
          setUpFilters={(props) => {
            setFilters((prev) => {
              let copy = { ...prev }
              copy[Object.keys(props)[0]] = props[Object.keys(props)[0]]
              return copy
            })
          }}
        />

        <div className="disks-container">
          {loading ? (
            <Loading text={'Loading albums...'} />
          ) : (
            <>
              {catalogue?.length > 0 ? (
                catalogue.map((disk, index) => (
                  <Card key={index} color={'black'} data={disk} />
                ))
              ) : (
                <h1>No results</h1>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Catalogue
