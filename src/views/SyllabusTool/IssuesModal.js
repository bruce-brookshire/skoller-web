import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal'
import {CheckboxField} from '../../components/Form'
import {browserHistory} from 'react-router'
import actions from '../../actions'

class IssuesModal extends React.Component {
  constructor (props) {
    super(props)
    this.options = ['Weights','Assignments','Review']
    this.state = { value: '', note: '', helpTypes: [], form: {}, resolveValue: null, statuses: [] }
  }

  /*
  * Fetch the help types.
  */
  componentWillMount () {
    actions.classhelp.getHelpTypes().then(helpTypes => {
      this.setState({helpTypes})
    }).catch(() => false)
    actions.hub.getStatuses().then(statuses => {
      this.setState({statuses: statuses.statuses})
    }).catch(() => false)
  }

  getStatus(statusKey){
    let arr = this.state.statuses.filter((s) => {
      return s.name == statusKey
    })
    return arr[0]
  }

  /*
  * Handle resolve checkbox change.
  */
  onResolveCheckboxChange (name,checked,value) {
    let formCopy = this.state.form
    if (checked && value == 'Weights') {
      let status = this.getStatus(value)
      formCopy.class_status_id = status.id
      this.setState({form:formCopy,resolveValue: value})
    } else if (checked && value == 'Assignments'){
      let status = this.getStatus(value)
      formCopy.class_status_id = status.id
      this.setState({form:formCopy,resolveValue: value})
    } else if (checked && value == 'Review') {
      let status = this.getStatus(value)
      formCopy.class_status_id = status.id
      this.setState({form:formCopy,resolveValue: value})
    } else if (checked && value == 'No Change Needed') {
      this.setState({form:formCopy,resolveValue: value})
    } else {
      this.setState({resolveValue: null})
    }
  }

  /*
  * Resolve form options
  */
  renderResolveFormOptions(){
    let ind = 0
    return this.options.map((opt) => {
      ind++
      return (
        <CheckboxField
        checked={this.state.resolveValue === opt}
        value={this.state.resolveValue === opt}
        label={opt}
        name='issue_resolved_modal'
        onChange={(name,checked) => this.onResolveCheckboxChange(name,checked,opt)}
        key={ind}/>
      )
    })
  }

  /*
  * Resolve form
  */
  renderResolveForm(){
    const openTickets = this.getOpenHelpTickets()
    const helpTicket = openTickets[0]
    return (
      <div>
        <h4 className="center-text">{helpTicket.note ? helpTicket.note : (helpTicket.notes ? helpTicket.notes : helpTicket.change_type.name)}</h4>
        {openTickets.length == 1 ? (
          <div>
            <h5 className="center-text">Fix the issue? If so, select the status this class needs to be changed to.</h5>
            {this.renderResolveFormOptions()}
          </div>
        ) : null}
        <button className='button full-width margin-top' onClick={() => this.onResolve(helpTicket)}>Resolve</button>
        <button
          className={`button-invert full-width margin-top`}
          onClick={() => { this.onCancel() }}>Cancel
        </button>
      </div>
    )
  }

  /*
  * Render the form if no issue.
  */
  renderForm () {
    return (
      <div>
        {this.renderCheckboxes()}

        {this.state.value === 400
          ? <div className='cn-input-container margin-top'>
            <textarea
              style={{height: '64px'}}
              className='cn-form-textarea'
              onChange={(event) => { this.setState({note: event.target.value}) }}
              placeholder="Describe the issue(s) here."
              rows={5}
            />
          </div> : null

        }

        <button className='button full-width margin-top cn-red-background' onClick={this.onSubmit.bind(this)}>Submit</button>
        <button
          className={`button-invert full-width margin-top`}
          onClick={() => { this.onCancel() }}>Cancel
        </button>
      </div>
    )
  }

