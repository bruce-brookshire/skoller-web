import { extendObservable, action } from 'mobx'
import actions from '../actions'
import stores from './index'
import { calculateTotalProfileScore } from '../views/Student/Jobs/utils';

class StudentJobsStore {
  constructor () {
    extendObservable(this, {
      hasJobsProfile: null,
      profile: {},
      loading: false,
      score: null,
      backgroundLoading: false
    })
  }

  getScore () {
    this.setScore(calculateTotalProfileScore(this.profile, stores.userStore.user))
  }

  @action
  setScore (score) {
    this.score = score
  }

  getJobsProfile () {
    this.startLoading()
    actions.jobs.getJobsProfile(stores.userStore.user.id)
      .then((r) => {
        this.profile = r
        this.hasJobsProfile = true
        this.getScore()
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
        this.hasJobsProfile = true
        this.getScore()
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
