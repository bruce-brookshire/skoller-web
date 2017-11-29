import {authenticateUser, getUserByToken, registerUser} from './auth'

const actions = {
  auth: {
    authenticateUser,
    getUserByToken,
    registerUser
  }
}

export default actions
