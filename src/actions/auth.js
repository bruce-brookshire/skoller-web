import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Authenticate login credentials. Set the user.
*
* @params [Object] form. Login form data.
*/
export function authenticateUser (form) {
  userStore.loading = true

  return fetch(`${Environment.SERVER_NAME}/api/v1/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .then(data => {
      userStore.authToken = data.token
      userStore.user = data
      userStore.loading = false
    })
    .catch(error => {
      userStore.loading = false
      if (error !== 401 && error !== 404) {
        showSnackbar('Error logging in. Try again.')
      } else {
        showSnackbar('Incorrect username or password.')
      }
      return Promise.reject(error)
    })
}

/*
*  Full sign up. Set the user.
*
* @params [Object] form. Sign up form data.
*/
export function registerUser (form) {
  userStore.loading = true

  return fetch(`${Environment.SERVER_NAME}/api/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .then(data => {
      userStore.authToken = data.token
      userStore.user = data
      userStore.loading = false
    })
    .catch(error => {
      userStore.loading = false
      if (error !== 422) {
        showSnackbar('Error registering user. Try again.')
      } else {
        showSnackbar('Username already exists.')
      }
      return Promise.reject(error)
    })
}

/*
* Fetch user to set state.
*/
export function getUserByToken () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/token_login`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .then(data => {
      userStore.user = data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
