import React from 'react'
import PropTypes from 'prop-types'
import AutoComplete from '../../../components/AutoComplete'
import actions from '../../../actions'

class SearchSemester extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      semesters: [],
      loading: false
    }
  }

  /*
  * Return the data source for the auto complete.
  */
  getDataSource () {
    return this.state.semesters
  }

  /*
  * Search for autocomplete.
  * @param [String] value. Autocomplete search value
  */
  onUpdateAutoComplete (value) {
    if (value) {
      this.setState({loading: true})
      actions.periods.getSchoolPeriods(this.props.schoolId, value).then((semesters) => {
        this.setState({semesters, loading: false})
      }).catch(() => { this.setState({loading: false}) })
    } else {
      this.setState({semesters: []})
    }
  }

  onSemesterCreate (name) {
    this.props.onSemesterCreate(name)
  }

  /*
  * If class exists, select class
  */
  onSemesterSelect (semester, resetState) {
    this.props.onSemesterSelect(semester)
    resetState()
  }

  /*
  * Render the autocomplete results.
  */
  renderRow (data, index, resetState) {
    return (
      <div className='cn-autocomplete-result' key={`result-${index}`} onClick={() => this.onSemesterSelect(data, resetState)}>
        <div className='cn-autocomplete-detail-results'>
          <span className='cn-autocomplete-detail-results-item title'>{data.name}</span>
          <span className='cn-autocomplete-detail-results-item'></span>
          <span className='cn-autocomplete-detail-results-item'>Students: {data.student_count}</span>
          <span className='cn-autocomplete-detail-results-item'>Classes: {data.class_count}</span>
          <div className='cn-results-divider'></div>
        </div>
      </div>
    )
  }

  emptyMessage (searchText) {
    const {isUniversity} = this.props
    return (
      <div className='cn-autocomplete-result'>
        <a onClick={() => this.onSemesterCreate(searchText())}>Create a new {isUniversity ? '' : 'year or '}semester called {searchText()}</a>
      </div>
    )
  }

  render () {
    const {isUniversity} = this.props
    return (
      <AutoComplete
        className={this.state.loading ? 'loading' : ''}
        dataSource={this.getDataSource()}
        emptyMessage={this.emptyMessage.bind(this)}
        updateAutoCompleteResults={this.onUpdateAutoComplete.bind(this)}
        placeholder={isUniversity ? 'e.g. Fall 2018' : 'e.g. 2018-19 or Fall 2019'}
        renderRow={this.renderRow.bind(this)}
        newRow={true}
      />
    )
  }
}

SearchSemester.propTypes = {
  schoolId: PropTypes.number,
  isUniversity: PropTypes.bool,
  onSemesterSelect: PropTypes.func.isRequired,
  onSemesterCreate: PropTypes.func.isRequired
}

export default SearchSemester
