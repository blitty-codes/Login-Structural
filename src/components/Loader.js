/* eslint-disable no-unused-vars */
import React from 'react'

import '../assets/css/loader.css'

function LoaderReg () {
  return (
    <div className="loader">
      <div className="circle">
        <div className="rect"></div>
      </div>
      <h3>Loading...</h3>
    </div>
  )
}

export {
  LoaderReg
}
