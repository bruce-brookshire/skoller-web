import {csv, get, put} from '../utilities/api'

/*
* Gets a CSV of users.
*
*/
export function getStudentCsv () {
  return csv(`/api/v1/users/csv`, 'Error retrieving csv. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function getEmailPreferences (userId) {
  return get(`/api/v1/users/${userId}/email-preferences`, '', 'Error retrieving preferences. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function updateEmailPreferences (userId, form) {
  return put(`/api/v1/users/${userId}/email-preferences`, form, 'Error updating preferences. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function getEmailTypes () {
  return get(`/api/v1/email-types`, '', 'Error retrieving types. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
