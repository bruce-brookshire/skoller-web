import React from 'react'
import PropTypes from 'prop-types'
import CopyBox from '../../components/CopyBox'

class ShareNoClasses extends React.Component {
  renderContent () {
    return (
      <div className='sk-share-no-classes'>
        <h2>Send Your Link to Classmates</h2>
        {this.props.partner
          ? <p
            style={{color: '#' + this.props.partner.primaryColor, margin: '0'}}
          >
            Money is donated every time a student signs up with this link!
          </p>
          : <p>Click the box to copy your personal Skoller link!</p>
        }
        <div>
          <CopyBox
            linkValue={this.props.partner ? 'https://skoller.co/c/' + this.props.partner.slug : this.props.user.student.enrollment_link}
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
  user: PropTypes.object,
  partner: PropTypes.object
}

export default ShareNoClasses
