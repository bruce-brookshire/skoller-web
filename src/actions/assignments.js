import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Get assignments for class
*
* @param [Object] cl. Class
*/
export function getClassAssignments (cl) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/assignments`, {
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
      showSnackbar('Error fetching assignments. Try again.')
      return Promise.reject(error)
    })
}

/*
* Create a new assignment
*
* @params [Object] form. Assignment form.
*/
export function createAssignment (cl, form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/assignments`, {
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
      showSnackbar('Error creating assignment. Try again.')
      return Promise.reject(error)
    })
}

/*
* Update an assignment
*
* @params [Object] form. Assignment form.
*/
export function updateAssignment (cl, form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/class/assignments/${form.id}`, {
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
      showSnackbar('Error updating assignment. Try again.')
      return Promise.reject(error)
    })
}


/*
* Delete an assignment
*/
export function deleteAssignment (form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/class/assignments/${form.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkError(response))
    .catch(error => {
      showSnackbar('Error deleting assignment. Try again.')
      return Promise.reject(error)
    })
}
