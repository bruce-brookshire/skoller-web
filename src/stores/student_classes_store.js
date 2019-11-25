import { extendObservable, action } from 'mobx'
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
        this.getClassesSuccess()
      })
      .catch(() => {
        this.getClassesError()
      })
  }

  @action
  getClassesSuccess () {
    this.loading = false
  }

  @action
  getClassesError () {
    this.loading = false
  }

  updateClasses () {
    this.loading = true
    actions.classes.getStudentClassesById(stores.userStore.user.student.id)
      .then((data) => {
        this.classes = data
        this.getClassesSuccess()
      })
  }
}

const studentClassesStore = new StudentClassesStore()

export default studentClassesStore
export { StudentClassesStore }
