import {post, get, put} from '../utilities/api'
import {showSnackbar} from '../utilities/snackbar'
import stores from '../stores'
const {userStore} = stores

/*
* Authenticate login credentials. Set the user.
*
* @params [Object] form. Login form data.
*/
export function authenticateUser (form) {
  userStore.loading = true

  return post(`/api/v1/users/login`, form, '')
    .then(data => {
      userStore.authToken = `Bearer ${data.token}`
      userStore.user = data.user
      userStore.loading = false
    })
    .catch(error => {
      userStore.loading = false
      if (error !== 401 && error !== 404) {
        showSnackbar('Error logging in. Try again.')
      } else {
        showSnackbar('Incorrect username or password.')
      }
      return Promise.reject(error)
    })
}

/*
*  Full sign up. Set the user.
*
* @params [Object] form. Sign up form data.
*/
export function registerUser (form) {
  userStore.loading = true

  return post(`/api/v1/users`, form, '')
    .then(data => {
      userStore.authToken = `Bearer ${data.token}`
      userStore.user = data.user
      userStore.loading = false
    })
    .catch(error => {
      userStore.loading = false
      if (error.status !== 422) {
        showSnackbar('Error registering user. Try again.')
      } else {
        error.json().then(error => {
          if ((error.errors.student &&
            error.errors.student.phone &&
            error.errors.student.phone.findIndex(item => item === 'Phone exists.') > -1) ||
            (error.errors.email && error.errors.email.findIndex(item => item === 'has already been taken') > -1)) {
            showSnackbar('This account has already been created. Log in on the app. Need assistance? Contact us at support@skoller.co.', 'error', 5000)
          } else {
            showSnackbar('Error registering user. Try again.')
          }
        })
      }
      return Promise.reject(error)
    })
}

/*
*  Register the user.
*
* @params [Object] form. Sign up form data.
*/
export function registerUserAdmin (form) {
  return post(`/api/v1/users`, form, '')
    .then(data => data)
    .catch(error => {
      if (error.status !== 422) {
        showSnackbar('Error registering user. Try again.')
      } else {
        error.json().then(error => {
          if (error.errors.student &&
            error.errors.student.phone &&
            error.errors.student.phone.findIndex(item => item === 'Phone exists.') > -1) {
            showSnackbar('Phone already exists.')
          } else if (error.errors.email && error.errors.email.findIndex(item => item === 'has already been taken') > -1) {
            showSnackbar('Email already exists.')
          } else {
            showSnackbar('Error registering user. Try again.')
          }
        })
      }
      return Promise.reject(error)
    })
}

/*
* Fetch user to set state.
*/
export function getUserByToken () {
  return post(`/api/v1/users/token-login`, null, '')
    .then(data => {
      userStore.user = data.user
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Resend the verification code.
*/
export function resendVerification () {
  const {user: {student}} = userStore
  return post(`/api/v1/students/${student.id}/resend/`, null, '')
    .then(() => { showSnackbar('Verification code resent.', 'info') })
    .catch(error => {
      showSnackbar('Could not send verification code. Try again later.')
      return Promise.reject(error)
    })
}

/*
* Verify users phone number
*/
export function verifyPhoneNumber (form) {
  const {user: {student}} = userStore
  return post(`/api/v1/students/${student.id}/verify`, form, 'Invalid verification code.')
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Forgot password. Send email to user.
*
* @param [Object] form. Forgot password form.
*/
export function forgotPassword (form) {
  return post(`/api/v1/forgot`, form, '')
    .then(() => {
      showSnackbar('An email has been sent to your email address with further instructions.', 'info')
    })
    .catch(error => {
      showSnackbar('There was an error. Check your email and try again.')
      return Promise.reject(error)
    })
}

/*
* Reset password
*
* @params [Object] form. Reset password form data.
*/
export function resetPassword (form, token) {
  return post(`/api/v1/reset`, form, '')
    .then(() => {
      showSnackbar('Your password has been successfully reset.', 'info')
    })
    .catch(error => {
      if (error === 401) {
        showSnackbar('Your token has expired.')
      } else {
        showSnackbar('There was an error. Try again.')
      }
      return Promise.reject(error)
    })
}

/*
* Get user roles.
*/
export function getUsers (queryString = false) {
  return get(`/api/v1/users`, queryString, 'Error fetching users. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get user roles.
*
* @param [Object] user. User to fetch
*/
export function getUserById (user) {
  return get(`/api/v1/users/${user.id}`, '', 'Error fetching user. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get user roles.
*/
export function getRoles () {
  return get(`/api/v1/roles`, '', 'Error fetching roles. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
*  Update a user account (admin)
*
* @params [Object] form. User form data.
*/
export function updateAccount (form) {
  return put(`/api/v1/users/${form.id}/update`, form, 'Error updating user. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
