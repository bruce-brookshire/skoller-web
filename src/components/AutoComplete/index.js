import React from 'react'
import PropTypes from 'prop-types'
import AutoCompleteInput from './AutoCompleteInput'

class AutoComplete extends React.Component {
  constructor (props) {
    super(props)
    this.minimumLength = 5
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      autoCompleteValue: '',
      isDirty: false
    }
  }

  resetState () {
    this.setState(this.initializeState())
  }

  getSearchText () {
    return this.state.autoCompleteValue
  }

  renderInput () {
    return (
      <AutoCompleteInput
        {...this.props}
        onChange={(event) => {
          this.setState({isDirty: true, autoCompleteValue: event.target.value})
        }}
        onKeyUp={this.onKeyUp.bind(this)}
        value={this.state.autoCompleteValue}
      />
    )
  }

  renderAutoCompleteResults () {
    if (this.state.isDirty) {
      if (this.props.dataSource.length === 0) return this.props.emptyMessage
      return (
        <div className='cn-autocomplete-results-container'>
          {this.props.dataSource.map((rowData, index) => {
            return this.props.renderRow(rowData, index, this.resetState.bind(this))
          })
          }
        </div>
      )
    }
  }

  /*
  * Allow the user to filter.
  *
  * @param [Event] event. On key up on an input field.
  */
  onKeyUp (event) {
    let self = this
    this.timeout = setTimeout(() => {
      if (self.timeout) clearTimeout(self.timeout)
      self.onUpdateAutoCompleteResults(self.state.autoCompleteValue)
    }, 400)
  }

  /*
  * Allow the user to update auto complete results.
  *
  * @param [Any] value. Value for the autocomplete inut field
  */
  onUpdateAutoCompleteResults (value) {
    this.props.updateAutoCompleteResults(value)
  }

  render () {
    return (
      <div className='cn-autocomplete-container'>
        {this.renderInput()}
        {this.renderAutoCompleteResults()}
      </div>
    )
  }
}

AutoComplete.propTypes = {
  dataSource: PropTypes.array,
  emptyMessage: PropTypes.any,
  renderRow: PropTypes.func,
  updateAutoCompleteResults: PropTypes.func
}

export default AutoComplete
