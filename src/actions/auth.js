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
      userStore.authToken = `Bearer ${data.token}`
      userStore.user = data.user
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
      userStore.authToken = `Bearer ${data.token}`
      userStore.user = data.user
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
  return fetch(`${Environment.SERVER_NAME}/api/v1/users/token-login`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .then(data => {
      userStore.user = data.user
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Verify users phone number
*/
export function verifyPhoneNumber (form) {
  const {user: {student}} = userStore
  return fetch(`${Environment.SERVER_NAME}/api/v1/students/${student.id}/verify`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => checkError(response))
    .catch(error => {
      return Promise.reject(error)
    })
}


/*
* Get user roles.
*/
export function getUsers () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/users`, {
    method: 'GET',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error fetching users. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get user roles.
*
* @param [Object] user. User to fetch
*/
export function getUserById (user) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/users/${user.id}`, {
    method: 'GET',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error fetching user. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get user roles.
*/
export function getRoles () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/roles`, {
    method: 'GET',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error fetching roles. Try again.')
      return Promise.reject(error)
    })
}

/*
*  Create a user account (admin)
*
* @params [Object] form. User form data.
*/
export function createAccount (form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/users/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      if (error !== 422) {
        showSnackbar('Error creating user. Try again.')
      } else {
        showSnackbar('Username already exists.')
      }
      return Promise.reject(error)
    })
}

/*
*  Update a user account (admin)
*
* @params [Object] form. User form data.
*/
export function updateAccount (form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/users/create`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error updating user. Try again.')
      return Promise.reject(error)
    })
}
