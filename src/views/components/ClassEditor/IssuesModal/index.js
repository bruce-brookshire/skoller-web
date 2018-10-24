import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../../components/Modal'
import actions from '../../../../actions'
import {CheckboxField} from '../../../../components/Form'

class IssuesModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      helpTypes: []
    }
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
        <button className='button full-width margin-top cn-red-background' onClick={this.onSubmit.bind(this)}>Submit</button>
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
            onChange={(name, value) => {
              this.setState({value: helpType.id})
            }}
            value={this.state.value === helpType.id}
            label={helpType.name}
            name='helpType'
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
    const {value, helpTypes} = this.state
    const {cl} = this.props
    if (value) {
      let data = helpTypes.find(helpType => helpType.id === value).name
      const form = {note: data}
      actions.classhelp.createIssue(cl, value, form).then((cl) => {
        this.props.onSubmit(cl)
        this.props.onClose()
        this.setState({value: ''})
      }).catch(() => false)
    }
  }

  render () {
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}
      >
        <div>
          {this.renderForm()}
          <button className='button-invert close full-width margin-top margin-bottom' onClick={() => this.props.onClose()}>Close</button>
        </div>
      </Modal>
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
