import React from 'react'
import PropTypes from 'prop-types'
import {InputField, SelectField} from '../../../components/Form'
import Loading from '../../../components/Loading'
import actions from '../../../actions'
import SearchSchool from '../../components/SearchSchool'
import {inject, observer} from 'mobx-react'

@inject('rootStore') @observer
class ClassSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      schools: [],
      statuses: []
    }
  }

  /*
  * Fetch data to poplate drop downs.
  */
  componentWillMount () {
    const {state} = this.props.location;
    let {searchStore} = this.props.rootStore
    searchStore.searchField = 'class_name'
    searchStore.searchValue = ''

    actions.hub.getStatuses().then((statuses) => {
      this.setState({statuses: statuses.statuses})
      if (state && (state.needsHelp || state.needsChange || state.needsMaint)) this.intitializeParams()
    }).catch(() => false)
  }

  intitializeParams () {
    const {state} = this.props.location
    let {searchStore} = this.props.rootStore
    if (state) {
      if (state.needsChange) {
        searchStore.searchField = 'class_status'
        searchStore.searchValue = 1500
        this.onSearch()
      } else if (state.needsMaint) {
        searchStore.searchField = 'class_maint'
        searchStore.searchValue = true
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
    const {searchField, searchValue} = this.props.rootStore.searchStore

        return (
          <InputField
            name='searchValue'
            onChange={this.onChangeSearchValue.bind(this)}
            placeholder='Search value'
            value={searchValue}
          />
        )
  }

  /*
  * Update the school.
  */
  onChangeSchools (name, value) {
    let {searchStore} = this.props.rootStore
    searchStore.schoolId = value
  }

  /*
  * Update the field to query classes.
  */
  onChangeSearchField (name, value) {
    let {searchStore} = this.props.rootStore
    searchStore.searchField = value
    searchStore.searchValue = ''
  }

  /*
  * Update the search value to query classes.
  */
  onChangeSearchValue (name, value) {
    let {searchStore} = this.props.rootStore
    searchStore.searchValue = value
    this.onSearch();
  }
  onSearch () {
    let {schoolId, searchField, searchValue} = this.props.rootStore.searchStore
    if (schoolId || (searchField )) {
      let params = ''
      if (schoolId && searchField) {
        params = `school=${schoolId}&${searchField}=${searchValue}`
      } else if (schoolId) {
        params = `school=${schoolId}`
      } else if (searchField ) {
        params = `${searchField}=${searchValue}`
      }
      this.props.onSearch(params)
    }
  }

  onSubmitSchool (school) {
    let {searchStore} = this.props.rootStore
    searchStore.schoolId = school.id
    searchStore.schoolName = school.name
  }

  renderSchoolName () {
    let {schoolName} = this.props.rootStore.searchStore
    return (
      <InputField
        label='School'
        name='schoolName'
        onChange={(name, value) => {
          this.resetSchool()
        }}
        value={schoolName}
      />
    )
  }

  resetSchool () {
    let {searchStore} = this.props.rootStore
    searchStore.schoolId = null
    searchStore.schoolName = ''
  }

  // render () {
  //   let {schoolId, searchField, searchValue} = this.props.rootStore.searchStore
  //   let disabled = !(schoolId || (searchField && searchValue))
  //   if (searchField && !searchValue) disabled = true
  //   const disabledClass = disabled ? 'disabled' : ''
  //   return this.props.hidden ? null : (
  //     <div>
  //       <div className='row'>
  //         <div className='col-xs-12 col-sm-3 margin-top'>
  //           {schoolId ? this.renderSchoolName() : <SearchSchool
  //             label='School'
  //             onSchoolSelect={this.onSubmitSchool.bind(this)}
  //           />}
  //         </div>
  //         <div className='col-xs-12 col-sm-3 margin-top'>
  //           <SelectField
  //             name='searchField'
  //             label='Search by'
  //             options={this.getSearchFieldOptions()}
  //             onChange={this.onChangeSearchField.bind(this)}
  //             value={searchField}
  //           />
  //         </div>
  //         <div className='col-xs-12 col-sm-3 margin-top'>
  //           {this.renderValueInput()}
  //         </div>
  //         <div className='col-xs-12 col-sm-3 margin-top vertical-align' style={{justifyContent: 'flex-end'}}>
  //           <button
  //             className={`button full-width ${disabledClass}`}
  //             disabled={disabled}
  //             onClick={this.onSearch.bind(this)}
  //           > Search
  //             {this.props.loading ? <Loading style={{color: 'white', marginLeft: '0.5em'}} /> : null}
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   )
  render () {
    let {schoolId, searchField, searchValue} = this.props.rootStore.searchStore
    let disabled = !(schoolId || (searchField && searchValue))
    if (searchField && !searchValue) disabled = true
    const disabledClass = disabled ? 'disabled' : ''
    return this.props.hidden ? null : (
      <div>
            {this.renderValueInput()}
            <Loading style={{color: 'black', marginLeft: '0.5em'}} />
            {this.props.loading ? <Loading style={{color: 'red', marginLeft: '0.5em'}} /> : null}
      </div>
    )
  }
}

ClassSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  location: PropTypes.object,
  hidden: PropTypes.bool,
  loading: PropTypes.bool,
  rootStore: PropTypes.object
}

export default ClassSearch
