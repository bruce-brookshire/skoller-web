import React from 'react'
import PropTypes from 'prop-types'
import ClassRow from './ClassRow'
import actions from '../../../../actions'

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
    this.state = {classes: [], showUploadWarning: false}
  }

  /*
  * Fetch the classes for a student.
  */
  componentWillMount () {
    actions.classes.getStudentClasses().then((classes) => {
      this.setState({classes})
    }).catch(() => false)
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

  renderTableBody () {
    return this.renderClassOrderByIncomplete().map((cl, index) => {
      return <ClassRow key={`row-${index}`} cl={cl} onClassUpdate={(c) => { this.refreshClass(c) }}/>
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

  /*
  * Handle on next.
  */
  onNext () {
    if (this.getIncompleteClassesLength() > 0) {
      this.setState({showUploadWarning: true})
    } else {
      this.props.onNext()
    }
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
  onNext: PropTypes.object
}

export default SubmitSyllabi
