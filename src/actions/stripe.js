import {get, post, put, del} from '../utilities/api'
import stores from '../stores'

/*
* Get assignments for class
*
* @param [Object] cl. Class
*/
export function getAllSubscription() {
  return get(`/api/v1/stripe/all-subscriptions`)
    .then((assignments) => {
      return assignments
    }).catch(error => {
      return Promise.reject(error)
    })
}

export function getMySubscription() {
    return get(`/api/v1/stripe/my-subscriptions`)
      .then((assignments) => {
        return assignments
      }).catch(error => {
        return Promise.reject(error)
      })
  }
export function lastUpcomingPayment() {
    return get(`/api/v1/stripe/last-and-upcoming-payments`)
      .then((assignments) => {
        return assignments
      }).catch(error => {
        return Promise.reject(error)
      })
  }
export function billingHistory() {
    return get(`/api/v1/stripe/billing-history`)
      .then((assignments) => {
        return assignments
      }).catch(error => {
        return Promise.reject(error)
      })
  }
