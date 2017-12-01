import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Authenticate login credentials. Set the user.
*
* @params [Object] form. Login form data.
*/
export function getActiveSchools () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/school/list`, {
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
