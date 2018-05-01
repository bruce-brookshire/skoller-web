import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import LandingNav from '../../components/LandingNav'
import SignUpForm from '../../components/SignUpForm'

class Enroll extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  initializeState () {
    return {
    }
  }

  componentWillMount () {
  }

  onSubmit () {
  }

  render () {
    return (
      <div className='cn-enrollment-link-container'>
        <LandingNav
          noLogin={true}
          imgPath='../src/assets/images/logo-wide-blue@1x.png'
        />
        <div className='cn-enrollment-link-content'>
          <div className='cn-create-account-header'>
            Create your account
          </div>
          <div className='cn-create-account-subheader'>
            This information will help your classmates identify you.
          </div>
          <SignUpForm />
        </div>
      </div>
    )
  }
}

Enroll.PropTypes = {
  location: PropTypes.object.isRequired
}

export default Enroll
