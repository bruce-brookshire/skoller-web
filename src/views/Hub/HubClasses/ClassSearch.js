import React from 'react'
import PropTypes from 'prop-types'
import {InputField, SelectField} from '../../../components/Form'
import Loading from '../../../components/Loading'
import actions from '../../../actions'

class ClassSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      schools: [],
      statuses: [],
      schoolId: '',
      searchField: '',
      searchValue: ''
    }
  }

  /*
  * Fetch data to poplate drop downs.
  */
  componentWillMount () {
    const {state} = this.props.location
    actions.schools.getHubSchoolsMinified().then((schools) => {
      this.setState({schools})
    }).catch(() => false)

    actions.hub.getStatuses().then((statuses) => {
      this.setState({statuses: statuses.statuses})
      if (state && (state.needsHelp || state.needsChange || state.needsMaint || state.needsApproval)) this.intitializeParams()
    }).catch(() => false)
  }

  intitializeParams () {
    const {state} = this.props.location
    if (state) {
      if (state.needsHelp) {
        this.setState({searchField: 'class_status', searchValue: 600})
        this.onSearch()
      } else if (state.needsChange) {
        this.setState({searchField: 'class_status', searchValue: 800})
        this.onSearch()
      } else if (state.needsMaint) {
        this.setState({searchField: 'class_maint', searchValue: true})
        this.onSearch()
      } else if (state.needsApproval) {
        this.setState({searchField: 'class_status', searchValue: 100})
        this.onSearch()
      }
    }
  }

  /*
  * Populate school drop down.
  */
  getSchoolOptions () {
    return this.state.schools.map(school => {
      return {value: school.id, name: school.name}
    })
  }

  /*
  * Populate search field drop down.
  */
  getSearchFieldOptions () {
    const options = [
      {value: 'class_name', name: 'Class Name'},
      {value: 'class_number', name: 'Class Number'},
      {value: 'class_status', name: 'Status'},
      {value: 'professor_name', name: 'Professor'},
      {value: 'class_maint', name: 'Maintenance'}
    ]

    return options
  }

  /*
  * Populate status drop down.
  */
  getStatusOptions () {
    return this.state.statuses.map(status => {
      return {value: status.id, name: status.name}
    })
  }

  renderValueInput () {
    switch (this.state.searchField) {
      case 'class_status':
        return (
          <SelectField
            name='searchValue'
            label='Select status'
            options={this.getStatusOptions()}
            onChange={this.onChangeSearchValue.bind(this)}
            value={this.state.searchValue}
          />
        )
      default:
        return (
          <InputField
            name='searchValue'
            label='Contains'
            onChange={this.onChangeSearchValue.bind(this)}
            placeholder='Search value'
            value={this.state.searchValue}
          />
        )
    }
  }

  /*
  * Update the school.
  */
  onChangeSchools (name, value) {
    this.setState({schoolId: value})
  }

  /*
  * Update the field to query classes.
  */
  onChangeSearchField (name, value) {
    this.setState({searchField: value, searchValue: ''})
  }

  /*
  * Update the search value to query classes.
  */
  onChangeSearchValue (name, value) {
    this.setState({searchValue: value})
  }

  onSearch () {
    if (this.state.schoolId || (this.state.searchField && this.state.searchValue)) {
      let params = ''
      if (this.state.schoolId && this.state.searchField) {
        params = `school=${this.state.schoolId}&${this.state.searchField}=${this.state.searchValue}`
      } else if (this.state.schoolId) {
        params = `school=${this.state.schoolId}`
      } else if (this.state.searchField && this.state.searchValue) {
        params = `${this.state.searchField}=${this.state.searchValue}`
      }
      this.props.onSearch(params)
    }
  }

  render () {
    let disabled = !(this.state.schoolId || (this.state.searchField && this.state.searchValue))
    if (this.state.searchField && !this.state.searchValue) disabled = true
    const disabledClass = disabled ? 'disabled' : ''
    return (
      <div>
        <div className='row'>
          <div className='col-xs-12 col-sm-3 margin-top'>
            <SelectField
              name='schoolId'
              label='School'
              options={this.getSchoolOptions()}
              onChange={this.onChangeSchools.bind(this)}
              value={this.state.school_id}
            />
          </div>
          <div className='col-xs-12 col-sm-3 margin-top'>
            <SelectField
              name='searchField'
              label='Search by'
              options={this.getSearchFieldOptions()}
              onChange={this.onChangeSearchField.bind(this)}
              value={this.state.searchField}
            />
          </div>
          <div className='col-xs-12 col-sm-3 margin-top'>
            {this.renderValueInput()}
          </div>
          <div className='col-xs-12 col-sm-3 margin-top vertical-align' style={{justifyContent: 'flex-end'}}>
            <button
              className={`button full-width ${disabledClass}`}
              disabled={disabled}
              onClick={this.onSearch.bind(this)}
            > Search
              {this.props.loading ? <Loading style={{color: 'white', marginLeft: '0.5em'}} /> : null}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

ClassSearch.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default ClassSearch
