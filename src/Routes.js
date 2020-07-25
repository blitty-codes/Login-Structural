/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// components
import Register from './components/Register'
import Login from './components/Login'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Register} />
      <Route exact path="/login" component={Login} />
    </BrowserRouter>
  )
}
// <Redirect from="*" to="/" />
export default Routes
