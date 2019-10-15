import {put} from '../utilities/api'

/*
* Update an assignment
*
* @params [Object] form. Assignment form.
*/
export function updateGradeScale (cl, form) {
  return put(`/api/v1/classes/${cl.id}`, form, 'Error updating grade scale. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
