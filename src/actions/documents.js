import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Get classes for students
*
* @param [Number] classId. The class to get the class documents for.
*/
export function getClassDocuments (classId) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${classId}/docs`, {
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
      showSnackbar('Error fetching documents. Try again.')
      return Promise.reject(error)
    })
}

/*
* Upload a new file for a class
*
* @param [Object] cl. The class to upload the class documents for.
* @param [Object] file. The file to upload.
* @param [Boolean] isSyllabus. Boolean indicating if the document is a syllabus.
*/
export function uploadClassDocument (cl, file, isSyllabus = false) {
  let form = new FormData()
  form.append('is_syllabus', isSyllabus)
  form.append('file', file)

  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/docs`, {
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
      showSnackbar('Error uploading file. Try again.')
      return Promise.reject(error)
    })
}

/*
* Upload a csv import for classes for a school period.
*
* @param [Object] periodId. The period to upload the csv for.
* @param [Object] file. The file to upload.
*/
export function uploadClassCsv(periodId, file) {
  let form = new FormData()
  form.append('file', file)

  return fetch(`${Environment.SERVER_NAME}/api/v1/periods/${periodId}/classes/csv`, {
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
