import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import {CheckboxField, TextAreaField} from '../../../components/Form'
import UploadHistory from '../../../components/UploadHistory'
import SkModal from '../../components/SkModal/SkModal'

class StudentRequestModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      options: [],
      step1Val: null,
      step2Val: null
    }
  }

  componentDidMount () {
    // Get possible option values on load
    actions.classhelp.getRequestTypes().then((res) => {
      let options = res
      if (this.props.cl.status.id < 1400) {
        let additionalDocOption = res.find((option) => option.id === 200)
        console.log(additionalDocOption)
        let index = options.indexOf(additionalDocOption)
        console.log(index)
        if (index > -1) {
          options.splice(index, 1)
        }
      }
      this.setState({
        options: options
      })
    })
  }

  renderTitle () {
    const {cl} = this.props
    return (
      <div className="class-title center-text">
        <h3 style={{marginTop: '10px', marginBottom: '5px'}}>{cl.name}</h3>
        <h6 style={{marginTop: '0', marginBottom: '10px'}}>
          {cl.professor ? (cl.professor.name_last + ' ' + cl.professor.name_first) : ''} {cl.meet_days && cl.meet_start_time ? (cl.meet_days + ' ' + cl.meet_start_time) : ''}
        </h6>
      </div>
    )
  }

  renderStatus () {
    const {cl} = this.props
    return (
      <div className="class-status center-text">
        Current Status: {cl.status.name}
      </div>
    )
  }

  /*
  * Handle checkbox change.
  *
  * @param [Event] event. The onchange event for checkbox input.
  * @param [String] value. The label value of the checkbox.
  */
  onCheckboxChange (name, checked, value) {
    if (checked) {
      this.setState({step1Val: value, step2Val: null})
    } else {
      this.setState({step1Val: null, step2Val: null})
    }
  }

  /*
  * Handle step 2 value changes.
  *
  * @param [String] name. The name of the field.
  * @param [String] value. The label value of the field.
  */
  onStep2Change (name, value) {
    this.setState({
      step2Val: value
    })
  }

  /*
  * Handle change request submission.
  */
  onSubmit () {
    let data = {}
    this.state.step2Val instanceof Array ? (data['files'] = this.state.step2Val) : (data['notes'] = this.state.step2Val)
    this.setState({loading: true})
    actions.classhelp.createStudentRequest(this.props.cl.id, this.state.step1Val, data).then((res) => {
      res ? this.props.onSuccess() : this.props.onError()
      this.setState({loading: false, step1Val: null, step2Val: null})
    })
  }

  renderOptions () {
    return this.state.options.map((opt) => {
      return (
        <CheckboxField
          checked={this.state.step1Val === opt.id}
          value={this.state.step1Val === opt.id}
          label={opt.name}
          name='step1'
          onChange={(name, checked) => this.onCheckboxChange(name, checked, opt.id)}
          key={opt.id}/>
      )
    })
  }

  renderStepOne () {
    return (
      <div className="request-content-step step-1">
        <h5 style={{marginBottom: '5px'}}>Step 1: How can we help?</h5>
        {this.renderOptions()}
      </div>
    )
  }

  renderStepTwoExplanation () {
    return (
      <div className="request-content-step step-2">
        <h5 style={{marginBottom: '5px'}}>Step 2: Send an explanation.</h5>
        <TextAreaField
          name='explanation'
          onChange={(name, val) => { this.onStep2Change(name, val) }}
          placeholder='Describe your issue'
          rows={50}>
        </TextAreaField>
      </div>
    )
  }

  onUpload (file) {
    let newArr = this.state.step2Val instanceof Array ? this.state.step2Val : []
    newArr.push(file)
    this.setState({
      step2Val: newArr
    })
  }

  deleteFile (ind) {
    let newArr = this.state.step2Val
    newArr.splice(ind, 1)
    this.setState({
      step2Val: newArr
    })
  }

  renderStepTwoFileDrop () {
    return (
      <div className="request-content-step step-2">
        <h5 style={{marginBottom: '5px'}}>Step 2: Drop file(s) that will help us correct the situation.</h5>
        <UploadHistory
          files={[]}
          unsavedDocuments={this.state.step2Val instanceof Array ? this.state.step2Val : []}
          onUpload={(file) => { this.onUpload(file) }}
          onDeleteDocument={(ind) => { this.deleteFile(ind) }}
        />
      </div>
    )
  }

  renderStepTwo () {
    // 300 == 'Other'
    return this.state.step1Val && this.state.step1Val === 300 ? (this.renderStepTwoExplanation()) : (this.renderStepTwoFileDrop())
  }

  renderContent () {
    if (this.state.step1Val) {
      return (<div className="request-content">{this.renderStepOne()}{this.renderStepTwo()}</div>)
    } else {
      return (<div className="request-content">{this.renderStepOne()}</div>)
    }
  }

  renderSubmit () {
    let disabled = true
    console.log(this.state)
    if (this.state.step1Val && this.state.step2Val && this.state.step2Val.length !== 0) {
      disabled = false
    }
    return (
      <button
        className={`button full-width margin-top ${disabled ? 'disabled' : ''}`}
        onClick={() => {
          if (!disabled) {
            this.onSubmit()
          }
        }}>
        {this.state.loading ? (<Loading style={{color: 'white'}} />) : 'Submit' }
      </button>
    )
  }

  render () {
    if (this.props.open) {
      return (
        <SkModal
          closeModal={this.props.onClose}
        >
          {this.renderTitle()}
          {this.renderStatus()}
          {this.renderContent()}
          {this.renderSubmit()}
        </SkModal>
      )
    } else {
      return null
    }
    // return (
    //   <Modal
    //     open={this.props.open}
    //     onClose={this.props.onClose()}
    //   >

    //   </Modal>
    // )
  }
}

StudentRequestModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  cl: PropTypes.object,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
}

export default StudentRequestModal
