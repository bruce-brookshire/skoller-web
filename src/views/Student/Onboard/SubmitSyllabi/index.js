import React from 'react'
import PropTypes from 'prop-types'
import ClassRow from './ClassRow'
import actions from '../../../../actions'
import {deepClone} from '../../../../utilities/object'

const headers = [
  {
    field: 'classes',
    display: ''
  },
  {
    field: 'syllabus',
    display: 'Main Syllabus'
  },
  {
    field: 'additionaDocs',
    display: 'Additional Docs'
  }
]

const styles = {
  warning: {
    top: '10px',
    maxWidth: '300px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}

class SubmitSyllabi extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      loading: false,
      showUploadWarning: false,
      unsavedDocs: {},
    }
  }

  /*
  * Fetch the classes for a student.
  */
  componentWillMount () {
    this.loadClasses()
  }

  /*
  * Creates blank unsaved docs object
  */
  defaultUnsavedDocs(classes){
    let unsavedDocs = {}
    classes.forEach((item) => {
      unsavedDocs[item.id] = {}
      unsavedDocs[item.id]['additional'] = []
      unsavedDocs[item.id]['syllabus'] = []
    })
    return unsavedDocs
  }

  /*
  * Retrieves all of a student's classes and appropriately instantiates state
  */
  loadClasses() {
    return actions.classes.getStudentClasses().then((classes) => {
      this.setState({
        classes: classes,
        unsavedDocs: this.defaultUnsavedDocs(classes),
      })
    })
  }

  /*
  * Renders the table headers.
  *
  * @return [Array]. Array of <div/>
  */
  renderTableHeaders () {
    return headers.map((header, index) => {
      return <div key={`tableHeader${index}`} className='cn-flex-table-head'>{header.display}</div>
    })
  }

  /*
  * Renders the table body of the grid.
  *
  * @return [Array]. Array of <ClassRows/>
  */
  renderClassOrderByIncomplete () {
    // the only way I can think of sort so that the incomplete classes are at the top is to create two different arrays and merge later
    // as conventional sort can't really achieve this.
    // i first filter to get an array of just the incomplete classes and map them.
    // if you just map, you get undefined holes. causing errors and duplication

    // i first get an array of incomplete classes
    const incompleteArray = this.state.classes.filter(cl => cl.status.name === 'New Class' || cl.status.name === 'Needs Syllabus').map((cl, index) => { return cl })

    // then get an array of complete classes
    const completeArray = this.state.classes.filter(cl => cl.status.name !== 'New Class' && cl.status.name !== 'Needs Syllabus').map((cl, index) => { return cl })

    // then merge them together
    return incompleteArray.concat(completeArray)
  }

  /*
  * Add to unsaved documents arrays.
  *
  * @param [Object] cl. The class it is for
  * @param [Object] file. File uploaded
  * @param [Boolean] isSyllabus. Boolean indicating if the file is a syllabus upload.
  */
  onDocumentAdd(cl,file,isSyllabus){
    let unsavedDocsCopy = deepClone(this.state.unsavedDocs)
    unsavedDocsCopy[cl.id][isSyllabus ? 'syllabus' : 'additional'].push(file)
    this.setState({
      unsavedDocs: unsavedDocsCopy,
    })
  }

  /*
  * Remove from unsaved documents arrays.
  *
  * @param [Object] cl. The class it is for
  * @param [Integer] idx. Index of the file being uploaded to be removed from unsaved array
  * @param [Boolean] isSyllabus. Boolean indicating if the file is a syllabus upload.
  */
  onDocumentDelete(cl,idx,isSyllabus){
    let unsavedDocsCopy = deepClone(this.state.unsavedDocs)
    unsavedDocsCopy[cl.id][isSyllabus ? 'syllabus' : 'additional'].splice(idx,1)
    // If they just deleted the last syllabus doc, have to remove any existing additional docs
    unsavedDocsCopy[cl.id]['syllabus'].length == 0 && isSyllabus ? unsavedDocsCopy[cl.id]['additional'] = [] : null
    this.setState({
      unsavedDocs: unsavedDocsCopy,
    })
  }

  /*
  * Remove all unsaved documents for a given class
  *
  * @param [Object] cl. The class it is for
  */
  onDocumentsDelete(cl){
    let unsavedDocsCopy = deepClone(this.state.unsavedDocs)
    unsavedDocsCopy[cl.id]['syllabus'] = []
    unsavedDocsCopy[cl.id]['additional'] = []
    this.setState({
      unsavedDocs: unsavedDocsCopy,
    })
  }

  /*
  * Update the given class in the 'classes' array of this.state.
  */
  refreshClass (cl) {
    actions.classes.getClassById(cl.id).then(cl => {
      const index = this.state.classes.findIndex(c => c.id === cl.id)
      const newClasses = this.state.classes
      newClasses[index] = cl
      this.setState({classes: newClasses})
    }).catch(() => false)
  }

  renderTableBody () {
    return this.renderClassOrderByIncomplete().map((cl, index) => {
      return (
        <ClassRow
          key={`row-${index}`}
          cl={cl}
          onDocumentAdd={this.onDocumentAdd.bind(this)}
          onDocumentDelete={this.onDocumentDelete.bind(this)}
          onDocumentsDelete={this.onDocumentsDelete.bind(this)}
          onUpdateClass={(c) => { this.refreshClass(c) }}
          unsavedAdditionalDocs={this.state.unsavedDocs[cl.id] ? this.state.unsavedDocs[cl.id]['additional'] : []}
          unsavedSyllabusDocs={this.state.unsavedDocs[cl.id] ? this.state.unsavedDocs[cl.id]['syllabus'] : []}
        />
      )
    })
  }

  /*
  * Get the number of classes that are incomplete
  */
  getIncompleteClassesLength () {
    return this.state.classes.filter(cl =>  (cl.status.name === 'New Class' || cl.status.name === 'Needs Syllabus') && cl.is_syllabus).length
  }

  /*
  * Returns whether or not there are currently any unsaved docs
  */
  hasUnsavedDocuments () {
    return Object.keys(this.state.unsavedDocs).filter((clId) =>  {
      let unsavedSyllabi = this.state.unsavedDocs[clId]['syllabus']
      let unsavedAdditional = this.state.unsavedDocs[clId]['additional']
      return unsavedSyllabi.length > 0 || unsavedAdditional.length > 0
    }).length
  }

  /*
  * Render upload warning.
  */
  renderUploadWarningMessage () {
    if (this.state.showUploadWarning) {
      return (
        <div style={styles.warning} className="message-bubble error">
          <span>
            {"You haven't uploaded a syllabus for a class that needs one. Are you sure you want to continue?"}
          </span>
          <div className='margin-top'>
            <a
              style={{color: 'white', textAlign: 'center', borderBottom: '1px solid white'}}
              onClick={() => this.props.onNext()}
            >Yes, continue without uploading</a>
            <div className='margin-top'>
              <a
                style={{color: 'white', textAlign: 'center', borderBottom: '1px solid white'}}
                onClick={() => { this.setState({showUploadWarning: false}) }}
              >Dismiss</a>
            </div>
          </div>
        </div>
      )
    }
  }

  renderNeedsSyllabusInfo(){
    let incomplete = this.getIncompleteClassesLength()
    if(incomplete > 0){
      return(
        <p className='red-text center-text'>
        Skoller needs a syllabus for {incomplete} of your classes
        </p>
      )
    }else{
      return(
        <p className='cn-green center-text'>
        We have already received the syllabi for your classes
        </p>
      )
    }
  }

  renderSubmitButton(){
    let incomplete = this.getIncompleteClassesLength()
    return (
      <button
        className={`button full-width margin-top margin-bottom`}
        onClick={this.onNext.bind(this)}>
        {
          (incomplete == 0 && !this.hasUnsavedDocuments()) ? 'Next' :
          (this.state.loading ? (<i className='fa fa-spin fa-circle-o-notch'></i>) : 'Upload Syllabi')
        }
      </button>
    )
  }


  /*
  * Handle whether to show an error or move on
  */
  handleWarning(){
    if (this.getIncompleteClassesLength() > 0) {
      this.setState({showUploadWarning: true})
    } else {
      this.props.onNext()
    }
  }

  /*
  * Creates Promises array for all a given classes syllabus docs
  */
  allSyllabusDocPromises(classId){
    let docs = this.state.unsavedDocs[classId]
    let arr = docs['syllabus'].map((doc, index) => {
      return new Promise((resolve,reject) => {
        actions.documents.uploadClassDocument({id: classId}, doc, true).then(data => {
          // Update the class in state once uploaded
          if(data.class){
            const index = this.state.classes.findIndex(c => c.id === data.class.id)
            const newClasses = this.state.classes
            newClasses[index] = data.class
            this.setState({classes: newClasses})
          }
          resolve(data)
        }).catch(() => reject())
      })
    })
    return Promise.all(arr)
  }

  /*
  * Creates Promises array for all a given classes additional docs
  */
  allAdditionalDocPromises(classId){
    let docs = this.state.unsavedDocs[classId]
    let arr = docs['additional'].map((doc, index) => {
      return new Promise((resolve,reject) => {
        actions.documents.uploadClassDocument({id: classId}, doc, false).then(data => {
          resolve(data)
        }).catch(() => reject())
      })
    })
    return Promise.all(arr)
  }

  /*
  * Upload all unsaved documents for every class
  */
  uploadUnsavedDocuments(){
    let arr = Object.keys(this.state.unsavedDocs).map((classId) => {
      return new Promise((resolve,reject) => {
        this.allSyllabusDocPromises(classId).then((values) => {
          this.allAdditionalDocPromises(classId).then((values2) => {
            resolve(values)
          })
        })
      })
    })
    return Promise.all(arr)
  }

  /*
  * Handle on next.
  */
  onNext () {
    if(this.hasUnsavedDocuments()){
      this.setState({loading:true})
      this.uploadUnsavedDocuments().then(values => {
        this.setState({loading:false})
        this.props.onNext()
      }).catch(() => this.handleWarning())
    }else{
      this.handleWarning()
    }
  }

  render () {
    return (
      <div className='cn-container'>
        <div className='cn-submit-syllabi-container cn-header'>
          <div>
            <h2>Submit your syllabi</h2>
            <span>The syllabus helps us set up your class.</span>
            {this.renderNeedsSyllabusInfo()}
          </div>

          <div className='cn-body margin-top'>
            <div className='cn-flex-table cn-add-class-grid'>
              <div className='cn-flex-table-row fixed'>
                {this.renderTableHeaders()}
              </div>
              <div className='cn-flex-table-body'>
                {this.renderTableBody()}
              </div>
            </div>
          </div>

          <div className='cn-footer margin-bottom'>
            <div style={{position: 'relative'}}>
              {this.renderSubmitButton()}
              {this.renderUploadWarningMessage()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SubmitSyllabi.propTypes = {
  onNext: PropTypes.func
}

export default SubmitSyllabi
