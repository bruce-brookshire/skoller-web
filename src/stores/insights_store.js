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
      invitations: [],
      groups: [],
      watchlist: [],
      groupOwners: [],
      org: {
        groupsAlias: 'team',
        studentsAlias: 'athlete'
      },
      interfaceSettings: {
        dashboard: {
          sort: 'Grade Impact',
          timeframe: 'Next 7 days'
        }
      },
      darkMode: this.cookie.get('skollerInsightsDarkMode') === 'true',
      userType: null
    })
  }

  async getOrgOwners (orgId) {
    await actions.insights.getAllOrgOwnersInOrg(orgId)
      .then(r => {
        this.orgOwners = r
        this.org.orgOwners = r
      })
  }

  async asyncForEach (array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  async getOrgGroups (orgId, user, role) {
    if (role === 'orgOwner') {
      await actions.insights.getAllGroupsInOrg(orgId)
        .then(r => {
          this.groups = r
          this.org.groups = r
        })
    } else {
      let groups = []
      await this.asyncForEach(user.org_group_owners, async group => {
        let orgGroupId = group.id
        await actions.insights.getOrgGroupById(orgId, orgGroupId)
          .then(r => {
            groups.push(r)
          })
      })
      this.groups = groups
      this.org.groups = groups
    }
  }

  async getStudents (filters, orgId, user) {
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
              },
              isInvitation: false
            }
          }
          return student
        })

        // filter out students that group owner doesn't own
        if (this.userType === 'groupOwner') {
          students = students.filter(s => {
            let hasStudent = false
            s.org_groups.forEach(g => {
              if (user.org_group_owners.map(gr => gr.id).includes(g.id)) {
                hasStudent = true
              }
            })
            return hasStudent
          })
        }

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

  async getGroupOwnerWatchlist (orgId, user) {
    let watchlistStudentsIds = []
    await this.asyncForEach(user.org_group_owners, async group => {
      let orgGroupId = group.id
      let orgGroupOwnerId = this.groups.find(g => g.id === orgGroupId).owners.find(o => o.org_member_id === this.groupOwners.find(go => go.user_id === user.id).id).id
      await actions.insights.getGroupOwnerWatchlist(orgId, orgGroupId, orgGroupOwnerId)
        .then(r => {
          let studentIds = r.map(s => s.org_group_student.org_student_id)
          watchlistStudentsIds = watchlistStudentsIds.concat(studentIds)
        })
    })

    let watchlistStudents = this.students.slice().filter(s => watchlistStudentsIds.includes(s.id))
    this.watchlist = watchlistStudents
    this.org.watchlist = watchlistStudents

    console.log('getting store watchlist \n \n \n \n', this.watchlist)
  }

  async getStudentData (students, orgId) {
    await Promise.all(students.map(s =>
      actions.insights.getStudentClasses(orgId, s.id)
        .then(r => {
          let assignments = [].concat.apply([], r.map(cl => cl.assignments))
          s.org_student_id = s.id
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

  async getInvitations (orgId) {
    await actions.insights.invitations.getStudentInvitations(orgId)
      .then(r => {
        let invitations = r.map(i => {
          return ({
            ...i,
            classes: [],
            assignments: [],
            student: {
              name_first: i.name_first,
              name_last: i.name_last,
              phone: i.phone,
              users: [{
                email: i.email
              }]
            },
            intensity: {
              sevenDay: 0,
              thirtyDay: 0
            },
            isInvitation: true,
            org_groups: []
          })
        })
        this.invitations = invitations
      })
  }

  getRole (user) {
    if (user.org_owners) {
      if (user.org_owners.length > 0) {
        return 'orgOwner'
      } else if (user.org_group_owners.length > 0) {
        return 'groupOwner'
      } else {
        return false
      }
    } else {
      return false
    }
  }

  async getAllData (filters) {
    const user = stores.userStore.user
    const role = this.getRole(user)
    this.userType = role
    const orgId = user.org_owners.length > 0 ? user.org_owners[0].organization_id : user.org_group_owners[0].organization_id

    if (!filters || filters.includes('orgOwners')) {
      await this.getOrgOwners(orgId)
    }

    if (!filters || filters.includes('students')) {
      await this.getStudents(filters, orgId, user)
    }

    if (!filters || filters.includes('invitations')) {
      await this.getInvitations(orgId)
    }

    if (!filters || filters.includes('groups')) {
      await this.getOrgGroups(orgId, user, role)
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

    if (!filters || filters.includes('groupOwnerWatchlist')) {
      await this.getGroupOwnerWatchlist(orgId, user)
    }

    Promise.resolve(true)
  }

  async getData (filters) {
    this.loading = true
    await this.getAllData(filters)
    this.getDataSuccess()
  }

  async updateData (filters) {
    this.loadingUpdate = true
    await this.getAllData(filters)
    Promise.resolve(true)
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
  getStudentsAndInvitations () {
    return this.students.concat(this.invitations)
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
