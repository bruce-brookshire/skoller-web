import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Search classes by param
*
* @params [Object] queryString. Search parameters.
*/
export function searchClasses (queryString) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes?${queryString}`, {
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
* Search classes by param
*
* @params [Object] param. Search parameters.
*/
export function searchStudentClasses (param) {
  const {user: {student: {school}}} = userStore
  return fetch(`${Environment.SERVER_NAME}/api/v1/schools/${school.id}/classes?class_name=${param}&class_number=${param}&professor_name=${param}&or=true`, {
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
* Get class by id
*
* @param [Number] classId. The id of the class to get.
*/
export function getClassById (classId) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${classId}`, {
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
      showSnackbar('Error fetching class. Try again.')
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
  const {user: {student: {school}}} = userStore
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes?school_id=${school.id}&professor_name=${professor.name_last}`, {
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

/*
* Update a class status
*
* @param [Object] cl. Class to update.
* @param [Object] form. Class status form.
*/
export function updateClassStatus (cl, form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/statuses`, {
    method: 'PUT',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .then(data => {
      showSnackbar('Class status updated.', 'info')
      return data
    })
    .catch(error => {
      showSnackbar('Error updating class status. Try again.')
      return Promise.reject(error)
    })
}

/*
* Lock the class for DIY
*
* @param [Number] classId. Class to lock
* @param [Object] form. Optional params for class lock.
*/
export function lockClass (classId, form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${classId}/lock`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => checkError(response))
    .catch(error => {
      if (error !== 422) showSnackbar('Error locking class. Try again.')
      return Promise.reject(error)
    })
}

/*
* Unlock the class for DIY
*
* @param [Number] classId. Class to unlock
* @param [Object] form. Optional params for class unlock.
*/
export function unlockClass (classId, form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${classId}/unlock`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => checkError(response))
    .catch(error => {
      showSnackbar('Error unlocking class. Try again.')
      return Promise.reject(error)
    })
}
