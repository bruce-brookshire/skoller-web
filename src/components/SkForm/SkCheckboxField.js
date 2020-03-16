import React from 'react'
import PropTypes from 'prop-types'

class SkCheckboxField extends React.Component {
  handleChange (option) {
    let options = this.props.options
    let onCount = 0

    Object.keys(options).map(k => {
      if (options[k].on) {
        onCount += 1
      }
    })

    if (onCount === 1) {
      if (!options[option].on) {
        options[option].on = !options[option].on
      }
    } else {
      options[option].on = !options[option].on
    }

    this.props.updateData(options)
  }

  render () {
    let options = this.props.options
    console.log(options)
    let optionsArray = Object.keys(options)
    return (
      <div className='sk-form-checkbox'>
        {optionsArray.map(option => {
          let on = this.props.options[option].on
          let color = this.props.options[option].color
          return (
            <div key={optionsArray.indexOf(option)}>
              <label className='checkbox-container' style={color && on ? {color: color, fontWeight: 600} : {color: '#ccc', fontWeight: 600}}>
                {option}
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => {
                    this.handleChange(option)
                  }}
                />
                <span
                  className='checkmark'
                  style={color && on
                    ? {
                      backgroundColor: color
                    }
                    : null
                  }
                />
              </label>
            </div>
          )
        })}
      </div>
    )
  }
}

SkCheckboxField.propTypes = {
  options: PropTypes.object,
  updateData: PropTypes.func,
  selections: PropTypes.array
}

export default SkCheckboxField
