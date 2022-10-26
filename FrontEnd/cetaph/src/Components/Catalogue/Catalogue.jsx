import { useState, useEffect } from 'react'
import Loading from '../Loading/Loading'
import Card from '../Card/Card'
import LeftFilters from './LeftFilters/LeftFilters'
import './catalogue.scss'
import UpSideBar from './UpSideBar/UpSideBar'
import axios from 'axios'
const Catalogue = () => {
  const [disks, setDisks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  useEffect(() => {
    axios
      .get('http://localhost:9000/api/v1/album')
      .then((res) => {
        setDisks(res.data)
        //console.log(res.data);
        setLoading(false)
      })
      .catch((err) => {
        setError(true)
        setLoading(false)
      })
  }, [])
  const setData = (data) => {
    setDisks(data)
  }
  return (
    <div className="catalogue-container">
      <LeftFilters />
      <main>
        <UpSideBar setData={(e) => setData(e)} />
        {loading ? (
          <Loading />
        ) : (
          <div className="disks-container">
            {disks.length > 0 ? (
              disks.map((disk, index) => (
                <Card key={index} color={'black'} data={disk} />
              ))
            ) : (
              <h1>No results</h1>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default Catalogue
