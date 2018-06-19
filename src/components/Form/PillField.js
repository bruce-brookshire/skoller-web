import React from 'react'
import PropTypes from 'prop-types'

class PillField extends React.Component {
  onClick () {
    this.props.onClick(this.props.label)
  }

  render () {
    const inputClasses = ['cn-form-pill', 'full-width']
    const containerClasses = ['col-xs-12', 'col-md-6', 'col-lg-4', 'cn-pill-container']

    const {inputClassName, inputErrorClassName, label, error} = this.props

    if (inputClassName) inputClasses.push(inputClassName)
    if (this.props.value === label) {
      inputClasses.push('button')
    } else {
      inputClasses.push('button-invert')
    }

    if (error) {
      containerClasses.push('error')
      inputClasses.push('error')
      if (inputErrorClassName) inputClasses.push(inputErrorClassName)
    }

    const input = this.props
    return (
      <div className={containerClasses.join(' ')}>
        <button
          className={inputClasses.join(' ')}
          id={input.id}
          onClick={this.onClick.bind(this)}
          type={input.type ? input.type : 'submit'}>
          {input.label}
        </button>
      </div>
    )
  }
}

PillField.propTypes = {
  id: PropTypes.string,
  inputClassName: PropTypes.string,
  inputErrorClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.bool
}

export default PillField
