import { extendObservable } from 'mobx'

class StudentClassesStore {
  constructor () {
    extendObservable(this, {
      loading: null,
      classes: []
    })
  }

  setClasses (classes) {
    this.classes = classes
  }
}

const studentClassesStore = new StudentClassesStore()

export default studentClassesStore
export { StudentClassesStore }
