import {get, post, postFile} from '../utilities/api'

/*
* Get help types
*/
export function getHelpTypes () {
  return get(`/api/v1/class-help-types`, '', 'Error fetching help types. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create help ticket
*/
export function createIssue (cl, helpId, form) {
  return post(`/api/v1/classes/${cl.id}/help/${helpId}`, form, 'Error creating help ticket. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get request types
*/
export function getRequestTypes () {
  return get(`/api/v1/class-student-request-types`, '', 'Error fetching request types. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Resolve change request
*/
export function resolveChangeRequest (requestId) {
  return post(`/api/v1/changes/${requestId}/complete`, null, 'Error resolving change request. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create student request
*/
export function createStudentRequest (classId, requestTypeId, data) {
  let form = new FormData()
  let ind = 0
  if (data['notes']) {
    form.append('notes', data['notes'])
  }
  if (data['files']) {
    data['files'].forEach(file => {
      form.append(('files[' + ind.toString() + ']'), file)
      ind++
    })
  }
  return postFile(`/api/v1/classes/${classId}/student-request/${requestTypeId}`, form, 'Error creating student request. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Resolve student request
*/
export function resolveStudentRequest (requestId) {
  return post(`/api/v1/student-requests/${requestId}/complete`, null, 'Error resolving student request. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
