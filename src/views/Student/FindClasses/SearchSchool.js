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

  /*
  * If professor exists, select professor
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
        <div>
          <span>{data.name}</span>
        </div>
      </div>
    )
  }

  render () {
    return (
      <AutoComplete
        className={this.state.loading ? 'loading' : ''}
        dataSource={this.getDataSource()}
        emptyMessage={
          <div className='cn-autocomplete-results-container'>
            <div className='cn-autocomplete-result'>{`Can\'t find your professor? `}
              {/* <a onClick={this.onAddProfessor.bind(this)}>Add a new one.</a> */}
            </div>
          </div>
        }
        updateAutoCompleteResults={this.onUpdateAutoComplete.bind(this)}
        placeholder='Find your school'
        renderRow={this.renderRow.bind(this)}
      />
    )
  }
}

SearchSchool.propTypes = {
  onSchoolSelect: PropTypes.func.isRequired
}

export default SearchSchool
