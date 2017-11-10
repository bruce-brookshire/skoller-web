import React from 'react'
import PropTypes from 'prop-types'
import {InputField, TextAreaField} from '../../../../components/Form'

class ProfessorForm extends React.Component {
  render () {
    const {form, formErrors, updateProperty} = this.props
    return (
      <div className='col-xs-12'>
        <form>
          <InputField
            containerClassName='margin-top'
            error={formErrors.first_name}
            label='First Name'
            name='first_name'
            onBlur={() => console.log('onBlur')}
            onChange={updateProperty}
            onFocus={() => console.log('onFocus')}
            placeholder='First Name'
            value={form.first_name}
          />
          <InputField
            containerClassName='margin-top'
            error={formErrors.last_name}
            label='Last Name'
            name='last_name'
            onBlur={() => console.log('onBlur')}
            onChange={updateProperty}
            onFocus={() => console.log('onFocus')}
            placeholder='Last Name'
            value={form.last_name}
          />
          <InputField
            containerClassName='margin-top'
            error={formErrors.email}
            label='Email'
            name='email'
            onBlur={() => console.log('onBlur')}
            onChange={updateProperty}
            onFocus={() => console.log('onFocus')}
            placeholder='Email'
            value={form.email}
          />
          <InputField
            containerClassName='margin-top'
            error={formErrors.phone}
            label='Phone Number'
            name='phone'
            onBlur={() => console.log('onBlur')}
            onChange={updateProperty}
            onFocus={() => console.log('onFocus')}
            placeholder='Phone Number'
            type='number'
            value={form.phone}
          />
          <InputField
            containerClassName='margin-top'
            error={formErrors.office}
            label='Office'
            name='office'
            onBlur={() => console.log('onBlur')}
            onChange={updateProperty}
            onFocus={() => console.log('onFocus')}
            placeholder='Office'
            value={form.office}
          />
          <TextAreaField
            containerClassName='margin-top'
            error={formErrors.office}
            label='Availability'
            name='availability'
            onBlur={() => console.log('onBlur')}
            onChange={updateProperty}
            onFocus={() => console.log('onFocus')}
            rows={5}
            placeholder='Availability'
            value={form.availability}
          />
          <button className='button full-width margin-top margin-bottom' onClick={() => false}>Submit professor info</button>
        </form>
      </div>
    )
  }
}

ProfessorForm.propTypes = {
  form: PropTypes.object,
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func
}

export default ProfessorForm
