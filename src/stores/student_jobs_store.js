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
      firstOpen: false,
      listings: [],
      loadingListings: false
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

  async getJobsListings () {
    if (this.listings.length === 0) {
      this.startLoadingListings()
    }
    await actions.jobs.getJobsListings()
      .then((r) => {
        this.listings = r
        this.stopLoadingListings()
      })
      .catch((r) => {
        this.stopLoadingListings()
      })
  }

  async loadMoreJobs () {
    await actions.jobs.getJobsListings(this.listings.length)
      .then((r) => {
        r.forEach(j => {
          this.listings.push(j)
        })
      })
      .catch((r) => {
        console.log(r)
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
  stopLoadingListings () {
    this.loadingListings = false
  }

  @action
  startLoadingListings () {
    this.loadingListings = true
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
