import { extendObservable, action } from 'mobx'
import data from '../views/Insights/Dashboard/test'

class InsightsStore {
  constructor () {
    extendObservable(this, {
      loading: false,
      loadingUpdate: false,
      students: []
    })
  }

  getStudents (update = false) {
    this.loading = !update
    this.loadingUpdate = update

    this.students = data
    this.getDataSuccess()
    // actions.classes.getStudentClassesById(stores.userStore.user.student.id)
    //   .then((data) => {
    //     this.classes = this.sort(data)
    //     this.getDataSuccess()
    //   })
    //   .catch(() => {
    //     this.getDataError()
    //   })
  }

  updateStudents () {
    this.getStudents(true)
  }

  @action
  getDataSuccess () {
    this.loading = false
    this.loadingUpdate = false
  }

  @action
  getDataError () {
    this.loading = false
  }
}

const studentClassesStore = new InsightsStore()

export default studentClassesStore
export { InsightsStore }
