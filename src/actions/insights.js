import {get, post, put, del} from '../utilities/api'
import dataWithId from '../views/Insights/Dashboard/test'

/*

ADMIN

These methods are for Skoller Administrators

*/

// get all organizations in Skoller Insights
function getAllOrgs () {
  console.log('getAllOrgs')
  return dataWithId
  // return get(`/api/v1/organizations`, '', '')
  //   .then(data => {})
  //   .catch(error => {
  //     return Promise.reject(error)
  //   })
}

// create an organization
function createOrg (form) {
  console.log('deleteOrg')
  // return post(`/api/v1/organizations`, form, '')
  //   .then(response => {})
  //   .catch(e => {
  //     return Promise.reject(e)
  //   })
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

/*

ORGANIZATION OWNERS

These methods are reserved for org owners.
In addition to these, all group owner methods can also be performed by org owners.

*/

// Get all org owners within an org
function getAllOrgOwnersInOrg (orgId) {
  console.log('getAllOrgOwnersInOrg')
  // return get(`/api/v1/organizations/${orgId}/owners`, '', '')
  //   .then(data => {})
  //   .catch(error => {
  //     return Promise.reject(error)
  //   })
}

// Create org owner
function createOrgOwner (orgId, form) {
  console.log('createOrgOwner')
  // return post(`/api/v1/organizations/${orgId}/owners`, form, '')
  //   .then(data => {})
  //   .catch(error => {
  //     return Promise.reject(error)
  //   })
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
  console.log('deleteOrgOwner')
  // return del(`/api/v1/organizations/${orgId}/owners/${orgOwnerId}`, form, '')
  //   .then(data => {})
  //   .catch(error => {
  //     return Promise.reject(error)
  //   })
}

// Get org owner watchlist
function getOrgOwnerWatchlist (orgOwnerId) {
  console.log('getOrgOwnerWatchlist')
  // return get(`/api/v1/organizations/${orgId}/owners/${orgOwnerId}/watchlist`)
  //   .then(r => {})
  //   .catch(e => Promise.reject(e))
}

// Add a student to an org owner watchlist
function addStudentToOrgOwnerWatchlist (orgOwnerId, studentId) {
  console.log('addStudentToOrgOwnerWatchlist')
}

// Remove a student from an org owner watchlist
function removeStudentFromOrgOwnerWatchlist (orgOwnerId, studentId) {
  console.log('removeStudentFromOrgOwnerWatchlist')
}

// Get all students in an org
function getStudentsByOrgId (orgId) {
  console.log('getStudentsByOrgId')
  return dataWithId
  // return get(`/api/v1/organizations/${orgId}/students`, '', '')
  //   .then(data => {
  //     return data
  //   })
  //   .catch(error => {
  //     return Promise.reject(error)
  //   })
}

/*

GROUP OWNERS

These are the methods that group owners can perform

*/

// Get a team's students by team ID
function getStudentsByTeamId (teamId) {
  console.log('it ran!')
  return dataWithId
  // return get(`/api/v1/users/${teamId}/job-profile`, '', '')
  //   .then(data => {
  //     return data
  //   })
  //   .catch(error => {
  //     return Promise.reject(error)
  //   })
}

// Add a student to a group owner's watchlist
function addStudentToGroupOwnerWatchlist (groupOwnerId, studentId) {
  console.log('addStudentToGroupOwnerWatchlist')
}

// Remove a student from a group owner's watchlist
function removeStudentFromGroupOwnerWatchlist (groupOwnerId, studentId) {
  console.log('removeStudentFromGroupOwnerWatchlist')
}

const exports = {
  // admin
  getAllOrgs,
  createOrg,
  updateOrg,
  deleteOrg,
  getOrgOwnerWatchlist,
  addStudentToOrgOwnerWatchlist,
  removeStudentFromOrgOwnerWatchlist,

  // org owners
  getAllOrgOwnersInOrg,
  createOrgOwner,
  updateOrgOwner,
  deleteOrgOwner,
  addStudentToGroupOwnerWatchlist,
  removeStudentFromGroupOwnerWatchlist,

  // group owners
  getStudentsByTeamId,
  getStudentsByOrgId
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
