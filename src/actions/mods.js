import {get} from '../utilities/api'

/*
* Get assignments for class
*
* @param [int] assignmentId
*/
export function getAssignmentMods (assignmentId) {
  return get(`/api/v1/assignments/${assignmentId}/mods`, '', 'Error fetching mods. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
