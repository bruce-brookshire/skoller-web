import {authenticateUser, getUserByToken, registerUser} from './auth'
import {getActiveSchools} from './schools'

const actions = {
  auth: {
    authenticateUser,
    getUserByToken,
    registerUser
  },
  schools: {
    getActiveSchools
  }
}

export default actions
