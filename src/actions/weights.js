import {get, post, put, del} from '../utilities/api'

/*
* Get weigths for class
*
* @param [Object] cl. Class
*/
export function getClassWeights (cl) {
  return get(`/api/v1/classes/${cl.id}/weights`, '', 'Error fetching weights. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create a new weight
*
* @params [Object] form. Weight form.
*/
export function createWeight (cl, form) {
  return post(`/api/v1/classes/${cl.id}/weights`, form, 'Error creating weight. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Update a weight
*
* @params [Object] form. Weight form.
*/
export function updateWeight (cl, form) {
  return put(`/api/v1/weights/${form.id}`, form, 'Error updating weight. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Delete a weight
*/
export function deleteWeight (form) {
  return del(`/api/v1/weights/${form.id}`, 'Error deleting weight. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}
