import {get} from '../utilities/api'

/*
* Get Notification Logs
*/
export function getCustomLinks () {
  return get(`/api/v1/custom-links/`, '', 'Error getting links. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}
