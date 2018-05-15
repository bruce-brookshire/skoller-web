import {del, get} from '../utilities/api'
import {showSnackbar} from '../utilities/snackbar'

/*
* Delete a post from the given class
*/
export function deleteClassPost (cl, post) {
  return del(`/api/v1/classes/${cl.id}/posts/${post.id}`, '')
    .then(data => {
      showSnackbar('Class post deleted.', 'info')
      return data
    })
    .catch(error => {
      showSnackbar('Error deleting class post. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get posts for the given class
*/
export function getClassPosts (cl) {
  return get(`/api/v1/classes/${cl.id}/posts`, '', 'Error fetching class posts. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Delete a comment from the given class
*/
export function deleteClassComment (cl, comment) {
  return del(`/api/v1/classes/${cl.id}/comments/${comment.id}`, '')
    .then(data => {
      showSnackbar('Class comment deleted.', 'info')
      return data
    })
    .catch(error => {
      showSnackbar('Error deleting class comment. Try again.')
      return Promise.reject(error)
    })
}

/*
* Delete a reply from the given comment
*/
export function deleteClassReply (cl, reply) {
  return del(`/api/v1/classes/${cl.id}/replies/${reply.id}`, '')
    .then(data => {
      showSnackbar('Class reply deleted.', 'info')
      return data
    })
    .catch(error => {
      showSnackbar('Error deleting reply. Try again.')
      return Promise.reject(error)
    })
}

