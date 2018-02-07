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
* Get request types
*/
export function getRequestTypes () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/class-student-request-types`, {
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
      showSnackbar('Error fetching request types. Try again.')
      return Promise.reject(error)
    })
}

/*
* Resolve change request
*/
export function resolveChangeRequest (requestId) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/changes/${requestId}/complete`, {
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

/*
* Create student request
*/
export function createStudentRequest (classId,requestTypeId,data) {
  let form = new FormData()
  let ind = 0
  data['notes'] ? form.append('notes', data['notes']) : null
  data['files'] ? data['files'].forEach(file => {
    form.append(('files['+ind.toString()+']'), file)
    ind++
  } ) : null
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${classId}/student-request/${requestTypeId}`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
    },
    body: form,
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error creating student request. Try again.')
      return Promise.reject(error)
    })
}

/*
* Resolve student request
*/
export function resolveStudentRequest (requestId) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/student-requests/${requestId}/complete`, {
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
      showSnackbar('Error resolving student request. Try again.')
      return Promise.reject(error)
    })
}
