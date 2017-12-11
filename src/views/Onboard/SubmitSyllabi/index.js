import React from 'react'
import PropTypes from 'prop-types'
import ClassRow from './ClassRow'
import actions from '../../../actions'

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

class SubmitSyllabi extends React.Component {
  constructor (props) {
    super(props)
    this.state = {classes: []}
  }

  /*
  * Fetch the classes for a student.
  */
  componentWillMount () {
    actions.classes.getStudentClasses().then((classes) => {
      this.setState({classes})
    }).catch(() => false)
  }

  getIncompleteClassesLength () {
    return this.state.classes.filter(cl => cl.status === 'New Class' || cl.status === 'Needs Syllabus').length
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

  render () {
    return (
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
    )
  }
}

export default SubmitSyllabi
