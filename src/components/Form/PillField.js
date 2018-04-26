import React from 'react'
import PropTypes from 'prop-types'

class PillField extends React.Component {

  onClick () {
    this.props.onClick(this.props.label)
  }

  render () {
    const inputClasses = ['cn-form-pill','full-width']

    const {inputClassName, inputActiveClassName, inputErrorClassName,
      id, label, error, message
    } = this.props

    if (inputClassName) inputClasses.push(inputClassName)
    if (this.props.value == this.props.label){inputClasses.push('button')}else{inputClasses.push('button-invert')}

    if (this.props.error) {
      inputClasses.push('error')
      if (inputErrorClassName) inputClasses.push(inputErrorClassName)
    }

    const input = this.props
    return (
      <div className='col-xs-12 col-md-6 col-lg-4 cn-pill-container'>
        <button
          className={inputClasses.join(' ')}
          id={input.id}
          onClick={this.onClick.bind(this)}>
          {input.label}
        </button>
      </div>
    )
  }
}

PillField.propTypes = {
  id: PropTypes.string,
  inputClass: PropTypes.string,
  inputActiveClass: PropTypes.string,
  inputErrorClass: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default PillField
