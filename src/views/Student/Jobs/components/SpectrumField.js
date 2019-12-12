import React from 'react'
import PropTypes from 'prop-types'

class SpectrumField extends React.Component {
  constructor (props) {
    super(props)

    let options = {}
    this.props.options.forEach(o => {
      let selection = false
      if (this.props.selection === o) {
        selection = true
      }
      options[o] = selection
    })

    this.state = {
      options
    }
  }

  handleChange (option) {
    let options = this.state.options
    let state = options[option]
    options[option] = !state
    if (!state) {
      this.props.options.filter(o => o !== option).forEach(option => {
        options[option] = false
      })
    }
    this.setState({options})

    let data = []
    this.props.options.forEach(o => {
      if (this.state.options[o]) {
        data.push(o)
      }
    })
    this.props.updateData(data)
  }

  render () {
    return (
      <div className='jobs-form-spectrum'>
        <div className='jobs-form-spectrum-options'>
          {this.props.options.map(option => {
            return (
              <div className='jobs-form-spectrum-option' key={this.props.options.indexOf(option)}>
                <p>{option}</p>
              </div>
            )
          })}
        </div>
        <div className='jobs-form-spectrum-background' />
        <div className='jobs-form-spectrum-checks'>
          {this.props.options.map(option => {
            return (
              <div className='jobs-form-spectrum-check' key={this.props.options.indexOf(option)}>
                <label className='checkbox-container'>
                  <input
                    type="checkbox"
                    checked={this.state.options[option]}
                    onChange={() => {
                      this.handleChange(option)
                    }}
                  />
                  <span className='checkmark' />
                </label>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

SpectrumField.propTypes = {
  options: PropTypes.array,
  updateData: PropTypes.func,
  selection: PropTypes.string
}

export default SpectrumField
