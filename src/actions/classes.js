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
  const {user, user: {student}} = userStore
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes
    ?school.id=${student.school_id}&professor.name=${param}&class.name=${param}&class.number=${param}`, {
    method: 'GET',
    headers: {
      'Authorization': user.authToken,
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
