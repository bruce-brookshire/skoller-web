import {post} from '../utilities/api'

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
