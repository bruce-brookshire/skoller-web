import {get, put} from '../utilities/api'

/*
* Get auto update metrics and settings
*/
export function getAutoUpdateInfo () {
  return get(`/api/v1/auto-updates`, '', 'Error fetching auto update settings. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get auto update metrics and settings
*/
export function getMinVersionInfo () {
  return get(`/api/v1/min-version`, '', 'Error fetching versions. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get auto update metrics and settings
*/
export function forecastAutoUpdateInfo (queryString) {
  return get(`/api/v1/auto-updates/forecast`, queryString, 'Error forecasting. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Update auto update metrics and settings
*/
export function updateAutoUpdateInfo (form) {
  return put(`/api/v1/auto-updates/`, {settings: form}, 'Error updating metrics. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Update min ver settings
*/
export function updateMinVer (form) {
  return put(`/api/v1/min-version/`, {settings: form}, 'Error updating versions. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function getAdminSettings () {
  return get(`/api/v1/admin-settings/syllabus_overload_override`, '', 'Error getting admin settings. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function setSyllabusOverloadSettings (bool) {
  return put(`/api/v1/admin-settings/syllabus_overload_override`, {value: bool}, 'Error setting admin settings. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
