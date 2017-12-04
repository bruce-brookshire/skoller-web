import {authenticateUser, getUserByToken, registerUser} from './auth'
import {searchClasses} from './classes'
import {getActiveSchools} from './schools'

const actions = {
  auth: {
    authenticateUser,
    getUserByToken,
    registerUser
  },
  classes: {
    searchClasses
  },
  schools: {
    getActiveSchools
  }
}

export default actions
