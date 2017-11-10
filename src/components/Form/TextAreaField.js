import React from 'react'
import PropTypes from 'prop-types'
import {TextArea} from 'react-form-library'

class TextAreaField extends React.Component {
  render () {
    const {containerClassName} = this.props
    const containerClasses = ['cn-input-container']
    if (containerClassName) containerClasses.push(containerClassName)

    return (
      <TextArea
        containerClass={containerClasses.join(' ')}
        containerActiveClass='active'
        containerErrorClass='error'
        inputClass='cn-form-textarea'
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

TextArea.propTypes = {
  containerClassName: PropTypes.string,
  containerActiveClassName: PropTypes.string,
  containerErrorClassName: PropTypes.string,
  id: PropTypes.string,
  inputClassName: PropTypes.string,
  inputActiveClassName: PropTypes.string,
  inputErrorClasNames: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelActiveClassName: PropTypes.string,
  labelErrorClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string
  ]).isRequired
}

export default TextAreaField
