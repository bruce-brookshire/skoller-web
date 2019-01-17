import React from 'react'
import { Cookies } from 'react-cookie'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import LandingNav from '../../components/LandingNav'
import EnrollLinkSplash from '../../components/EnrollLinkSplash'
import {browserHistory} from 'react-router'
import {inject, observer} from 'mobx-react'
import {mobilecheck} from '../../../utilities/display'

const cookie = new Cookies()

@inject('rootStore') @observer
class EnrollmentLink extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      linkDetail: null
    }
  }

  componentWillMount () {
    actions.classes.getClassByLink(this.props.params.link).then((linkDetail) => {
      this.setState({linkDetail})
    }).catch(() => false)
  }

  enroll () {
    actions.classes.enrollByLink(this.props.params.link)
      .then(() => {
        if (!mobilecheck()) browserHistory.push('/student/classes')
        else browserHistory.push('/download')
      })
      .catch((error) => {
        error.json().then(error => {
          if (error.errors && error.errors.student_class &&
            error.errors.student_class.findIndex(item => item === 'has already been taken') > -1) {
            if (!mobilecheck()) browserHistory.push('/student/classes')
            else browserHistory.push('/download')
          } else {
            browserHistory.push({
              pathname: '/enroll',
              state: {
                enrollmentLink: this.props.params.link
              }
            })
          }
        })
      })
  }

  onSubmit () {
    let {userStore} = this.props.rootStore
    if (!userStore.user) {
      userStore.authToken = cookie.get('skollerToken')
      actions.auth.getUserByToken()
        .then((user) => {
          if (user.user.student && user.user.student.is_verified) {
            this.enroll()
          }
        })
        .catch(() => {
          browserHistory.push({
            pathname: '/enroll',
            state: {
              enrollmentLink: this.props.params.link
            }
          })
        })
    } else {
      this.enroll()
    }
  }

  render () {
    return (
      <div className='cn-enrollment-link-container'>
        <LandingNav
          noLogin={true}
          imgPath='../src/assets/images/logo-wide-blue@1x.png'
        />
        <div className='cn-enrollment-link-content'>
          <EnrollLinkSplash onSubmit={this.onSubmit.bind(this)} linkDetail={this.state.linkDetail} />
        </div>
      </div>
    )
  }
}

EnrollmentLink.propTypes = {
  params: PropTypes.object.isRequired,
  rootStore: PropTypes.func
}

export default EnrollmentLink
