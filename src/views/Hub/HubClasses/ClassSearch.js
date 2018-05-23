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
    const {searchField, searchValue} = this.state
    switch (searchField) {
      case 'class_status':
        return (
          <SelectField
            name='searchValue'
            label='Select status'
            options={this.getStatusOptions()}
            onChange={this.onChangeSearchValue.bind(this)}
            value={searchValue}
          />
        )
      default:
        return (
          <InputField
            name='searchValue'
            label='Contains'
            onChange={this.onChangeSearchValue.bind(this)}
            placeholder='Search value'
            value={searchValue}
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
    const {schoolId, searchField, searchValue} = this.state
    if (schoolId || (searchField && searchValue)) {
      let params = ''
      if (schoolId && searchField) {
        params = `school=${schoolId}&${searchField}=${searchValue}`
      } else if (schoolId) {
        params = `school=${schoolId}`
      } else if (searchField && searchValue) {
        params = `${searchField}=${searchValue}`
      }
      this.props.onSearch(params)
    }
  }

  render () {
    const {schoolId, searchField, searchValue} = this.state
    let disabled = !(schoolId || (searchField && searchValue))
    if (searchField && !searchValue) disabled = true
    const disabledClass = disabled ? 'disabled' : ''
    return this.props.hidden ? null : (
      <div>
        <div className='row'>
          <div className='col-xs-12 col-sm-3 margin-top'>
            <SelectField
              name='schoolId'
              label='School'
              options={this.getSchoolOptions()}
              onChange={this.onChangeSchools.bind(this)}
              value={schoolId}
            />
          </div>
          <div className='col-xs-12 col-sm-3 margin-top'>
            <SelectField
              name='searchField'
              label='Search by'
              options={this.getSearchFieldOptions()}
              onChange={this.onChangeSearchField.bind(this)}
              value={searchField}
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
  onSearch: PropTypes.func.isRequired,
  location: PropTypes.object,
  hidden: PropTypes.bool,
  loading: PropTypes.bool
}

export default ClassSearch
