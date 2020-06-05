import {get, post, del} from '../../utilities/api'
import {showSnackbar} from '../../utilities/snackbar'
import stores from '../../stores'
import invitations from './invitations'

const {userStore} = stores

/*

ADMIN

These methods are for Skoller Administrators

*/

// get all organizations in Skoller Insights
function getAllOrgs () {
  return get(`/api/v1/organizations`, '', '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// create an organization
function createOrg (form) {
  return post(`/api/v1/organizations`, form, '')
    .then(response => {
      return response
    })
    .catch(e => {
      return Promise.reject(e)
    })
}

// update an organization
function updateOrg (form) {
  console.log('updateOrg')
  // return put(`/api/v1/organizations/${form.id}`, form, '')
  //   .then(response => {})
  //   .catch(e => {
  //     return Promise.reject(e)
  //   })
}

// delete an organization
function deleteOrg (orgId) {
  console.log('createOrg')
  // return del(`/api/v1/orgId`, '', '')
  //   .then(response => {})
  //   .catch(e => {
  //     return Promise.reject(e)
  //   })
}

// Add student to org
function addStudentToOrg (orgId, studentId) {
  let form = {student_id: studentId}
  return post(`/api/v1/organizations/${orgId}/students`, form, '')
    .then(data => { return data })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Remove student from org
function removeStudentFromOrg (orgId, orgStudentId) {
  return del(`/api/v1/organizations/${orgId}/students/${orgStudentId}`, '', '')
    .then(data => { return data })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*

ORGANIZATION OWNERS

These methods are reserved for org owners.
In addition to these, all group owner methods can also be performed by org owners.

*/

// Create insights user
function createInsightsUser (email) {
  return post(`/api/v1/insights/users`, {email: email}, '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Get org
function getOrgById (orgId) {
  return get(`/api/v1/organizations/${orgId}`)
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Get all org owners within an org
function getAllOrgOwnersInOrg (orgId) {
  return get(`/api/v1/organizations/${orgId}/owners`)
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Create org owner
function createOrgOwner (orgId, form) {
  return post(`/api/v1/organizations/${orgId}/owners`, form, '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Update an org owner
function updateOrgOwner (orgId, form) {
  console.log('updateOrgOwner')
  // return put(`/api/v1/organizations/${orgId}/owners/${form.id}`, form, '')
  //   .then(data => {})
  //   .catch(error => {
  //     return Promise.reject(error)
  //   })
}

// Delete an org owner
function deleteOrgOwner (orgId, orgOwnerId) {
  return del(`/api/v1/organizations/${orgId}/owners/${orgOwnerId}`, '', '')
    .then(data => { return data })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Get all org groups
function getAllGroupsInOrg (orgId) {
  return get(`/api/v1/organizations/${orgId}/org-groups`, '', '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Create org group
function createOrgGroup (orgId, form) {
  return post(`/api/v1/organizations/${orgId}/org-groups`, form, '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Add student to group
function addStudentToGroup (orgId, orgGroupId, orgStudentId) {
  return post(`/api/v1/organizations/${orgId}/org-groups/${orgGroupId}/students`, {org_student_id: orgStudentId}, '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Remove student from group
function removeStudentFromGroup (orgId, orgGroupId, orgGroupStudentId) {
  return del(`/api/v1/organizations/${orgId}/org-groups/${orgGroupId}/students/${orgGroupStudentId}`, '', '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Get all org group owners within an org
function getAllOrgGroupOwnersInOrg (orgId) {
  return get(`/api/v1/organizations/${orgId}/members`)
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Create org member
function createOrgMember (orgId, userId) {
  let form = {user_id: userId}
  return post(`/api/v1/organizations/${orgId}/members`, form, '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Create org user as an org group owner
function createOrgGroupOwner (orgId, orgGroupId, orgMemberId) {
  let form = {org_member_id: orgMemberId}
  return post(`/api/v1/organizations/${orgId}/org-groups/${orgGroupId}/owners`, form, '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Remove user as an org group owner
function removeOrgGroupOwner (orgId, orgGroupId, orgGroupOwnerId) {
  return del(`/api/v1/organizations/${orgId}/org-groups/${orgGroupId}/owners/${orgGroupOwnerId}`, '', '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Get org owner watchlist
function getOrgOwnerWatchlist (orgId, orgOwnerId) {
  return get(`/api/v1/organizations/${orgId}/owners/${orgOwnerId}/watchlists`)
    .then(r => { return r })
    .catch(e => Promise.reject(e))
}

// Add a student to an org owner watchlist
function addStudentToOrgOwnerWatchlist (orgId, orgOwnerId, orgStudentId) {
  let form = {org_student_id: orgStudentId, inserted_at: (new Date().toISOString()).split('.')[0]}
  return post(`/api/v1/organizations/${orgId}/owners/${orgOwnerId}/watchlists`, form, '')
    .then(r => { return r })
    .catch(e => Promise.reject(e))
}

// Remove a student from an org owner watchlist
function removeStudentFromOrgOwnerWatchlist (orgId, orgOwnerId, watchlistId) {
  return del(`/api/v1/organizations/${orgId}/owners/${orgOwnerId}/watchlists/${watchlistId}`, '', '')
    .then(r => { return r })
    .catch(e => Promise.reject(e))
}

// Get all students in an org
function getAllStudentsInOrg (orgId) {
  return get(`/api/v1/organizations/${orgId}/students`, '', '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*

GROUP OWNERS

These are the methods that group owners can perform

*/

// Login insights admin (owner or group owner)
function login (form) {
  userStore.loading = true

  return post(`/api/v1/users/login`, form, '')
    .then(data => {
      userStore.authToken = `Bearer ${data.token}`
      userStore.user = data.user
      userStore.loading = false
    })
    .catch(error => {
      userStore.loading = false
      if (error.status !== 401 && error.status !== 404) {
        showSnackbar('Error logging in. Try again.')
      } else {
        showSnackbar('Incorrect username or password.')
      }
      return Promise.reject(error)
    })
}

function getOrgGroupById (orgId, orgGroupId) {
  return get(`/api/v1/organizations/${orgId}/org-groups/${orgGroupId}`, '', '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Get a team's students by team ID
function getStudentsByGroupId (orgId, orgGroupId) {
  return get(`/api/v1/organizations/${orgId}/org-groups/${orgGroupId}/students`, '', '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Get a student's classes by org_student_id
function getStudentClasses (orgId, orgStudentId) {
  return get(`/api/v1/organizations/${orgId}/students/${orgStudentId}/classes`, '', '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

function getGroupOwnerWatchlist (orgId, orgGroupId, orgGroupOwnerId) {
  return get(`/api/v1/organizations/${orgId}/org-groups/${orgGroupId}/owners/${orgGroupOwnerId}/watchlists`, '', '')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Add a student to a group owner's watchlist
function addStudentToGroupOwnerWatchlist (orgId, groupOwnerId, orgGroupId, orgStudentId) {
  return get(`/api/v1/organizations/${orgId}/org-groups/${orgGroupId}/students`, '', '')
    .then(students => {
      let orgGroupStudent = students.find(s => s.org_student_id === orgStudentId)

      if (orgGroupStudent) {
        let form = {
          org_group_student_id: orgGroupStudent.id
        }
        post(`/api/v1/organizations/${orgId}/org-groups/${orgGroupId}/owners/${groupOwnerId}/watchlists`, form, '')
          .then(r => {
            return Promise.resolve(r)
          })
          .catch(error => {
            return Promise.reject(error)
          })
      } else {
        const error = 'Cannot find student'
        return Promise.reject(error)
      }
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

// Remove a student from a group owner's watchlist
function removeStudentFromGroupOwnerWatchlist (groupOwnerId, studentId) {
  console.log('removeStudentFromGroupOwnerWatchlist')
}

const exports = {
  invitations,

  /*

  ADMIN

  */

  // orgs
  getAllOrgs,
  createOrg,
  updateOrg,
  deleteOrg,
  // students
  addStudentToOrg,
  removeStudentFromOrg,
  /*

  ORG OWNER

  */

  // auth
  login,
  // owners
  createInsightsUser,
  getOrgById,
  getAllOrgOwnersInOrg,
  createOrgOwner,
  updateOrgOwner,
  deleteOrgOwner,
  // groups
  getAllGroupsInOrg,
  createOrgGroup,
  addStudentToGroup,
  removeStudentFromGroup,
  // group owners,
  getAllOrgGroupOwnersInOrg,
  createOrgMember,
  createOrgGroupOwner,
  removeOrgGroupOwner,
  // students,
  getAllStudentsInOrg,
  // watchlist
  getOrgOwnerWatchlist,
  addStudentToOrgOwnerWatchlist,
  removeStudentFromOrgOwnerWatchlist,

  /*

  GROUP OWNER

  */

  getOrgGroupById,
  getStudentsByGroupId,
  getStudentClasses,
  getGroupOwnerWatchlist,
  addStudentToGroupOwnerWatchlist,
  removeStudentFromGroupOwnerWatchlist
}

export default exports

/*

all of Bruce's routes:

/api/v1/organizations
/api/v1/organizations/:id
/api/v1/organizations
/api/v1/organizations/:id
/api/v1/organizations/:id
/api/v1/organizations/:organization_id/owners
/api/v1/organizations/:organization_id/owners/:id
/api/v1/organizations/:organization_id/owners
/api/v1/organizations/:organization_id/owners/:id
/api/v1/organizations/:organization_id/owners/:id
/api/v1/organizations/:organization_id/owners/:org_group_owner_id/watchlist
/api/v1/organizations/:organization_id/owners/:org_group_owner_id/watchlist/:id
/api/v1/organizations/:organization_id/owners/:org_group_owner_id/watchlist
/api/v1/organizations/:organization_id/owners/:org_group_owner_id/watchlist/:id
/api/v1/organizations/:organization_id/owners/:org_group_owner_id/watchlist/:id
/api/v1/organizations/:organization_id/students
/api/v1/organizations/:organization_id/students/:id
/api/v1/organizations/:organization_id/students
/api/v1/organizations/:organization_id/students/:id
/api/v1/organizations/:organization_id/students/:id
/api/v1/organizations/:organization_id/org_groups
/api/v1/organizations/:organization_id/org_groups/:id
/api/v1/organizations/:organization_id/org_groups
/api/v1/organizations/:organization_id/org_groups/:id
/api/v1/organizations/:organization_id/org_groups/:id
/api/v1/organizations/:organization_id/org_groups/:org_group_id/owners
/api/v1/organizations/:organization_id/org_groups/:org_group_id/owners/:id
/api/v1/organizations/:organization_id/org_groups/:org_group_id/owners
/api/v1/organizations/:organization_id/org_groups/:org_group_id/owners/:id
/api/v1/organizations/:organization_id/org_groups/:org_group_id/owners/:id
/api/v1/organizations/:organization_id/org_groups/:org_group_id/owners/:org_group_owner_id/watchlist
/api/v1/organizations/:organization_id/org_groups/:org_group_id/owners/:org_group_owner_id/watchlist/:id
/api/v1/organizations/:organization_id/org_groups/:org_group_id/owners/:org_group_owner_id/watchlist
/api/v1/organizations/:organization_id/org_groups/:org_group_id/owners/:org_group_owner_id/watchlist/:id
/api/v1/organizations/:organization_id/org_groups/:org_group_id/owners/:org_group_owner_id/watchlist/:id
/api/v1/organizations/:organization_id/org_groups/:org_group_id/students
/api/v1/organizations/:organization_id/org_groups/:org_group_id/students/:id
/api/v1/organizations/:organization_id/org_groups/:org_group_id/students
/api/v1/organizations/:organization_id/org_groups/:org_group_id/students/:id
/api/v1/organizations/:organization_id/org_groups/:org_group_id/students/:id

*/
