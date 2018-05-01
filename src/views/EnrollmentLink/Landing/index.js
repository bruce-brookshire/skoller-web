import React from 'react'
import { Cookies } from 'react-cookie'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import LandingNav from '../../components/LandingNav'
import {browserHistory} from 'react-router'
import stores from '../../../stores'

const {userStore} = stores
const cookie = new Cookies()

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
        browserHistory.push('../student/classes')
      })
      .catch(() => {
        browserHistory.push({
          pathname: '../enroll',
          state: {
            enrollmentLink: this.props.params.link
          }
        })
      })
  }

  onSubmit () {
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
            pathname: '../enroll',
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
    const {linkDetail} = this.state
    return (
      <div className='cn-enrollment-link-container'>
        <LandingNav
          noLogin={true}
          imgPath='../src/assets/images/logo-wide-blue@1x.png'
        />
        <div className='cn-enrollment-link-content'>
          <img className='cn-enrollment-link-pic' src='../src/assets/images/lilpeople.png' />
          <div className='cn-enrollment-link-content-inner'>
            {linkDetail && <div className='cn-enrollment-link-msg'>
              {linkDetail.student_name_first} has invited you to join {linkDetail.class_name}!
            </div>}
            <div>
              Skoller makes it easy for you and your classmates to collaborate,
              chat, and keep up with academic life.
            </div>
            <button
              className='button full-width margin-top'
              onClick={() => this.onSubmit()}
            >
              Join Class
            </button>
          </div>
        </div>
      </div>
    )
  }
}

EnrollmentLink.PropTypes = {
  params: PropTypes.object.isRequired
}

export default EnrollmentLink
