import React from 'react'
import PropTypes from 'prop-types'
import AutoComplete from '../../../../components/AutoComplete'
import actions from '../../../../actions'
import {mapProfessor} from '../../../../utilities/display'

class SearchProfessor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {professors: []}
  }

  /*
  * Render the autocomplete results.
  */
  renderRow (data, index, resetState) {
    return (
      <div className='cn-autocomplete-results' key={`result-${index}`} onClick={() => this.onProfessorSelect(data)}>
        <span>{mapProfessor(data)}</span>
        <div>
          <span>{data.email}</span>
        </div>
      </div>
    )
  }

  /*
  * Return the data source for the auto complete.
  */
  getDataSource () {
    return this.state.professors
  }

  /*
  * Handle on professor doesn't exist..
  */
  onAddProfessor () {
    this.props.onAddProfessor()
  }

  /*
  * If professor exists, select professor
  */
  onProfessorSelect (professor) {
    this.props.onProfessorSelect(professor)
  }

  /*
  * Search for autocomplete.
  * @param [String] value. Autocomplete search value
  */
  onUpdateAutoCompleteResults (value) {
    actions.professors.searchProfessors(value).then((professors) => {
      this.setState({professors})
    }).catch(() => false)
  }

  render () {
    return (
      <div className='row margin-top'>
        <div className='col-xs-12'>
          <h5>No professor selected.</h5>
          <AutoComplete
            dataSource={this.getDataSource()}
            emptyMessage={<div className='cn-autocomplete-results'>{`Can't find your professor? `}<a onClick={this.onAddProfessor.bind(this)}>Add a new one.</a></div>}
            updateAutoCompleteResults={this.onUpdateAutoCompleteResults.bind(this)}
            placeholder='Search for your professor...'
            renderRow={this.renderRow.bind(this)}
          />
        </div>
      </div>
    )
  }
}

SearchProfessor.propTypes = {
  onAddProfessor: PropTypes.func,
  onProfessorSelect: PropTypes.func
}

export default SearchProfessor
