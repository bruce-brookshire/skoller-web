import React from 'react'
import { Cookies } from 'react-cookie'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import LandingNav from '../../components/LandingNav'
import EnrollLinkSplash from '../../components/EnrollLinkSplash'
import { withRouter } from 'react-router-dom'
import {inject, observer} from 'mobx-react'
import {mobileCheck} from '../../../utilities/display'

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
    actions.classes.getClassByLink(this.props.match.params.link).then((linkDetail) => {
      console.log(linkDetail)
      this.setState({linkDetail})
    }).catch(() => false)
  }

  enroll () {
    actions.classes.enrollByLink(this.props.match.params.link)
      .then(() => {
        if (!mobileCheck()) this.props.history.push('/student/classes')
        else this.props.history.push('/download')
      })
      .catch((error) => {
        error.json().then(error => {
          if (error.errors && error.errors.student_class &&
            error.errors.student_class.findIndex(item => item === 'has already been taken') > -1) {
            if (!mobileCheck()) this.props.history.push('/student/classes')
            else this.props.history.push('/download')
          } else {
            this.props.history.push({
              pathname: '/enroll',
              state: {
                enrollmentLink: this.props.match.params.link
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
          this.props.history.push({
            pathname: '/enroll',
            state: {
              enrollmentLink: this.props.match.params.link
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

export default withRouter(EnrollmentLink)
