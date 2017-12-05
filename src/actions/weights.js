import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Get weigths for class
*
* @param [Object] cl. Class
*/
export function getClassWeights (cl) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/weights`, {
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
      showSnackbar('Error fetching weights. Try again.')
      return Promise.reject(error)
    })
}

/*
* Create a new weight
*
* @params [Object] form. Weight form.
*/
export function createWeight (cl, form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/weights`, {
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
      showSnackbar('Error creating weight. Try again.')
      return Promise.reject(error)
    })
}

/*
* Update a weight
*
* @params [Object] form. Weight form.
*/
export function updateWeight (cl, form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/weights/${form.id}`, {
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
      showSnackbar('Error updating weight. Try again.')
      return Promise.reject(error)
    })
}


/*
* Delete a weight
*/
export function deleteWeight (cl, form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/weights/${form.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkError(response))
    .catch(error => {
      showSnackbar('Error deleting weight. Try again.')
      return Promise.reject(error)
    })
}
