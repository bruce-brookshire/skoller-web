import { extendObservable } from 'mobx'
import snackbarStore from './snackbar_store'
import userStore from './user_store'
import navbarStore from './navbar_store'
import searchStore from './search_store'
import studentAssignmentsStore from './student_assignments_store'
import studentClassesStore from './student_classes_store'
import studentJobsStore from './student_jobs_store'
import navStore from './nav_store'
import insightsStore from './insights_store'

class ApplicationStore {
  constructor () {
    extendObservable(this, {
      snackbarStore,
      userStore,
      navbarStore,
      searchStore,
      studentAssignmentsStore,
      studentClassesStore,
      studentJobsStore,
      navStore,
      insightsStore
    })
  }
}

const stores = new ApplicationStore()

export default stores
export { ApplicationStore }
