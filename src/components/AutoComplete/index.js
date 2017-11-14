import React from 'react'
import AutoCompleteInput from './AutoCompleteInput'

class AutoComplete extends React.Component {
  constructor (props) {
    super(props)
    this.minimumLength = 5
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      autoCompleteResults: [],
      autoCompleteValue: '',
      isDirty: false
    }
  }

  updateAutoCompleteResults (value) {
    const autoCompleteResults = this.props.dataSource.filter(data => {
      return data.name.toLowerCase().includes(value.toLowerCase())
    })
    this.setState({autoCompleteValue: value, autoCompleteResults, isDirty: true})
  }

  renderAutoCompleteResults () {
    if (this.state.isDirty && this.state.autoCompleteValue.length > 0) {
      if (this.props.dataSource.length === 0) return this.props.emptyMessage
      return this.props.dataSource.map((rowData, index) => {
        return this.props.renderRow(rowData, index, this.resetState.bind(this))
      })
    }
  }

  resetState () {
    this.setState(this.initializeState())
  }

  renderInput () {
    return (
      <AutoCompleteInput
        {...this.props}
        onChange={this.updateAutoCompleteResults.bind(this)}
        value={this.state.autoCompleteValue}
      />
    )
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

export default AutoComplete
