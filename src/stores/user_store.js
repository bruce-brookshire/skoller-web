import { extendObservable } from 'mobx'

class UserStore {
  constructor () {
    extendObservable(this, {
      loading: null,
      fetchingUser: null,
      authToken: null,
      user: null,
      enrollmentLink: null
    })
  }

  setFetchingUser (bool) {
    this.fetchingUser = bool
  }

  isAdmin () {
    return this.user.roles.findIndex(role => role.id === 200) > -1
  }

  isSW () {
    return this.user.roles.findIndex(role => role.id === 300) > -1
  }

  isChangeReq () {
    return this.user.roles.findIndex(role => role.id === 400) > -1
  }

  isHelpReq () {
    return this.user.roles.findIndex(role => role.id === 500) > -1
  }

  isStudent () {
    return this.user.roles.findIndex(r => r.name.toLowerCase() === 'student') > -1
  }
}

const userStore = new UserStore()

export default userStore
export { UserStore }
