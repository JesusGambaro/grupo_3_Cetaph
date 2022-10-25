import axios from 'axios'
import { useState } from 'react'
import './login.scss'
import qs from 'qs'

const Login = () => {
  const [login, setLogin] = useState(true)
  const [showPass, setShowPass] = useState(false)
  const [log, setLog] = useState({
    username: '',
    password: '',
  })
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }

  const handelSubmit = (e) => {
    e.preventDefault()

    if (login) {
      const params = new URLSearchParams()
      params.append('username', log.username)
      params.append('password', log.password)
      params.forEach((e) => console.log(e))
      //Log the params to see if it is correct
      console.log(qs.stringify(log))
      axios({
        method: 'post',
        url: 'http://localhost:9000/api/login',
        data: qs.stringify(log),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
        .then((res) => console.log(res))
        .catch((e) => console.error(e))
    } else {
    }
  }
  return (
    <main className="login">
      <div className="wrapper">
        <section className="login-container">
          <h1>{login ? 'Login' : 'Sign Up'}</h1>
          <form className="login-form" onSubmit={handelSubmit}>
            <div className="input-group">
              <label className="label" htmlFor="Username">
                Username:
              </label>
              <input
                name="Username"
                id="Username"
                className="input"
                autoComplete="off"
                type="text"
                value={log.username}
                onChange={(e) => setLog({ ...log, username: e.target.value })}
              />
            </div>
            {!login && (
              <>
                <div className="input-group">
                  <label className="label" htmlFor="Name">
                    Name:
                  </label>
                  <input
                    autoComplete="off"
                    name="Name"
                    id="Name"
                    className="input"
                    type="text"
                  />
                </div>
                <div className="input-group">
                  <label className="label" htmlFor="Email">
                    Email:
                  </label>
                  <input
                    autoComplete="off"
                    name="Email"
                    id="Email"
                    className="input"
                    type="email"
                  />
                </div>
              </>
            )}
            <div className="input-group">
              <label className="label" htmlFor="Password">
                Password:
              </label>
              <span className="show-pass">
                <input
                  autoComplete="off"
                  name="Password"
                  id="Password"
                  className="input"
                  type={showPass ? 'text' : 'password'}
                  value={log.password}
                  onChange={(e) => setLog({ ...log, password: e.target.value })}
                />
                <i
                  className={'fa-regular fa-eye' + (showPass ? '-slash' : '')}
                  onClick={() => setShowPass(!showPass)}
                ></i>
              </span>
            </div>
            <button type="submit" className="submit-btn">
              {login ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <div className="form-footer">
            {login ? (
              <p>
                Don't have an account?{' '}
                <span onClick={() => setLogin(!login)}>Sign Up</span>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <span onClick={() => setLogin(!login)}>Login</span>
              </p>
            )}

            <p>
              Forgot your password? <span>Reset it here</span>
            </p>
          </div>
        </section>
        <section className="background-image">
          {/*  <img
            src="https://mj-gallery.com/0e6da7ba-8d90-4ba2-8706-5db9b4177d7a/grid_0.png"
            alt="background"
          /> */}
        </section>
      </div>
    </main>
  )
}

export default Login
