import {post} from '../utilities/api'

/*
* Resolve change request
*/
export function resolveReport (reportId) {
  return post(`/api/v1/report/${reportId}/complete`, null, 'Error resolving report. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
