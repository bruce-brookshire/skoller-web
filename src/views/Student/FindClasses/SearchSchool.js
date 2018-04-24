import React from 'react'
import PropTypes from 'prop-types'
import AutoComplete from '../../../components/AutoComplete'
import actions from '../../../actions'

class SearchSchool extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      schools: [],
      loading: false
    }
  }

  /*
  * Return the data source for the auto complete.
  */
  getDataSource () {
    return this.state.schools
  }

  /*
  * Search for autocomplete.
  * @param [String] value. Autocomplete search value
  */
  onUpdateAutoComplete (value) {
    if (value) {
      this.setState({loading: true})
      actions.schools.searchSchools(value).then((schools) => {
        this.setState({schools, loading: false})
      }).catch(() => { this.setState({loading: false}) })
    } else {
      this.setState({schools: []})
    }
  }

  onSchoolCreate (name) {
    this.props.onSchoolCreate(name)
  }

  /*
  * If school exists, select school
  */
  onSchoolSelect (school, resetState) {
    this.props.onSchoolSelect(school)
    resetState()
  }

  /*
  * Render the autocomplete results.
  */
  renderRow (data, index, resetState) {
    return (
      <div className='cn-autocomplete-result' key={`result-${index}`} onClick={() => this.onSchoolSelect(data, resetState)}>
        <div className='cn-find-classes-results'>
          <span className='cn-find-classes-results-item title'>{data.name}</span>
          <span className='cn-find-classes-results-item'></span>
          <span className='cn-find-classes-results-item'>{data.adr_locality}, {data.adr_region}</span>
          <div className='cn-results-divider'></div>
        </div>
      </div>
    )
  }

  emptyMessage (searchText) {
    return (
      <div className='cn-autocomplete-result'>
        <a onClick={() => this.onSchoolCreate(searchText())}>Create a new school called {searchText()}</a>
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
        placeholder='Find your school'
        renderRow={this.renderRow.bind(this)}
        newRow={true}
      />
    )
  }
}

SearchSchool.propTypes = {
  onSchoolSelect: PropTypes.func.isRequired,
  onSchoolCreate: PropTypes.func.isRequired
}

export default SearchSchool
