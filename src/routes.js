import React from 'react'
import {Cookies} from 'react-cookie'
import { Router, Route, Redirect, IndexRedirect, IndexRoute, browserHistory } from 'react-router'
import App from './containers/App'
import Layout from './containers/Layout'


import Landing from './views/Landing'

import DIYLanding from './views/Student/DIYLanding'
import MyClasses from './views/Student/MyClasses'
import Onboard from './views/Student/Onboard'


import AssignmentsTutorial from './views/SyllabusTutorial/AssignmentsTutorial'
import WeightsTutorial from './views/SyllabusTutorial/WeightsTutorial'
import SyllabusTool from './views/SyllabusTool'

import HubLanding from './views/Hub/HubLanding'
import HubSchools from './views/Hub/HubSchools'
import SchoolInfo from './views/Hub/SchoolInfo'
import Accounts from './views/Hub/Accounts'
import AccountInfo from './views/Hub/AccountInfo'

import actions from './actions'
import stores from './stores'
const {userStore} = stores

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/app"/>
      <Route path='/landing' component={Landing} />
      <Route path='/app' component={Layout} onEnter={requireAuth}>
        <IndexRedirect to='/student/classes' />
        <Route path='/student'>
          <IndexRedirect to='/student/classes'/>
          <Route path='/student/onboard' component={Onboard} onEnter={authOnboard} />
          <Route path='/student/diy' component={DIYLanding} />
          <Route path='/student/classes' component={MyClasses}/>
        </Route>

        <Route path='/hub'>
          <IndexRedirect to='/hub/landing'/>
          <Route path='/hub/landing' component={HubLanding}/>
          <Route path='/hub/schools' component={HubSchools} />
          <Route path='/hub/schools/school/info' component={SchoolInfo} />
          <Route path='/hub/accounts' component={Accounts} />
          <Route path='/hub/accounts/account/info' component={AccountInfo} />
        </Route>

        <Route path='/diy' component={DIYLanding} />
        <Route path='/class/:classId/syllabus_tool' component={SyllabusTool} />

        <Route path='/tutorial/assignments' component={AssignmentsTutorial} />
        <Route path='/tutorial/weights' component={WeightsTutorial} />
      </Route>
      <Route path="/logout" onEnter={logout} />
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
)

/*
* Handle strongly typed url
*/
function requireAuth (nextState, replaceState) {
  if (!userStore.user) {
    userStore.setFetchingUser(true)
    userStore.authToken = cookie.get('skollerToken')
    actions.auth.getUserByToken()
      .then(() => {
        if (nextState.routes.findIndex(route => route.path === '/student/onboard') !== -1) {
          authOnboard()
        }
        userStore.setFetchingUser(false)
      })
      .catch(() => {
        browserHistory.push('/landing')
        userStore.setFetchingUser(false)
      })
  }
}

/*
* If the user has not been verified, allow access to onboarding.
*/
function authOnboard () {
  if (userStore.user) {
    if (!userStore.user.student || (userStore.user.student && userStore.user.student.is_verified)) {
      // browserHistory.push('/student/classes')
    }
  }
}

const cookie = new Cookies()
function logout (nextState, replaceState) {
  cookie.remove('skollerToken')
  replaceState(null, '/landing')
}

export default(router)
