import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import actions from '../../../../actions'

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
            <option key="" value="" className="option_no_weight" selected="selected">No Weight</option>
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
          <div id='cn-assignment-form' >
            <div className="col-xs-12">
              <div className='cn-section-name-header txt-gray' >
                Assignments </div>
              <div className='cn-section-value-header txt-gray' >
                Weight </div>
            </div>
            <hr className="txt-gray" />
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
