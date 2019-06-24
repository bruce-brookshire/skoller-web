import { extendObservable } from 'mobx'

class StudentAssignmentsStore {
  constructor () {
    extendObservable(this, {
      loading: null,
      assignments: {}
    })
  }

  setAssignments (assignments) {
    this.assignments = assignments
  }

  getAssignments () {
    return this.assignments
  }
}

const studentAssignmentsStore = new StudentAssignmentsStore()

export default studentAssignmentsStore
export { StudentAssignmentsStore }
