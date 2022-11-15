import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './navbar.scss'

import { getRol } from '../../Redux/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import AlertNeedToLogIng from '../../hooks/AlertNeedToLogIng'
import {filterCatalogue,getGenres,getFormatos} from '../../Redux/actions/catalogue'
const NavBar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(({ main }) => main)
  const navigate = useNavigate()
  const [usuarioIcon, setUsuarioIcon] = useState(false)
  const [role, setRol] = useState('')
  const url = window.location.pathname.split('/').pop();
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      dispatch(getRol(localStorage.getItem('token')))
    }
    dispatch(getGenres())
    dispatch(getFormatos())
    dispatch(filterCatalogue({
      genre: "",
      priceMin: "",
      priceMax: "",
      explicit: "",
      searchParam: "",
      formato: "",
      sort: "",
      direction: "",
      page: 0,
      size: {
        totalElements: 1,
        totalPages: 1,
      },
    }))
  }, [url])
  useEffect(() => {
    setRol(user.role)
  }, [user])
  return (
    <nav>
      <div className="nav-wrapper">
        <span className="logo" onClick={() => navigate('/')}>
          <img src="/Images/cetaphIcono.png" alt="logo" />
        </span>
        <ul className="nav-menu">
          <li className="nav-item">
            <p className="nav-link" onClick={() => navigate('/')}>
              Home
            </p>
          </li>
          <li className="nav-item">
            <p className="nav-link" onClick={() => navigate('/Catalogue')}>
              Catalogo
            </p>
          </li>
          <li className="nav-item">
            <p className="nav-link" onClick={() => navigate('/AboutUs')}>
              Sobre Nosotros
            </p>
          </li>
        </ul>
        <ul className="nav-icons">
          {/* <li className="nav-icon">
            <p className="icon-link">
              <i className="bi bi-heart"></i>
            </p>
          </li> */}

          <li
            className="nav-icon"
            onClick={() => {
              setUsuarioIcon(!usuarioIcon)
            }}
          >
            <p className="icon-link">
              <i className="bi bi-person-circle"></i>
            </p>

            <ul className={'icon-options ' + (usuarioIcon ? 'active' : '')}>
              {localStorage.getItem('token') ? (
                <>
                  <li>{role}</li>
                  <li
                    onClick={() => {
                      if (usuarioIcon) {
                        localStorage.clear()
                        navigate('/')
                        setUsuarioIcon(false)
                      }
                    }}
                  >
                    Log Out
                  </li>
                  {role === 'Admin' && (
                    <li
                      onClick={() => {
                        if (usuarioIcon) {
                          navigate('/AdminDashboard')
                          setUsuarioIcon(false)
                        }
                      }}
                    >
                      Admin Dashboard
                    </li>
                  )}
                </>
              ) : (
                <li
                  onClick={() => {
                    if (usuarioIcon) {
                      navigate('/login')
                      setUsuarioIcon(false)
                    }
                  }}
                >
                  Log In
                </li>
              )}
            </ul>
          </li>
          <li
            className="nav-icon"
            onClick={() => {
              if (localStorage.getItem('token') == null) {
                AlertNeedToLogIng({
                  confirm: () => {
                    navigate('/login')
                  },
                })
              } else {
                navigate('/Cart')
              }
            }}
          >
            <p className="icon-link">
              <i className="bi bi-basket3"></i>
            </p>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
