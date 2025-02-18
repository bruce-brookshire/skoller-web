import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../components/Modal'
import NoteForm from '../../ClassAdmin/NoteForm'
import Card from '../../../components/Card'

class ClassNotes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openNoteCreateModal: false
    }
  }

  onCreateNote (cl) {
    this.props.onCreateNote(cl)
    this.toggleNoteModal()
  }

  toggleNoteModal () {
    this.setState({openNoteCreateModal: !this.state.openNoteCreateModal})
  }

  /*
  * Renders posts from the array held in state
  */
  renderNotes () {
    return this.props.cl.notes.map((n, idx) => {
      return (
        <div className='notes-container' key={`notes-${idx}`}>
          {n.notes}
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

  renderNoteModal () {
    const {cl} = this.props
    return (
      <Modal
        open={this.state.openNoteCreateModal}
        onClose={this.toggleNoteModal.bind(this)}
      >
        <NoteForm
          cl={cl}
          onCreateNote={this.onCreateNote.bind(this)}
        />
      </Modal>
    )
  }

  render () {
    return (
      <Card
        title={
          [<span key='cn-class-notes-title'>Notes</span>, <i key='cn-class-notes-icon' className='fa fa-plus cn-blue cursor' onClick={this.toggleNoteModal.bind(this)}/>]
        }
        boxClassName={this.props.boxClassName}
        contentClassName={this.props.contentClassName}
        content={
          <div className='notes'>
            {this.props.cl.notes &&
              <div>
                {this.props.cl.notes.length > 0 ? (
                  this.renderNotes()
                ) : this.renderNoNotes()}
                {this.renderNoteModal()}
              </div>
            }
          </div>
        }
      />
    )
  }
}

ClassNotes.propTypes = {
  cl: PropTypes.object,
  onCreateNote: PropTypes.func.isRequired,
  boxClassName: PropTypes.string,
  contentClassName: PropTypes.string
}

export default ClassNotes
