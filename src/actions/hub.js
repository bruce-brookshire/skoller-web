import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Grab the class statuses for the hub view
*
*/
export function getStatusesHub () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/class-statuses/hub`, {
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
      showSnackbar('Error fetching statuses. Try again.')
      return Promise.reject(error)
    })
}

/*
* Grab the class status list
*
*/
export function getStatuses () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/class-statuses`, {
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
      showSnackbar('Error fetching statuses. Try again.')
      return Promise.reject(error)
    })
}
