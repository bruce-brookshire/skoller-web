import { extendObservable, action } from 'mobx'

class StudentNavStore {
  constructor () {
    extendObservable(this, {
      activePage: null,
      location: {}
    })
  }

  // use setActivePage when a new UI page is loading (componentWillMount) so the nav panel knows what item to highlight
  @action setActivePage (page) {
    this.activePage = page
  }
}

const studentNavStore = new StudentNavStore()

export default studentNavStore
export { StudentNavStore }
