/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Background from './shared/Background'

import '../assets/css/logs.css'
import blackTheme from '../assets/css/blackTheme.module.css'
import whiteTheme from '../assets/css/whiteTheme.module.css'

const { LoaderReg } = require('./Loader')
const { register } = require('../services/services')
const { Error404, Error400, Error500, ErrorEmail } = require('./shared/Errors')

// Component
const Register = () => {
  // save the Theme that the user wants, if it's changed
  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'White')
  }

  const [dataStatus, setDataStatus] = useState({ status: 200 })
  const [stateEmail, setStateEmail] = useState({ error: false })
  const [stateLoader, setStateLoader] = useState({ show: true })
  const [theme, setTheme] = useState({ black: (localStorage.getItem('theme') === 'Black'), clicks: (localStorage.getItem('theme') === 'Black') ? 1 : 0 })

  const usernameRef = React.createRef()
  const passwordRef = React.createRef()
  const emailRef = React.createRef()

  const handleChange = (e) => {
    const { value } = e.target

    // eslint-disable-next-line curly
    if (!(value.includes('@gmail') || value.includes('@hotmail') || value.includes('@outlook')))
      setStateEmail({ error: true })
    else setStateEmail({ error: false })
  }

  const prevent = (e) => {
    e.preventDefault()
    const username = usernameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value

    register(username, email, password).then(data => {
      if (data === 404) setDataStatus({ status: 404 })
      else if (data === 400) setDataStatus({ status: 400 })
      else if (data === 500) setDataStatus({ status: 500 })
      else { localStorage.setItem('App', JSON.stringify(data)); window.location = '/profile' }
    })
  }

  const changeTheme = () => {
    setTheme({
      black: (theme.clicks % 2 === 0),
      clicks: theme.clicks + 1
    })

    if (!theme.black) localStorage.setItem('theme', 'Black')
    else localStorage.setItem('theme', 'White')
  }

  window.addEventListener('load', () => {
    setStateLoader({
      show: false
    })
  })

  const incorrect = stateEmail.error ? 'error' : 'field'

  return (
    <div className={`rooter
      ${theme.black ? blackTheme.backgroundColor : whiteTheme.backgroundColor}`}>
      <div className="logos">
        <Background color={theme.black} />
      </div>
      <div style={{ display: stateLoader.show ? 'block' : 'none' }}>
        <LoaderReg />
      </div>
      <div className="content" style={{ display: stateLoader.show ? 'none' : 'block' }}>
        <h2 className={`header ${theme.black ? blackTheme.primaryColor : whiteTheme.primaryColor}`} >Register</h2>
        <form className="fields" onSubmit={prevent}>
          <input
            type="text"
            name="username"
            ref={usernameRef}
            placeholder="Username"
            className={`field 
              ${theme.black ? blackTheme.primaryColor : whiteTheme.primaryColor}
              ${theme.black ? blackTheme.borderColor : whiteTheme.borderColor}`}
            required
          ></input>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            ref={emailRef}
            placeholder="Email"
            className={`field ${incorrect}
              ${theme.black ? blackTheme.primaryColor : whiteTheme.primaryColor}
              ${theme.black ? blackTheme.borderColor : whiteTheme.borderColor}`}
            required
          ></input>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            placeholder="Password"
            className={`field 
              ${theme.black ? blackTheme.primaryColor : whiteTheme.primaryColor}
              ${theme.black ? blackTheme.borderColor : whiteTheme.borderColor}`}
            required
          ></input>
          <div className="submit">
            <div className={`decoration1 ${theme.black ? blackTheme.backgroundColor : whiteTheme.backgroundColor}`}></div>
            <input
              className={`submitButton
                ${theme.black ? blackTheme.primaryColor : whiteTheme.primaryColor}
                ${theme.black ? blackTheme.borderColor : whiteTheme.borderColor}`}
              type="submit"
              value="Let's Go!"
            ></input>
            <div className={`decoration2 ${theme.black ? blackTheme.backgroundColor : whiteTheme.backgroundColor}`}></div>
          </div>
          <a href="/login" className={`link ${theme.black ? blackTheme.primaryColor : whiteTheme.primaryColor}`}>Login</a>
          <svg
            onClick={changeTheme}
            id="lightIcon"
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="moon-stars"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="svg-inline--fa fa-moon-stars fa-w-16 fa-7x"
            width="3em"
          >
            <g>
              <path
                className={theme.black ? blackTheme.fillColor : whiteTheme.fillSecondColor}
                d="M320 32L304 0l-16 32-32 16 32 16 16 32 16-32 32-16zm138.7 149.3L432 128l-26.7 53.3L352 208l53.3 26.7L432 288l26.7-53.3L512 208z"
              ></path>
              <path
                className={theme.black ? blackTheme.fillColor : whiteTheme.fillColor}
                d="M332.2 426.4c8.1-1.6 13.9 8 8.6 14.5a191.18 191.18 0 0 1-149 71.1C85.8 512 0 426 0 320c0-120 108.7-210.6 227-188.8 8.2 1.6 10.1 12.6 2.8 16.7a150.3 150.3 0 0 0-76.1 130.8c0 94 85.4 165.4 178.5 147.7z"
              ></path>
            </g>
          </svg>
        </form>

        {dataStatus.status === 404 && <Error404 />}
        {dataStatus.status === 400 && <Error400 />}
        {dataStatus.status === 500 && <Error500 />}
        {stateEmail.error && <ErrorEmail />}
      </div>
    </div>
  )
}

export default Register
