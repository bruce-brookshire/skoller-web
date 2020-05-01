import { extendObservable, action } from 'mobx'
import actions from '../actions'
import stores from './index'

class InsightsStore {
  constructor () {
    extendObservable(this, {
      loading: false,
      loadingUpdate: false,
      students: [],
      groups: [],
      watchlist: [],
      org: {}
    })
  }

  async getOrgGroups () {
    await actions.insights.getAllGroupsInOrg(stores.userStore.user.org_owners[0].organization_id)
      .then(r => {
        this.groups = r
        this.org.groups = r
      })
  }

  async getStudents () {
    await actions.insights.getAllStudentsInOrg(stores.userStore.user.org_owners[0].organization_id)
      .then(r => {
        let students = r.map(s => { return {...s, orgStudentId: s.id} })
        this.students = students
        this.org.students = students
      })
  }

  async getOrg () {
    await actions.insights.getOrgById(stores.userStore.user.org_owners[0].organization_id)
      .then(r => {
        let org = r
        this.org = {...this.org, ...org}
      })
  }

  async getOrgOwnerWatchlist () {
    await actions.insights.getOrgOwnerWatchlist(stores.userStore.user.org_owners[0].organization_id, stores.userStore.user.org_owners[0].id)
      .then(r => {
        console.log(r)
        let students = r.map(s => { return {...s, orgStudentId: s.id} })
        this.watchlist = students
        this.org.watchlist = students
      })
  }

  async getData (filters) {
    this.loading = true

    if (filters.includes('students')) {
      await this.getStudents()
    }

    if (filters.includes('groups')) {
      await this.getOrgGroups()
    }

    if (filters.includes('org')) {
      await this.getOrg()
    }

    if (filters.includes('orgOwnerWatchlist')) {
      await this.getOrgOwnerWatchlist()
    }

    this.getDataSuccess()
  }

  async updateData (filters) {
    this.loadingUpdate = true

    if (filters.includes('students')) {
      await this.getStudents()
    }

    if (filters.includes('groups')) {
      await this.getOrgGroups()
    }

    if (filters.includes('org')) {
      await this.getOrg()
    }

    if (filters.includes('orgOwnerWatchlist')) {
      await this.getOrgOwnerWatchlist()
    }

    this.getDataSuccess()
  }

  isWatching (student) {
    if (this.watchlist.map(u => u.org_student_id).includes(student.id)) {
      return true
    } else {
      return false
    }
  }

  @action
  getDataSuccess () {
    this.loading = false
    this.loadingUpdate = false
  }

  @action
  getDataError () {
    this.loading = false
    this.loadingUpdate = false
  }
}

const studentClassesStore = new InsightsStore()

export default studentClassesStore
export { InsightsStore }
