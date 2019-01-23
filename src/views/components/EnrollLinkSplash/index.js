import React from 'react'
import PropTypes from 'prop-types'

class EnrollLinkSplash extends React.Component {
  userImage () {
    const {linkDetail} = this.props
    if (linkDetail && linkDetail.student_image_path) {
      return linkDetail.student_image_path
    } else {
      return '../src/assets/images/sammi-square.png'
    }
  }

  userName () {
    const {linkDetail} = this.props
    if (linkDetail && linkDetail.student_name_first) {
      return linkDetail.student_name_first
    } else {
      return 'A student'
    }
  }

  className () {
    const {linkDetail} = this.props
    if (linkDetail && linkDetail.class_name) {
      return linkDetail.class_name
    } else {
      return 'Skoller'
    }
  }

  render () {
    return (
      <div className='cn-enrollsplash-container'>
        <div className='cn-enrollsplash-banner'>
          <div className='cn-enrollsplash-userpic-container'>
            <img src={this.userImage()} className='cn-enrollsplash-userpic'/>
          </div>
          <div className='cn-enrollsplash-bannertxt'>
            <b>{this.userName()}</b>
            <br/>
            invites you to join <b>{this.className()}</b>!
          </div>
        </div>
        <div className='cn-enrollsplash-content'>
          <div className='cn-enrollsplash-image-container'>
            <img src='../src/assets/images/confetti_phone.png' className='cn-enrollsplash-image'/>
          </div>
          <div className='cn-enrollsplash-descript'>
            <b>Skoller is a FREE app</b> that makes it easy for classmates to collaborate, stay organized & keep up with classes, together.
          </div>
        </div>
        <button className='button full-width margin-top' onClick={this.props.onSubmit}>
          Join Now
        </button>
      </div>
    )
  }
}

export default EnrollLinkSplash

EnrollLinkSplash.propTypes = {
  onSubmit: PropTypes.func,
  linkDetail: PropTypes.object
}
