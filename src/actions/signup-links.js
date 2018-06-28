import {get, post} from '../utilities/api'

/*
* Get Signup links
*/
export function getCustomLinks () {
  return get(`/api/v1/custom-links/`, '', 'Error getting links. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get signup links by id
*/
export function getCustomLinkById (id) {
  return get(`/api/v1/custom-links/${id}`, '', 'Error getting link. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* create signup link
*/
export function createCustomLink (form) {
  return post(`/api/v1/custom-links/`, form, 'Error creating link. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}
