import React from 'react'
import {Input} from 'react-form-library'


class InputField extends React.Component {
  render () {
    return (
      <Input
        containerClass="cn-input-container"
        containerActiveClass="active"
        containerErrorClass="error"
        inputClass="cn-form-input"
        inputActiveClass="active"
        inputErrorClass="error"
        labelClass="cn-input-label"
        labelActiveClass="active"
        labelErrorClass="error"
        {...this.props}
      />
    )
  }
}

export default InputField
