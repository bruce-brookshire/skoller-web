import React from 'react'
import PropTypes from 'prop-types'
import AutoComplete from '../../../components/AutoComplete'
import actions from '../../../actions'

class SearchClass extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      loading: false,
      value: ''
    }
  }

  /*
  * Return the data source for the auto complete.
  */
  getDataSource () {
    return this.state.classes
  }

  /*
  * Search for autocomplete.
  * @param [String] value. Autocomplete search value
  */
  onUpdateAutoComplete (value) {
    if (value) {
      this.setState({loading: true})
      actions.classes.searchStudentClasses(this.props.schoolId, value).then((classes) => {
        this.setState({classes, loading: false, value})
      }).catch(() => { this.setState({loading: false}) })
    } else {
      this.setState({classes: []})
    }
  }

  onClassCreate (name) {
    this.props.onClassCreate(name)
  }

  /*
  * If class exists, select class
  */
  onClassSelect (cl, resetState) {
    this.props.onClassSelect(cl)
    resetState()
  }

  renderTitle (name) {
    const {value} = this.state
    const idx = name.toLowerCase().indexOf(value.toLowerCase())

    return (
      <span className='cn-autocomplete-detail-results-item title'>
        {name.substring(0, idx)}<span className='cn-blue'>{name.substring(idx, idx + value.length)}</span>{name.substring(idx + value.length)}
      </span>
    )
  }

  /*
  * Render the autocomplete results.
  */
  renderRow (data, index, resetState) {
    return (
      <div className='cn-autocomplete-result' key={`result-${index}`} onClick={() => this.onClassSelect(data, resetState)}>
        <div className='cn-autocomplete-detail-results'>
          {this.renderTitle(data.name)}
          <span className='cn-autocomplete-detail-results-item'></span>
          {data.professor
            ? <span className='cn-autocomplete-detail-results-item'>{data.professor.name_first} {data.professor.name_last}</span>
            : <span className='cn-autocomplete-detail-results-item'>--</span>}
          <span className='cn-autocomplete-detail-results-item'>{data.class_period.name}</span>
          <span className='cn-autocomplete-detail-results-item'>{data.meet_days} {data.meet_start_time}</span>
          <span className='cn-autocomplete-detail-results-item'>{data.subject} {data.code}.{data.section}</span>
          <div className='cn-results-divider'></div>
        </div>
      </div>
    )
  }

  emptyMessage (searchText) {
    return (
      <div className='cn-autocomplete-result'>
        <a onClick={() => this.onClassCreate(searchText())}>Create a new class called {searchText()}</a>
      </div>
    )
  }

  render () {
    return (
      <AutoComplete
        className={this.state.loading ? 'loading' : ''}
        dataSource={this.getDataSource()}
        emptyMessage={this.emptyMessage.bind(this)}
        updateAutoCompleteResults={this.onUpdateAutoComplete.bind(this)}
        placeholder='Find your class'
        renderRow={this.renderRow.bind(this)}
        newRow={true}
      />
    )
  }
}

SearchClass.propTypes = {
  schoolId: PropTypes.number,
  onClassSelect: PropTypes.func.isRequired,
  onClassCreate: PropTypes.func.isRequired
}

export default SearchClass
