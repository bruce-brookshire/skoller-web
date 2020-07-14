import { put } from '../../utilities/api'
// import stores from '../../stores'

// const {userStore} = stores

function addSchoolToOrg (orgId, schoolId) {
  let form = {
    'org_schools': [
      {'school_id': schoolId}
    ]
  }

  return put(`/api/v1/organizations/${orgId}`, form, '')
    .then(r => {
      return r
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

const exports = {
  addSchoolToOrg
}

export default exports
