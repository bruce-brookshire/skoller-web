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
  renderTableBody () {
    return this.state.classes.map((cl, index) => {
      return <ClassRow key={`row-${index}`} cl={cl} />
    })
  }

  /*
  * Get the number of classes that are incomplete
  */
  getIncompleteClassesLength () {
    return this.state.classes.filter(cl => cl.status === 'New Class' || cl.status === 'Needs Syllabus').length
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
      <div>
        <div className='cn-submit-syllabi-container'>
          <div className='margin-bottom'>
            <h2>Submit your syllabi</h2>
            <span>The syllabus helps us set up your class.</span>
          </div>
          <div className='cn-flex-table cn-add-class-grid'>
            <div className='cn-flex-table-row'>
              {this.renderTableHeaders()}
            </div>
            <div className='cn-flex-table-body'>
              {this.renderTableBody()}
            </div>
          </div>
        </div>
        <div className='row full-width justify-center'>
          <div className='space-between-vertical col-xs-12 col-md-8 col-lg-6'>
            <div style={{position: 'relative'}}>
              <button
                className={`button full-width margin-top margin-bottom`}
                onClick={this.onNext.bind(this)}
              >UpLoAd sYlLaBi</button>
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
