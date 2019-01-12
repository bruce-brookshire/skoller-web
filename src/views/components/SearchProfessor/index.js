import React from 'react'
import PropTypes from 'prop-types'
import AutoComplete from '../../../components/AutoComplete'
import actions from '../../../actions'

class SearchProfessor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      professors: [],
      loading: false,
      value: ''
    }
  }

  /*
  * Return the data source for the auto complete.
  */
  getDataSource () {
    return this.state.professors
  }

  /*
  * Search for autocomplete.
  * @param [String] value. Autocomplete search value
  */
  onUpdateAutoComplete (value) {
    if (value) {
      this.setState({loading: true})
      actions.professors.searchProfessors(value, this.props.schoolId).then((professors) => {
        this.setState({professors, loading: false, value})
      }).catch(() => { this.setState({loading: false}) })
    } else {
      this.setState({professors: []})
    }
  }

  onProfessorCreate (name) {
    this.props.onProfessorCreate(name)
  }

  /*
  * If class exists, select class
  */
  onProfessorSelect (professor, resetState) {
    this.props.onProfessorSelect(professor)
    resetState()
  }

  renderTitle (nameFirst, nameLast) {
    const {value} = this.state
    const idxFirst = nameFirst ? nameFirst.toLowerCase().indexOf(value.toLowerCase()) : ''
    const idxLast = nameLast ? nameLast.toLowerCase().indexOf(value.toLowerCase()) : ''

    return (
      <span className='cn-autocomplete-detail-results-item title'>
        {idxFirst > -1 ? this.renderName(nameFirst ? nameFirst : '', idxFirst, value) : nameFirst}&nbsp;
        {idxLast > -1 ? this.renderName(nameLast ? nameLast : '', idxLast, value) : nameLast}
      </span>
    )
  }

  renderName (name, idx, value) {
    return (
      <span>{name.substring(0, idx)}<span className='cn-blue'>{name.substring(idx, idx + value.length)}</span>{name.substring(idx + value.length)}</span>
    )
  }

  /*
  * Render the autocomplete results.
  */
  renderRow (data, index, resetState) {
    return (
      <div className='cn-autocomplete-result' key={`result-${index}`} onClick={() => this.onProfessorSelect(data, resetState)}>
        <div className='cn-autocomplete-detail-results'>
          {this.renderTitle(data.name_first, data.name_last)}
          <span className='cn-autocomplete-detail-results-item'></span>
          <span className='cn-autocomplete-detail-results-item'>{data.email}</span>
          <div className='cn-results-divider'></div>
        </div>
      </div>
    )
  }

  emptyMessage () {
    const {isUniversity} = this.props
    return (
      <div className='cn-autocomplete-result'>
        <a onClick={() => this.onProfessorCreate()}>Create a new {isUniversity ? 'professor' : 'teacher'}</a>
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
        placeholder={'e.g. Smith'}
        renderRow={this.renderRow.bind(this)}
        newRow={true}
      />
    )
  }
}

SearchProfessor.propTypes = {
  schoolId: PropTypes.number,
  isUniversity: PropTypes.bool,
  onProfessorCreate: PropTypes.func.isRequired,
  onProfessorSelect: PropTypes.func.isRequired
}

export default SearchProfessor
