import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')



/*
* Get the next class with an open weight section for syllabus worker.
*/
export function getWeightClass () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/syllabus-workers/weights`, {
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
      showSnackbar('Error retrieving class. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get the next class with an open assignment section for syllabus worker.
*/
export function getAssignmentClass () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/syllabus-workers/assignments`, {
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
      showSnackbar('Error retrieving class. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get the next class with an open review section for syllabus worker.
*/
export function getReviewClass () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/syllabus-workers/reviews`, {
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
      showSnackbar('Error retrieving class. Try again.')
      return Promise.reject(error)
    })
}
