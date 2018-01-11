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
      showUploadWarning: false,
      unsavedDocs: {},
    }
  }

  /*
  * Fetch the classes for a student.
  */
  componentWillMount () {
    actions.classes.getStudentClasses().then((classes) => {
      // // Create obj of unsaved docs for holding all unsaved documents for all classes
      let unsavedDocs = {}
      classes.forEach((item) => {
        unsavedDocs[item.id] = {}
        unsavedDocs[item.id]['additional'] = []
        unsavedDocs[item.id]['syllabus'] = []
      })
      // Save state
      this.setState({
        classes: classes,
        unsavedDocs: unsavedDocs,
      })
    }).catch(() => false)
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

  handleWarning(){
    if (this.getIncompleteClassesLength() > 0) {
      this.setState({showUploadWarning: true})
    } else {
      this.props.onNext()
    }
  }

  /*
  * Handle on next.
  */
  onNext () {
    this.handleWarning()
  }

  render () {
    return (
      <div className='cn-container'>
        <div className='cn-submit-syllabi-container cn-header'>
          <div>
            <h2>Submit your syllabi</h2>
            <span>The syllabus helps us set up your class.</span>
            <p className='red-text center-text'>Skoller needs a syllabus for {this.getIncompleteClassesLength()} of your classes</p>
          </div>

          <div className='cn-body margin-top'>
            <div className='cn-flex-table cn-add-class-grid'>
              <div className='cn-flex-table-row'>
                {this.renderTableHeaders()}
              </div>
              <div className='cn-flex-table-body'>
                {this.renderTableBody()}
              </div>
            </div>
          </div>

          <div className='cn-footer margin-bottom'>
            <div style={{position: 'relative'}}>
              <button
                className={`button full-width margin-top margin-bottom`}
                onClick={this.onNext.bind(this)}
              >Upload Syllabi</button>
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
