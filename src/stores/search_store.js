import { extendObservable } from 'mobx'

class SearchStore {
  constructor () {
    extendObservable(this, {
      schoolId: null,
      schoolName: '',
      searchField: false,
      searchValue: null
    })
  }
}

const searchStore = new SearchStore()

export default searchStore
export { SearchStore }
