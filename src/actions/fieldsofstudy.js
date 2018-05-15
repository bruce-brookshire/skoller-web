import {get, postFile} from '../utilities/api'
import {showSnackbar} from './snackbar'

/*
* Get fields of study.
*
* @param [query] string. Query the fields of study.
*/
export function getFieldsOfStudy (query) {
  return get(`/api/v1/fields-of-study/list`, `field_name=${query}`, 'Error fetching schools. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Upload a csv import for fields of study for a school.
*
* @param [Number] schoolId. The school to upload the csv for.
* @param [Object] file. The file to upload.
*/
export function uploadFOSCsv (file) {
  let form = new FormData()
  form.append('file', file)

  return postFile(`/api/v1/fields-of-study/csv`, form, '')
    .then(data => {
      return data
    })
    .catch(error => {
      if (error === 422) showSnackbar('File name has already been taken.')
      else showSnackbar('Error uploading file. Try again.')
      return Promise.reject(error)
    })
}
