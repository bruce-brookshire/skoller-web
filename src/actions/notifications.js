import 'isomorphic-fetch'
import {checkError, parseResponse, post} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')

/*
* Send 'Needs Syllabus' notification
*/
export function sendNeedsSyllabusNotification () {
  return post(`/api/v1/notifications/syllabus-needed`, null, '')
    .then(data => {
      showSnackbar('Successfully sent notification.', 'info')
      return data
    })
    .catch(error => {
      showSnackbar('Error sending notification. Try again.')
      return Promise.reject(error)
    })
}

/*
* Send custom notification
*/
export function sendCustomNotification (form) {
  return post(`/api/v1/notifications/custom`, form, '')
    .then(data => {
      showSnackbar('Successfully sent notification.', 'info')
      return data
    })
    .catch(error => {
      showSnackbar('Error sending notification. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get Notification Logs
*/
export function getNotificationLogs () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/notifications/`, {
    method: 'GET',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .catch(error => {
      showSnackbar('Error getting logs. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get Assignment reminder messages
*/
export function getAssignmentReminders () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/reminder-messages/`, {
    method: 'GET',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .catch(error => {
      showSnackbar('Error getting messages. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get Assignment reminder message topics
*/
export function getAssignmentReminderTopics () {
  return fetch(`${Environment.SERVER_NAME}/api/v1/reminder-messages/topics`, {
    method: 'GET',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .catch(error => {
      showSnackbar('Error getting messages. Try again.')
      return Promise.reject(error)
    })
}

/*
* Delete an assignment
*/
export function deleteAssignmentReminders (form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/reminder-messages/${form.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkError(response))
    .catch(error => {
      showSnackbar('Error deleting message. Try again.')
      return Promise.reject(error)
    })
}

/*
* Send custom notification
*/
export function addReminderNotification (form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/reminder-messages`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: '{"reminder_message": ' + JSON.stringify(form) + '}'
  })
    .then(response => checkError(response))
    .then(data => {
      showSnackbar('Successfully added reminder.', 'info')
      return data
    })
    .catch(error => {
      showSnackbar('Error adding reminder. Try again.')
      return Promise.reject(error)
    })
}
