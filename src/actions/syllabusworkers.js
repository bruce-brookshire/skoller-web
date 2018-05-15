import {post} from '../utilities/api'
import {showSnackbar} from '../utilities/snackbar'

/*
* Get the next class with an open section for syllabus worker.
*
* @param [String] section name. Name of section SW is working.
*/
export function getNextClass () {
  return post(`/api/v1/syllabus-workers/`, null, '')
    .then(data => {
      return data
    })
    .catch(error => {
      if (error === 204) {
        showSnackbar('No sections available at this time', 'info')
      } else {
        showSnackbar('Error retrieving class. Try again.')
      }
      return Promise.reject(error)
    })
}
