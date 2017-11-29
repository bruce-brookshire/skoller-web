import { extendObservable } from 'mobx'
import snackbarStore from './snackbar_store'
import userStore from './user_store'

class ApplicationStore {
  constructor () {
    extendObservable(this, {
      snackbarStore,
      userStore
    })
  }
}

const stores = new ApplicationStore()

export default stores
export { ApplicationStore }
