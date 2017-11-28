import {authenticateUser, getUserByToken} from './auth'

const actions = {
  auth: {
    authenticateUser,
    getUserByToken
  }
}

export default actions
