import { extendObservable, computed } from 'mobx'

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
}

const studentAssignmentsStore = new StudentAssignmentsStore()

export default studentAssignmentsStore
export { StudentAssignmentsStore }
