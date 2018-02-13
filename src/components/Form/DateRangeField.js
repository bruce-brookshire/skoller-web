import React from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'

class DateRangeField extends React.Component {

  onBlur () {
    this.setState({isFocused: false})
    if (this.props.onBlur) this.props.onBlur()
  }

  onChange (event) {
    this.props.onChange(event.target.name, event.target.value)
  }

  onFocus () {
    this.setState({isFocused: true})
    if (this.props.onFocus) this.props.onFocus()
  }

  render () {
    const containerClasses = ['cn-input-container']
    const labelClasses = ['cn-input-label']
    const inputClasses = ['cn-form-input']

    const {containerClassName, labelClassName, inputClassName,
      containerActiveClassName, labelActiveClassName, inputActiveClassName,
      containerErrorClassName, labelErrorClassName, inputErrorClassName,
      id, label, error, message, showErrorMessage
    } = this.props

    if (containerClassName) containerClasses.push(containerClassName)
    if (labelClassName) labelClasses.push(labelClassName)
    if (inputClassName) inputClasses.push(inputClassName)

    if (this.state.isFocused) {
      containerClasses.push('active')
      labelClasses.push('active')
      inputClasses.push('active')
      if (containerActiveClassName) containerClasses.push(containerActiveClassName)
      if (labelActiveClassName) labelClasses.push(labelActiveClassName)
      if (inputActiveClassName) inputClasses.push(inputActiveClassName)
    }

    if (this.props.error) {
      containerClasses.push('error')
      labelClasses.push('error')
      inputClasses.push('error')
      if (containerErrorClassName) containerClasses.push(containerErrorClassName)
      if (labelErrorClassName) labelClasses.push(labelErrorClassName)
      if (inputErrorClassName) inputClasses.push(inputErrorClassName)
    }

    const input = this.props
    return (
      <div className={containerClasses.join(' ')}>
        {label
          ? <label className={labelClasses.join(' ')} htmlFor={id}>
            {label} {this.renderInfo()}
          </label> : null
        }
        <input
          className={inputClasses.join(' ')}
          id={input.id}
          name={input.name}
          onBlur={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
          onFocus={this.onFocus.bind(this)}
          placeholder={input.placeholder}
          rows={input.rows}
          type='date'
          value={input.value}
        />
      </div>
    )
  }
}

DateRangeField.propTypes = {
  containerClass: PropTypes.string,
  containerActiveClass: PropTypes.string,
  containerErrorClass: PropTypes.string,
  id: PropTypes.string,
  inputClass: PropTypes.string,
  inputActiveClass: PropTypes.string,
  inputErrorClass: PropTypes.string,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  labelActiveClass: PropTypes.string,
  labelErrorClass: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string
  ]).isRequired
}

export default TimePickerField
