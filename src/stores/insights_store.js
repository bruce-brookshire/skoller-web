import { extendObservable, action } from 'mobx'
import actions from '../actions'
import stores from './index'
import { getIntensityScore, asyncForEach } from '../views/Insights/utils'
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
        groupsAlias: 'group',
        studentsAlias: 'athlete'
      },
      interfaceSettings: {
        sort: 'Grade Impact',
        timeframe: 7,
        timeframeOptions: [7, 14, 30]
      },
      darkMode: this.cookie.get('skollerInsightsDarkMode') === 'true',
      orgSelection: parseInt(this.cookie.get('skollerInsightsOrgSelection')),
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
          let groups = []
          r.forEach(group => {
            let students = this.students.filter(s => s.org_groups.map(og => og.id).includes(group.id))
            let invitations = this.invitations.filter(s => s.group_ids && s.group_ids.includes(group.id))
            let memberOwners = []
            groups.push({...group, students, invitations, memberOwners})
          })
          this.groups = groups
          this.org.groups = groups
        })
    } else {
      let groups = []
      await this.asyncForEach(user.org_group_owners, async groupOwner => {
        let orgGroupId = groupOwner.org_group_id
        await actions.insights.getOrgGroupById(orgId, orgGroupId)
          .then(r => {
            let students = this.students.filter(s => s.org_groups.map(og => og.id).includes(r.id))
            let invitations = this.invitations.filter(s => s.group_ids && s.group_ids.includes(r.id))
            groups.push({...r, memberOwners: [], students, invitations})
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
              intensity: {
                7: null,
                14: null,
                30: null
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
              if (user.org_group_owners.map(gr => gr.org_group_id).includes(g.id)) {
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
          go.org_groups.forEach(og => {
            let group = this.groups.find(group => group.id === og.id)
            if (group) {
              if (group.memberOwners) group.memberOwners.push(go)
            }
          })
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
      .then(async r => {
        let org = r
        this.org = {...this.org, ...org, color: null, school: null}

        if (org.schools.length > 0) {
          await actions.schools.getSchoolById(org.schools[0].id)
            .then(r => {
              this.org.color = r.color
              this.org.school = r
            })
        }
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
      let orgGroupId = group.org_group_id
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
  }

  async getStudentData (students, orgId) {
    if (Array.isArray(students)) {
      await Promise.all(students.map(s => {
        s.classes.forEach(cl => {
          if (!cl.color) {
            cl.color = '57b9e4'
          }
        })
        s.intensity = {
          // TODO replace these methods with what API returns
          7: 0,//getIntensityScore(assignments, 7),
          14: 0,//getIntensityScore(assignments, 14),
          30: 0//getIntensityScore(assignments, 30)
        }

        return s;
        }
      ))

      this.students = students
    } else {
      let student = students
      let orgStudents = this.students
      await actions.insights.getStudentClasses(orgId, student.id)
        .then(r => {
          r.forEach(cl => {
            if (!cl.color) {
              cl.color = '57b9e4'
            }
          })
          let assignments = [].concat.apply([], r.map(cl => cl.assignments))
          student.org_student_id = student.id
          student.classes = r
          student.assignments = assignments
          student.intensity = {
            // TODO replace these methods with what API returns
            7: 0,//getIntensityScore(assignments, 7),
            14: 0,//getIntensityScore(assignments, 14),
            30: 0//getIntensityScore(assignments, 30)
          }
        })
      let orgStudent = {...orgStudents.find(s => s.id === student.id), ...student}
      let existingStudent = orgStudents.find(s => s.id === student.id)
      existingStudent = {...existingStudent, ...orgStudent}
      this.students = orgStudents
      Promise.resolve(true)
    }
  }

  async getInvitationData (i) {
    let classes = []
    let assignments = []

    i.classes.forEach(studentClass => {
      if (!classes.map(cl => cl.id).includes(studentClass.id)) {
        let totalWeight = 0
        if (studentClass.is_points) {
          totalWeight = 0
          studentClass.weights.forEach(w => {
            totalWeight += w.weight
          });
        }
        else {
          totalWeight = 100
        }

        studentClass.assignments.forEach(a => {
          a.class_id = studentClass.id
          if (a.weight_id) {
            a.weight = (studentClass.weights.find(w => w.id === a.weight_id).weight / studentClass.assignments.filter(as => as.weight_id === a.weight_id, 0).length) / totalWeight
          } else {
            a.weight = 0
          }
        });
        
        assignments = assignments.concat(studentClass.assignments)
        studentClass.color = '4a4a4a'
        classes.push(studentClass)
      }
    });

    return {
      ...i,
      classes,
      assignments,
      student: {
        name_first: i.name_first,
        name_last: i.name_last,
        phone: i.phone,
        users: [{
          email: i.email
        }]
      },
      intensity: {
        7: 0,
        14: 0,
        30: 0
      },
      isInvitation: true,
      org_groups: [],
      getOrgGroups: () => {
        return i.group_ids.map(gid => this.groups.find(g => g.id === gid))
      }
    }
  }

  async getInvitations (orgId) {
    await actions.insights.invitations.getStudentInvitations(orgId)
      .then(async r => {
        let invitations = []
        await asyncForEach(r, async r => {
          let invitation = await this.getInvitationData(r)
          invitations.push(invitation)
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

  getProperOrg = (user) => {
    if (user.org_owners.length > 0) {
      if (this.orgSelection) {
        return this.orgSelection
      } else {
        return user.org_owners[0].organization_id
      }
    } else {
      return user.org_members[0].organization_id
    }
  }

  async getAllData (filters) {
    const user = stores.userStore.user
    const role = this.getRole(user)
    this.userType = role
    const orgId = this.getProperOrg(user)

    if (!filters || filters.includes('invitations')) {
      await this.getInvitations(orgId)
    }

    if (!filters || filters.includes('orgOwners')) {
      await this.getOrgOwners(orgId)
    }

    if (!filters || filters.includes('students')) {
      await this.getStudents(filters, orgId, user)
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

  async updateStudent (orgStudentId) {
    let orgStudent = this.students.filter(s => s.id === orgStudentId)[0]
    await this.getStudentData(orgStudent, this.org.id)

    Promise.resolve(true)
    this.getDataSuccess()
  }

  async updateInvitation (invitation) {
    let orgInvite = await this.getInvitationData(invitation, this.org.id)
    let invitations = this.invitations
    invitations[this.invitations.indexOf(invitations.find(i => i.id === invitation.id))] = orgInvite
    this.invitations = invitations

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

  @action
  switchOrg () {
    this.orgSelection = this.cookie.get('skollerInsightsOrgSelection')
    this.getData()
  }
}

const studentClassesStore = new InsightsStore()

export default studentClassesStore
export { InsightsStore }
