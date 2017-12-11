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
*/
export function searchClasses (param) {
  const {user: {student: {school}}} = userStore
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes?school.id=${school.id}&class.name=${param}&class.number=${param}&professor.name=${param}&or=true`, {
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
      showSnackbar('Error searching classes. Try again.')
      return Promise.reject(error)
    })
}


/*
* Get classes for students
*
*/
export function getStudentClasses () {
  const {user: {student}} = userStore
  return fetch(`${Environment.SERVER_NAME}/api/v1/students/${student.id}/classes/`, {
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
      showSnackbar('Error fetching classes. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get classes for professor
*
* @param [Object] professor. Professor of class
*/
export function getProfessorClasses (professor) {
  const {user: {student}} = userStore
  return fetch(`${Environment.SERVER_NAME}/api/v1/students/${student.id}/classes/`, {
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
      showSnackbar('Error fetching classes. Try again.')
      return Promise.reject(error)
    })
}

/*
* Enroll in class
*
* @param [Object] classId. The id of the class for the student to enroll in.
*/
export function enrollInClass (classId) {
  const {user: {student}} = userStore
  return fetch(`${Environment.SERVER_NAME}/api/v1/students/${student.id}/classes/${classId}`, {
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
      showSnackbar('Error enrolling in class. Try again.')
      return Promise.reject(error)
    })
}

/*
* Drop class
*/
export function dropClass (classId) {
  const {user: {student}} = userStore
  return fetch(`${Environment.SERVER_NAME}/api/v1/students/${student.id}/classes/${classId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkError(response))
    .catch(error => {
      showSnackbar('Error dropping class. Try again.')
      return Promise.reject(error)
    })
}

/*
* Create a new class
*/
export function createClass (form) {
  const {user: {student: {school}}} = userStore
  return fetch(`${Environment.SERVER_NAME}/api/v1/periods/${school.periods[0].id}/classes`, {
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
      showSnackbar('Error creating class. Try again.')
      return Promise.reject(error)
    })
}

/*
* Update a class
*/
export function updateClass (form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${form.id}`, {
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
      showSnackbar('Error updating class. Try again.')
      return Promise.reject(error)
    })
}
