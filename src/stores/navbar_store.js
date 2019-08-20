import { extendObservable } from 'mobx'

class NavBarStore {
  constructor () {
    extendObservable(this, {
      cl: null,
      isDIY: false,
      toggleRequestResolved: null,
      title: null,
      weightId: null
    })
  }
}

const navbarStore = new NavBarStore()

export default navbarStore
export { NavBarStore }
