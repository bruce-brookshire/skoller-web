import { extendObservable, action } from 'mobx'
import actions from '../actions'
import stores from './index'

class StudentJobsStore {
  constructor () {
    extendObservable(this, {
      hasJobsProfile: null,
      profile: {},
      loading: false,
      score: null,
      backgroundLoading: false,
      firstOpen: false
    })
  }

  @action
  setScore (score) {
    this.score = score
  }

  async getJobsProfile () {
    this.startLoading()
    await actions.jobs.getJobsProfile(stores.userStore.user.id)
      .then((r) => {
        this.profile = r
        this.score = r.profile_score
        this.hasJobsProfile = true
        this.stopLoading()
      })
      .catch((r) => {
        this.hasJobsProfile = false
        this.stopLoading()
      })
  }

  refreshJobsProfile () {
    this.startBackgroundLoading()
    actions.jobs.getJobsProfile(stores.userStore.user.id)
      .then((r) => {
        this.profile = r
        this.score = r.profile_score
        this.hasJobsProfile = true
        this.stopBackgroundLoading()
      })
      .catch(() => {
        this.stopBackgroundLoading()
        this.hasJobsProfile = false
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

  @action
  stopBackgroundLoading () {
    this.backgroundLoading = false
  }

  @action
  startBackgroundLoading () {
    this.backgroundLoading = true
  }
}

const studentJobsStore = new StudentJobsStore()

export default studentJobsStore
export { StudentJobsStore }
