import React from 'react'
import PropTypes from 'prop-types'

class CheckboxField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isFocused: false,
      isChecked: false,
      bgColor: ''
    }
  }

  onBlur () {
    this.setState({isFocused: false})
    if (this.props.onBlur) this.props.onBlur()
  }

  onChange (event) {
    this.props.onChange(event.target.name, event.target.checked)
  }

  onFocus () {
    this.setState({isFocused: true})
    if (this.props.onFocus) this.props.onFocus()
  }

  onClick () {
    this.setState({
      isChecked: !this.state.isChecked,
      bgColor: !this.state.isChecked ? '#57B9E4' : 'transparent'
    })
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
    const containerClasses = ['cn-input-container-checkbox']
    const labelClasses = ['cn-checkbox-label']
    const inputClasses = ['cn-form-checkbox']

    const {containerClassName, labelClassName, inputClassName,
      containerActiveClassName, labelActiveClassName, inputActiveClassName,
      containerErrorClassName, labelErrorClassName, inputErrorClassName,
      id, label, error
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
        <input
          type={'checkbox'}
          className={inputClasses.join(' ')}
          id={input.id}
          name={input.name}
          style={{backgroundColor: this.state.bgColor}}
          onBlur={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
          onFocus={this.onFocus.bind(this)}
          onClick={this.onClick.bind(this)}
          checked={input.value}
        />
        {label
          ? <label className={labelClasses.join(' ')} htmlFor={id}>
            {label} {this.renderInfo()}
          </label> : null
        }
      </div>
    )
  }
}

CheckboxField.propTypes = {
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
  onClick: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  info: PropTypes.bool
}

export default CheckboxField
