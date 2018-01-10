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
    const {containerClassName, error, showErrorMessage} = this.props
    const containerClasses = ['cn-input-container']
    if (containerClassName) containerClasses.push(containerClassName)

    return (
      <div className='form-element' style={{position:'relative'}}>
        <InputField
          type='time'
          {...this.props}
        />
        {error && showErrorMessage ? <FormMessage message={error} /> : null}
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
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)]
  ).isRequired
}

export default TimePickerField
