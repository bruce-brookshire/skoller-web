import { extendObservable } from 'mobx'

class SnackbarStore {
  constructor () {
    extendObservable(this, {
      show: null,
      type: null,
      message: null
    })
  }
}

const snackbarStore = new SnackbarStore()

export default snackbarStore
export { SnackbarStore }
