import {get, post, put} from '../utilities/api'

/*
* Get a user's job profile by user id
*
*/
export function getJobsProfile (userId) {
  return get(`/api/v1/users/${userId}/job-profile`, '', '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function getDegreeTypes () {
  return get(`/api/v1/skoller-jobs/types/degrees`, '', 'Error fetching degree types.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function getEthnicityTypes () {
  return get(`/api/v1/skoller-jobs/types/ethnicities`, '', 'Error fetching ethnicity options.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function getStatusTypes () {
  return get(`/api/v1/skoller-jobs/types/statuses`, '', 'Error fetching status types.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function getActivityTypes () {
  return get(`/api/v1/skoller-jobs/types/activities`, '', 'Error fetching activity types.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function editJobsProfile (form) {
  return post(`/api/v1/skoller-jobs/profiles/${form.id}`, '', 'Error saving SkollerJobs data. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function createJobsProfile (form) {
  return post(`/api/v1/skoller-jobs/profiles/`, form, 'Error creating SkollerJobs profile. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Upload SkollerJobs docs
*
* @param [Number] jobsId. SkollerJobs user profile id.
* @param [Object] file. The file to upload.
* @param [Boolean] isResume. Boolean indicating if the document is the resume.
*/
export function uploadJobsDoc (jobsId, file, isResume = true) {
  let form = new FormData()
  let type = isResume ? 'resume' : 'transcript'
  form.append('file', file)

  return put(`/api/v1/skoller-jobs/profiles/${jobsId}/documents/${type}`, form, 'Error uploading document. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
