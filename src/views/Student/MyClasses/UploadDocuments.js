import 'isomorphic-fetch'
import React from 'react'
import PropTypes from 'prop-types'
import ProjectFourDoor from './ProjectFourDoor'
import UploadHistory from '../../../components/UploadHistory'
import actions from '../../../actions'

class UploadDocuments extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.intializeState()
  }

  /*
  * Fetch the documents for a class.
  */
  componentWillMount () {
    actions.documents.getClassDocuments(this.props.cl).then(documents => {
      this.setState({documents})
    }).catch(() => false)
  }

  /*
  * Initialize the state
  */
  intializeState () {
    return {
      documents: []
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
  * Handle file upload.
  *
  * @param [Object] file. File uploaded
  * @param [Boolean] isSyllabus. Boolean indicating if the file is a syllabus upload.
  */
  onDocumentUpload (file, isSyllabus) {
    actions.documents.uploadClassDocument(this.props.cl, file, isSyllabus).then((document) => {
      let newDocuments = this.state.documents
      newDocuments.push(document)
      this.setState({documents: newDocuments})
    }).catch(() => false)
  }


  render () {
    const {cl: {status}} = this.props
    const needsSyllabus = status === 'NEEDS_SYLLABUS' || status === 'NO_FILES' || !status
    const fullWidthClass = !needsSyllabus ? 'full-width' : ''

    return (
      <div className='cn-upload-documents-container'>
        <div className='row'>
          <div className='col-xs-3 vertical-align'>
            <h4>Finish up this class.</h4>
            <span className='info-1'>Upload documents and review syllabi.</span>
          </div>
          <div className='col-xs-3'>
            <UploadHistory
              disabled={this.props.cl.is_syllabus}
              files={this.getSyllabusDocuments()}
              info='Upload your class syllabus.'
              onUpload={(file) => { this.onDocumentUpload(file, true) }}
              title='Main syllabus'
            />
          </div>
          <div className='col-xs-3'>
            <UploadHistory
              files={this.getAdditionalDocuments()}
              info='If assignment schedules or grading info are provided, drop them here.'
              onUpload={(file) => { this.onDocumentUpload(file, false) }}
              title='Drop any additional documents (optional)'
            />
          </div>
          <div className='col-xs-3 vertical-align center'>
            <ProjectFourDoor cl={this.props.cl} />
          </div>
        </div>
      </div>
    )
  }
}

UploadDocuments.propTypes = {
  cl: PropTypes.object
}

export default UploadDocuments
