import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal'
import {CheckboxField} from '../../components/Form'
import actions from '../../actions'

class DocumentsDeletedModal extends React.Component {
  constructor (props) {
    super(props)
    this.options = ['Turn class status back to upload syllabus',
      'This class has no syllabus']
    this.state = this.initializeState()
  }

  componentWillMount () {
    actions.hub.getStatuses().then(statuses => {
      this.setState({statuses: statuses.statuses, loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Intitialize state
  */
  initializeState () {
    return {
      form: this.initializeFormData(),
      loading: false,
      statuses: [],
      value: null
    }
  }

  /*
  * Intitialize form data.
  * Status form data.
  */
  initializeFormData () {
    const {cl} = this.props
    return {
      class_status_id: (cl.status && cl.status.id) || ''
    }
  }

  needsSyllabusStatus () {
    let arr = this.state.statuses.filter((s) => {
      return s.name === 'Needs Syllabus'
    })
    return arr[0]
  }

  /*
  * Handle checkbox change.
  */
  onCheckboxChange (name, checked, value) {
    let formCopy = this.state.form
    if (checked && value === 'Turn class status back to upload syllabus') {
      let status = this.needsSyllabusStatus()
      formCopy.class_status_id = status.id
      this.setState({form: formCopy, value: value})
    } else if (checked && value === 'This class has no syllabus') {
      this.setState({form: formCopy, value: value})
    } else {
      this.setState({value: null})
    }
  }

  onSubmit () {
    if (this.state.value === 'This class has no syllabus') {
      actions.classes.updateClass({id: this.props.cl.id, is_syllabus: false}).then((cl) => {
        this.props.onSubmit(cl)
      }).catch(() => false)
    } else {
      actions.classes.updateClassStatus(this.props.cl, this.state.form).then((cl) => {
        this.props.onSubmit(cl)
      }).catch(() => false)
    }
  }

  renderFormOptions () {
    let ind = 0
    return this.options.map((opt) => {
      ind++
      return (
        <CheckboxField
          checked={this.state.value === opt}
          value={this.state.value === opt}
          label={opt}
          name='deleted_documents_modal'
          onChange={(name, checked) => this.onCheckboxChange(name, checked, opt)}
          key={ind}
        />
      )
    })
  }

  renderForm () {
    return (
      <div>
        <h4 className="center-text">You have deleted all the files for this class.</h4>
        {this.renderFormOptions()}
      </div>
    )
  }

  render () {
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}>
        <div>
          {this.renderForm()}
          <button
            className={`button full-width margin-top ${this.state.value ? '' : 'disabled'}`}
            onClick={() => { this.onSubmit() }}>Submit
          </button>
        </div>
      </Modal>
    )
  }
}

DocumentsDeletedModal.propTypes = {
  cl: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool
}

export default DocumentsDeletedModal
