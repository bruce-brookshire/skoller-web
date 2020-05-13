import { extendObservable, action } from 'mobx'
import actions from '../actions'
import stores from './index'
import { getIntensityScore } from '../views/Insights/utils'

class InsightsStore {
  constructor () {
    extendObservable(this, {
      loading: false,
      loadingUpdate: false,
      students: [],
      groups: [],
      watchlist: [],
      groupOwners: [],
      org: {
        groupsAlias: 'team'
      },
      interfaceSettings: {
        dashboard: {
          sort: 'Assignments',
          timeframe: 'Next 7 days'
        }
      }
    })
  }

  async getOrgOwners () {
    await actions.insights.getAllOrgOwnersInOrg(stores.userStore.user.org_owners[0].organization_id)
      .then(r => {
        this.orgOwners = r
        this.org.orgOwners = r
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
      .then(async r => {
        let students = r.map(s => { return {...s, orgStudentId: s.id} })
        await this.getStudentData(students)
      })
  }

  async getGroupOwners () {
    await actions.insights.getAllOrgGroupOwnersInOrg(stores.userStore.user.org_owners[0].organization_id)
      .then(r => {
        let groupOwners = r
        let filteredGroupOwners = []
        groupOwners.forEach(go => {
          if (!filteredGroupOwners.find(o => o.user_id === go.user_id)) {
            filteredGroupOwners.push(go)
          }
        })

        this.groupOwners = filteredGroupOwners
        this.org.groupOwners = filteredGroupOwners
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
        let students = r.map(s => { return {...s, orgStudentId: s.id} })
        this.watchlist = students
        this.org.watchlist = students
      })
  }

  async getStudentData (students) {
    for (const s of students) {
      await actions.classes.getStudentClassesById(s.student_id)
        .then(r => {
          let assignments = [].concat.apply([], r.map(cl => cl.assignments))
          s.classes = r
          s.assignments = assignments
          s.intensity = {
            sevenDay: getIntensityScore(assignments, 7),
            thirtyDay: getIntensityScore(assignments, 30)
          }
        })
    }
    this.students = students
  }

  async getAllData (filters) {
    if (!filters || filters.includes('orgOwners')) {
      await this.getOrgOwners()
    }

    if (!filters || filters.includes('students')) {
      await this.getStudents()
    }

    if (!filters || filters.includes('groups')) {
      await this.getOrgGroups()
    }

    if (!filters || filters.includes('org')) {
      await this.getOrg()
    }

    if (!filters || filters.includes('groupOwners')) {
      await this.getGroupOwners()
    }

    if (!filters || filters.includes('orgOwnerWatchlist')) {
      await this.getOrgOwnerWatchlist()
    }
  }

  async getData (filters) {
    this.loading = true
    await this.getAllData(filters)
    this.getDataSuccess()
  }

  async updateData (filters) {
    this.loadingUpdate = true
    await this.getAllData(filters)
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
