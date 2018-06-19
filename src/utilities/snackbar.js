import stores from '../stores'
const {snackbarStore} = stores

/*
* Toggle the state of snackbar.
*
* @param [String] messgae. Message to show in the snackbar.
* @param [String] type. Type of info [info | warning | error]
*/
export function showSnackbar (message, type = 'error', time = 3000) {
  snackbarStore.message = message
  snackbarStore.type = type
  snackbarStore.show = true

  // hide snackbar and set message to null after a ceratin amount of time.
  setTimeout(() => {
    snackbarStore.show = false
    snackbarStore.type = null
    snackbarStore.message = null
  }, time)
}
