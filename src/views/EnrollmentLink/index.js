import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../actions'
import LandingNav from '../components/LandingNav'
import stores from '../../stores'

const {userStore} = stores

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

  onSubmit () {
    userStore.enrollmentLink = this.props.params.link
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
