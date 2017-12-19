import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Search classes by param
*
* @params [Object] param. Search parameters.
* @param [Number] periodId. Id of the school period to query by.
*/
export function searchProfessors (param, periodId) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/periods/${periodId}/professors?professor.name=${param}`, {
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
      showSnackbar('Error searching professors. Try again.')
      return Promise.reject(error)
    })
}

/*
* Create a new professor
*
* @params [Object] form. Professor form.
*/
export function createProfessor (form) {
  const {user: {student: {school}}} = userStore
  return fetch(`${Environment.SERVER_NAME}/api/v1/periods/${school.periods[0].id}/professors`, {
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
      showSnackbar('Error creating professor. Try again.')
      return Promise.reject(error)
    })
}

/*
* Update professor
*
* @params [Object] form. Professor form.
*/
export function updateProfessor (form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/professors/${form.id}`, {
    method: 'PUT',
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
      showSnackbar('Error updating professor. Try again.')
      return Promise.reject(error)
    })
}

/*
* Attach a professor to a class
*
*/
export function attachProfessorToClass (cl, professor) {
  const form = {professor_id: professor.id}

  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}`, {
    method: 'PUT',
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
      showSnackbar('Error attaching professor to class. Try again.')
      return Promise.reject(error)
    })
}

/*
* Attach a professor to a class
*/
export function removeProfessorFromClass (cl) {
  const form = {professor_id: null}

  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}`, {
    method: 'PUT',
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
      showSnackbar('Error removing professor from class. Try again.')
      return Promise.reject(error)
    })
}
