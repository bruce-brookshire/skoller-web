import React from 'react'
import PropTypes from 'prop-types'
import UploadHistory from '../../../components/UploadHistory'
import actions from '../../../actions'

class ClassRow extends React.Component {
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
      documents: [],
      hasSyllabus: this.props.cl.is_syllabus
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

  /*
  * Handle checkbox change
  */
  onCheckboxChange () {
    if (this.getSyllabusDocuments().length === 0) {
      const form = {id: this.props.cl.id, is_syllabus: !this.state.hasSyllabus}
      actions.classes.updateClass(form).then((cl) => {
        this.setState({hasSyllabus: !this.state.hasSyllabus})
      }).catch(() => false)
    }
  }

  isComplete () {
    const {cl} = this.props
    return (cl.status !== 'New Class' && cl.status !== 'Needs Syllabus')
  }

  renderComplete () {
    if (this.isComplete()) {
      return <i className ='fa fa-check' style={{color: '#00f000'}} />
    }
  }

  render () {
    const {cl: {name}} = this.props
    return (
      <div className='cn-flex-table-row'>
        <div className='cn-flex-table-cell'>
          <div>
            <span>{name || '-'} {this.renderComplete()}</span>
            <div>
              <input type='checkbox' onChange={this.onCheckboxChange.bind(this)} checked={!this.state.hasSyllabus}/>
              <span className='checkbox-label'>{`This class doesn't have a syllabus`}</span>
            </div>
          </div>
        </div>
        <div className='cn-flex-table-cell'>
          <UploadHistory
            disabled={this.state.hasSyllabus || this.isComplete()}
            files={this.getSyllabusDocuments()}
            info=''
            onUpload={(file) => { this.onDocumentUpload(file, true) }}
            title='Drop syllabus here'
          />
        </div>
        <div className='cn-flex-table-cell'>
          <UploadHistory
            disabled={this.isComplete()}
            files={this.getAdditionalDocuments()}
            info=''
            onUpload={(file) => { this.onDocumentUpload(file, false) }}
            title='Drop additional docs here'
          />
        </div>
      </div>
    )
  }
}

ClassRow.propTypes = {
  cl: PropTypes.object
}

export default ClassRow
