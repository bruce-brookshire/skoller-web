import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import actions from '../../../../actions'
import { ProgressBar, Step } from "react-step-progress-bar";
import { InputField, SelectField } from '../../../../components/Form'
import { Form, ValidateForm } from 'react-form-library'

class ReviewTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initializeState()
  }

  initializeState() {

    const { assignment } = this.props
    return {
      form: this.initializeFormData(assignment),
      loading: false,
      copyweight: ''
    }
  }

  componentDidMount() {
    if (this.props.assignments.length > 10) {
      this.setState({ loading: true })
    }
  }
  initializeFormData(data) {
    let formData = data || {}
    const { id, name, weight_id } = formData
    return ({
      id: id || null,
      name: name || '',
      weight_id: weight_id || '',
    })
  }

  getWeightName(weight_id) {
    const { weights } = this.props
    console.log(weights)
    let w = weights.find(v => v.id == weight_id)
    return w ? w.name : ''
  }


  renderProgressBar() {
    return <div className='cn-section-progress-outer' >
      <img alt="Skoller"
        className='logo'
        src='/src/assets/images/sammi/Smile.png'
        height="40" />
      <span className="cn-section-progress-title" > Tag Assignments < i class="far fa-question-circle" > </i></span >
      <div className="cn-pull-right" >
        <span> 3 / 3 </span> <span className='cn-section-progressbar' > < ProgressBar percent={
          (3 / 3) * 100
        }
        /></span>
      </div>
    </div >
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  */
  getRow(item, index) {
    const { form } = this.state
    const { id, name, weight_id, due } = item

    const { currentAssignment, viewOnly, formErrors, updateProperty } = this.props
    const activeClass = (currentAssignment && currentAssignment.id) === id
      ? 'active' : ''


    return (

      <div
        className={`table-row ${activeClass}`}
        key={`assignment-${index}`}
        onClick={() => {
          if (viewOnly) return
          this.props.onSelectAssignment(item)
        }}
      >
        <div className='col-xs-7 assignment-name-container'>
          <div className={`assignment-label col-xs-12}`}>
            <div>{name}</div>
          </div>
        </div>
        <div className='col-xs-2 right-text' >
          <div>{moment(due).format('MM/DD')}</div>
        </div>
        <div className='col-xs-3 right-text' >
          <div>{this.getWeightName(weight_id)}</div>
        </div>
      </div>
    )
  }

  /*
  * Render the assignments for a given class.
  */
  renderAssignments() {
    const { assignments } = this.props
    // sort by due date.
    return assignments.sort((a, b) => {
      return new Date(b.due) - new Date(a.due)
    }).map((assignment, index) =>
      this.getRow(assignment, index)
    )


  }


  renderSubmit(addingAssignment = false) {
    const { assignments } = this.props
    const disableButton = assignments.length === 0

    if (!this.props.viewOnly) {
      // return (
      //   // <div id='submit-container'>
      //   //   {/* <div id='notification'>
      //   //     Be sure to add all assignments for this category!
      //   //   </div> */}
      //   //   {addingAssignment
      //   //     ? <small>Finish adding the current assignment before moving on</small>
      //   //     : <button
      //   //       onClick={() => this.handleSubmit()}
      //   //       disabled={disableButton}
      //   //       className={`submit-assignments button ${disableButton ? 'disabled' : ''}`}
      //   //     >
      //   //       Save{this.props.onSubmitSingleWeight && ' and Submit'}
      //   //     </button>
      //   //   }
      //   // </div>
      // )
    } else {
      return null
    }
  }

  render() {
    const { viewOnly } = this.props
    let addingAssignment
    if (this.props.addingAssignment === null) {
      addingAssignment = false
    } else {
      addingAssignment = this.props.addingAssignment
    }

    return (

      <div id='class-editor-assignments-table' className={`${viewOnly ? 'view-only' : ''}`} ref={(field) => { this.sectionControl = field }} >

        <div id='assignment-rows'>
          {this.renderAssignments()}
        </div>
      </div>
    )
  }
}

ReviewTable.propTypes = {
  viewOnly: PropTypes.bool,
  assignments: PropTypes.array.isRequired,
  addingAssignment: PropTypes.bool,
  currentAssignment: PropTypes.object,
  onSelectAssignment: PropTypes.func,
  onTagAssignment: PropTypes.func,
  weights: PropTypes.array,
  cl: PropTypes.object,
  // currentWeight: PropTypes.object,
  isAdmin: PropTypes.bool,
  onSubmit: PropTypes.func,
  onSubmitSingleWeight: PropTypes
}

export default ReviewTable
