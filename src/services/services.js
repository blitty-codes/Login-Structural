require('../config/config')

const login = (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }

  return fetch(`${global.URL}/login`, requestOptions)
    .then(response => {
      if (response.status === 200) return response.json()
      else return response.status
    })
}

const logout = () => {
  localStorage.removeItem('YourAnimeList')
}

const register = (username, email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  }

  return fetch(`${global.URL}/register`, requestOptions)
    .then(response => {
      if (response.status === 200) return response.json()
      else return response.status
    })
}

const auth = (tokenValidate) => {
  if (localStorage.getItem('YourAnimeList') === null) { window.location = '/login'; return false }
  tokenValidate = JSON.parse(tokenValidate).token
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tokenValidate })
  }
  return fetch(`${global.URL}/auth`, requestOptions)
    .then(resp => resp.json())
}

const getProfile = (username) => {
  if (localStorage.getItem('YourAnimeList') === null) { window.location = '/login'; return false }
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  }
  return fetch(`${global.URL}/profile`, requestOptions)
    .then(resp => resp.json())
}

export {
  login,
  logout,
  register,
  auth,
  getProfile
}
