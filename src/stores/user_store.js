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
}

const userStore = new UserStore()

export default userStore
export { UserStore }
