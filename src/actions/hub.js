import {get} from '../utilities/api'

/*
* Grab the class statuses for the hub view
*
*/
export function getStatusesHub () {
  return get(`/api/v1/class-statuses/hub`, '', 'Error fetching statuses. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Grab the class status list
*
*/
export function getStatuses () {
  return get(`/api/v1/class-statuses`, '', 'Error fetching statuses. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
