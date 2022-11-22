import { useState, useEffect, useRef } from 'react'
import Loading from '../Loading/Loading'
import Card from '../Card/Card'
import LeftFilters from './LeftFilters/LeftFilters'
import './catalogue.scss'
import UpSideBar from './UpSideBar/UpSideBar'
import { filterCatalogue, getArtistas } from '../../Redux/actions/catalogue'
import { useDispatch, useSelector } from 'react-redux'
import usePagination from '../../hooks/usePagination'

const Catalogue = () => {
  const dispatch = useDispatch()
  const { catalogue, loading, filter } = useSelector(({ main }) => main)
  useEffect(() => {
    dispatch(getArtistas())
    dispatch(filterCatalogue(filter))
  }, [])
  const { Pagination } = usePagination(filter)
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
                <h1>No se encontraron albums</h1>
              )}
            </>
          )}
        </div>
        <Pagination />
      </main>
    </div>
  )
}

export default Catalogue
