import { extendObservable } from 'mobx'
import snackbarStore from './snackbar_store'
import userStore from './user_store'
import navbarStore from './navbar_store'
import searchStore from './search_store'
import studentClassesStore from './student_classes_store'
import studentNavStore from './student_nav_store'

class ApplicationStore {
  constructor () {
    extendObservable(this, {
      snackbarStore,
      userStore,
      navbarStore,
      searchStore,
      studentClassesStore,
      studentNavStore
    })
  }
}

const stores = new ApplicationStore()

export default stores
export { ApplicationStore }
