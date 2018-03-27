import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Get auto update metrics and settings
*/
export function getAutoUpdateInfo () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/auto-updates`, {
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
      showSnackbar('Error fetching analytics. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get auto update metrics and settings
*/
export function getMinVersionInfo () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/min-version`, {
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
      showSnackbar('Error fetching analytics. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get auto update metrics and settings
*/
export function forecastAutoUpdateInfo (queryString) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/auto-updates/forecast?` + queryString, {
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
      showSnackbar('Error fetching analytics. Try again.')
      return Promise.reject(error)
    })
}

/*
* Update auto update metrics and settings
*/
export function updateAutoUpdateInfo (form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/auto-updates/`, {
    method: 'PUT',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      settings: form
    })
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error fetching analytics. Try again.')
      return Promise.reject(error)
    })
}