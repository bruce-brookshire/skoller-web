import {post, get, del} from '../utilities/api'
import {showSnackbar} from '../utilities/snackbar'

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
  return get(`/api/v1/notifications/`, '', 'Error getting logs. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get Assignment reminder messages
*/
export function getAssignmentReminders () {
  return get(`/api/v1/reminder-messages/`, '', 'Error getting messages. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get Assignment reminder message topics
*/
export function getAssignmentReminderTopics () {
  return get(`/api/v1/reminder-messages/topics`, '', 'Error getting messages. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Delete an assignment
*/
export function deleteAssignmentReminders (form) {
  return del(`/api/v1/reminder-messages/${form.id}`, 'Error deleting message. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Send custom notification
*/
export function addReminderNotification (form) {
  let newForm = {reminder_message: form}

  return post(`/api/v1/reminder-messages`, newForm, '')
    .then(data => {
      showSnackbar('Successfully added reminder.', 'info')
      return data
    })
    .catch(error => {
      showSnackbar('Error adding reminder. Try again.')
      return Promise.reject(error)
    })
}
