import { extendObservable } from 'mobx'

class NavBarStore {
  constructor () {
    extendObservable(this, {
      cl: null,
      isDIY: false,
      toggleHelpResolved: null,
      toggleRequestResolved: null,
      title: null
    })
  }
}

const navbarStore = new NavBarStore()

export default navbarStore
export { NavBarStore }
