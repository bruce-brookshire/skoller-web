import React from 'react'
import PropTypes from 'prop-types'

class SelectField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {isFocused: false}
  }

  onBlur (event) {
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
    if (this.props.info) {
      return (
        <div className='cn-info-container'>
          <div className='message-bubble triangle-bottom'>
            {this.props.info}
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
      id, label, error, placeholder
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

    if (error) {
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
        <select
          className={inputClasses.join(' ')}
          id={input.id}
          name={input.name}
          onBlur={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
          onFocus={this.onFocus.bind(this)}
          value={input.value}
          disabled={input.disabled}
        >
          <option value=''>{placeholder || 'Select...'}</option>
          {
            this.props.options.map((option, index) => {
              return (
                <option
                  key={index}
                  value={option.value || option.id || option.name}>{option.name}
                </option>
              )
            })
          }
        </select>
      </div>
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
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)],
  PropTypes.instanceOf(Object)
  ).isRequired,
  error: PropTypes.bool,
  info: PropTypes.string
}

export default SelectField
