import React from 'react'
import { Cookies } from 'react-cookie'
import { BrowserRouter as Router, Route, Switch, Redirect, IndexRedirect, useHistory } from 'react-router-dom'
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
import SharePartnerLink from './views/Student/Share/SharePartnerLink'
import Share from './views/Student/Share'

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

import Jobs from './views/Student/Jobs'
import Profile from './views/Student/Jobs/Profile'
import Resume from './views/Student/Jobs/Resume'

import actions from './actions'
import stores from './stores'
const {userStore} = stores

class AuthSwitch extends React.Component {
  constructor (props) {
    super(props)
    let from = this.props.location.state ? this.props.location.state.from || null : null

    this.state = {
      path: null,
      from
    }
  }

  async componentDidMount () {
    let path
    userStore.setFetchingUser(true)
    userStore.authToken = cookie.get('skollerToken')
    if (!userStore.user) {
      actions.auth.getUserByToken()
        .then((user) => {
          userStore.setFetchingUser(false)
          userStore.user = user.user
          if (user.user.roles.filter(role => role.id === 100).length > 0) {
            path = '/student'
          } else if (user.user.roles.filter(role => role.id === 200).length > 0) {
            path = '/hub'
          } else if (user.user.roles.filter(role => role.id === 300).length > 0) {
            path = '/hub'
          } else {
            path = '/landing'
          }
          this.setState({path: this.state.from || path})
        })
        .catch(() => {
          userStore.setFetchingUser(false)
          path = '/landing'
          this.setState({path})
        })
    } else {
      path = '/student'
      this.setState({path: this.state.from || path})
    }
  }

  render () {
    return (
      <div>
        {this.state.path
          ? <Route render={() => <Redirect to={this.state.path} />} />
          : <div />
        }
      </div>
    )
  }
}

function ProtectedRoute ({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userStore.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

class HubContainer extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path='/hub' render={() => <Redirect to='/hub/landing' />} />
        <Route exact path='/hub/landing' component={HubLanding}/>
        <Route exact path='/hub/schools' component={HubSchools} />
        <Route exact path='/hub/schools/school/info' component={SchoolInfo} />
        <Route exact path='/hub/classes' component={HubClasses} />
        <Route exact path='/hub/accounts' component={Accounts} />
        <Route exact path='/hub/accounts/account/info' component={AccountInfo} />
        <Route exact path='/hub/analytics' component={Analytics} />
        <Route exact path='/hub/switchboard' component={Switchboard} />
        <Route exact path='/hub/reports' component={ReportList} />
      </Switch>
    )
  }
}

class StudentShareContainer extends React.Component {
  render () {
    return (
      <Switch>
        <Route component={Share} />
        <Route path='/student/share/classes' component={Share} />
        <Route path='/student/share/:partner' component={SharePartnerLink} />
      </Switch>
    )
  }
}

class StudentJobsContainer extends React.Component {
  constructor (props) {
    super(props)
    stores.studentNavStore.setJobsMode(true)
  }

  componentWillUnmount () {
    stores.studentNavStore.setJobsMode(false)
  }

  render () {
    return (
      <Switch>
        <Route component={Profile} />
        {/* <Route path='/student/jobs/home' component={Jobs} /> */}
        <Route path='/student/jobs/profile' component={Profile} />
        {/* <Route path='/student/jobs/resume' component={Resume} /> */}
      </Switch>
    )
  }
}

class StudentContainer extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path='/student' component={Home} />
        <Route path='/student/home' component={Home} />
        <Route path='/student/tasks' component={Tasks} />
        <Route path='/student/share' component={StudentShareContainer} />
        <Route path='/student/verify' component={Verification} onEnter={authOnboard} />
        <Route path='/student/class-link' component={ClassLink} />
        <Route path='/student/calendar' component={Calendar}/>
        <Route path='/student/classes' component={MyClasses}/>
        <Route exact path='/student/class/:classId' component={ClassDetail} />
        <Route path='/student/class/:classId/assignments/:assignmentId' component={AssignmentDetail} />
        <Route path='/student/class/:classId/add-assignment' component={AddAssignment} />
        <Route path='/student/jobs' component={StudentJobsContainer} />
      </Switch>
    )
  }
}

