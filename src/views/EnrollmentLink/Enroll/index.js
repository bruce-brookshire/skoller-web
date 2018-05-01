import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import LandingNav from '../../components/LandingNav'

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
          
        </div>
      </div>
    )
  }
}

Enroll.PropTypes = {
  location: PropTypes.object.isRequired
}

export default Enroll
