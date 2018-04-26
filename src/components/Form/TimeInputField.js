import React from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'

class FormMessage extends React.Component {
  render () {
    const {message} = this.props
    return (
      <div className="form-message message-bubble error">
        {message}
      </div>
    )
  }
}

class TimePickerField extends React.Component {

  render () {
    const {containerClassName, message, showErrorMessage, type, error} = this.props
    const containerClasses = ['cn-input-container']
    if (containerClassName) containerClasses.push(containerClassName)

    return (
      <div className='form-element' style={{position: 'relative'}}>
        <InputField
          {...this.props}
          type='tel'
          size={2}
          min={2}
          max={2}
          placeholder='00'
          pattern={type === 'hour' ? '^(([1][0-2])|([0][1-9]))$' : '^[0-5][05]$'}
        />
        {error && message && showErrorMessage ? <FormMessage message={message} /> : null}
      </div>
    )
  }
}

TimePickerField.propTypes = {
  containerClassName: PropTypes.string,
  containerActiveClassName: PropTypes.string,
  containerErrorClassName: PropTypes.string,
  id: PropTypes.string,
  inputClassName: PropTypes.string,
  inputActiveClassName: PropTypes.string,
  inputErrorClassName: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelActiveClassName: PropTypes.string,
  labelErrorClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  showErrorMessage: PropTypes.bool,
  step: PropTypes.number,
  type: PropTypes.string,
  message: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)]
  ).isRequired
}

export default TimePickerField
