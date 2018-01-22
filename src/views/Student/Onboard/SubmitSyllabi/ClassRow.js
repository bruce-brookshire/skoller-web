import React from 'react'
import PropTypes from 'prop-types'
import UploadHistory from '../../../../components/UploadHistory'
import actions from '../../../../actions'

class ClassRow extends React.Component {
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
  * Handle checkbox change
  */
  onCheckboxChange () {
    if (this.getSyllabusDocuments().length === 0 && !this.isComplete()) {
      const form = {id: this.props.cl.id, is_syllabus: !this.state.hasSyllabus}
      actions.classes.updateClass(form).then((cl) => {
        // set local state
        this.setState({hasSyllabus: !this.state.hasSyllabus})
        !this.state.hasSyllabus ? this.props.onDocumentsDelete(this.props.cl) : null
        // update the classes arr of parent component
        this.props.onUpdateClass(cl)
      }).catch(() => false)
    }
  }

  /*
  * Determine if the class is complete.
  *
  * @return [Boolean]. boolean indicating if the class is complete.
  */
  isComplete () {
    const {cl} = this.props
    return (cl.status && cl.status.name !== 'New Class' && cl.status.name !== 'Needs Syllabus') ||
    this.getSyllabusDocuments().length > 0
  }

  /*
  * If the class is complete, render a checkmark.
  */
  renderComplete () {
    if (this.isComplete()) {
      return <i className ='fa fa-check' style={{color: '#00f000'}} />
    }
  }

  renderDuplicateFileMessage(){
    if(this.props.duplicate){
      return (<h5 style={{color:'red',marginTop:'5px',marginBottom:'5px'}}>{this.props.duplicate} has already been added</h5>)
    }else {
      return null
    }
  }

  render () {
    const {cl: {name}} = this.props
    return (
      <div className='cn-flex-table-row'>
        <div className='cn-flex-table-cell'>
          <div>
            <span>{name || '-'} {this.renderComplete()}</span>
            {this.renderDuplicateFileMessage()}
            {
              this.isComplete() !== true ? <div>
              <input type='checkbox' onChange={this.onCheckboxChange.bind(this)} checked={!this.state.hasSyllabus}/>
              <span className='checkbox-label'>{`This class doesn't have a syllabus`}</span>
              </div>
              : <span></span>
            }
          </div>
        </div>
        <div className='cn-flex-table-cell'>
          <UploadHistory
            disabled={this.isComplete() || !this.state.hasSyllabus || (this.props.unsavedSyllabusDocs && this.props.unsavedSyllabusDocs.length > 0)}
            files={this.getSyllabusDocuments()}
            info=''
            onDeleteDocument={(ind) => {this.props.onDocumentDelete(this.props.cl,ind,true)}}
            onUpload={(file) => { this.props.onDocumentAdd(this.props.cl,file,true) }}
            title={this.isComplete() ? 'The syllabus for this class has already been submitted.' : 'Drop syllabus here'}
            unsavedDocuments={this.props.unsavedSyllabusDocs}
          />
        </div>
        <div className='cn-flex-table-cell'>
          <UploadHistory
            disabled={this.isComplete() || (this.props.unsavedSyllabusDocs && this.props.unsavedSyllabusDocs.length == 0)}
            files={this.getAdditionalDocuments()}
            info=''
            onDeleteDocument={(ind) => {this.props.onDocumentDelete(this.props.cl,ind,false)}}
            onUpload={(file) => { this.props.onDocumentAdd(this.props.cl,file,false) }}
            title='Drop additional docs here'
            unsavedDocuments={this.props.unsavedAdditionalDocs}
          />
        </div>
      </div>
    )
  }
}

ClassRow.propTypes = {
  cl: PropTypes.object,
  onDocumentAdd: PropTypes.func,
  onDocumentDelete: PropTypes.func,
  unsavedAdditionalDocs: PropTypes.array,
  unsavedSyllabusDocs: PropTypes.array,
}

export default ClassRow
