import React from 'react'
import { Cookies } from 'react-cookie'
import { Router, Route, Redirect, IndexRedirect, browserHistory } from 'react-router'
import App from './containers/App'
import Layout from './containers/Layout'

import Landing from './views/Landing'
import Faq from './views/Faq'
import ForgotPassword from './views/ForgotPassword'
import PrivacyPolicy from './views/PrivacyPolicy'
import LearnMore from './views/LearnMore'
import PeopleTalking from './views/PeopleTalking'
import OurTeam from './views/OurTeam'
import ResetPassword from './views/ResetPassword'

import MyClasses from './views/Student/MyClasses'
import FindClasses from './views/Student/FindClasses'
import Verification from './views/components/Verification'
import ClassLink from './views/Student/ClassLink'

import SyllabusTool from './views/SyllabusTool'

import HubLanding from './views/Hub/HubLanding'
import HubSchools from './views/Hub/HubSchools'
import HubClasses from './views/Hub/HubClasses'
import SchoolInfo from './views/Hub/SchoolInfo'
import Accounts from './views/Hub/Accounts'
import AccountInfo from './views/Hub/AccountInfo'
import Analytics from './views/Hub/Analytics'
import Switchboard from './views/Hub/Switchboard'

import EnrollmentLinkLanding from './views/EnrollmentLink/Landing'
import Enroll from './views/EnrollmentLink/Enroll'

import actions from './actions'
import stores from './stores'
const {userStore} = stores

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/app"/>
      <Route path='/landing' component={Landing} />
      <Route path='/forgot_password' component={ForgotPassword} />
      <Route path='/reset_password/:token' component={ResetPassword} />
      <Route path='/privacypolicy' component={PrivacyPolicy} />
      <Route path='/learn-more' component={LearnMore} />
      <Route path='/what-people-say' component={PeopleTalking} />
      <Route path='/our-team' component={OurTeam} />
      <Route path='/faq' component={Faq} />
      <Route path='/enroll' component={Enroll} />
      <Route path='/e/:link' component={EnrollmentLinkLanding} />

      <Route path='/app' component={Layout} onEnter={requireAuth}>
        <IndexRedirect to='/student/classes' />
        <Route path='/student'>
          <IndexRedirect to='/student/classes'/>
          <Route path='/student/find-classes' component={FindClasses} />
          <Route path='/student/verify' component={Verification} onEnter={authOnboard} />
          <Route path='/student/class-link' component={ClassLink} />
          <Route path='/student/classes' component={MyClasses}/>
        </Route>

        <Route path='/hub'>
          <IndexRedirect to='/hub/landing'/>
          <Route path='/hub/landing' component={HubLanding}/>
          <Route path='/hub/schools' component={HubSchools} />
          <Route path='/hub/schools/school/info' component={SchoolInfo} />
          <Route path='/hub/classes' component={HubClasses} />
          <Route path='/hub/accounts' component={Accounts} />
          <Route path='/hub/accounts/account/info' component={AccountInfo} />
          <Route path='/hub/analytics' component={Analytics} />
          <Route path='/hub/switchboard' component={Switchboard} />
        </Route>

        <Route path='/class/:classId/syllabus_tool' component={SyllabusTool} />
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
      .then((user) => {
        authenticateStudent(user.user).then(() => {
          userStore.setFetchingUser(false)
        }).catch((eror) => { userStore.setFetchingUser(false) })
        userStore.setFetchingUser(false)
      })
      .catch(() => {
        browserHistory.push('/landing')
        userStore.setFetchingUser(false)
      })
  }
}

/*
* Check to see if a users classes is 0 or if they are unverfied. If so send them
* to the onboarding page.
*/
function authenticateStudent (user) {
  if (user.student) {
    if (user.student.is_verified) {
      return actions.classes.getStudentClasses().then((classes) => {
        if (classes.length === 0) browserHistory.push('/student/find-classes')
      }).catch(() => false)
    } else {
      return new Promise((resolve, reject) => {
        resolve(browserHistory.push('/student/verify'))
      })
    }
  }
  return new Promise((resolve, reject) => {
    resolve()
  })
}

/*
* If the user has not been verified, allow access to onboarding.
*/
function authOnboard () {
  if (userStore.user) {
    if (userStore.user.student) {
      if (userStore.user.student.is_verified) {
        browserHistory.push('/student/classes')
      }
    }
  }
}

const cookie = new Cookies()
function logout (nextState, replaceState) {
  cookie.remove('skollerToken', { path: '/' })
  replaceState(null, '/landing')
}

export default(router)
