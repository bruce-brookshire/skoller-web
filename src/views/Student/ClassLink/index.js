import React from 'react'
import PropTypes from 'prop-types'

const enrollmentLink = 'localhost:8080/e/4erkl'
const className = 'Business Law'

class ClassLink extends React.Component {
  render () {
    return (
      <div className='cn-class-link-container'>
        <div className='cn-class-link-header'>
          {className} is live! ⚡️
        </div>
        <div className='cn-class-link-text'>
          Now it&apos;s time to grow the community. Click on the box below to copy the sign up link, then send it to your classmates!
        </div>
        <div className='cn-class-link-background'>
          <div className='cn-class-link'>
            {enrollmentLink}
          </div>
        </div>
      </div>
    )
  }
}



export default ClassLink
