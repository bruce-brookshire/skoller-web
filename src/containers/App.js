import PropTypes from 'prop-types'
import React from 'react'
import {inject, observer} from 'mobx-react'
import Snackbar from '../components/Snackbar'
import { withRouter } from 'react-router-dom'

@inject('rootStore') @observer
class App extends React.Component {
  renderSnackBar () {
    const {snackbarStore} = this.props.rootStore
    return <Snackbar message={snackbarStore.message} show={snackbarStore.show} type={snackbarStore.type}/>
  }

  render () {
    // GOOGLE ANALYTICS PAGE VIEW LOGIC USING REACT-ROUTER-DOM'S HISTORY OBJECT
    // this.props.history.listen(l => {
    //   let sendHit = true
    //   let path = l.pathname

    //   let assignmentPath = /\/student\/class\/\d+\/assignments\/\d+/
    //   if (path.match(assignmentPath)) {
    //     path = '/student/class/classId/assignments/assignmentId/'
    //   }

    //   let classPath = /\/student\/class\/\d+/
    //   if (path.match(classPath)) {
    //     path = '/student/class/classId/'
    //   }

    //   let syllabusToolPath = /\/student\/class\/\d+\/syllabus_tool/
    //   if (path.match(syllabusToolPath)) {
    //     path = '/student/class/classId/syllabus_tool'
    //   }

    //   let hubPath = /\/hub/
    //   let adminLoginPath = /\/admin-login/
    //   if (path.match(hubPath) || path.match(adminLoginPath)) {
    //     sendHit = false
    //   }

    //   if (sendHit) {
    //     ReactGA.set({ page: path })
    //     ReactGA.pageview(path)
    //   }
    // })

    return (
      <div className='app public'>
        {this.props.children}
        {this.renderSnackBar()}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node,
  rootStore: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(App)
