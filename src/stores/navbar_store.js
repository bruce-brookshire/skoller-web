import { extendObservable } from 'mobx'

class NavBarStore {
  constructor () {
    extendObservable(this, {
      cl: null,
      isDIY: false,
      toggleEditCl: null,
      toggleWrench: null,
      toggleIssues: null
    })
  }
}

const navbarStore = new NavBarStore()

export default navbarStore
export { NavBarStore }
