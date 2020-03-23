import { extendObservable, action } from 'mobx'
import actions from '../actions'
import stores from './index'

class StudentClassesStore {
  constructor () {
    extendObservable(this, {
      loading: false,
      loadingUpdate: false,
      classes: []
    })
  }

  sort (classArray) {
    return classArray.sort((a, b) => {
      var textA = a.name.toUpperCase()
      var textB = b.name.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })
  }

  getClasses () {
    this.loading = true
    actions.classes.getStudentClassesById(stores.userStore.user.student.id)
      .then((data) => {
        this.classes = this.sort(data)
        this.getClassesSuccess()
      })
      .catch(() => {
        this.getClassesError()
      })
  }

  @action
  getClassesSuccess () {
    this.loading = false
    this.loadingUpdate = false
  }

  @action
  getClassesError () {
    this.loading = false
  }

  updateClasses () {
    console.log('updateClasses')
    this.loadingUpdate = true
    actions.classes.getStudentClassesById(stores.userStore.user.student.id)
      .then((data) => {
        this.classes = this.sort(data)
        this.getClassesSuccess()
      })
  }
}

const studentClassesStore = new StudentClassesStore()

export default studentClassesStore
export { StudentClassesStore }
