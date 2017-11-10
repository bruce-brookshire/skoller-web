import React from 'react'
import PropTypes from 'prop-types'
import {Input} from 'react-form-library'

class InputField extends React.Component {
  render () {
    const {containerClassName} = this.props
    const containerClasses = ['cn-input-container']
    if (containerClassName) containerClasses.push(containerClassName)

    return (
      <Input
        containerClass={containerClasses.join(' ')}
        containerActiveClass='active'
        containerErrorClass='error'
        inputClass='cn-form-input'
        inputActiveClass='active'
        inputErrorClass='error'
        labelClass='cn-input-label'
        labelActiveClass='active'
        labelErrorClass='error'
        {...this.props}
      />
    )
  }
}

InputField.propTypes = {
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
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)]
  ).isRequired
}

export default InputField
