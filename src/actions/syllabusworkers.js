import {post} from '../utilities/api'
import {showSnackbar} from '../utilities/snackbar'

/*
* Get the next class with an open section for syllabus worker.
*
* @param [String] section name. Name of section SW is working.
*/
export function getNextClass () {
  return post(`/api/v1/syllabus-workers/`, null, 'Error retrieving class. Try again.')
    .then(data => {
      if (!data) {
        showSnackbar('No sections available at this time', 'info')
      }
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
