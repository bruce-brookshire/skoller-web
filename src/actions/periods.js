import {get, post} from '../utilities/api'

/*
* Get school periods.
*
* @params [Object] school. School to grab the periods.
*/
export function getSchoolPeriods (schoolId, name) {
  return get(`/api/v1/schools/${schoolId}/periods`, `name=${name}`, 'Error fetching periods. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create a new period
*
* @params [Object] school. School.
* @params [Object] form. Period form.
*/
export function createPeriod (schoolId, form) {
  return post(`/api/v1/schools/${schoolId}/periods`, form, 'Error creating period. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
