import React from 'react'
import inReview from '../../../assets/images/class_status/in-review.png'
import sendSyllabus from '../../../assets/images/class_status/sendSyllabus.png'
import needsStudentInput from '../../../assets/images/class_status/needs-student-input.png'
import syllabusOverload from '../../../assets/images/class_status/syllabus-overload.png'
import live from '../../../assets/images/class_status/todolist_gif.gif'
import PropTypes from 'prop-types'

class ClassStatusImage extends React.Component {
  render () {
    let image = sendSyllabus
    if (this.props.status === 1200) {
      image = inReview
    } else if (this.props.status === 1300) {
      image = syllabusOverload
    } else if (this.props.status === 1400) {
      image = live
    } else if (this.props.status === 1500) {
      image = syllabusOverload
    }
    return (
      <div style={{
        height: this.props.status === 1400 ? '400px' : '300px',
        width: '300px',
        backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        textAlign: 'center'
      }}>
        {/* <img style={{width: '100%', height: 'auto', maxHeight: '200px'}} src={image} /> */}
        {this.props.status === 1400 &&
          <h3>This class is already LIVE on Skoller!</h3>
        }
      </div>
    )
  }
}

ClassStatusImage.propTypes = {
  status: PropTypes.number
}

export default ClassStatusImage
