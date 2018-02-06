import { extendObservable } from 'mobx'

class NavBarStore {
  constructor () {
    extendObservable(this, {
      cl: null,
      isDIY: false,
      approveClass: null,
      toggleEditCl: null,
      toggleWrench: null,
      toggleIssues: null,
      toggleRequestResolved: null,
    })
  }
}

const navbarStore = new NavBarStore()

export default navbarStore
export { NavBarStore }
