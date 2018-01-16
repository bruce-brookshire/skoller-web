import { extendObservable } from 'mobx'

class NavBarStore {
  constructor () {
    extendObservable(this, {
      cl: null
    })
  }
}

const navbarStore = new NavBarStore()

export default navbarStore
export { NavBarStore }
