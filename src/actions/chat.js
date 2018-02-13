import 'isomorphic-fetch'
import {checkError, parseResponse} from '../utilities/api'
import {showSnackbar} from './snackbar'
import stores from '../stores'
const {userStore} = stores
var Environment = require('../../environment.js')


//////////////////////////
///////// POSTS //////////
//////////////////////////

// Posts are the top level of chat

/*
* Create a post for the given class
*/
export function createClassPost (cl,form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/posts`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error creating class post. Try again.')
      return Promise.reject(error)
    })
}

/*
* Delete a post from the given class
*/
export function deleteClassPost (cl,post) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/posts/${post.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkError(response))
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
export function getClassPost (cl,post) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/posts/${post.id}`, {
    method: 'GET',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error fetching class post. Try again.')
      return Promise.reject(error)
    })
}

/*
* Get posts for the given class
*/
export function getClassPosts (cl) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/posts`, {
    method: 'GET',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error fetching class posts. Try again.')
      return Promise.reject(error)
    })
}

/*
* 'Like' post for the given class
*/
export function likePost (cl,post) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/posts/${post.id}/like`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error liking class post. Try again.')
      return Promise.reject(error)
    })
}

/*
* 'Unlike' post
*/
export function unlikePost (cl,post,like) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/posts/${post.id}/like/${like.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkError(response))
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
export function updateClassPost (cl,post,form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error updating class post. Try again.')
      return Promise.reject(error)
    })
}

////////////////////////////
///////// COMMENTS /////////
////////////////////////////

// Comments are attached to posts

/*
* Create a comment for the given class
*/
export function createClassComment (cl,post,form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/posts/${post.id}/comments`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error creating class comment. Try again.')
      return Promise.reject(error)
    })
}

/*
* Delete a comment from the given class
*/
export function deleteClassComment (cl,comment) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/comments/${comment.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkError(response))
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
export function likeComment (cl,comment) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/comments/${comment.id}/like`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error liking class comment. Try again.')
      return Promise.reject(error)
    })
}

/*
* 'Unlike' post
*/
export function unlikeComment (cl,comment,like) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/comments/${comment.id}/like/${like.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkError(response))
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
export function updateClassComment (cl,comment,form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error updating class comment. Try again.')
      return Promise.reject(error)
    })
}

////////////////////////////
///////// REPLIES //////////
////////////////////////////

// Replies are attached to comments and are the deepest chat level possible
// Replies cannot be attached to other replies

/*
* Create a reply for the given comment
*/
export function createClassReply (cl,comment,form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/comments/${comment.id}/replies`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error creating reply. Try again.')
      return Promise.reject(error)
    })
}

/*
* Delete a reply from the given comment
*/
export function deleteClassReply (cl,reply) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/replies/${reply.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkError(response))
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
export function likeReply (cl,reply) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/replies/${reply.id}/like`, {
    method: 'POST',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error liking class reply. Try again.')
      return Promise.reject(error)
    })
}

/*
* 'Unlike' post
*/
export function unlikeReply (cl,reply,like) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/replies/${reply.id}/like/${like.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkError(response))
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
export function updateClassReply (cl,comment,form) {
  return fetch(`${Environment.SERVER_NAME}/api/v1/classes/${cl.id}/replies/${reply.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': userStore.authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(response => parseResponse(response))
    .then(data => {
      return data
    })
    .catch(error => {
      showSnackbar('Error updating class reply. Try again.')
      return Promise.reject(error)
    })
}
