import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Get fields of study.
*
* @param [query] string. Query the fields of study.
*/
export function getFieldsOfStudy (query) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/fields-of-study/list?field_name=${query}`, {
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

/*
* Upload a csv import for fields of study for a school.
*
* @param [Number] schoolId. The school to upload the csv for.
* @param [Object] file. The file to upload.
*/
export function uploadFOSCsv (file) {
  let form = new FormData()
  form.append('file', file)

  return fetch(`${Environment.SERVER_NAME}/api/v1/fields-of-study/csv`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken
    },
    body: form
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      if (error === 422) showSnackbar('File name has already been taken.')
      else showSnackbar('Error uploading file. Try again.')
      return Promise.reject(error)
    })
}
