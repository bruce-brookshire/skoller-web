import {get, post, put} from '../utilities/api'

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
export function createOrganizations (form) {
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
export function updateOrganizations (id, form) {
  return put(`/api/v1/organizations/${id}`, form, 'Error creating organizations. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
