import {get, post, postFile, del, put} from '../../utilities/api'
// import stores from '../../stores'
import {showSnackbar} from '../../utilities/snackbar'

// const {userStore} = stores

function createStudentInvitation (orgId, form) {
  return post(`/api/v1/organizations/${orgId}/student-org-invitations`, form, '')
    .then(r => {
      showSnackbar(`Successfully added ${form.name_first} ${form.name_last}`, 'success')
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

function editInvitation (orgId, invitationId, form) {
  return put(`/api/v1/organizations/${orgId}/student-org-invitations/${invitationId}`, form, '')
    .then(r => {
      return r
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

export function postInvitationsCSV (orgId, file, orgGroupId) {
  let form = new FormData()
  if (orgGroupId) form.append('org_group_id', orgGroupId)
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

export function acceptInvitation (orgId, invitationId) {
  const form = {
    'accepts': 'true'
  }

  return post(`/api/v1/organizations/${orgId}/student-org-invitations/${invitationId}/respond`, form, '')
    .then(data => {
      showSnackbar('Successfully accepted invitation.', 'success')
      return data
    })
    .catch(error => {
      showSnackbar('Error accepting invitation. Try again later.')
      return Promise.reject(error)
    })
}

export function sendEmailInvitation (type, orgId, id) {
  switch (type) {
    case 'individual':
      return post(`/api/v1/organizations/${orgId}/student-org-invitations/${id}/email-invites`)
        .then(data => {
          showSnackbar('Successfully sent email invitation.', 'success')
          return data
        })
        .catch(error => {
          showSnackbar('Error sending invitation email. Try again later.')
          return Promise.reject(error)
        })

    case 'group':
      return post(`/api/v1/organizations/${orgId}/org-groups/${id}/student-org-invitations/email-invites`)
        .then(data => {
          showSnackbar('Successfully sent email invitations.', 'success')
          return data
        })
        .catch(error => {
          showSnackbar('Error sending invitation emails. Try again later.')
          return Promise.reject(error)
        })

    case null:
    case 'org':
      return post(`/api/v1/organizations/${orgId}/student-org-invitations/email-invites`)
        .then(data => {
          showSnackbar('Successfully sent email invitations.', 'success')
          return data
        })
        .catch(error => {
          showSnackbar('Error sending invitation emails. Try again later.')
          return Promise.reject(error)
        })

    default:
      return false
  }
}

export function sendReminderEmail (type, orgId, id) {
  switch (type) {
    case 'individual':
      return post(`/api/v1/organizations/${orgId}/student-org-invitations/${id}/email-reminders`)
        .then(data => {
          showSnackbar('Successfully sent email reminder.', 'success')
          return data
        })
        .catch(error => {
          showSnackbar('Error sending reminder email. Try again later.')
          return Promise.reject(error)
        })

    case 'group':
      return post(`/api/v1/organizations/${orgId}/org-groups/${id}/student-org-invitations/email-reminders`)
        .then(data => {
          showSnackbar('Successfully sent email reminders.', 'success')
          return data
        })
        .catch(error => {
          showSnackbar('Error sending reminder emails. Try again later.')
          return Promise.reject(error)
        })

    case null:
    case 'org':
      return post(`/api/v1/organizations/${orgId}/student-org-invitations/email-reminders`)
        .then(data => {
          showSnackbar('Successfully sent email reminders.', 'success')
          return data
        })
        .catch(error => {
          showSnackbar('Error sending reminder emails. Try again later.')
          return Promise.reject(error)
        })

    default:
      return false
  }
}

const exports = {
  createStudentInvitation,
  getStudentInvitations,
  deleteInvitation,
  postInvitationsCSV,
  editInvitation,
  acceptInvitation,
  sendEmailInvitation,
  sendReminderEmail
}

export default exports
