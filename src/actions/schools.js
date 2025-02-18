import {csv, get, post, put, postFile, del} from '../utilities/api'
import {showSnackbar} from '../utilities/snackbar'
import stores from '../stores'
const {userStore} = stores

/*
* Get the all schools for signup
*
*/
export function getAllSchools () {
  return get(`/api/v1/schools`, '', 'Error fetching schools. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get states
*
*/
export function getStates () {
  return get(`/api/v1/locations`, '', 'Error fetching states. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get minified counts
*/
export function getHubSchoolsMinified () {
  return get(`/api/v1/school/list`, '', 'Error fetching schools. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Search schools by name
*/
export function searchSchools (param) {
  return get(`/api/v1/school/list`, `name=${param}`, 'Error fetching schools. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Grab all the schools in the system for admin.
*
* @params [Object] form. Login form data.
*/
export function getHubSchools (queryString) {
  return get(`/api/v1/schools/hub`, queryString, 'Error fetching schools. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get school by id
*
* @params [Object] school. School.
*/
export function getSchoolById (schoolId) {
  return get(`/api/v1/schools/${schoolId}`, '', 'Error fetching school. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create a new school
*
* @params [Object] form. School form.
*/
export function createSchool (form) {
  return post(`/api/v1/schools`, form, 'Error creating school. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Update school
*
* @params [Object] form. School form.
*/
export function updateSchool (form) {
  return put(`/api/v1/schools/${form.id}`, form, 'Error updating school. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Upload a csv import for a school.
*
* @param [Object] file. The file to upload.
*/
export function uploadSchoolCsv (file) {
  let form = new FormData()
  form.append('file', file)

  return postFile(`/api/v1/schools/csv`, form, '')
    .then(data => {
      return data
    })
    .catch(error => {
      if (error.status === 422) showSnackbar('File name has already been taken.')
      else showSnackbar('Error uploading file. Try again.')
      return Promise.reject(error)
    })
}

/*
* Gets a CSV of schools.
*
*/
export function getSchoolsCsv () {
  return csv(`/api/v1/analytics/csv/schools`, 'Error retrieving csv. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get the most common school a student is enrolled in.
*
* @params [Object] school. School.
*/
export function getMostCommonSchool () {
  const {user: {student}} = userStore
  return get(`/api/v1/students/${student.id}/school`, '', 'Error fetching school. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get the all the schools for given email domain
*
*/
export function getSchoolsByEmailDomain (domain) {
  return get(`/api/v1/email_domains/${domain}/check`, '', 'Error fetching schools. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get the all schools for signup
*
*/
export function getEmailDomains (schoolId) {
  return get(`/api/v1/schools/${schoolId}/email_domains`, '', 'Error fetching email domains. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create a new school
*
* @params [Object] form. School form.
*/
export function createEmailDomains (schoolId, form) {
  return post(`/api/v1/schools/${schoolId}/email_domains`, form, 'Error creating email domain. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create a new school
*
* @params [Object] form. School form.
*/
export function deleteEmailDomains (id) {
  return del(`/api/v1/email_domains/${id}`, 'Error deleting email domain. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
