import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import Modal from '../../components/Modal'
import {CheckboxField} from '../../components/Form'
import {browserHistory} from 'react-router'
import actions from '../../actions'

@inject('rootStore') @observer
class HelpResolvedModal extends React.Component {
  constructor (props) {
    super(props)
    this.options = ['Weights', 'Assignments', 'Review']
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

  getStatus (statusKey) {
    let arr = this.state.statuses.filter((s) => {
      return s.name === statusKey
    })
    return arr[0]
  }

  isSW () {
    const {userStore} = this.props.rootStore
    return userStore.isSW()
  }

  navigateToHelpNeeded () {
    browserHistory.push({
      pathname: '/hub/classes',
      state: {
        needsHelp: true
      }
    })
  }

  /*
  * Handle resolve checkbox change.
  */
  onCheckboxChange (name, checked, value) {
    let formCopy = this.state.form
    if (checked && value === 'Weights') {
      let status = this.getStatus(value)
      formCopy.class_status_id = status.id
      this.setState({form: formCopy, resolveValue: value})
    } else if (checked && value === 'Assignments') {
      let status = this.getStatus(value)
      formCopy.class_status_id = status.id
      this.setState({form: formCopy, resolveValue: value})
    } else if (checked && value === 'Review') {
      let status = this.getStatus(value)
      formCopy.class_status_id = status.id
      this.setState({form: formCopy, resolveValue: value})
    } else if (checked && value === 'No Change Needed') {
      this.setState({form: formCopy, resolveValue: value})
    } else {
      this.setState({resolveValue: null})
    }
  }

  /*
  * Resolve form options
  */
  renderFormOptions () {
    let ind = 0
    return this.options.map((opt) => {
      ind++
      return (
        <CheckboxField
          checked={this.state.resolveValue === opt}
          value={this.state.resolveValue === opt}
          label={opt}
          name='issue_resolved_modal'
          onChange={(name, checked) => this.onCheckboxChange(name, checked, opt)}
          key={ind}/>
      )
    })
  }

  /*
  * Resolve form
  */
  renderForm (openTickets) {
    const helpTicket = openTickets[0]
    return (
      <div>
        <h4 className="center-text">{helpTicket.note ? helpTicket.note : (helpTicket.notes ? helpTicket.notes : helpTicket.change_type.name)}</h4>
        {helpTicket ? (
          <div>
            <h5 className="center-text">Fix the issue? If so, select the status this class needs to be changed to.</h5>
            {this.renderFormOptions()}
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

  updateClassStatus () {
    const {cl} = this.props
    actions.classes.updateClassStatus(cl, this.state.form).then((cl) => {
      this.props.onSubmit(cl)
      this.props.onClose()
      this.setState({resolveValue: null})
      if (this.getOpenHelpTickets().length === 0) {
        this.navigateToHelpNeeded()
      }
    }).catch(() => false)
  }

  refreshClass () {
    const {cl} = this.props
    actions.classes.getClassById(cl.id).then((cl) => {
      this.props.onSubmit(cl)
      this.props.onClose()
      this.setState({resolveValue: null})
      if (this.getOpenHelpTickets().length === 0) {
        this.navigateToHelpNeeded()
      }
    }).catch(() => false)
  }

  resolveStudentRequest (req) {
    actions.classhelp.resolveStudentRequest(req.id).then((res) => {
      // If the resolution requires a status change, make that happen
      if (this.state.resolveValue) {
        this.updateClassStatus()
      // The resolution did  not require a change to status, refresh the class
      } else {
        this.refreshClass()
      }
    }).catch(() => false)
  }

  resolveStandardHelpTicket (helpTicket) {
    actions.classhelp.resolveIssue(helpTicket.id).then((helpTicket) => {
      // If the resolution requires a status change, make that happen
      if (this.state.resolveValue) {
        this.updateClassStatus()
      // The resolution did  not require a change to status, refresh the class
      } else {
        this.refreshClass()
      }
    }).catch(() => false)
  }

  /*
  * Resolve the help tickets.
  */
  onResolve (helpTicket) {
    // If it has the 'notes' property this is really a 'student_request' but we treat it like a help request
    if (helpTicket.hasOwnProperty('notes')) {
      this.resolveStudentRequest(helpTicket)
    // Otherwise this is a standard help request that we resolve like any other issue
    } else {
      this.resolveStandardHelpTicket(helpTicket)
    }
  }

  /*
  * Cancel resolution
  */
  onCancel () {
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
    const openTickets = this.getOpenHelpTickets()
    return openTickets.length > 0 ? (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}>
        <div>
          {this.renderForm(openTickets)}
        </div>
      </Modal>
    ) : null
  }
}

HelpResolvedModal.propTypes = {
  cl: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  rootStore: PropTypes.object
}

export default HelpResolvedModal
