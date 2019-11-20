import { extendObservable, action } from 'mobx'

class StudentNavStore {
  constructor () {
    extendObservable(this, {
      activePage: null,
      jobsMode: false,
      location: {}
    })
  }

  // use setActivePage when a new UI page is loading (componentWillMount) so the nav panel knows what item to highlight
  @action setActivePage (page) {
    this.activePage = page
  }

  @action toggleJobsMode (bool) {
    if (bool !== null) {
      console.log('toggle jobs mode ', bool)
      this.jobsMode = bool
    } else {
      console.log('toggle jobs mode ', !this.jobsMode)
      this.jobsMode = !this.jobsMode
    }
  }
}

const studentNavStore = new StudentNavStore()

export default studentNavStore
export { StudentNavStore }
