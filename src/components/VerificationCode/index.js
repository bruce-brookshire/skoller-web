import React from 'react'
import PropTypes from 'prop-types'

class VerificationCode extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
    this.inputs= []
  }

  /*
  * Autofocus input
  */
  componentDidMount () {
    this.inputs[0].input.focus()
  }

  initializeState () {
    return {
      form: this.initializeFormData()
    }
  }

  initializeFormData () {
    const {numberOfDigits} = this.props
    let form = {}
    for (let i = 0; i < numberOfDigits; i++) {
      form[`input${i}`] = ''
    }

    return form
  }

  renderInputs () {
    const {form} = this.state
    const {numberOfDigits} = this.props

    let inputs = []
    for (let i = 0; i < numberOfDigits; i++) {
      inputs.push(
        <VerifitcationInput
          ref={(component) => { if (component) this.inputs[i] = component }}
          key={`input-${i}`}
          index={i}
          onChange={this.onChange.bind(this)}
          value={form[`input${i}`]}
        />
      )
    }

    return inputs
  }

  onChange (value, index) {
    // only allow numbers
    if (value && isNaN(value)) return

    const newForm = {...this.state.form}
    newForm[`input${index}`] = value
    this.setState({form: newForm})

    if (this.props.onChange) {
      let value = ''
      Object.keys(newForm).forEach(key => {
        value = `${value}${newForm[key]}`
      })
      this.props.onChange(value)
    }

    // Programtically tab to the next input
    if (index !== this.props.numberOfDigits - 1 && value) {
      this.inputs[index + 1].input.focus()
    }
  }

  render () {
    return (
      <div className='cn-verification-code-container'>
        {this.renderInputs()}
      </div>
    )
  }
}

VerificationCode.propTypes = {
  numberOfDigits: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default VerificationCode

class VerifitcationInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {isFocused: false}
  }
  render () {
    const {index, value, onChange} = this.props

    const classes = ['cn-verification-code-input']
    if (this.state.isFocused) classes.push('active')

    return (
      <input
        ref={(component) => { this.input = component }}
        key={`input-${index}`}
        className={classes.join(' ')}
        onBlur={(event) => this.setState({isFocused: false})}
        onChange={(event) => { onChange(event.target.value, index) }}
        onFocus={(event) => this.setState({isFocused: true})}
        maxLength={1}
        value={value}
      />
    )
  }
}

VerifitcationInput.propTypes = {
  index: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string
}
