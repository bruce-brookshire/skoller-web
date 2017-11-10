import React from 'react'
import PropTypes from 'prop-types'
import {Select} from 'react-form-library'

class SelectField extends React.Component {
  render () {
    const {containerClassName} = this.props
    const containerClasses = ['cn-input-container']
    if (containerClassName) containerClasses.push(containerClassName)

    return (
      <Select
        containerClass={containerClasses.join(' ')}
        containerActiveClass='active'
        containerErrorClass='error'
        inputClass='cn-form-select'
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

SelectField.propTypes = {
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
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)],
    PropTypes.instanceOf(Object)
  ).isRequired
}

export default SelectField
