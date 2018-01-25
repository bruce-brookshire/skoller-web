import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Get help types
*/
export function getHelpTypes () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/class-help-types`, {
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
      showSnackbar('Error fetching help types. Try again.')
      return Promise.reject(error)
    })
}

/*
* Create help ticket
*/
export function createIssue (cl, helpId, form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/help/${helpId}`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error creating help ticket. Try again.')
      return Promise.reject(error)
    })
}

/*
* Resolve help ticket
*/
export function resolveIssue (helpId) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/help/${helpId}/complete`, {
    method: 'POST',
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
      showSnackbar('Error resolving help ticket. Try again.')
      return Promise.reject(error)
    })
}

/*
* Resolve change request
*/
export function resolveChangeRequest (changeRequestId) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/changes/${changeRequestId}/`, {
    method: 'POST',
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
      showSnackbar('Error resolving change request. Try again.')
      return Promise.reject(error)
    })
}
