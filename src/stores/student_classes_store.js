import { extendObservable } from 'mobx'
import actions from '../actions'
import stores from './index'

class StudentClassesStore {
  constructor () {
    extendObservable(this, {
      loading: true,
      classes: []
    })
  }

  getClasses () {
    this.loading = true
    actions.classes.getStudentClassesById(stores.userStore.user.student.id)
      .then((data) => {
        this.classes = data
        this.loading = false
      })
  }

  updateClasses () {
    this.loading = true
    actions.classes.getStudentClassesById(stores.userStore.user.student.id)
      .then((data) => {
        this.classes = data
        this.loading = false
      })
  }
}

const studentClassesStore = new StudentClassesStore()

export default studentClassesStore
export { StudentClassesStore }
