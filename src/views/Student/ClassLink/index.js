import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

class ClassLink extends React.Component {
  render () {
    const {location} = this.props
    return (
      <div className='cn-class-link-container'>
        <div className='cn-class-link-header'>
          {location.state.className} is live! ⚡️
        </div>
        <div className='cn-class-link-text'>
          Now it&apos;s time to grow the community. Click on the box below to copy the sign up link, then send it to your classmates!
        </div>
        <div className='cn-class-link-background'>
          <div className='cn-class-link'>
            {location.state.enrollmentLink}
          </div>
        </div>
        <button
          className='button full-width margin-top'
          onClick={() => {
            browserHistory.push('/student/classes')
          }}>
          Continue to Skoller
        </button>
      </div>
    )
  }
}

ClassLink.propTypes = {
  location: PropTypes.object
}

export default ClassLink
