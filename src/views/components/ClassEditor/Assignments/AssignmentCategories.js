import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'

@inject('rootStore') @observer
class AssignmentCategories extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      weights: this.props.weights,
      noAssignments: this.props.noAssignments.length === 0
    }
  }

  renderNextStep (noAssignments) {
    if (this.props.rootStore.userStore.user.roles[0].name === 'Student') {
      return noAssignments
        ? <div>
          <div id='next-label'>
            Not enough info to add assignments?
          </div>
          <button
            className='next-button button'
            onClick={() => this.props.onSubmit()}
          >
            {this.state.noAssignments ? 'Continue with no assignments' : 'Finished with this Syllabus'}
          </button>
        </div> : null
    } else {
      return noAssignments
        ? <div>
          <div id='next-label'>
            Not enough info to add assignments?
          </div>
          <button
            className='next-button button'
          >
            {this.state.noAssignments ? 'Next Syllabus' : 'Finished with this Syllabus'}
          </button>
        </div> : null
    }
  }

  renderCategory (weight, assignmentsCount) {
    return (
      <div className='weight' key={weight.id} onClick={() => this.props.onClick(weight)}>
        <div className='text'>
          <div className='weight-name'>
            {weight.name}
          </div>
          <div className='add-assignments'>
            <div>
              {assignmentsCount > 0
                ? <p style={{color: 'rgba(0,0,0,.2)', fontWeight: '500', margin: '0'}}>{assignmentsCount} Assignment{assignmentsCount > 1 ? 's' : ''}</p>
                : <p>Add assignments</p>
              }
            </div>
          </div>
        </div>
        <div
          className='arrow'
          onClick={() => this.props.onClick(weight)}
        >
          <i className='fa fa-angle-right' />
        </div>
      </div>
    )
  }

  renderCategoriesWithoutAssignments () {
    const assignments = this.props.assignments
    const category = this.state.weights.map(weight => {
      let i = 0
      assignments.forEach(assignment => {
        if (assignment.weight_id === weight.id) {
          i += 1
        }
      })
      if (i === 0) {
        return (
          this.renderCategory(weight, i)
        )
      }
    })

    return category
  }

  renderCategoriesWithAssignments () {
    const assignments = this.props.assignments
    const category = this.state.weights.map(weight => {
      let i = 0
      assignments.forEach(assignment => {
        if (assignment.weight_id === weight.id) {
          i += 1
        }
      })
      if (i !== 0) {
        return (
          this.renderCategory(weight, i)
        )
      }
    })

    return category
  }

  render () {
    return (
      <div id='cn-assignment-categories'>
        <div className='cn-section-content-header'>
          Step 2: Add Assignments
        </div>
        <div id='cn-assignment-instructions'>
          Add assignments by their respective categories.
        </div>
        <hr />
        <div id='content-container'>
          <div id='weight-container'>
            {this.renderCategoriesWithoutAssignments()}
            {this.renderCategoriesWithAssignments()}
          </div>
          <hr />
          <div id='next-step'>
            {this.renderNextStep(this.state.noAssignments)}
          </div>
        </div>
      </div>
    )
  }
}

AssignmentCategories.propTypes = {
  cl: PropTypes.object.isRequired,
  weights: PropTypes.array,
  noAssignments: PropTypes.array,
  onClick: PropTypes.function,
  rootStore: PropTypes.object,
  onSubmit: PropTypes.function,
  assignments: PropTypes.array
}

export default AssignmentCategories
