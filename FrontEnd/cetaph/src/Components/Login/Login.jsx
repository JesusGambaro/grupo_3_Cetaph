import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import './login.scss'
import { useNavigate } from 'react-router'
import { getUser } from '../../Redux/actions/user'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { API_URL } from '../../utils/config'
import { formValidation, validateBy } from '../../utils/validations'

const Login = () => {
  const dispatch = useDispatch()
  const firstSend = useRef(true)
  const navigate = useNavigate()
  const [loginState, setLoginState] = useState({
    showPassword: false,
    isLogin: true,
    loading: false,
    errors: {},
  })
  const [logForm, setLogForm] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    firstSend.current = false
    const errores = formValidation(logForm, loginState.isLogin)

    setLoginState({ ...loginState, errors: errores })

    if (Object.keys(errores).some((key) => errores[key] !== '')) return

    setLoginState({
      ...loginState,
      loading: true,
    })
    axios
      .post(API_URL + (loginState.isLogin ? 'login' : 'register'), logForm)
      .then(({ data }) => {
        localStorage.setItem('token', data[0])
        dispatch(getUser(localStorage.getItem('token')))
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1000,
        })
        navigate('/')
      })
      .catch((err) => {
        console.error(err)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title:
            (loginState.isLogin
              ? 'Usuario o contraseña incorrectos'
              : 'Usuario ya existe') + '!',
          width: '30rem',
          showConfirmButton: true,
        })
      })
      .finally(() => {
        setLoginState({ ...loginState, loading: false })
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setLogForm({ ...logForm, [name]: value })
    if (firstSend.current) return
    const validation = validateBy(value, name)
    if (!validation.isValid) {
      setLoginState({
        ...loginState,
        errors: {
          ...loginState.errors,
          [name]: validation.message,
        },
      })
    } else {
      setLoginState({
        ...loginState,
        errors: {
          ...loginState.errors,
          [name]: '',
        },
      })
    }
  }
  return (
    <main className="login">
      <div className="wrapper">
        <section className="login-container">
          <h1>{loginState.isLogin ? 'Iniciar sesión' : 'Registrarse'}</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="label" htmlFor="username">
                Nombre de usuario:
              </label>
              <input
                name="username"
                id="username"
                className="input"
                type="text"
                value={logForm.username}
                onChange={handleChange}
              />
              {loginState.errors.username && (
                <p className="error">{loginState.errors.username}</p>
              )}
            </div>
            {!loginState.isLogin ? (
              <>
                <div className="input-group">
                  <label className="label" htmlFor="name">
                    Nombre:
                  </label>
                  <input
                    autoComplete="off"
                    name="name"
                    id="name"
                    className="input"
                    type="text"
                    value={logForm.name}
                    onChange={handleChange}
                  />
                  {loginState.errors.name && (
                    <p className="error">{loginState.errors.name}</p>
                  )}
                </div>
                <div className="input-group">
                  <label className="label" htmlFor="email">
                    Email:
                  </label>
                  <input
                    autoComplete="off"
                    name="email"
                    id="email"
                    className="input"
                    type="email"
                    value={logForm.email}
                    onChange={handleChange}
                  />
                  {loginState.errors.email && (
                    <p className="error">{loginState.errors.email}</p>
                  )}
                </div>
              </>
            ) : null}
            <div className="input-group">
              <label className="label" htmlFor="password">
                Contraseña:
              </label>
              <span className="show-pass">
                <input
                  autoComplete="off"
                  name="password"
                  id="password"
                  className="input"
                  type={loginState.showPassword ? 'text' : 'password'}
                  value={logForm.password}
                  onChange={handleChange}
                />
                <i
                  className={
                    'fa-regular fa-eye' +
                    (loginState.showPassword ? '-slash' : '')
                  }
                  onClick={() =>
                    setLoginState({
                      ...loginState,
                      showPassword: !loginState.showPassword,
                    })
                  }
                ></i>
              </span>
              {loginState.errors.password && (
                <p className="error">{loginState.errors.password}</p>
              )}
            </div>
            <button type="submit" className="submit-btn">
              {loginState.loading ? (
                <svg viewBox="25 25 50 50">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              ) : loginState.isLogin ? (
                'Iniciar sesión'
              ) : (
                'Registrarse'
              )}
            </button>
          </form>
          <div className="form-footer">
            {loginState.isLogin ? (
              <p>
                ¿No tienes cuenta?&nbsp;
                <span
                  onClick={() =>
                    setLoginState({
                      ...loginState,
                      isLogin: !loginState.isLogin,
                    })
                  }
                >
                  Registrarse
                </span>
              </p>
            ) : (
              <p>
                ¿Ya tienes cuenta?&nbsp;
                <span
                  onClick={() =>
                    setLoginState({
                      ...loginState,
                      isLogin: !loginState.isLogin,
                    })
                  }
                >
                  Iniciar sesión
                </span>
              </p>
            )}
          </div>
        </section>
        <section className="background-image"></section>
      </div>
    </main>
  )
}

export default Login
