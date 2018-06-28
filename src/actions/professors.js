import {get, post, put} from '../utilities/api'

/*
* Search classes by param
*
* @params [Object] param. Search parameters.
* @param [Number] periodId. Id of the school period to query by.
*/
export function searchProfessors (param, schoolId) {
  return get(`/api/v1/schools/${schoolId}/professors`, `professor_name=${param}`, 'Error searching professors. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create a new professor
*
* @params [Object] form. Professor form.
* @param [Number] periodId. Id of period.
*/
export function createProfessor (form, schoolId) {
  return post(`/api/v1/schools/${schoolId}/professors`, form, 'Error creating professor. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Update professor
*
* @params [Object] form. Professor form.
*/
export function updateProfessor (form) {
  return put(`/api/v1/professors/${form.id}`, form, 'Error updating professor. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Attach a professor to a class
*
*/
export function attachProfessorToClass (cl, professor) {
  const form = {professor_id: professor.id}

  return put(`/api/v1/classes/${cl.id}`, form, 'Error attaching professor to class. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Attach a professor to a class
*/
export function removeProfessorFromClass (cl) {
  const form = {professor_id: null}

  return put(`/api/v1/classes/${cl.id}`, form, 'Error removing professor from class. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
