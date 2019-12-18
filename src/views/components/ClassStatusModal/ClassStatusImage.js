import React from 'react'
import inReview from '../../../assets/images/class_status/in-review.png'
import sendSyllabus from '../../../assets/images/class_status/sendSyllabus.png'
import needsStudentInput from '../../../assets/images/class_status/needs-student-input.png'
import syllabusOverload from '../../../assets/images/class_status/syllabus-overload.png'
import live from '../../../assets/images/class_status/todolist_gif.gif'
import PropTypes from 'prop-types'

class ClassStatusImage extends React.Component {
  render () {
    console.log(this.props.status)
    let image = sendSyllabus
    if (this.props.status === 1200) {
      image = inReview
    } else if (this.props.status === 1300) {
      image = syllabusOverload
    } else if (this.props.status === 1400) {
      image = live
    }
    console.log(image)
    return (
      <div style={{height: '300px', width: '300px', backgroundImage: `url(${image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>
        {/* <img style={{width: '100%', height: 'auto', maxHeight: '200px'}} src={image} /> */}
        <p>.</p>
      </div>
    )
  }
}

ClassStatusImage.propTypes = {
  status: PropTypes.number
}

export default ClassStatusImage
