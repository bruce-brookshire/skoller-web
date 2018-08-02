import React from 'react'
import PropTypes from 'prop-types'

class ClassNotes extends React.Component {
  /*
  * Renders posts from the array held in state
  */
  renderNotes () {
    return this.props.cl.notes.map((n, idx) => {
      return (
        <div className='notes-container' key={`notes-${idx}`}>
          n.notes
        </div>
      )
    })
  }

  /*
  * Renders content if there are no posts
  */
  renderNoNotes () {
    return (
      <h5 className='center-text'>Currently, there are no notes for this class.</h5>
    )
  }

  render () {
    return (
      <div id='class-editor-chat'>
        <div id='class-editor-chat-content'>
          <div className='class-editor-chat-title'>
            Notes
          </div>
          <div className='notes'>
            {this.props.cl.notes.length > 0 ? (
              this.renderNotes()
            ) : this.renderNoNotes()}
          </div>
        </div>
      </div>
    )
  }
}

ClassNotes.propTypes = {
  cl: PropTypes.object
}

export default ClassNotes
