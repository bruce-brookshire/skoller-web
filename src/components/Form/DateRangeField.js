import React from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'

class DateRangeField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      max: null,
      min: null,
      isFocused: false
    }
  }

  onBlur () {
    this.setState({isFocused: false})
    if (this.props.onBlur) this.props.onBlur()
  }

  onChange (event) {
    let name = event.target.name
    let value = {}
    if (name === 'min_date'){
    	value = {min: event.target.value, max: this.state.max}
    	this.setState({min: event.target.value})
    } else {
    	value = {min: this.state.min, max: event.target.value}
    	this.setState({max: event.target.value})
    }
    this.props.onChange(name, value)
  }

  onFocus () {
    this.setState({isFocused: true})
    if (this.props.onFocus) this.props.onFocus()
  }

  render () {
    const containerClasses = ['cn-input-container']
    const labelClasses = ['cn-input-label']
    const inputClasses = ['cn-form-input','cn-date-range-input']

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
        <div className='cn-date-range-fields row'>
          <input
            className={inputClasses.join(' ')}
            id={input.id}
            name='min_date'
            onBlur={this.onBlur.bind(this)}
            onChange={this.onChange.bind(this)}
            onFocus={this.onFocus.bind(this)}
            placeholder={'Start'}
            type='date'
            value={input.value.min}
          />
          <input
            className={inputClasses.join(' ')}
            id={input.id}
            name='max_date'
            onBlur={this.onBlur.bind(this)}
            onChange={this.onChange.bind(this)}
            onFocus={this.onFocus.bind(this)}
            placeholder={'End'}
            type='date'
            value={input.value.max}
          />
        </div>
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

export default DateRangeField