const router = (
  <Router>
    <App>
      <Switch>
        <Route exact path='/' component={AuthSwitch} />
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

        <Route path='/c/:partner?' render={() => <Onboard type='onboard' />} />
        <Route path='/o/:partner?' render={() => <Onboard type='onboard' />} />
        <Route path='/e/:link' render={() => <Onboard type='e' />} />
        <Route path='/s/:link' render={() => <Onboard type='s' />} />

        <Route path='/download' component={DownloadApp} />
        <Route path='/pitch-deck' component={PitchDeck} />

        <Route path="/logout" render={() => logout()} />

        <ProtectedRoute path='/class/:classId/syllabus_tool'>
          <Layout>
            <Route path='/class/:classId/syllabus_tool' component={SyllabusTool} />
          </Layout>
        </ProtectedRoute>

        <ProtectedRoute path='/class/:classId/admin/:tabState?'>
          <Layout>
            <Route path='/class/:classId/admin/:tabState?' component={ClassAdmin} />
          </Layout>
        </ProtectedRoute>

        <ProtectedRoute path='/assignment/:assignmentId/admin'>
          <Layout>
            <Route path='/assignment/:assignmentId/admin' component={AssignmentAdmin} />
          </Layout>
        </ProtectedRoute>

        <ProtectedRoute path='/student'>
          <Layout>
            <StudentContainer />
          </Layout>
        </ProtectedRoute>

        <ProtectedRoute path='/hub'>
          <Layout>
            <HubContainer />
          </Layout>
        </ProtectedRoute>

        <Route path='/jobs' render={() => <Redirect to="/student/jobs"/>} />
        <Route path='*' render={() => <Redirect to="/"/>} />
      </Switch>
      {/* <Switch>
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

        <Route exact path='/' component={AuthSwitch}>
          <Layout>
            <IndexRedirect to='/student/home' />
            <Route path='/student'>
              <IndexRedirect to='/student/home'/>
              <Route path='/student/home' component={Home} onEnter={() => toggleJobsMode(false)} />
              <Route path='/student/tasks' component={Tasks} />
              <Route path='/student/share'>
                <IndexRedirect to='/student/share/classes' />
                <Route path='/student/share/classes' component={Share} />
                <Route path='/student/share/:partner' component={SharePartnerLink} />
              </Route>
              <Route path='/student/verify' component={Verification} onEnter={authOnboard} />
              <Route path='/student/class-link' component={ClassLink} />
              <Route path='/student/calendar' component={Calendar}/>
              <Route path='/student/classes' component={MyClasses}/>
              <Route path='/student/class/:classId' component={ClassDetail} />
              <Route path='/student/class/:classId/assignments/:assignmentId' component={AssignmentDetail} />
              <Route path='/student/class/:classId/add-assignment' component={AddAssignment} />
              <Route path='/student/jobs' onEnter={() => toggleJobsMode(true)} onLeave={() => toggleJobsMode(false)}>
                <IndexRedirect to='/student/jobs/profile' />
                <Route path='/student/jobs/home' component={Jobs} />
                <Route path='/student/jobs/profile' component={Profile} />
                <Route path='/student/jobs/resume' component={Resume} />
              </Route>
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

            <Route path='/jobs'>
              <IndexRedirect to='/student/jobs'/>
            </Route>

            <Route path='/class/:classId/syllabus_tool' component={SyllabusTool} />
            <Route path='/class/:classId/admin(/:tabState)' component={ClassAdmin} onEnter={requireAdmin} />
            <Route path='/assignment/:assignmentId/admin' component={AssignmentAdmin} onEnter={requireAdmin} />
          </Layout>
        </Route>
        <Route path="/logout" onEnter={logout} />
      </Switch> */}
    </App>
  </Router>
)

function toggleJobsMode (bool) {
  if (bool !== null) {
    stores.studentNavStore.toggleJobsMode(bool)
  } else {
    stores.studentNavStore.toggleJobsMode()
  }
}

/*
* Require users to not be students
*/
function requireAdmin (nextState, replaceState) {
  let history = useHistory()
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
            history.push('/student/classes')
          }
        }
        userStore.setFetchingUser(false)
      })
      .catch(() => {
        history.push('/landing')
        userStore.setFetchingUser(false)
      })
  }
}

/*
* Handle strongly typed url
*/
function requireAuth (nextState, replaceState) {
  let history = useHistory()
  if (!userStore.user) {
    userStore.setFetchingUser(true)
    userStore.authToken = cookie.get('skollerToken')
    actions.auth.getUserByToken()
      .then((user) => {
        console.log('getUserByToken', user)

        if (user.user.roles.filter(role => role.id === 100)) {
          authenticateStudent(user.user).then(() => {
            userStore.setFetchingUser(false)
          }).catch(() => { userStore.setFetchingUser(false) })
        } else if (user.user.roles.filter(role => role.id === 200)) {
          console.log('syllabus worker')
          userStore.setFetchingUser(false)
        }
        userStore.setFetchingUser(false)
      })
      .catch((r) => {
        console.log('requireAuth catch', r)
        history.push('/landing')
        userStore.setFetchingUser(false)
      })
  }
}

/*
* Check to see if a users classes is 0 or if they are unverfied. If so send them
* to the onboarding page.
*/
function authenticateStudent (user) {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

/*
* If the user has not been verified, allow access to onboarding.
*/
function authOnboard () {
  let history = useHistory()
  if (userStore.user) {
    if (userStore.user.student) {
      if (userStore.user.student.is_verified) {
        history.push('/student/classes')
      }
    }
  }
}

const cookie = new Cookies()
function logout (nextState, replaceState) {
  cookie.remove('skollerToken', { path: '/' })
  userStore.user = null
  return <Route render={() => <Redirect to='/' />} />
  // replaceState(null, '/landing')
}

export default(router)
