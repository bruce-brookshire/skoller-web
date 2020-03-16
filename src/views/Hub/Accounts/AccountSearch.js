import React from 'react'
import PropTypes from 'prop-types'
import {CheckboxField, InputField, SelectField} from '../../../components/Form'
import Loading from '../../../components/Loading'
import SearchSchool from '../../components/SearchSchool'

class AccountSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      accountType: 100,
      schoolId: null,
      schoolName: '',
      searchValue: '',
      suspended: false
    }
  }

  /*
  * Populate account type dropdown
  */
  getAccountTypeOptions () {
    const options = [
      {value: 100, name: 'Student'},
      {value: 300, name: 'Syllabi Worker'},
      {value: 200, name: 'Admin'},
      {value: 600, name: 'Job Listing Provider'},
      {value: 700, name: 'Any Role'}
    ]

    return options
  }

  onSubmitSchool (school) {
    this.setState({schoolId: school.id, schoolName: school.name})
  }

  resetSchool () {
    this.setState({schoolId: null, schoolName: ''})
  }

  renderSchoolName () {
    let {schoolName} = this.state
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

  renderSelectSchoolInput () {
    const {schoolId} = this.state
    if (this.state.accountType === 100) {
      return (
        <div className='col-xs-12 col-sm-3 margin-top'>
          {schoolId ? this.renderSchoolName() : <SearchSchool
            label='School'
            onSchoolSelect={this.onSubmitSchool.bind(this)}
          />}
        </div>
      )
    } else {
      return null
    }
  }

  renderValueInput () {
    return (
      <InputField
        name='searchValue'
        label= {this.state.accountType === 100 ? 'Name or email address starting with' : 'Email address'}
        onChange={this.onChangeSearchValue.bind(this)}
        placeholder='Search value'
        value={this.state.searchValue}
      />
    )
  }

  renderSuspendedInput () {
    if (this.state.accountType !== 200) {
      return (
        <CheckboxField
          name='suspended'
          label='Suspended'
          onChange={this.onChangeSuspended.bind(this)}
          value={this.state.suspended}
        />
      )
    } else {
      return null
    }
  }

  /*
  * Update the field to query accounts.
  */
  onChangeAccountType (name, value) {
    this.setState({accountType: value, searchValue: ''})
  }

  /*
  * Update the school.
  */
  onChangeSchools (name, value) {
    this.setState({schoolId: value})
  }

  /*
  * Update the search value to query accounts.
  */
  onChangeSearchValue (name, value) {
    this.setState({searchValue: value})
  }

  /*
  * Update the suspended state to query accounts.
  */
  onChangeSuspended (name, value) {
    this.setState({suspended: value})
  }

  onSearch () {
    let paramMap = {}

    var {searchValue, schoolId, accountType, suspended} = this.state

    if (accountType == 700) {
      accountType = null
    }

    if (searchValue !== '') {
      paramMap['email'] = searchValue
    }

    paramMap['school_id'] = schoolId
    paramMap['account_type'] = accountType

    if (accountType && accountType !== 200) {
      paramMap['is_suspended'] = suspended
    }
    if (accountType === 100 && searchValue !== '') {
      paramMap['user_name'] = searchValue
      paramMap['or'] = true
    }

    let params = Object.entries(paramMap)
      .map(e => (e[0] != null && e[1] != null) ? (e[0] + '=' + e[1]) : '')
      .filter(r => r !== '')
      .join('&')

    this.props.onSearch(params)
  }

  render () {
    return (
      <div className='margin-bottom'>
        <div className='row'>
          <div className={`col-xs-12 col-sm-${this.state.accountType === 100 ? '3' : '4'} margin-top`}>
            <SelectField
              name='accountType'
              label='Account Type'
              options={this.getAccountTypeOptions()}
              onChange={this.onChangeAccountType.bind(this)}
              value={this.state.accountType}
            />
          </div>
          {this.renderSelectSchoolInput()}
          <div className={`col-xs-12 col-sm-${this.state.accountType === 100 ? '3' : '4'} margin-top`}>
            {this.renderValueInput()}
            {this.renderSuspendedInput()}
          </div>
          <div className={`col-xs-12 col-sm-${this.state.accountType === 100 ? '3' : '4'} margin-top vertical-align`}>
            <button
              className={`button full-width`}
              onClick={this.onSearch.bind(this)}>
              Search
              {this.props.loading ? <Loading style={{color: 'white', marginLeft: '0.5em'}} /> : null}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

AccountSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default AccountSearch
