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
      <div className='cn-point-total'>
        <div className='cn-point-total-header'>
          How many total points are available for this class?
        </div>
        <div>
          <InputField
            containerClassName='margin-top'
            error={formErrors.pointTotal}
            name="pointTotal"
            onChange={updateProperty}
            placeholder="Points"
            type="number"
            value={form.pointTotal}
            min={0}
          />
          <button className='button full-width margin-top margin-bottom' onClick={this.onSubmit.bind(this)}>Next step</button>
        </div>
        <div>
          <a onClick={() => this.props.reset()}>Go back</a>
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
  validateForm: PropTypes.func,
  reset: PropTypes.func
}

export default ValidateForm(Form(PointTotal, 'form'))
