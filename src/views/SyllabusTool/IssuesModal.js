import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal'
import actions from '../../actions'

class IssuesModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: '', note: '', helpTypes: [] }
  }

  /*
  * Fetch the help types.
  */
  componentWillMount () {
    actions.classhelp.getHelpTypes().then(helpTypes => {
      this.setState({helpTypes})
    }).catch(() => false)
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
      </div>
    )
  }

  /*
  * Render the issue if issue exitsts.
  */
  renderDescription () {
    const {cl} = this.props
    const helpTicket = this.getOpenHelpTickets()[0]
    return (
      <div>
        <button className='button full-width margin-top' onClick={() => this.onResolve(helpTicket)}>Resolve</button>
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
            onChange={(event) => this.onCheckboxChange(event, helpType.id)}
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
  onCheckboxChange (event, value) {
    if (event.target.checked) {
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

  /*
  * Resolve the help tickets.
  */
  onResolve (helpTicket) {
    const {cl} = this.props
    actions.classhelp.resolveIssue(helpTicket.id).then((helpTicket) => {
      let helpTickets = cl.help_requests
      const index = helpTickets.findIndex(h => h.id === helpTicket.id)
      helpTickets[index] = helpTicket
      let newCl = {...cl}
      newCl.help_requests = helpTickets
      this.props.onSubmit(newCl)
      this.props.onClose()
      this.setState({value: '', note: ''})
    }).catch(() => false)
  }

  /*
  * Get the open help tickets.
  */
  getOpenHelpTickets () {
    const {cl} = this.props
    return cl.help_requests.filter(h => !h.is_completed)
  }

  render () {
    const {cl} = this.props
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}
      >
        <div>
          {this.getOpenHelpTickets().length === 0 ? this.renderForm() : this.renderDescription()}
          <button className='button-invert close full-width margin-top margin-bottom' onClick={() => this.props.onClose()}>Close</button>
        </div>
      </Modal>
    )
  }
}

class CheckboxField extends React.Component {
  render () {
    const {checked, label, onChange,} = this.props
    return (
      <label>
        <input
          className='margin-right'
          checked={checked}
          onChange={(event) => onChange(event)}
          type='checkbox'
        />
        {label}
      </label>
    )
  }
}

IssuesModal.propTypes = {
  cl: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool
}

export default IssuesModal
