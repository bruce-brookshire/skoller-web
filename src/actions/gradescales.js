import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')



/*
* Update an assignment
*
* @params [Object] form. Assignment form.
*/
export function updateGradeScale (cl, form) {

  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}`, {
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
      showSnackbar('Error updating gradescale. Try again.')
      return Promise.reject(error)
    })
}
