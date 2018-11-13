import {get, post, put, del} from '../utilities/api'

/*
* Get organizations
*
*/
export function getOrganizations () {
  return get(`/api/v1/organizations`, '', 'Error fetching organizations. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create organization
*
*/
export function createOrganization (form) {
  return post(`/api/v1/organizations`, form, 'Error creating organizations. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Updates an organization
*
*/
export function updateOrganization (id, form) {
  return put(`/api/v1/organizations/${id}`, form, 'Error updating organizations. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Deletes an organization
*
*/
export function deleteOrganization (id) {
  return del(`/api/v1/organizations/${id}`, 'Error deleting organizations. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
