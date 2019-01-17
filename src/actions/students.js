import {get} from '../utilities/api'

/*
* Get student and link details
*
* @param [string] link. Student link
*/
export function getStudentByLink (link) {
  return get(`/api/v1/student-link/${link}`, '', 'Error finding student. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}