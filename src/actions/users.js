import {csv, get, put, del, post} from '../utilities/api'
import stores from '../stores'
const {userStore} = stores

/*
* Gets a CSV of users.
*
*/
export function getStudentCsv () {
  return csv(`/api/v1/analytics/csv/users`, 'Error retrieving csv. Try again.')
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

export function deleteUserById (user) {
  return del(`/api/v1/users/${user.id}`, null, 'Error deleting user. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function refreshUser () {
  return post(`/api/v1/users/token-login`, '')
    .then(data => {
      userStore.user = data.user
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
