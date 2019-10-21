import React from 'react'
import { Cookies } from 'react-cookie'
import { Router, Route, Redirect, IndexRedirect, browserHistory } from 'react-router'
import App from './containers/App'
import Layout from './containers/Layout'

import Landing from './views/Landing'
import AdminLanding from './views/AdminLanding'
import Faq from './views/Faq'
import ForgotPassword from './views/ForgotPassword'
import Unsubscribe from './views/Unsubscribe'
import PrivacyPolicy from './views/PrivacyPolicy'
import UserAgreement from './views/UserAgreement'
import LearnMore from './views/LearnMore'
import PeopleTalking from './views/PeopleTalking'
import OurTeam from './views/OurTeam'
import PitchDeck from './views/PitchDeck'
import ResetPassword from './views/ResetPassword'

import Onboard from './views/Student/Onboard'
import Home from './views/Student/Home'
import Calendar from './views/Student/Calendar'
import MyClasses from './views/Student/MyClasses'
import Tasks from './views/Student/Tasks'
import Verification from './views/components/Verification'
import ClassLink from './views/Student/ClassLink'
import ClassDetail from './views/Student/ClassDetail'
import AssignmentDetail from './views/Student/AssignmentDetail'
import AddAssignment from './views/Student/Assignments/AddAssignment'
import SharePartnerLink from './views/Student/MiscViews/SharePartnerLink'

import SyllabusTool from './views/SyllabusTool'
import ClassAdmin from './views/ClassAdmin'
import AssignmentAdmin from './views/AssignmentAdmin'

import HubLanding from './views/Hub/HubLanding'
import HubSchools from './views/Hub/HubSchools'
import HubClasses from './views/Hub/HubClasses'
import SchoolInfo from './views/Hub/SchoolInfo'
import Accounts from './views/Hub/Accounts'
import AccountInfo from './views/Hub/AccountInfo'
import Analytics from './views/Hub/Analytics'
import Switchboard from './views/Hub/Switchboard'
import ReportList from './views/Hub/ReportList'

import Enroll from './views/EnrollmentLink/Enroll'
import DownloadApp from './views/components/DownloadApp'

import actions from './actions'
import stores from './stores'
const {userStore} = stores

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/app"/>
      <Route path='/landing' component={Landing} />
      <Route path='/admin-login' component={AdminLanding} />
      <Route path='/forgot_password' component={ForgotPassword} />
      <Route path='/unsubscribe/:id' component={Unsubscribe} />
      <Route path='/reset_password' component={ResetPassword} />
      <Route path='/privacypolicy' component={PrivacyPolicy} />
      <Route path='/useragreement' component={UserAgreement} />
      <Route path='/learn-more' component={LearnMore} />
      <Route path='/what-people-say' component={PeopleTalking} />
      <Route path='/our-team' component={OurTeam} />
      <Route path='/faq' component={Faq} />
      <Route path='/enroll' component={Enroll} />

      <Route path='/c(/:partner)' component={Onboard} type='onboard' />
      <Route path='/o(/:partner)' component={Onboard} type='onboard' />
      <Route path='/e/:link' component={Onboard} type='e' />
      <Route path='/s/:link' component={Onboard} type='s' />

      <Route path='/download' component={DownloadApp} />
      <Route path='/pitch-deck' component={PitchDeck} />

      <Route path='/app' component={Layout} onEnter={requireAuth}>
        <IndexRedirect to='/student/home' />
        <Route path='/student'>
          <IndexRedirect to='/student/home'/>
          <Route path='/student/home' component={Home} />
          <Route path='/student/tasks' component={Tasks} />
          <Route path='/student/share/:partner' component={SharePartnerLink} />
          <Route path='/student/verify' component={Verification} onEnter={authOnboard} />
          <Route path='/student/class-link' component={ClassLink} />
          <Route path='/student/calendar' component={Calendar}/>
          <Route path='/student/classes' component={MyClasses}/>
          <Route path='/student/class/:classId' component={ClassDetail} />
          <Route path='/student/class/:classId/assignments/:assignmentId' component={AssignmentDetail} />
          <Route path='/student/class/:classId/add-assignment' component={AddAssignment} />
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
          <Route path='/hub/reports' component={ReportList} />
        </Route>

        <Route path='/class/:classId/syllabus_tool' component={SyllabusTool} />
        <Route path='/class/:classId/admin(/:tabState)' component={ClassAdmin} onEnter={requireAdmin} />
        <Route path='/assignment/:assignmentId/admin' component={AssignmentAdmin} onEnter={requireAdmin} />
      </Route>
      <Route path="/logout" onEnter={logout} />
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
)

/*
* Require users to not be students
*/
function requireAdmin (nextState, replaceState) {
  if (!userStore.user) {
    userStore.setFetchingUser(true)
    userStore.authToken = cookie.get('skollerToken')
    actions.auth.getUserByToken()
      .then((user) => {
        authenticateStudent(user.user).then(() => {
          userStore.setFetchingUser(false)
        }).catch(() => { userStore.setFetchingUser(false) })

        if (userStore.user) {
          if (userStore.user.student) {
            userStore.setFetchingUser(false)
            browserHistory.push('/student/classes')
          }
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
        }).catch(() => { userStore.setFetchingUser(false) })

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
    // return actions.classes.getStudentClassesById(user.student.id).then((classes) => {
    //   if (classes.length === 0) {
    //     browserHistory.push('/student/find-classes')
    //   }
    // }).catch(() => false)
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
