import {get, put, post} from '../utilities/api'

/*
* Get student and link details
*
* @param [string] link. Student link
*/
export function getStudentByLink (link) {
  return get(`/api/v1/student-link/${link}`, '', 'Error finding student. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Set student primary school
*
* @param [string] userId. User ID
* @param [string] studentId. Student ID
* @param [string] schoolId. School ID
*/
export function setStudentPrimarySchool (userId, studentId, schoolId) {
  let form = {'student': {'id': studentId, 'primary_school_id': schoolId}}
  return put(`/api/v1/users/${userId}`, form, 'Error setting school. Try again.')
    .then(response => {
      return response
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get student and link details
*
* @param [string] organizationName. Org name
* @param [string] organizationId. Org ID
* @param [string] studentId. Student ID
*/
export function getStudentSignupOrganization (studentId) {
  return get(`/api/v1/students/${studentId}/signup-organization`, null, null)
    .then(response => {
      return response
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function getUsersReferredByStudent (studentId) {
  return get(`/api/v1/students/${studentId}/referred-students`, null, null)
  .then(response => {
    return response
  })
  .catch(error => {
    return Promise.reject(error)
  })
}

/*
* Set student primary period
*
* @param [string] userId. Student ID
* @param [string] schoolId. School ID
* @param [string] periodId. Period ID
*/
export function setStudentPrimaryPeriod (userId, studentId, periodId) {
  let form = {'student': {'id': studentId, 'primary_period_id': periodId}}
  return put(`/api/v1/users/${userId}`, form, 'Error setting period. Try again.')
    .then(response => {
      return response
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get student and link details
*
* @param [string] userId. Student ID
* @param [string] schoolId. School ID
* @param [string] majorId. Major ID
*/
export function setStudentMajor (userId, studentId, majorId) {
  let form = {'student': {'id': studentId, 'fields_of_study': [majorId]}}
  return put(`/api/v1/users/${userId}`, form, 'Error setting major. Try again.')
    .then(response => {
      return response
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get student and link details
*
* @param [string] userId. Student ID
* @param [string] schoolId. School ID
* @param [string] majorId. Major ID
*/
export function setStudentMajors (userId, studentId, majorIdsArray) {
  let form = {'student': {'id': studentId, 'fields_of_study': majorIdsArray}}
  return put(`/api/v1/users/${userId}`, form, 'Error setting major. Try again.')
    .then(response => {
      return response
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Update student data
*
* @param [string] userId. Student ID
* @param [string] studentId. Student ID
* @param [object] form. Student info form
*/
export function updateStudent (userId, studentId, form) {
  let studentForm = form
  studentForm.id = studentId
  let userForm = {'student': studentForm}
  return put(`/api/v1/users/${userId}`, userForm, 'Error setting major. Try again.')
    .then(response => {
      return response
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function storeVenmoHandle(studentId, venmoHandle) {
  let form ={'venmo_handle': venmoHandle}
  return post(
    `/api/v1/students/${studentId}/store-venmo-handle`,
    form,
    'Error storing venmo handle.'
  )
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}