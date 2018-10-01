import {get, put} from '../utilities/api'

/*
* Get email types
*
*/
export function getEmailTypes () {
  return get(`/api/v1/email-types`, '', 'Error getting email types. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function getMinEmailTypes () {
  return get(`/api/v1/email-types/list`, '', 'Error retrieving types. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Update an email type
*/
export function updateEmailType (form, id) {
  return put(`/api/v1/email-types/${id}`, form, 'Error updating email type. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
