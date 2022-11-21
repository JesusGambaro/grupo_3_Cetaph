import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import './navbar.scss'

import { getUser } from '../../Redux/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import AlertNeedToLogIng from '../../hooks/AlertNeedToLogIng'
import { getGenres, getFormatos } from '../../Redux/actions/catalogue'
import Swal from 'sweetalert2'

const NavBar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(({ main }) => main)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [userIconActive, setUserIconActive] = useState(false)
  const [rol, setRol] = useState('')

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      dispatch(getUser(localStorage.getItem('token')))
    }
    setUserIconActive(false)
  }, [pathname])

  useEffect(() => {
    dispatch(getGenres())
    dispatch(getFormatos())
  }, [])

  useEffect(() => {
    setRol(user.rol)
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
          <li
            className="nav-icon"
            onClick={() => setUserIconActive(!userIconActive)}
          >
            <p className="icon-link">
              <i className="bi bi-person-circle" id="login-icon"></i>
            </p>

            <ul className={'icon-options' + (userIconActive ? ' active' : '')}>
              {localStorage.getItem('token') !== null ? (
                <>
                  <li className="user-rol">{user.username}</li>
                  {rol === 'Admin' && (
                    <li
                      onClick={() => {
                        if (userIconActive) navigate('/AdminDashboard')
                      }}
                    >
                      Dashboard
                    </li>
                  )}
                  <li
                    onClick={() => {
                      if (userIconActive) {
                        localStorage.removeItem('token')
                        Swal.fire({
                          position: 'center',
                          icon: 'info',
                          title: 'Se cerró la sesión',
                          showConfirmButton: false,
                          timer: 1000,
                        })
                        navigate('/')
                      }
                    }}
                  >
                    Cerrar Sesión
                  </li>
                </>
              ) : (
                <li
                  onClick={() => {
                    if (userIconActive) navigate('/login')
                  }}
                >
                  Iniciar Sesión
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
