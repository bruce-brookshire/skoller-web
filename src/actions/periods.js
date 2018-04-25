import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Get school periods.
*
* @params [Object] school. School to grab the periods.
*/
export function getSchoolPeriods (schoolId, name) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/schools/${schoolId}/periods?name=${name}`, {
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
      showSnackbar('Error fetching periods. Try again.')
      return Promise.reject(error)
    })
}

/*
* Create a new period
*
* @params [Object] school. School.
* @params [Object] form. Period form.
*/
export function createPeriod (schoolId, form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/schools/${schoolId}/periods`, {
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
      showSnackbar('Error creating period. Try again.')
      return Promise.reject(error)
    })
}


/*
* Update period
*
* @params [Object] form. Period form.
*/
export function updatePeriod (form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/periods/${form.id}`, {
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
      showSnackbar('Error updating period. Try again.')
      return Promise.reject(error)
    })
}
