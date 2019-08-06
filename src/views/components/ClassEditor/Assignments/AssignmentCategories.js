import React from 'react'
import PropTypes from 'prop-types'

class AssignmentCategories extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      weights: this.props.weights,
      noAssignments: this.props.noAssignments.length === 0
    }
  }

  renderNextStep (noAssignments) {
    return noAssignments
      ? <div id='next-label'>
        Not enough info to add assignments?
      </div> : null
  }

  render () {
    const {cl} = this.props
    const category = this.state.weights.map(weight =>
      <div className='weight' key={weight.id}>
        <div className='text'>
          <div className='weight-name'>
            {weight.name}
          </div>
          <div className='add-assignments'>
            <div onClick={() => this.props.onClick(weight)}>
              Add assignments
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
            {category}
          </div>
          <hr />
          <div id='next-step'>
            {this.renderNextStep(this.state.noAssignments)}
            <button
              className='next-button button'
            >
              {this.state.noAssignments ? 'Next Syllabus' : 'Finished with this Syllabus'}
            </button>
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
  onClick: PropTypes.func
}

export default AssignmentCategories
