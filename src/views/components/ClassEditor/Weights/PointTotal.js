import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../../components/Form'

const requiredFields = {
  pointTotal: {
    validate: (value) => { return value && value > 0 },
    message: 'Required *'
  }
}

class PointTotal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      form: {
        pointTotal: props.pointTotal || 0
      }
    }
  }

  /*
  * Submit the weight total
  */
  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      this.props.onChange(this.state.form.pointTotal)
    }
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div>
        <div className='row'>
          <span style={{margin: '0 auto'}}>Enter the total number of points for the class.</span>
          <div className='col-xs-6' style={{margin: '0 auto'}}>
            <InputField
              containerClassName='margin-top'
              error={formErrors.pointTotal}
              label="Total points"
              name="pointTotal"
              onChange={updateProperty}
              placeholder="Total points"
              type="number"
              value={form.pointTotal}
            />
            <button className='button full-width margin-top margin-bottom' onClick={this.onSubmit.bind(this)}>OK</button>
          </div>
        </div>
      </div>
    )
  }
}

PointTotal.propTypes = {
  formErrors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  pointTotal: PropTypes.number,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(PointTotal, 'form'))
