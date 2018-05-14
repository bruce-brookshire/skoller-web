import {get} from '../utilities/api'
import {showSnackbar} from './snackbar'

/*
* Grab the class statuses for the hub view
*
*/
export function getStatusesHub () {
  return get(`/api/v1/class-statuses/hub`)
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error fetching statuses. Try again.')
      return Promise.reject(error)
    })
}

/*
* Grab the class status list
*
*/
export function getStatuses () {
  return get(`/api/v1/class-statuses`)
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error fetching statuses. Try again.')
      return Promise.reject(error)
    })
}
