import 'isomorphic-fetch'
import stores from '../stores'
import {showSnackbar} from './snackbar'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Function to check if http request was successful
*
* @param [Object] response. Http response from server.
* @return [Object] response. Http response from server.
*/
export const checkError = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    // if (response.status === 401) logout()
    return Promise.reject(response.status)
  }
}

/*
* Function to check if http request was successful
*
* @param [Object] response. Http response from server.
* @return [Object] response. Http response from server.
*/
export const parseResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    if (response.status !== 204) return response.json()
  } else {
    return Promise.reject(response)
  }
}

/*
* Function to check if http request was successful
*
* @param [Object] response. Http response from server.
* @return [Object] response. Http response from server.
*/
export const parseTextResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    if (response.status !== 204) return response.text()
  } else {
    return Promise.reject(response)
  }
}

export function get (path, queryString, errMsg) {
    console.log(`${Environment.SERVER_NAME}${path}${queryString ? '?' + queryString : ''}`)
  return fetch(`${Environment.SERVER_NAME}${path}${queryString ? '?' + queryString : ''}`, {
    method: 'GET',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .catch(error => {
      if (errMsg) showSnackbar(errMsg)
      if (Environment.IS_DEV) console.log(error)
      return Promise.reject(error)
    })
}

export function csv (path, errMsg) {
  return fetch(`${Environment.SERVER_NAME}${path}`, {
    method: 'GET',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseTextResponse(response))
    .catch(error => {
      if (errMsg) showSnackbar(errMsg)
      if (Environment.IS_DEV) console.log(error)
      return Promise.reject(error)
    })
}

export function post (path, form, errMsg, token = userStore.authToken) {
  return fetch(`${Environment.SERVER_NAME}${path}`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .catch(error => {
      if (errMsg) {
        if (typeof errMsg === 'function') {
          showSnackbar(errMsg(error))
        } else {
          showSnackbar(errMsg)
        }
      }
      if (Environment.IS_DEV) console.log(error)
      return Promise.reject(error)
    })
}

export function postFile (path, form, errMsg) {
  return fetch(`${Environment.SERVER_NAME}${path}`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken
    },
    body: form
  })
    .then(response => parseResponse(response))
    .catch(error => {
      if (errMsg) showSnackbar(errMsg)
      if (Environment.IS_DEV) console.log(error)
      return Promise.reject(error)
    })
}

export function putFile (path, form, errMsg) {
  console.log(path, form, errMsg)
  return fetch(`${Environment.SERVER_NAME}${path}`, {
    method: 'PUT',
    headers: {
      'Authorization': userStore.authToken
    },
    body: form
  })
    .then(response => parseResponse(response))
    .catch(error => {
      if (errMsg) showSnackbar(errMsg)
      if (Environment.IS_DEV) console.log(error)
      return Promise.reject(error)
    })
}

export function put (path, form, errMsg) {
  return fetch(`${Environment.SERVER_NAME}${path}`, {
    method: 'PUT',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .catch(error => {
      if (errMsg) showSnackbar(errMsg)
      if (Environment.IS_DEV) console.log(error)
      return Promise.reject(error)
    })
}

export function del (path, errMsg) {
  return fetch(`${Environment.SERVER_NAME}${path}`, {
    method: 'DELETE',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkError(response))
    .catch(error => {
      if (errMsg) showSnackbar(errMsg)
      if (Environment.IS_DEV) console.log(error)
      return Promise.reject(error)
    })
}

export async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
