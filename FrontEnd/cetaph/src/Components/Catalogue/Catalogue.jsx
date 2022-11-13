import { useState, useEffect } from 'react'
import Loading from '../Loading/Loading'
import Card from '../Card/Card'
import LeftFilters from './LeftFilters/LeftFilters'
import './catalogue.scss'
import UpSideBar from './UpSideBar/UpSideBar'
import { setCatalogue } from '../../Redux/actions/catalogue'
import { useDispatch, useSelector } from 'react-redux'

const Catalogue = () => {
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()
  const { catalogue, loading } = useSelector(({ main }) => main)
  useEffect(() => {
    dispatch(setCatalogue())
  }, [])

  return (
    <div className="catalogue-container">
      <LeftFilters />
      <main>
        <UpSideBar />

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
