import { extendObservable, action } from 'mobx'
import actions from '../actions'
import stores from './index'

class StudentJobsStore {
  constructor () {
    extendObservable(this, {
      hasJobsProfile: null,
      profile: {},
      loading: true
    })
  }

  getJobsProfile () {
    this.startLoading()
    this.loading = true
    actions.jobs.getJobsProfile(stores.userStore.user.id)
      .then((r) => {
        this.profile = r
        this.hasJobsProfile = true
        this.stopLoading()
      })
      .catch((r) => {
        this.hasJobsProfile = false
        this.stopLoading()
      })
  }

  @action
  stopLoading () {
    this.loading = false
  }

  @action
  startLoading () {
    this.loading = true
  }
}

const studentJobsStore = new StudentJobsStore()

export default studentJobsStore
export { StudentJobsStore }
