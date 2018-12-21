import React from 'react'
import PropTypes from 'prop-types'

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

FormMessage.propTypes = {
  message: PropTypes.string
}

class InputInfoField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {isFocused: false}
  }

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

  renderInfo () {
    const {info} = this.props
    if (info) {
      return (
        <div className='cn-info-container'>
          <div className='message-bubble triangle-bottom'>
            {info}
            <div className='triangle-inner' />
          </div>
          <i className='fa fa-info-circle'/>
        </div>
      )
    }
  }

  render () {
    const containerClasses = ['cn-input-container']
    const labelClasses = ['cn-input-label']
    const inputClasses = ['cn-form-input']

    const {containerClassName, labelClassName, inputClassName,
      containerActiveClassName, labelActiveClassName, inputActiveClassName,
      containerErrorClassName, labelErrorClassName, inputErrorClassName,
      id, label, error, showErrorMessage
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
      <div className='form-element relative'>
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
            type={input.type}
            value={input.value}
            disabled={input.disabled}
            size={input.size}
            max={input.max}
            min={input.min}
            pattern={input.pattern}
            autoComplete={input.autoComplete}
          />
        </div>
        {error && showErrorMessage ? <FormMessage message={error} /> : null}
      </div>
    )
  }
}

InputInfoField.propTypes = {
  containerClassName: PropTypes.string,
  containerActiveClassName: PropTypes.string,
  containerErrorClassName: PropTypes.string,
  disabled: PropTypes.bool,
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
  size: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  pattern: PropTypes.string,
  error: PropTypes.string,
  showErrorMessage: PropTypes.bool,
  info: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)]
  ).isRequired
}

export default InputInfoField
