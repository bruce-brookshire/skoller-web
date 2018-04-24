import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Get the all schools for signup
*
*/
export function getAllSchools () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/schools`, {
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
      showSnackbar('Error fetching schools. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get states
*
*/
export function getStates () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/locations`, {
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
      showSnackbar('Error fetching states. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get fields of study.
*
* @param [Number] schoolId. Id of the school.
* @param [query] string. Query the fields of study.
*/
export function getFieldsOfStudy (schoolId, query) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/schools/${schoolId}/fields-of-study/list?field_name=${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error fetching schools. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get minified counts
*/
export function getHubSchoolsMinified () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/school/list`, {
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
      showSnackbar('Error fetching schools. Try again.')
      return Promise.reject(error)
    })
}

/*
* Search schools by name
*/
export function searchSchools (param) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/school/list?name=${param}`, {
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
      showSnackbar('Error fetching schools. Try again.')
      return Promise.reject(error)
    })
}

/*
* Grab all the schools in the system for admin.
*
* @params [Object] form. Login form data.
*/
export function getHubSchools () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/schools/hub`, {
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
      showSnackbar('Error fetching schools. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get school by id
*
* @params [Object] school. School.
*/
export function getSchoolById (school) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/schools/${school.id}`, {
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
      showSnackbar('Error fetching school. Try again.')
      return Promise.reject(error)
    })
}

/*
* Create a new school
*
* @params [Object] form. School form.
*/
export function createSchool (form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/schools`, {
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
      showSnackbar('Error creating school. Try again.')
      return Promise.reject(error)
    })
}


/*
* Update school
*
* @params [Object] form. School form.
*/
export function updateSchool (form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/schools/${form.id}`, {
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
      showSnackbar('Error updating school. Try again.')
      return Promise.reject(error)
    })
}
