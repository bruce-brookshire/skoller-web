import {get, post, put, del} from '../utilities/api'
import stores from '../stores'

/*
* Get assignments for class
*
* @param [Object] cl. Class
*/
export function getAllSubscription() {
  return get(`/api/v1/stripe/all-subscriptions`)
    .then((allSubscription) => {
      return allSubscription
    }).catch(error => {
      return Promise.reject(error)
    })
}

export function cancelSubscription(subId){
    return get(`/api/v1/stripe/cancel-subscription?subscription_id=${subId}`)
    .then(res => {})
    .catch(err => Promise.reject(err))
}

export function cancellationReason(reason){
    return post(`/api/v1/stripe/cancellation-reasons`,{
        title: reason, description: ''
    })
    .then(res => {})
    .catch(err => Promise.reject(err))
}


export function getMySubscription() {
    return get(`/api/v1/stripe/my-subscriptions`)
      .then((mySubscription) => {
        return mySubscription
      }).catch(error => {
        return Promise.reject(error)
      })
  }
export function lastUpcomingPayment() {
    return get(`/api/v1/stripe/last-and-upcoming-payments`)
      .then((upcomingPayments) => {
        return upcomingPayments
      }).catch(error => {
        return Promise.reject(error)
      })
  }
export function billingHistory() {
    return get(`/api/v1/stripe/billing-history`)
      .then((billingHistory) => {
        return billingHistory
      }).catch(error => {
        return Promise.reject(error)
      })
}
export function allProducts() {
  return get(`/api/v1/stripe/all-products`)
    .then((products) => {
      return products
    }).catch(error => {
      return Promise.reject(error)
    })
}

export function allPlans() {
  return get(`/api/v1/stripe/all-plans`)
    .then((allplans) => {
      return allplans
    }).catch(error => {
      return Promise.reject(error)
    })
}

export function createSubscription(requestObj) {
  return post(`/api/v1/stripe/save-card-and-subscription`, requestObj, null)
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
