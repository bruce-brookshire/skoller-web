import React from 'react'
import PropTypes from 'prop-types'

class CheckboxField extends React.Component {
  constructor (props) {
    super(props)

    let options = {}
    this.props.options.forEach(o => {
      let selected = false
      if (this.props.selections) {
        this.props.selections.forEach(s => {
          if (s === o) {
            selected = true
          }
        })
      }
      options[o] = selected
    })

    this.state = {
      options
    }
  }

  handleChange (option) {
    if (this.props.maxSelection) {
      let options = this.state.options
      let state = options[option]
      options[option] = !state
      if (!state) {
        this.props.options.filter(o => o !== option).forEach(option => {
          options[option] = false
        })
      }
      this.setState({options})
    } else {
      let options = this.state.options
      options[option] = !this.state.options[option]
      this.setState({options})
    }

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
      <div className='jobs-form-checkbox'>
        {this.props.options.map(option => {
          return (
            <div key={this.props.options.indexOf(option)}>
              <label className='checkbox-container'>
                {option}
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
    )
  }
}

CheckboxField.propTypes = {
  options: PropTypes.array,
  maxSelection: PropTypes.number,
  updateData: PropTypes.func,
  selections: PropTypes.array
}

export default CheckboxField
