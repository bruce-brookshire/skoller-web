import {post, del, get, put} from '../utilities/api'
import {showSnackbar} from '../utilities/snackbar'

/*
* Create a post for the given class
*/
export function createClassPost (cl, form) {
  return post(`/api/v1/classes/${cl.id}/posts`, form, 'Error creating class post. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

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
* Get a post for the given class
*/
export function getClassPost (cl, post) {
  return get(`/api/v1/classes/${cl.id}/posts/${post.id}`, '', 'Error fetching class post. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
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
* 'Like' post for the given class
*/
export function likePost (cl, post) {
  return post(`/api/v1/classes/${cl.id}/posts/${post.id}/like`, null, 'Error liking class post. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* 'Unlike' post
*/
export function unlikePost (cl, post, like) {
  return del(`/api/v1/classes/${cl.id}/posts/${post.id}/like/${like.id}`, '')
    .then(data => {
      showSnackbar('Class post unliked.', 'info')
      return data
    })
    .catch(error => {
      showSnackbar('Error unliking class post. Try again.')
      return Promise.reject(error)
    })
}

/*
* Update the post for the given class
*/
export function updateClassPost (cl, post, form) {
  return put(`/api/v1/classes/${cl.id}/posts/${post.id}`, form, 'Error updating class post. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create a comment for the given class
*/
export function createClassComment (cl, post, form) {
  return post(`/api/v1/classes/${cl.id}/posts/${post.id}/comments`, form, 'Error creating class comment. Try again.')
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
* 'Like' comment for the given class
*/
export function likeComment (cl, comment) {
  return post(`/api/v1/classes/${cl.id}/comments/${comment.id}/like`, null, 'Error liking class comment. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* 'Unlike' post
*/
export function unlikeComment (cl, comment, like) {
  return del(`/api/v1/classes/${cl.id}/comments/${comment.id}/like/${like.id}`, '')
    .then(data => {
      showSnackbar('Class comment unliked.', 'info')
      return data
    })
    .catch(error => {
      showSnackbar('Error unliking class comment. Try again.')
      return Promise.reject(error)
    })
}

/*
* Update the post for the given class
*/
export function updateClassComment (cl, comment, form) {
  return put(`/api/v1/classes/${cl.id}/comments/${comment.id}`, form, 'Error updating class comment. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create a reply for the given comment
*/
export function createClassReply (cl, comment, form) {
  return post(`/api/v1/classes/${cl.id}/comments/${comment.id}/replies`, form, 'Error creating reply. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
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

/*
* 'Like' reply for the given class
*/
export function likeReply (cl, reply) {
  return post(`/api/v1/classes/${cl.id}/replies/${reply.id}/like`, null, 'Error liking class reply. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* 'Unlike' post
*/
export function unlikeReply (cl, reply, like) {
  return del(`/api/v1/classes/${cl.id}/replies/${reply.id}/like/${like.id}`, '')
    .then(data => {
      showSnackbar('Class reply unliked.', 'info')
      return data
    })
    .catch(error => {
      showSnackbar('Error unliking class reply. Try again.')
      return Promise.reject(error)
    })
}

/*
* Update the post for the given class
*/
export function updateClassReply (cl, reply, form) {
  return put(`/api/v1/classes/${cl.id}/replies/${reply.id}`, form, 'Error updating class reply. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
