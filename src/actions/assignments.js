import {get, post, put, del} from '../utilities/api'

/*
* Get assignments for class
*
* @param [Object] cl. Class
*/
export function getClassAssignments (cl) {
  return get(`/api/v1/classes/${cl.id}/assignments`, '', 'Error fetching assignments. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create a new assignment
*
* @params [Object] form. Assignment form.
*/
export function createAssignment (cl, form) {
  return post(`/api/v1/classes/${cl.id}/assignments`, form, 'Error creating assignment. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Update an assignment
*
* @params [Object] form. Assignment form.
*/
export function updateAssignment (cl, form) {
  return put(`/api/v1/class/assignments/${form.id}`, form, 'Error updating assignment. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Delete an assignment
*/
export function deleteAssignment (form) {
  return del(`/api/v1/class/assignments/${form.id}`, 'Error deleting assignment. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}
