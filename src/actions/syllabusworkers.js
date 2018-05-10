import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')


/*
* Get the next class with an open section for syllabus worker.
*
* @param [String] section name. Name of section SW is working.
*/
export function getNextClass () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/syllabus-workers/`, {
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
      if (error === 204) {
        showSnackbar('No sections available at this time', 'info')
      } else {
        showSnackbar('Error retrieving class. Try again.')
      }
      return Promise.reject(error)
    })
}
