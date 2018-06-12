import {get, postFile, del} from '../utilities/api'
import {showSnackbar} from '../utilities/snackbar'

/*
* Get classes for students
*
* @param [Number] classId. The class to get the class documents for.
*/
export function getClassDocuments (classId) {
  return get(`/api/v1/classes/${classId}/docs`, 'Error fetching documents. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Upload a new file for a class
*
* @param [Object] cl. The class to upload the class documents for.
* @param [Object] file. The file to upload.
* @param [Boolean] isSyllabus. Boolean indicating if the document is a syllabus.
*/
export function uploadClassDocument (cl, file, isSyllabus = false) {
  let form = new FormData()
  form.append('is_syllabus', isSyllabus)
  form.append('file', file)

  return postFile(`/api/v1/classes/${cl.id}/docs`, form, 'Error uploading file. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Upload a csv import for classes for a school period.
*
* @param [Number] periodId. The period to upload the csv for.
* @param [Object] file. The file to upload.
*/
export function uploadClassCsv (periodId, file) {
  let form = new FormData()
  form.append('file', file)

  return postFile(`/api/v1/periods/${periodId}/classes/csv`, form, '')
    .then(data => {
      return data
    })
    .catch(error => {
      if (error === 422) showSnackbar('File name has already been taken.')
      else showSnackbar('Error uploading file. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get classes for students
*
* @param [Number] classId. The class to get the class documents for.
*/
export function deleteClassDocument (classId, docId) {
  return del(`/api/v1/classes/${classId}/docs/${docId}`, 'Error deleting doc. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}
