import React from 'react'
import PropTypes from 'prop-types'
import AutoComplete from '../AutoComplete'
import {matchText} from '../../utilities/display'

class MultiselectField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {professors: [], loading: false}
  }

  /*
  * Render the autocomplete results.
  */
  renderRow (data, index, resetState) {
    return (
      <div
        className='cn-autocomplete-result'
        key={index}
        onClick={() => this.onSelect(data)}
      >
        {this.autoComplete ?
          matchText(data.name, this.autoComplete.getSearchText())
          : data.name
        }
      </div>
    )
  }

  /*
  * On select item.
  */
  onSelect (data) {
    this.props.onAdd(this.props.name, data)
    this.autoComplete.resetState()
  }

  /*
  * On delete value.
  */
  onDelete (value) {
    this.props.onDelete(this.props.name, value)
  }

  /*
  * Search for autocomplete.
  * @param [String] value. Autocomplete search value
  */
  onUpdateAutoCompleteResults (value) {
    this.props.onUpdateOptions(value)
  }

  /*
  * Map the options falue.
  */
  mapValue () {
    return this.props.value.map((value, index) => {
      return (
        <span
          key={index}
          className='cursor'
          onClick={() => this.onDelete(value)}
        >
          {value.name}
          {index !== this.props.value.length - 1 ? ', ' : ''}
        </span>
      )
    })
  }

  render () {
    const {containerClassName, emptyMessage, loading, options, placeholder, value} = this.props

    const containerClasses = ['cn-input-container']
    if (containerClassName) containerClasses.push(containerClassName)

    return (
      <div className={containerClasses.join(' ')}>
        {value.length > 0 &&
          <div className='description cn-blue'>
            {this.mapValue()}
          </div>
        }
        <div>
          <AutoComplete
            ref={(component) => { if (component) { this.autoComplete = component } }}
            className={loading ? 'loading': ''}
            dataSource={options}
            emptyMessage={emptyMessage}
            updateAutoCompleteResults={this.onUpdateAutoCompleteResults.bind(this)}
            placeholder={placeholder}
            renderRow={this.renderRow.bind(this)}
          />
        </div>
      </div>
    )
  }
}

MultiselectField.propTypes = {
  containerClassName: PropTypes.string,
  emptyMessage: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  loading: PropTypes.bool,
  name: PropTypes.string,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdateOptions: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.array
}

export default MultiselectField
