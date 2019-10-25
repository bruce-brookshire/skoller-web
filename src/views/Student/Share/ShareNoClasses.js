import React from 'react'
import PropTypes from 'prop-types'
import CopyBox from '../../components/CopyBox'

class ShareNoClasses extends React.Component {
  renderContent () {
    return (
      <div className='sk-share-no-classes'>
        <h2>Send Your Link to Classmates</h2>
        <p>Click the box to copy your personal Skoller link!</p>
        <div>
          <CopyBox
            linkValue={this.props.user.student.enrollment_link}
          />
        </div>
      </div>
    )
  }

  render () {
    return (
      this.renderContent()
    )
  }
}

ShareNoClasses.propTypes = {
  user: PropTypes.object
}

export default ShareNoClasses
