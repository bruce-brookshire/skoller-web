import React from 'react'
import { Cookies } from 'react-cookie'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import App from './containers/App'
import Layout from './containers/Layout'

import Landing from './views/Landing'
import AdminLanding from './views/Hub/AdminLanding'
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

// student
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
import Insights from './views/Student/Insights'

import SyllabusTool from './views/SyllabusTool'
import ClassAdmin from './views/ClassAdmin'
import AssignmentAdmin from './views/AssignmentAdmin'

// hub
import HubLanding from './views/Hub/HubLanding'
import HubSchools from './views/Hub/HubSchools'
import HubClasses from './views/Hub/HubClasses'
import HubInsights from './views/Hub/HubInsights'
import SchoolInfo from './views/Hub/SchoolInfo'
import Accounts from './views/Hub/Accounts'
import AccountInfo from './views/Hub/AccountInfo'
import Analytics from './views/Hub/Analytics'
import Switchboard from './views/Hub/Switchboard'
import ReportList from './views/Hub/ReportList'

import Enroll from './views/EnrollmentLink/Enroll'
import DownloadApp from './views/components/DownloadApp'

// skoller insights
import InsightsLanding from './views/Insights/Landing'
import Dashboard from './views/Insights/Dashboard'
import Students from './views/Insights/Students'
import Groups from './views/Insights/Groups'
import Organization from './views/Insights/Organization'
import InsightsLayout from './views/components/InsightsLayout'
import StudentDetail from './views/Insights/StudentDetail'
import Settings from './views/Insights/Settings'

// student - skoller jobs
import Jobs from './views/Student/Jobs'
import Profile from './views/Student/Jobs/Profile'
import JobsBrowse from './views/Student/Jobs/Browse'
import JobDetail from './views/Student/Jobs/JobDetail'

import actions from './actions'
import stores from './stores'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import GroupDetail from './views/Insights/GroupDetail'
import InvitationDetail from './views/Insights/StudentDetail/InvitationDetail'
import SiStudentClassDetail from './views/Insights/StudentDetail/SiStudentClassDetail'
import SiStudentAssignmentDetail from './views/Insights/StudentDetail/SiStudentAssignmentDetail'

const {userStore} = stores

@inject('rootStore') @observer
class AuthSwitch extends React.Component {
  constructor (props) {
    super(props)
    let from = this.props.location.state ? this.props.location.state.from || null : null

    this.state = {
      path: null,
      from
    }

    userStore.setFetchingUser(true)

    this.cookie = new Cookies()
  }

  async componentDidMount () {
    let path
    userStore.setFetchingUser(true)
    userStore.authToken = this.cookie.get('skollerToken')
    if (!userStore.user) {
      await actions.auth.getUserByToken()
        .then((user) => {
          userStore.setFetchingUser(false)
          userStore.user = user.user
          if (user.user.roles.filter(role => role.id === 100).length > 0) {
            path = '/student'
          } else if (user.user.roles.filter(role => role.id === 200).length > 0) {
            path = '/hub'
          } else if (user.user.roles.filter(role => role.id === 300).length > 0) {
            path = '/hub'
          }
          this.setState({path: this.state.from || path})
        })
        .catch((e) => {
          userStore.setFetchingUser(false)
        })
    } else {
      path = '/student'
      this.setState({path: this.state.from || path})
    }
    userStore.setFetchingUser(false)
  }

  render () {
    return (
      <div>
        {this.state.path
          ? <Route render={() => <Redirect to={this.state.path} />} />
          : this.props.rootStore.userStore.fetchingUser ? <div /> : <Landing />
        }
      </div>
    )
  }
}

AuthSwitch.propTypes = {
  location: PropTypes.object,
  rootStore: PropTypes.object
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

ProtectedRoute.propTypes = {
  children: PropTypes.object
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
        <Route exact path='/hub/insights' component={HubInsights} />
      </Switch>
    )
  }
}

class InsightsContainer extends React.Component {
  render () {
    return (
      <Switch>
        <InsightsLayout>
          <Route exact path='/insights/dashboard' component={Dashboard} />
          <Route exact path='/insights/students' component={Students} />
          <Route exact path='/insights/students/:orgStudentId' component={StudentDetail} />
          <Route exact path='/insights/students/:orgStudentId/classes/:classId' component={SiStudentClassDetail} />
          <Route exact path='/insights/invitations/:invitationId/classes/:classId' component={SiStudentClassDetail} />
          <Route exact path='/insights/students/:orgStudentId/classes/:classId/assignments/:assignmentId' component={SiStudentAssignmentDetail} />
          <Route exact path='/insights/invitations/:invitationId/classes/:classId/assignments/:assignmentId' component={SiStudentAssignmentDetail} />
          <Route exact path='/insights/invitations/:invitationId' component={InvitationDetail} />
          <Route exact path='/insights/groups' component={Groups} />
          <Route exact path='/insights/groups/:orgGroupId' component={GroupDetail} />
          <Route exact path='/insights/organization' component={Organization} />
          <Route exact path='/insights/settings' component={Settings} />
        </InsightsLayout>
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
    stores.navStore.setJobsMode(true)
  }

  componentWillUnmount () {
    stores.navStore.setJobsMode(false)
  }

  render () {
    return (
      <Switch>
        {/* <Route component={Profile} /> */}
        <Route exact path='/student/jobs' render={() => <Redirect to='/student/jobs/home' />} />
        <Route path='/student/jobs/home' component={Jobs} />
        <Route path='/student/jobs/profile' component={Profile} />
        <Route path='/student/jobs/browse' component={JobsBrowse} />
        <Route path='/student/jobs/job-details/:jobId' component={JobDetail} />
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
        <Route path='/student/insights' component={Insights} />
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

        <Route path="/logout" render={(props) => logout(props)} />

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

        <Route exact path='/insights' component={InsightsLanding} />
        <ProtectedRoute path='/insights'>
          <InsightsContainer />
        </ProtectedRoute>

        <Route path='/jobs' render={() => <Redirect to="/student/jobs"/>} />
        <Route path='*' render={() => <Redirect to="/"/>} />
      </Switch>
    </App>
  </Router>
)

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
function logout (props) {
  cookie.remove('skollerToken', { path: '/' })
  userStore.user = null
  if (props.location.redirect) {
    return <Route render={() => <Redirect to={props.location.redirect} />} />
  } else {
    return <Route render={() => <Redirect to='/' />} />
  }
}

export default(router)
