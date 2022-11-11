import axios from 'axios'
import { useState } from 'react'
import './login.scss'
import { useNavigate } from 'react-router'
const Login = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState(true)
  const [showPass, setShowPass] = useState(false)
  const [log, setLog] = useState({
    username: '',
    password: '',
  })

  const handelSubmit = (e) => {
    e.preventDefault()

    if (login) {
      axios
        .post('http://localhost:9000/api/login', log)
        .then(({ data }) => {
          console.log(data)
          //save token in local storage
          localStorage.setItem('token', data[0])
          localStorage.setItem('rol', data[1])
          //redirect to home page
          if (data[2] == "Admin") {
            navigate('/AdminDashboard')
          }else{
            navigate('/')
          }

          
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log('register', log)
      axios
        .post('http://localhost:9000/api/v1/register', log)
        .then(({ data }) => {
          console.log(data)
          //save token in local storage
          localStorage.setItem('token', data[0])
          localStorage.setItem('refresh-token', data[1])
          localStorage.setItem('rol', data[2])
          //redirect to home page
          navigate('/')
        })
        .catch((err) => {
          console.log(err)
        })
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
                    value={log.name}
                    onChange={(e) => setLog({ ...log, name: e.target.value })}
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
                    value={log.email}
                    onChange={(e) => setLog({ ...log, email: e.target.value })}
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
