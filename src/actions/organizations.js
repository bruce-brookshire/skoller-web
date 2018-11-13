import {get} from '../utilities/api'

/*
* Get assignments for class
*
* @param [int] assignmentId
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
