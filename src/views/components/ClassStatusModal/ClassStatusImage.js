import React from 'react'
import inReview from '../../../assets/images/class_status/reviewsyllabus_gif.gif'
import sendSyllabus from '../../../assets/images/class_status/uploadsyllabus_gif.gif'
import syllabusOverload from '../../../assets/images/class_status/syllabusoverload_gif.gif'
import live from '../../../assets/images/class_status/todolist_gif.gif'
import PropTypes from 'prop-types'

const ReloadableGif = (props) => {
  // maybe one day I'll figure out how to force
  // a gif to restart when the component that
  // renders it mounts again. but not today.

  return (
    <img
      src={props.gif}
      style={{
        height: 'auto',
        width: '100%',
        maxWidth: '480px',
        marginLeft: '1rem'
      }}
    />
  )
}

ReloadableGif.propTypes = {
  gif: PropTypes.string
}

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
      <div>
        <ReloadableGif style={{
          height: 'auto',
          width: '100%'
        }} gif={image} />
        {/* {this.props.status === 1400 &&
          <h3>This class is already LIVE on Skoller!</h3>
        } */}
      </div>
    )
  }
}

ClassStatusImage.propTypes = {
  status: PropTypes.number,
  maxWidth: PropTypes.number
}

export default ClassStatusImage
