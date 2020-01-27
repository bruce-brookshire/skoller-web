import 'isomorphic-fetch'
import React from 'react'
import PropTypes from 'prop-types'
import ProjectFourDoor from './ProjectFourDoor'
import UploadHistory from '../../../components/UploadHistory'
import actions from '../../../actions'
import StudentRequestModal from './StudentRequestModal'
import { withRouter } from 'react-router-dom'

class UploadDocuments extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch the documents for a class.
  */
  componentWillMount () {
    actions.documents.getClassDocuments(this.props.cl.id).then(documents => {
      this.setState({documents})
    }).catch(() => false)
  }

  /*
  * Initialize the state
  */
  initializeState () {
    return {
      documents: [],
      duplicateFile: false,
      unsavedAdditionalDocs: [],
      unsavedSyllabusDocs: [],
      uploading: false,
      openStudentRequestModal: false,
      studentModalMessageShowing: false,
      studentModalError: null,
      viewDocs: false
    }
  }

  /*
  * Get the syllabis for the class.
  */
  getSyllabusDocuments () {
    return this.state.documents.filter(document => document.is_syllabus === true)
  }

  /*
  * Get the additional documents for the class.
  */
  getAdditionalDocuments () {
    return this.state.documents.filter(document => document.is_syllabus !== true)
  }

  /*
  * Determines if the user has submitted a duplicate file
  */
  isDuplicateFile (newFile) {
    let combined = this.state.unsavedSyllabusDocs.concat(this.state.unsavedAdditionalDocs)
    let names = combined.map(file => file.name)
    return names.indexOf(newFile.name) > -1 ? newFile.name : false
  }

  /*
  * Run when the modal errors out
  *
  * @return null.
  */
  onStudentRequestModalError () {
    this.setState({
      studentModalMessageShowing: true,
      studentModalError: true,
      openStudentRequestModal: false
    })
    setTimeout(() => {
      this.setState({
        studentModalMessageShowing: false
      })
    }, 3000)
  }

  /*
  * Run when the modal change is successful
  *
  * @return null.
  */
  onStudentRequestModalSuccess () {
    this.setState({
      studentModalMessageShowing: true,
      studentModalError: false,
      openStudentRequestModal: false
    })
    setTimeout(() => {
      this.setState({
        studentModalMessageShowing: false
      })
    }, 3000)
  }

  /*
  * Save ref to unsaved upload.
  *
  * @param [Object] file. File uploaded
  * @param [Boolean] isSyllabus. Boolean indicating if the file is a syllabus upload.
  */
  onUpload (file, isSyllabus) {
    let duplicate = this.isDuplicateFile(file)
    if (duplicate) {
      this.setState({duplicateFile: duplicate})
      setTimeout(() => {
        this.setState({duplicateFile: false})
      }, 2000)
    } else if (isSyllabus) {
      let newSyllabi = this.state.unsavedSyllabusDocs
      newSyllabi.push(file)
      this.setState({unsavedSyllabusDocs: newSyllabi})
    } else {
      let newAddtl = this.state.unsavedAdditionalDocs
      newAddtl.push(file)
      this.setState({unsavedAdditionalDocs: newAddtl})
    }
  }

  /*
  * Toggle the student request modal.
  *
  * @return null.
  */
  toggleStudentRequestModal () {
    this.setState({openStudentRequestModal: !this.state.openStudentRequestModal})
  }

  /*
  * Handle file upload.
  *
  * @param [Object] file. File uploaded
  * @param [Integer] idx. Index of the file being uploaded to be removed from unsaved array
  * @param [Boolean] isSyllabus. Boolean indicating if the file is a syllabus upload.
  */
  uploadDocument (file, idx, isSyllabus) {
    actions.documents.uploadClassDocument(this.props.cl, file, isSyllabus).then((document) => {
      // Saved Docs
      let newDocuments = this.state.documents
      newDocuments.push(document)
      // Unsaved Docs
      let unsavedSyllabiNew = this.state.unsavedSyllabusDocs
      let unsavedAdditionalNew = this.state.unsavedAdditionalDocs
      isSyllabus ? unsavedSyllabiNew.splice(idx, 1) : unsavedAdditionalNew.splice(idx, 1)
      this.setState({
        documents: newDocuments,
        unsavedSyllabusDocs: unsavedSyllabiNew,
        unsavedAdditionalDocs: unsavedAdditionalNew,
        uploading: !(unsavedSyllabiNew.length === 0 && unsavedAdditionalNew.length === 0)
      })
      this.props.onUpload()
    }).catch(() => false)
  }

  /*
  * Loops through existing unsaved docs and saves them.
  *
  * @return [Boolean]. boolean indicating if the upload was successful.
  */
  uploadDocuments () {
    this.setState({uploading: true})
    // syllabus files
    this.state.unsavedSyllabusDocs.map((file, idx) => {
      this.uploadDocument(file, idx, true)
    })
    // addtl. files
    this.state.unsavedAdditionalDocs.map((file, idx) => {
      this.uploadDocument(file, idx, false)
    })
  }

  /*
  * Removes a doc from the unsaved syllabus arr
  *
  * @return [Boolean]. boolean indicating if the deletion was successful.
  */
  deleteSyllabus (ind) {
    let newArr = this.state.unsavedSyllabusDocs
    newArr.splice(ind, 1)
    let newAddtlArr = this.state.unsavedAdditionalDocs
    if (newArr.length === 0) {
      newAddtlArr = []
    }
    this.setState({
      unsavedSyllabusDocs: newArr,
      unsavedAdditionalDocs: newAddtlArr
    })
  }

  /*
  * Removes a doc from the unsaved additional docs arr
  *
  * @return [Boolean]. boolean indicating if the deletion was successful.
  */
  deleteAdditional (ind) {
    let newArr = this.state.unsavedAdditionalDocs
    newArr.splice(ind, 1)
    this.setState({
      unsavedAdditionalDocs: newArr
    })
  }

  /*
  * Determine if the class is complete.
  *
  * @return [Boolean]. boolean indicating if the class is complete.
  */
  isUploadAllowed () {
    const {cl} = this.props
    return (cl.status && !cl.status.is_complete)
  }

  /*
  * Determine if the class is in 'needs syllabus' state to render Project4Door.
  *
  * @return [Boolean]. boolean indicating if the class is in needs syllabus
  */
  needsSyllabus () {
    const {cl} = this.props
    return (cl.status && cl.status.name === 'Needs Setup')
  }

  /*
  * Determine if the class is in 'needs input' state to render Project4Door.
  *
  * @return [Boolean]. boolean indicating if the class is in needs syllabus
  */
  needsInput () {
    const {cl} = this.props
    return (cl.status && cl.status.name === 'Needs Student Input')
  }

  /*
  * Determine if the class is 'complete'.
  *
  * @return [Boolean]. boolean indicating if the class is complete
  */
  isComplete () {
    const {cl} = this.props
    return (cl.status && cl.status.is_complete)
  }

  renderDuplicateFileMessage () {
    if (this.state.duplicateFile) {
      return (<h5 className='center-text' style={{color: 'red', marginTop: '10px', marginBottom: '-20px'}}>{this.state.duplicateFile} has already been added</h5>)
    } else {
      return null
    }
  }

  renderTitle () {
    const {viewDocs} = this.state
    if (this.needsSyllabus()) {
      return (
        <div className='cn-blue'><i className='fas fa-user-edit margin-right' />Set up this class</div>
      )
    } else if (this.needsInput()) {
      return (
        <div className='cn-orange'><i className='fas fa-exclamation-circle margin-right' />We need some help here...</div>
      )
    } else if (viewDocs) {
      return (
        <div className='cn-grey'>Documents Uploaded</div>
      )
    } else if (this.isComplete()) {
      return (
        <div className='cn-green'><i className='fas fa-check-square margin-right' />This class is live</div>
      )
    } else {
      return (
        <div><i className='far fa-clock margin-right' />The syllabus is in-review</div>
      )
    }
  }

  renderDocView () {
    const {unsavedSyllabusDocs, unsavedAdditionalDocs} = this.state
    return (
      <div className='margin-bottom'>
        <div className='cn-upload-doc-subtitle center-text margin-bottom'>
          Submit the syllabus
        </div>
        <div className='cn-upload-doc-descript cn-grey center-text margin-bottom'>
          Skoller's team will set up this class within 24 hours of submitting
        </div>
        {this.renderDuplicateFileMessage()}
        <div className='margin-bottom'>
          <UploadHistory
            disabled={!this.isUploadAllowed() || this.getSyllabusDocuments().length > 0}
            files={this.getSyllabusDocuments()}
            unsavedDocuments={unsavedSyllabusDocs}
            onUpload={(file) => { this.onUpload(file, true) }}
            title={!this.isUploadAllowed()
              ? 'The syllabus for this class has already been submitted.'
              : (unsavedSyllabusDocs.length === 0 ? 'Drop the main class syllabus here' : '')
            }
            onDeleteDocument={(ind) => { this.deleteSyllabus(ind) }}
          />
        </div>
        <div className='margin-bottom'>
          <UploadHistory
            disabled={!this.isUploadAllowed()}
            files={this.getAdditionalDocuments()}
            unsavedDocuments={unsavedAdditionalDocs}
            onUpload={(file) => { this.onUpload(file, false) }}
            title='Drop separate assignment/lab schedules here'
            onDeleteDocument={(ind) => { this.deleteAdditional(ind) }}
          />
        </div>
      </div>
    )
  }

  onInstantStart () {
    const {cl} = this.props
    this.props.history.push({
      pathname: `/class/${cl.id}/syllabus_tool/`,
      state: {
        isDIY: true
      }
    })
  }

  renderNeedsSyllabus () {
    const {unsavedSyllabusDocs, uploading} = this.state
    let hasUnsavedSyllabi = unsavedSyllabusDocs && unsavedSyllabusDocs.length > 0
    const {is_diy_enabled: diy, is_diy_preferred: diyPref} = this.props.cl.school
    var firstCol = null
    var divider = null
    if (diy || diyPref) {
      firstCol = <div className="cn-upload-doc-col">
        <div className='cn-upload-doc-subtitle center-text'>Instant Setup</div>
        <div className='cn-upload-doc-descript center-text margin-bottom'>Do it yourself without submitting the syllabus!</div>
        <button className='button margin-top cn-shadow-box button-fixed align-center-self'
          onClick={this.onInstantStart.bind(this)}>
          Start
        </button>
      </div>
      divider = <div className="cn-upload-doc-divider">
        <div className="cn-upload-doc-divider-line cn-grey-background">
        </div>
        <div className="cn-upload-doc-divider-text cn-grey">
        OR
        </div>
        <div className="cn-upload-doc-divider-line cn-grey-background">
        </div>
      </div>
    }
    return (
      <div className="cn-upload-doc-cols">
        {firstCol}
        {divider}
        <div className="cn-upload-doc-col">
          {this.renderDocView()}
          <button className={`button button-fixed align-center-self margin-top cn-shadow-box ${hasUnsavedSyllabi && !uploading ? '' : 'disabled'}`}
            disabled={!hasUnsavedSyllabi || uploading}
            onClick={() => { this.uploadDocuments() }}>{uploading ? (<i className='fa fa-circle-o-notch fa-spin'></i>) : 'Submit'}
          </button>
        </div>
      </div>
    )
  }

  renderNeedAssistance () {
    const {cl} = this.props
    const {openStudentRequestModal} = this.state
    return (
      <div>
        <div className='center-text'>
          <a onClick={() => { this.toggleStudentRequestModal() }}>Need assistance?</a>
        </div>
        {this.renderRequestModalMessage()}
        <StudentRequestModal
          open={openStudentRequestModal}
          onClose={() => this.toggleStudentRequestModal.bind(this)}
          onError={() => { this.onStudentRequestModalError() }}
          onSuccess={() => { this.onStudentRequestModalSuccess() }}
          cl={cl}>
        </StudentRequestModal>
      </div>
    )
  }

  renderRequestModalMessage () {
    const {studentModalMessageShowing, studentModalError} = this.state
    if (studentModalMessageShowing) {
      return (
        <div className='center-text request-modal-message'>
          {studentModalError ? 'Error creating request.' : 'Your request has been received. Thank you!'}
        </div>
      )
    } else {
      return null
    }
  }

  renderFourDoor () {
    return (
      <div id='cn-upload-doc-content'>
        <div id='cn-project-four-door-box' className='margin-bottom'>
          <ProjectFourDoor cl={this.props.cl} />
        </div>
        <div id='cn-project-four-door-toolbar'>
          {this.renderToolbar()}
        </div>
      </div>
    )
  }

  renderContent () {
    const {viewDocs} = this.state
    if (this.needsInput()) {
      return this.renderFourDoor()
    } else if (viewDocs) {
      return (
        <div>
          {this.renderDocView()}
          {this.renderToolbar()}
        </div>
      )
    } else {
      return this.renderFourDoor()
    }
  }

  renderToolbar () {
    const {viewDocs} = this.state
    return (
      <div id='cn-upload-doc-toolbar'>
        {this.renderNeedAssistance()}
        {viewDocs ? this.renderViewStatus() : this.renderViewDocs()}
      </div>
    )
  }

  renderViewDocs () {
    const {viewDocs} = this.state
    return (
      <div className='center-text'>
        <a onClick={() => { this.setState({viewDocs: !viewDocs}) }}>View Documents</a>
      </div>
    )
  }

  renderViewStatus () {
    const {viewDocs} = this.state
    return (
      <div className='center-text'>
        <a onClick={() => { this.setState({viewDocs: !viewDocs}) }}>View Status</a>
      </div>
    )
  }

  render () {
    return (
      this.renderContent()
    )
  }
}

UploadDocuments.propTypes = {
  cl: PropTypes.object.isRequired,
  onUpload: PropTypes.func
}

export default withRouter(UploadDocuments)
