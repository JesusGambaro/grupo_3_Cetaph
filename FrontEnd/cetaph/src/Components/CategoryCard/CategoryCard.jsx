import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setFilter } from '../../Redux/reducers/mainReducer'
import './CategoryCardStyle.scss'
import { filterCatalogue } from '../../Redux/actions/catalogue'
const CategoryCard = ({ img, data_category }) => {
  const dispatch = useDispatch()
  const { filter } = useSelector(({ main }) => main)
  const navigate = useNavigate()
  return (
    <div className="category-card-container">
      <div className="card-content-wrapper">
        <div className="cat-card-body cat-card-body--lhs">
          <img src={img} alt="category-img" />
          <h1 className="card-title">{data_category}</h1>
        </div>
        <div className="cat-card-body cat-card-body--rhs">
          <img src={img} alt="category-img" />
          <h1 className="card-title">{data_category}</h1>
        </div>
        <button
          onClick={() => {
            dispatch(setFilter({ ...filter, genero: data_category }))
            dispatch(filterCatalogue({ ...filter, genero: data_category }))
            navigate('/catalogue')
          }}
        >
          Ver Más
        </button>
      </div>
    </div>
  )
}
export default CategoryCard
