import {get, post, postFile, del} from '../../utilities/api'
// import stores from '../../stores'
import {showSnackbar} from '../../utilities/snackbar'

// const {userStore} = stores

function createStudentInvitation (orgId, form) {
  return post(`/api/v1/organizations/${orgId}/student-org-invitations`, form, '')
    .then(r => {
      showSnackbar(`Successfully invited ${form.name_first} ${form.name_last}`, 'success')
      return r
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

function getStudentInvitations (orgId) {
  return get(`/api/v1/organizations/${orgId}/student-org-invitations`, '', '')
    .then(r => {
      return r
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

function deleteInvitation (orgId, invitationId) {
  return del(`/api/v1/organizations/${orgId}/student-org-invitations/${invitationId}`, '', '')
    .then(r => {
      return r
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function postInvitationsCSV (orgId, file, orgGroupId) {
  let form = new FormData()
  form.append('org_group_id', orgGroupId)
  form.append('file', file)

  return postFile(`/api/v1/organizations/${orgId}/student-org-invitations/csv`, form, '')
    .then(data => {
      showSnackbar('Successfully created invitations.', 'success')
      return data
    })
    .catch(error => {
      showSnackbar('Error uploading file. Try again later.')
      return Promise.reject(error)
    })
}

const exports = {
  createStudentInvitation,
  getStudentInvitations,
  deleteInvitation,
  postInvitationsCSV
}

export default exports
