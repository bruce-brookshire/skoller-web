import { extendObservable } from 'mobx'
import userStore from './user_store'

class ApplicationStore {
  constructor () {
    extendObservable(this, {
      userStore
    })
  }
}

const stores = new ApplicationStore()

export default stores
export { ApplicationStore }
