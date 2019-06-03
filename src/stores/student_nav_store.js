import { extendObservable, action } from 'mobx'

class StudentNavStore {
  constructor () {
    extendObservable(this, {
      activePage: null
    })
  }

  @action setActivePage (page) {
    this.activePage = page
  }
}

const studentNavStore = new StudentNavStore()

export default studentNavStore
export { StudentNavStore }
