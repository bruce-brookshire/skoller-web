import 'isomorphic-fetch'
import {checkError, parseResponse, get, post, del, put} from '../utilities/api'
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
  return get(`/api/v1/classes`, queryString, 'Error searching classes. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Search classes by param
*
* @params [Object] param. Search parameters.
*/
export function searchStudentClasses (schoolId, name) {
  return get(`/api/v1/schools/${schoolId}/classes`, `class_name=${name}`, 'Error searching classes. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get class by id
*
* @param [Number] classId. The id of the class to get.
*/
export function getClassById (classId) {
  return get(`/api/v1/classes/${classId}`, '', 'Error fetching class. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get classes for students by student id
*
*/
export function getStudentClassesById (studentId) {
  return get(`/api/v1/students/${studentId}/classes/`, '', 'Error fetching classes. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
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
  return post(`/api/v1/students/${student.id}/classes/${classId}`, null, 'Error enrolling in class. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Drop class
*/
export function dropClass (classId) {
  const {user: {student}} = userStore
  return del(`/api/v1/students/${student.id}/classes/${classId}`, 'Error dropping class. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create a new class
*/
export function createClass (form, periodId) {
  return post(`api/v1/periods/${periodId}/classes`, form, 'Error creating class. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Delete a new class
*/
export function deleteClass (cl) {
  return del(`/api/v1/classes/${cl.id}`, 'Error deleting class. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Update a class
*/
export function updateClass (form) {
  return put(`/api/v1/classes/${form.id}`, form, 'Error updating class. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Approve class
*
* @param [Object] cl. Class to approve.
*/
export function approveClass (cl) {
  return post(`/api/v1/classes/${cl.id}/approve`, null, '')
    .then(data => {
      showSnackbar('Class approved.', 'info')
      return data
    })
    .catch(error => {
      showSnackbar('Error approving class. Try again.')
      return Promise.reject(error)
    })
}

/*
* Deny class
*
* @param [Object] cl. Class to deny.
*/
export function denyClass (cl) {
  return post(`/api/v1/classes/${cl.id}/deny`, null, '')
    .then(data => {
      showSnackbar('Class rejected.', 'info')
      return data
    })
    .catch(error => {
      showSnackbar('Error rejecting class. Try again.')
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
  return put(`$/api/v1/classes/${cl.id}/statuses`, form)
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
  return post(`/api/v1/classes/${classId}/lock`, form, '')
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
      // showSnackbar('Error unlocking class. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get the class locks
*
* @param [Number] classId. Class to unlock
*/
export function getLocks (classId) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${classId}/locks`, {
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
      // showSnackbar('Error unlocking class. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get class and link details
*
* @param [string] link. Class link
*/
export function getClassByLink (link) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/enrollment-link/${link}`, {
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
      showSnackbar('Error finding class. Try again.')
      return Promise.reject(error)
    })
}

/*
* Enroll in class by link
*
* @param [Number] classId. Class to unlock
* @param [Object] form. Optional params for class unlock.
*/
export function enrollByLink (link) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/enrollment-link/${link}`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkError(response))
    .catch(error => {
      // showSnackbar('Error unlocking class. Try again.')
      return Promise.reject(error)
    })
}
