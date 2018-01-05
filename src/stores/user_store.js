import { extendObservable } from 'mobx'

class UserStore {
  constructor () {
    extendObservable(this, {
      loading: null,
      fetchingUser: null,
      authToken: null,
      user: null
    })
  }

  setFetchingUser (bool) {
    this.fetchingUser = bool
  }

  isAdmin () {
    return this.user.roles.findIndex(r => r.name.toLowerCase() === 'admin') > -1
  }

  isStudent () {
    return this.user.roles.findIndex(r => r.name.toLowerCase() === 'student') > -1
  }
}

const userStore = new UserStore()

export default userStore
export { UserStore }
