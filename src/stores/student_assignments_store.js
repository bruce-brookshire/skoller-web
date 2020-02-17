import { extendObservable, computed, action } from 'mobx'
import actions from '../actions'
import stores from './index'

class StudentAssignmentsStore {
  constructor () {
    extendObservable(this, {
      loading: null,
      assignments: []
    })
  }

  setAssignments (assignments) {
    this.assignments = assignments
  }

  @computed get getFormattedAssignments () {
    let assignmentsObj = {}
    try {
      this.assignments.map((item) => {
        assignmentsObj[item.id] = item
      })
      return assignmentsObj
    } catch (error) {
      return false
    }
  }

  getAssignments () {
    this.loading = true
    actions.assignments.getAllStudentAssignments(stores.userStore.user.student.id)
      .then((data) => {
        this.assignments = data
        this.getAssignmentsSuccess()
      })
      .catch(() => {
        this.getAssignmentsError()
      })
  }

  @action
  getAssignmentsSuccess () {
    this.loading = false
  }

  @action
  getAssignmentsError () {
    this.loading = false
  }

  updateAssignments () {
    this.loading = true
    actions.assignments.getAllStudentAssignments(stores.userStore.user.student.id)
      .then((data) => {
        this.assignments = data
        this.getAssignmentsSuccess()
      })
  }
}

const studentAssignmentsStore = new StudentAssignmentsStore()

export default studentAssignmentsStore
export { StudentAssignmentsStore }
