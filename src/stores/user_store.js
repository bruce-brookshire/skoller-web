import { extendObservable, action } from 'mobx'

class UserStore {
  constructor () {
    extendObservable(this, {
      loading: null,
      fetchingUser: null,
      authToken: null,
      user: null,
      enrollmentLink: null,
      showPopUps: true.valueOf,
    })
  }

  setFetchingUser (bool) {
    this.fetchingUser = bool
  }

  isAdmin () {
    return this.user.roles.findIndex(role => role.id === 200) > -1
  }

  isSW () {
    if (this.user) {
      return this.user.roles.findIndex(role => role.id === 300) > -1
    } else {
      return null
    }
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

  @action setPopUpState (bool) {
    this.showPopUps = bool
  }
}

const userStore = new UserStore()

export default userStore
export { UserStore }
