import 'isomorphic-fetch'
import React from 'react'
import PropTypes from 'prop-types'
import ProjectFourDoor from './ProjectFourDoor'
import UploadHistory from '../../../components/UploadHistory'
import actions from '../../../actions'
import Card from '../../../components/Card'

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
      uploading: false
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
    return (cl.status && cl.status.name !== 'Complete' && cl.status.name !== 'Help' && cl.status.name !== 'Change')
  }

  /*
  * Determine if the class is in 'needs syllabus' state to render Project4Door.
  *
  * @return [Boolean]. boolean indicating if the class is in needs syllabus
  */
  needsSyllabus () {
    const {cl} = this.props
    return (cl.status && cl.status.name === 'Needs Syllabus')
  }

  renderDuplicateFileMessage () {
    if (this.state.duplicateFile) {
      return (<h5 className='center-text' style={{color: 'red', marginTop: '10px', marginBottom: '-20px'}}>{this.state.duplicateFile} has already been added</h5>)
    } else {
      return null
    }
  }

  renderTitle () {
    if (this.needsSyllabus()) {
      return (
        <div className='cn-red'>Syllabus needed</div>
      )
    }
  }

  renderNeedsSyllabus () {
    const {unsavedSyllabusDocs, unsavedAdditionalDocs, uploading} = this.state
    let hasUnsavedSyllabi = unsavedSyllabusDocs && unsavedSyllabusDocs.length > 0
    return (
      <div>
        {this.renderDuplicateFileMessage()}
        <UploadHistory
          disabled={!this.isUploadAllowed() || this.getSyllabusDocuments().length > 0}
          files={this.getSyllabusDocuments()}
          unsavedDocuments={unsavedSyllabusDocs}
          info='Upload your class syllabus.'
          onUpload={(file) => { this.onUpload(file, true) }}
          title={!this.isUploadAllowed()
            ? 'The syllabus for this class has already been submitted.'
            : (unsavedSyllabusDocs.length === 0 ? 'Drop syllabus here' : '')
          }
          onDeleteDocument={(ind) => { this.deleteSyllabus(ind) }}
        />
        <UploadHistory
          disabled={!this.isUploadAllowed()}
          files={this.getAdditionalDocuments()}
          unsavedDocuments={unsavedAdditionalDocs}
          info='If assignment schedules or grading info are provided, drop them here.'
          onUpload={(file) => { this.onUpload(file, false) }}
          title='Drop any additional documents (optional)'
          onDeleteDocument={(ind) => { this.deleteAdditional(ind) }}
        />
        <button className={`button full-width margin-top cn-shadow-box ${hasUnsavedSyllabi && !uploading ? '' : 'disabled'}`}
          disabled={!hasUnsavedSyllabi || uploading}
          onClick={() => { this.uploadDocuments() }}>{uploading ? (<i className='fa fa-circle-o-notch fa-spin'></i>) : 'Submit'}
        </button>
        {/* <ProjectFourDoor cl={this.props.cl}
          onSubmit={() => { this.uploadDocuments() }}
          unsavedSyllabi={this.state.unsavedSyllabusDocs}
          unsavedAdditional={this.state.unsavedAdditionalDocs}
          uploading={this.state.uploading}
        /> */}
      </div>
    )
  }

  renderContent () {
    if (this.needsSyllabus()) {
      return this.renderNeedsSyllabus()
    }
  }

  render () {
    return (
      <Card
        title={this.renderTitle()}
        content={this.renderContent()}
      />
    )
  }
}

UploadDocuments.propTypes = {
  cl: PropTypes.object
}

export default UploadDocuments
