import {get, post} from '../utilities/api'

/*
* Get Notification Logs
*/
export function getCustomLinks () {
  return get(`/api/v1/custom-links/`, '', 'Error getting links. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get Notification Logs
*/
export function createCustomLink (form) {
  return post(`/api/v1/custom-links/`, form, 'Error creating link. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}
