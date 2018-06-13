import {post, get, put} from '../utilities/api'

/*
* Set a school's four door override
*
* @params [Object] form. 4door form.
*/
export function overrideSchool (schoolId, form) {
  return post(`/api/v1/schools/${schoolId}/four-door`, form, 'Error overriding four door. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get fourdoor settings
*
*/
export function getFourDoor () {
  return get(`/api/v1/four-door`, '', 'Error fetching four door. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get fourdoor settings
*
*/
export function getFourDoorOverrides () {
  return get(`/api/v1/four-door/overrides`, '', 'Error fetching four door overrides. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Update four door defaults
*
* @params [Object] form. 4door form.
*/
export function updateFourDoor (form) {
  return put(`/api/v1/four-door/`, form, 'Error updating four door. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
