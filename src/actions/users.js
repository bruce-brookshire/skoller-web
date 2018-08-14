import {csv} from '../utilities/api'

/*
* Gets a CSV of users.
*
*/
export function getStudentCsv () {
  return csv(`/api/v1/users/csv`, 'Error retrieving csv. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
