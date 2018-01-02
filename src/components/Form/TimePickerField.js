import React from 'react'
import PropTypes from 'prop-types'
import TimePicker from 'react-times'
import 'react-times/css/classic/default.css'

class TimePickerField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {isFocused: false}
  }
  onHourChange (hour) {
    this.setState({hour})
  }

  onMinuteChange (minute) {
    this.setState({minute})
  }

  onMeridiemChange (meridiem) {
    this.setState({meridiem})
  }

  onTimeChange (time) {
    this.setState({time})
  }

  onFocusChange (focusStatue) {
    // do something
  }


  render () {
    const containerClasses = []
		const labelClasses = []
		const inputClasses = []

		const {containerClass, labelClass, inputClass,
				containerActiveClass, labelActiveClass, inputActiveClass,
			 containerErrorClass, labelErrorClass, inputErrorClass,
			 id, label
		 } = this.props

		if (containerClass) containerClasses.push(containerClass)
		if (labelClass) labelClasses.push(labelClass)
		if (inputClass) inputClasses.push(inputClass)

		if (this.state.isFocused) {
			if (containerActiveClass) containerClasses.push(containerActiveClass)
			if (labelActiveClass) labelClasses.push(labelActiveClass)
			if (inputActiveClass) inputClasses.push(inputActiveClass)
		}

		if (this.props.error ) {
			if (containerErrorClass) containerClasses.push(containerErrorClass)
			if (labelErrorClass) labelClasses.push(labelErrorClass)
			if (inputErrorClass) inputClasses.push(inputErrorClass)
		}

    return (
      <div className={containerClasses.join(' ')}>
        {label ?
					<label className={labelClasses.join(' ')} htmlFor={id}>
						{label}
					</label> : null
				}

        <TimePicker
          onFocusChange={this.onFocusChange.bind(this)}
          onHourChange={this.onHourChange.bind(this)}
          onMinuteChange={this.onMinuteChange.bind(this)}
          onTimeChange={this.onTimeChange.bind(this)}
          onMeridiemChange={this.onMeridiemChange.bind(this)}
        />
      </div>
    )
  }
}

TimePickerField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.function,
  value: PropTypes.stirng
}

export default TimePickerField
