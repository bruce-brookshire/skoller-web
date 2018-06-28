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
      isDirty: false,
      newSearch: true
    }
  }

  resetState () {
    this.setState(this.initializeState())
  }

  getSearchText () {
    return this.state.autoCompleteValue
  }

  onBlur () {
    if (this.props.onBlur) this.props.onBlur()
  }

  onFocus () {
    if (this.props.onFocus) this.props.onFocus()
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
        onBlur={this.onBlur.bind(this)}
        onFocus={this.onFocus.bind(this)}
      />
    )
  }

  renderAutoCompleteResults () {
    if (this.state.isDirty) {
      const loading = this.state.newSearch || this.props.className === 'loading'
      const blank = this.state.autoCompleteValue === ''
      if (this.props.dataSource.length === 0 && !loading && !blank) {
        return (
          <div className='cn-autocomplete-results-container'>
            {this.props.emptyMessage(this.getSearchText.bind(this))}
          </div>
        )
      }
      return (
        <div className='cn-autocomplete-results-container'>
          {this.props.dataSource.map((rowData, index) => {
            return this.props.renderRow(rowData, index, this.resetState.bind(this))
          })
          }
          {this.props.newRow && !blank && !loading && this.props.emptyMessage(this.getSearchText.bind(this))}
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
      this.setState({newSearch: false})
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
  updateAutoCompleteResults: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  newRow: PropTypes.bool,
  className: PropTypes.string
}

export default AutoComplete
