import React from 'react'
import {browserHistory} from 'react-router'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal'
import {CheckboxField, TextAreaField} from '../../components/Form'
import actions from '../../actions'

class RequestResolvedModal extends React.Component {
  constructor (props) {
    super(props)
    this.options = ['Weights','Assignments','Review']
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

  getStatus(statusKey){
    let arr = this.state.statuses.filter((s) => {
      return s.name == statusKey
    })
    return arr[0]
  }

  /*
  * Handle checkbox change.
  */
  onCheckboxChange (name,checked,value) {
    let formCopy = this.state.form
    if (checked && value == 'Weights') {
      let status = this.getStatus(value)
      formCopy.class_status_id = status.id
      this.setState({form:formCopy,value: value})
    } else if (checked && value == 'Assignments'){
      let status = this.getStatus(value)
      formCopy.class_status_id = status.id
      this.setState({form:formCopy,value: value})
    } else if (checked && value == 'Review') {
      let status = this.getStatus(value)
      formCopy.class_status_id = status.id
      this.setState({form:formCopy,value: value})
    } else if (checked && value == 'No Change Needed') {
      this.setState({form:formCopy,value: value})
    } else {
      this.setState({value: null})
    }
  }

  onResolve(){
    const {cl} = this.props
    actions.classhelp.resolveStudentRequest(this.props.request.id).then((res) => {
      actions.classes.getClassById(cl.id).then((cl) => {
        this.props.onSubmit(cl)
        if(!this.props.request){ browserHistory.push('/hub/landing') }
      }).catch(() => false)
    }).catch(() => false)
  }

  renderFormOptions(){
    let ind = 0
    return this.options.map((opt) => {
      ind++
      return (
        <CheckboxField
        checked={this.state.val === opt}
        value={this.state.val === opt}
        label={opt}
        name='issue_resolved_modal'
        onChange={(name,checked) => this.onCheckboxChange(name,checked,opt)}
        key={ind}/>
      )
    })
  }

  renderForm(){
    return (
      <div>
        <h4 className="center-text">Fix the issue? If so, select the status this class needs to be changed to.</h4>
        {this.renderFormOptions()}
      </div>
    )
  }

  renderContent(){
    if(this.props.request){
      return (
        <div>
          {this.props.request.notes ? (<h4 className="center-text">{this.props.request.notes}</h4>) : null}
          {this.props.request.change_type.name ? (<h5 className="center-text">Change Type: {this.props.request.change_type.name}</h5>) : null}
          <button
            className={`button full-width margin-top`}
            onClick={() => { this.onResolve() }}>Resolve
          </button>
        </div>
      )
    }else{
      return null
    }
  }

  render () {
    const {cl} = this.props
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}>
        {this.renderContent()}
      </Modal>
    )
  }
}

RequestResolvedModal.propTypes = {
  cl: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  request: PropTypes.object,
}

export default RequestResolvedModal
