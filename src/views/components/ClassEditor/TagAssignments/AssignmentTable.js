import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import actions from '../../../../actions'
import { ProgressBar, Step } from "react-step-progress-bar";
import { InputField, SelectField } from '../../../../components/Form'
import { Form, ValidateForm } from 'react-form-library'
import ToolTip from '../../../../views/components/ToolTip'

class AssignmentTable extends React.Component {
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

  onChange(form) {
    console.log(form)
    this.onTagAssignment(form)
  }

  onCopyWeight(assignmentId) {
    const { assignments } = this.props
    const assignment = assignments.find(e => e.id == assignmentId)
    this.setState({ copyweight: assignment.weight_id })
  }

  onPasteWeight(assignmentId) {
    if (this.state.copyweight) {
      this.onTagAssignment({ id: assignmentId, weight_id: this.state.copyweight })
    }
  }

  onTagAssignment(form) {
    this.setState({ loading: true })
    actions.assignments.tagAssignment(this.props.cl, form).then((assignment) => {
      this.props.onTagAssignment(assignment)
    }).catch(() => { this.setState({ loading: false }) })
  }

  renderProgressBar() {
    return <div className='cn-section-progress-outer' >
      <img alt="Skoller"
        className='logo'
        src='/src/assets/images/sammi/Smile.png'
        height="40" />
      <span className="cn-section-progress-title" > Tag Assignments
        <div className="infodiv">
          <ToolTip
            tip={
              <div>
                <p>
                  Tag assignments to weight categories
                </p>
                <p>
                  why? This associates value for esach individual assignments
                </p>
                <p>
                  Example: 4 assignments tag to exams category worth 20% make each assignment worth 5%
                </p>
              </div>
            }>
            < i class="far fa-question-circle" > </i>
          </ToolTip>
        </div>
      </span >
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
    const { id, name, weight_id } = item

    form.weight_id = weight_id
    form.id = id

    const { currentAssignment, viewOnly, formErrors, updateProperty, weights } = this.props
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
        <div className='col-xs-6 assignment-name-container'>
          <div className={`assignment-label col-xs-12}`}>
            <div>{name}</div>
            {/* {!currentWeight && this.renderWeightName(weightId)} */}
          </div>
        </div>
        <div className='col-xs-6 right-text tagAssignfm' >
          <select className="weightselect"
            name='weight_id'
            value={form.weight_id}
            options={weights}
            onChange={(val) => { this.onChange({ id: id, weight_id: val.target.value }) }}
          >
            {weights.map(weight => {
              return (
                <option key={weight.id} value={weight.id}>{weight.name}</option>
              )
            })}
          </select>
          <div className="cn-font-icon" >
            <a onClick={(e) => { this.onCopyWeight(id) }}>
              <i class="fas fa-copy" > </i>
            </a>
          </div>
          <div className="cn-font-icon" >
            <a onClick={(e) => { this.onPasteWeight(id) }}>
              <i class="fas fa-brush" > </i>
            </a>
          </div>
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
        <div
          id='class-editor-admin-assignments-table'
          className={`${viewOnly ? 'view-only' : ''}`}
          ref={(field) => { this.sectionControl = field }}
          style={{ boxShadow: this.state.loading ? 'inset 0 -10px 10px -10px #00000025' : '' }}
        ></div>
        <div id='assignment-rows'>
          <div id='cn-assignment-form' > {this.renderProgressBar()}
            <div className="col-xs-12">
              <div className='cn-section-name-header' >
                Assignments </div>
              <div className='cn-section-value-header' >
                Weight </div>
            </div>
            <hr />
            {this.renderAssignments()}
          </div>
        </div>
      </div>
    )
  }
}

AssignmentTable.propTypes = {
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

export default AssignmentTable
