import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'

const requiredFields = {
  'min_ios_version': {
    type: 'required'
  },
  'min_android_version': {
    type: 'required'
  }
}

class MinVerUpdateDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      form: this.initializeFormData(),
      loading: false
    }
  }

  initializeFormData () {
    return {
      min_ios_version: this.findSetting('min_ios_version'),
      min_android_version: this.findSetting('min_android_version')
    }
  }

  findSetting (key) {
    return this.props.data.find(x => x.name === key).value
  }

  mapFormData () {
    const {form} = this.state

    let array = []

    Object.keys(form).forEach((k) => {
      let obj = {
        name: k,
        value: form[k]
      }
      array.push(obj)
    })

    return array
  }

  /*
  * On submit post notification
  */
  onSubmit (event) {
    event.preventDefault()

    if (this.props.validateForm(this.state.form, requiredFields)) {
      const data = this.mapFormData()

      actions.settings.updateMinVer(data).then(() => {
        this.props.onSubmit()
      }).catch(() => false)
    }
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div>
        <h1 className='cn-min-ver-header'>Minimum App Version Dashboard</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='cn-min-ver-row'>
                <div className='cn-min-ver-row-input'>
                  <InputField
                    label="iOS Version"
                    error={formErrors.min_ios_version}
                    name="min_ios_version"
                    onChange={updateProperty}
                    value={form.min_ios_version} />
                </div>
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='cn-min-ver-row'>
                <div className='cn-min-ver-row-input'>
                  <InputField
                    containerClassName="margin-top"
                    label="Android Version"
                    error={formErrors.min_android_version}
                    name="min_android_version"
                    onChange={updateProperty}
                    value={form.min_android_version} />
                </div>
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='cn-auto-update-summary'>
                <button
                  className={`button`}
                  disabled={this.state.loading}
                  type="submit"
                >Update</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

MinVerUpdateDashboard.propTypes = {
  data: PropTypes.array,
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  onSubmit: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(MinVerUpdateDashboard, 'form'))
