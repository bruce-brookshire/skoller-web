import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import AutoComplete from '../../../components/AutoComplete'
import actions from '../../../actions'
import {mapProfessor} from '../../../utilities/display'

@inject('rootStore') @observer
class SearchProfessor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {professors: [], loading: false}
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
    const {userStore: {user: {student: {school}}}} = this.props.rootStore

    if (value) {
      this.setState({loading: true})
      actions.professors.searchProfessors(value, school.periods[0].id).then((professors) => {
        this.setState({professors, loading: false})
      }).catch(() => { this.setState({loading: false}) })
    } else {
      this.setState({professors: []})
    }
  }

  render () {
    return (
      <div className='row margin-top'>
        <div className='col-xs-12 col-md-6 col-lg-4'>
          <h5>Who teaches this class?</h5>
          <AutoComplete
            className={this.state.loading ? 'loading': ''}
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
  cl: PropTypes.object.isRequired,
  onAddProfessor: PropTypes.func.isRequired,
  onProfessorSelect: PropTypes.func.isRequired,
  rootStore: PropTypes.object
}

export default SearchProfessor
