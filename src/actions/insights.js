import {get, post, put} from '../utilities/api'

/*
* Get a user's job profile by user id
*
*/
function getStudentsByTeamId (teamId) {
  console.log('it ran!')
  // return get(`/api/v1/users/${teamId}/job-profile`, '', '')
  //   .then(data => {
  //     return data
  //   })
  //   .catch(error => {
  //     return Promise.reject(error)
  //   })
}

export default exports = {
  getStudentsByTeamId
}
