import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Send 'Needs Syllabus' notification
*/
export function sendNeedsSyllabusNotification (cl) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/notifications/syllabus-needed`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkError(response))
    .then(data => {
      showSnackbar('Successfully sent notification.','info')
      return data
    })
    .catch(error => {
      showSnackbar('Error fetching weights. Try again.')
      return Promise.reject(error)
    })
}
