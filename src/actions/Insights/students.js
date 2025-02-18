import {get, post, del} from '../../utilities/api'
// import stores from '../../stores'

// const {userStore} = stores

/*
 * Enroll in class
 *
 * @param [Object] classId. The id of the class for the student to enroll in.
 */
export function getStudentByOrgStudentId (orgId, orgStudentId) {
  return get(
    `/api/v1/organizations/${orgId}/students/${orgStudentId}`,
    null,
    'Error enrolling in class. Try again.'
  )
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
 * Enroll in class
 *
 * @param [Object] classId. The id of the class for the student to enroll in.
 */
export function enrollInClass (classId, studentId) {
  return post(
    `/api/v1/students/${studentId}/classes/${classId}`,
    null,
    'Error enrolling in class. Try again.'
  )
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
 * Drop class
 */
export function dropClass (classId, studentId) {
  return del(
    `/api/v1/students/${studentId}/classes/${classId}`,
    'Error dropping class. Try again later.'
  ).catch(error => {
    return Promise.reject(error)
  })
}

export function checkOrgInvites (studentId) {
  return get(
    `/api/v1/students/${studentId}/student-org-invitations`
  ).catch(error => {
    return Promise.reject(error)
  })
}

const exports = {
  enrollInClass,
  dropClass,
  checkOrgInvites
}

export default exports
