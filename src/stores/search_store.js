import { extendObservable } from 'mobx'

class SearchStore {
  constructor () {
    extendObservable(this, {
      schoolId: null,
      schoolName: '',
      searchField: false,
      searchValue: null,
      school: null
    })
  }
}

const searchStore = new SearchStore()

export default searchStore
export { SearchStore }
