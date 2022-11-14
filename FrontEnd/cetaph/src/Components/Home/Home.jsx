import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import NavBar from '../Navbar/NavBar'
import Card from '../Card/Card'
import CategoryCard from '../CategoryCard/CategoryCard'
import './home.scss'
import CardsScroller from './CardsScroller/CardsScroller'
import Footer from '../Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres } from '../../Redux/actions/catalogue'
const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getGenres())
    /*  filter = { ...filter }
    dispatch(filterCatalogue(filter)) */
  }, [])
  return (
    <>
      <NavBar />
      <div className="home-container-own">
        <div className="home-container__categories">
          <div className="categories-header">
            <h1>Categorias</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Search" />
              <button type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
            <p>
              Consigue tu propia colleccion con nosotros!!
            </p>
            <p>
              Tenemos muchos albumes que te volaran la cabeza 
            </p>
          </div>
          <div className="categories-card-wrapper">
            <CategoryCard
              img={
                'https://res.cloudinary.com/dknpio4ug/image/upload/v1668461539/profe_ohg2nw.png'
              }
              data_category={'Jazz'}
            />
            <CategoryCard
              img={
                'https://mj-gallery.com/0e6da7ba-8d90-4ba2-8706-5db9b4177d7a/grid_0.png'
              }
              data_category={'Rock'}
            />
            <CategoryCard
              img={
                'https://hotpotmedia.s3.us-east-2.amazonaws.com/8-sj4CVUBWisqrnZJ.png'
              }
              data_category={'Clasica'}
            />
          </div>
        </div>
        <div className="home-container__disks">
          <h1>Discos</h1>
          <CardsScroller />
        </div>
      </div>
    </>
  )
}

export default Home
