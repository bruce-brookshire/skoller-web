import React from 'react'
import PropTypes from 'prop-types'
import {InputField} from '../../../components/Form'

class WeightFields extends React.Component {
  render () {
    const {form, formErrors, updateProperty} = this.props
    return (
      <div>
        <div className='row'>
          <div className='col-xs-8'>
            <InputField
              error={formErrors.profile && formErrors.profile.first_name}
              label="Category name"
              name="form.name"
              onBlur={() => console.log('onBlur')}
              onChange={updateProperty}
              onFocus={() => console.log('onFocus')}
              placeholder="Weight Category, i.e. Exams"
              value={form.name}
            />
          </div>
          <div className='col-xs-4'>
            <InputField
              error={formErrors.profile && formErrors.profile.first_name}
              label="Weight"
              name="form.weight"
              onBlur={() => console.log('onBlur')}
              onChange={updateProperty}
              onFocus={() => console.log('onFocus')}
              placeholder="Weight"
              type="number"
              value={form.name}
            />
          </div>
        </div>

      </div>
    )
  }
}

WeightFields.propTypes = {
  form: PropTypes.object,
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func
}
