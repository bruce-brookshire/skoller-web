import { extendObservable, action } from 'mobx'
import actions from '../actions'
import stores from './index'
import { getIntensityScore } from '../views/Insights/utils'
import {Cookies} from 'react-cookie'

class InsightsStore {
  constructor () {
    this.cookie = new Cookies()

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
          sort: 'Grade Impact',
          timeframe: 'Next 7 days'
        }
      },
      darkMode: this.cookie.get('skollerInsightsDarkMode') === 'true'
    })
  }

  async getOrgOwners (orgId) {
    await actions.insights.getAllOrgOwnersInOrg(orgId)
      .then(r => {
        this.orgOwners = r
        this.org.orgOwners = r
      })
  }

  async getOrgGroups (orgId) {
    await actions.insights.getAllGroupsInOrg(orgId)
      .then(r => {
        this.groups = r
        this.org.groups = r
      })
  }

  async getStudents (filters, orgId) {
    await actions.insights.getAllStudentsInOrg(orgId)
      .then(async r => {
        let students = r.map(s => {
          let student
          const existingStudent = this.students.find(es => es.id === s.id)
          if (existingStudent) {
            student = {...existingStudent, ...s, orgStudentId: s.id}
          } else {
            student = {
              ...s,
              orgStudentId: s.id,
              classes: [],
              assignments: [],
              intensity: {
                sevenDay: null,
                thirtyDay: null
              }
            }
          }
          return student
        })

        if (!filters || filters.includes('studentClasses')) {
          await this.getStudentData(students, orgId)
        } else {
          this.students = students
        }
      })
  }

  async getGroupOwners (orgId) {
    await actions.insights.getAllOrgGroupOwnersInOrg(orgId)
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

  async getOrg (orgId) {
    // REMOVE BEFORE PUSHING
    // this.org = {...this.org, name: 'Skoller University Athletics'}
    await actions.insights.getOrgById(orgId)
      .then(r => {
        let org = r
        this.org = {...this.org, ...org}
      })
  }

  async getOrgOwnerWatchlist (orgId) {
    await actions.insights.getOrgOwnerWatchlist(orgId, stores.userStore.user.org_owners[0].id)
      .then(r => {
        let students = r.map(s => { return {...s, orgStudentId: s.id} })
        this.watchlist = students
        this.org.watchlist = students
      })
  }

  async getGroupOwnerWatchlist (orgId) {
    await actions.insights.getOrgOwnerWatchlist(orgId)
      .then(r => {
        let students = r.map(s => { return {...s, orgStudentId: s.id} })
        this.watchlist = students
        this.org.watchlist = students
      })
  }

  async getStudentData (students, orgId) {
    await Promise.all(students.map(s =>
      actions.insights.getStudentClasses(orgId, s.id)
        .then(r => {
          let assignments = [].concat.apply([], r.map(cl => cl.assignments))
          s.classes = r
          s.assignments = assignments
          s.intensity = {
            sevenDay: getIntensityScore(assignments, 7),
            thirtyDay: getIntensityScore(assignments, 30)
          }
        })
    ))
    this.students = students
  }

  async getAllData (filters) {
    const user = stores.userStore.user
    const orgId = user.org_owners.length > 0 ? user.org_owners[0].organization_id : user.org_group_owners[0].organization_id

    if (!filters || filters.includes('orgOwners')) {
      await this.getOrgOwners(orgId)
    }

    if (!filters || filters.includes('students')) {
      await this.getStudents(filters, orgId)
    }

    if (!filters || filters.includes('groups')) {
      await this.getOrgGroups(orgId)
    }

    if (!filters || filters.includes('org')) {
      await this.getOrg(orgId)
    }

    if (!filters || filters.includes('groupOwners')) {
      await this.getGroupOwners(orgId)
    }

    if (!filters || filters.includes('orgOwnerWatchlist')) {
      await this.getOrgOwnerWatchlist(orgId)
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

  @action
  getDarkModeCookie () {
    this.darkMode = this.cookie.get('skollerInsightsDarkMode') === 'true'
  }
}

const studentClassesStore = new InsightsStore()

export default studentClassesStore
export { InsightsStore }
