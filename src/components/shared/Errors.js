/* eslint-disable no-unused-vars */
import React from 'react'

import '../../assets/css/alerts.css'

function Error404 () {
  return (
    <div className="alerts">
      <h1 className="text">This page does not exist</h1>
    </div>
  )
}

function Error400 () {
  return (
    <div className="alerts">
      <h1 className="text">Wrong Credentials</h1>
    </div>
  )
}

function Error500 () {
  return (
    <div className="alerts">
      <h1 className="text">Try again later</h1>
    </div>
  )
}

function ErrorEmail () {
  return (
    <div className="alerts">
      <h1 className="text">That email is not valid, please use: <span>Gmail</span>, <span>Hotmail</span> or <span>Outlook</span></h1>
    </div>
  )
}

export {
  Error404,
  Error400,
  Error500,
  ErrorEmail
}