  /*
  * Render the checkboxes
  */
  renderCheckboxes () {
    return this.state.helpTypes.map((helpType, index) => {
      return (
        <div key={index} className='margin-top'>
          <CheckboxField
            checked={this.state.value === helpType.id}
            label={helpType.name}
            onChange={(name,checked) => this.onCheckboxChange(name,checked,helpType.id)}
          />
        </div>
      )
    })
  }

  /*
  * Handle checkbox change.
  *
  * @param [Event] event. The onchange event for checkbox input.
  * @param [String] value. The label value of the checkbox.
  */
  onCheckboxChange (name, checked, value) {
    if (checked) {
      this.setState({value, other: ''})
    } else {
      this.setState({value: '', other: ''})
    }
  }

  /*
  * Handle on issue submit
  *
  */
  onSubmit () {
    const {value, note, helpTypes} = this.state
    const {cl} = this.props
    if ((value === 400 && note) || (value && value !== 400)) {
      let data = value === 400 ? note : helpTypes.find(helpType => helpType.id === value).name
      const form = {note: data}
      actions.classhelp.createIssue(cl, value, form).then((cl) => {
        this.props.onSubmit(cl)
        this.props.onClose()
        this.setState({value: '', note: ''})
      }).catch(() => false)
    }
  }

  resolveStudentRequest(req){
    const {cl} = this.props
    actions.classhelp.resolveStudentRequest(req.id).then((res) => {
      if(this.state.resolveValue){
        // If the resolution requires a status change, make that happen
        actions.classes.updateClassStatus(cl,this.state.form).then((cl) => {
          this.props.onSubmit(cl)
          this.props.onClose()
          this.setState({resolveValue: null})
          browserHistory.push({
            pathname: '/hub/classes',
            state: {
              needsHelp: true
            }
          })
        }).catch(() => false)
      // The resolution did  not require a change to status, update the class
      }else{
        actions.classes.getClassById(cl.id).then((cl) => {
          this.props.onSubmit(cl)
          this.props.onClose()
        }).catch(() => false)
      }
    }).catch(() => false)
  }

  resolveStandardHelpTicket(helpTicket){
    const {cl} = this.props
    actions.classhelp.resolveIssue(helpTicket.id).then((helpTicket) => {
      if(this.state.resolveValue){
        actions.classes.updateClassStatus(cl,this.state.form).then((cl) => {
          this.props.onSubmit(cl)
          this.props.onClose()
          this.setState({value: '', note: '',resolveValue: null})
        })
      }else{
        let helpTickets = cl.help_requests
        const index = helpTickets.findIndex(h => h.id === helpTicket.id)
        helpTickets[index] = helpTicket
        let newCl = {...cl}
        newCl.help_requests = helpTickets
        this.props.onSubmit(newCl)
        this.props.onClose()
        this.setState({value: '', note: '',resolveValue: null})
      }
    }).catch(() => false)
  }

  /*
  * Resolve the help tickets.
  */
  onResolve (helpTicket) {
    // If it has the 'notes' property this is really a 'student_request' but we treat it like a help request
    if(helpTicket.hasOwnProperty('notes')){
      this.resolveStudentRequest(helpTicket)
    // Otherwise this is a standard help request that we resolve like any other issue
    }else{
      this.resolveStandardHelpTicket(helpTicket)
    }
  }

  /*
  * Cancel resolution
  */
  onCancel(){
    this.props.onClose()
  }

  /*
  * Get the open help tickets.
  */
  getOpenHelpTickets () {
    const {cl} = this.props
    let hr = cl.help_requests.filter(h => !h.is_completed)
    let sr = cl.student_requests.filter(h => !h.is_completed)
    return hr.concat(sr)
  }

  render () {
    const {cl} = this.props
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}
      >
        <div>
          {this.props.isSW ? this.renderForm() : this.renderResolveForm()}
        </div>
      </Modal>
    )
  }
}

IssuesModal.propTypes = {
  cl: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  isSW: PropTypes.bool,
}

export default IssuesModal
