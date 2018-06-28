import {get} from '../utilities/api'

/*
* Get analytics
*/
export function getAnalytics (queryString) {
  return get(`/api/v1/analytics`, queryString, 'Error fetching analytics. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
