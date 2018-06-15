import React from 'react'
import PropTypes from 'prop-types'
import {InputField, CheckboxField} from '../../../components/Form'
import Loading from '../../../components/Loading'

class SchoolSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchField: 'name',
      searchValue: '',
      chatDisabled: false
    }
  }

  /*
  * Update the search value to query classes.
  */
  onChangeSearchValue (name, value) {
    this.setState({searchValue: value})
  }

  onSearch () {
    const {searchField, searchValue, chatDisabled} = this.state
    let params = `${searchField}=${searchValue}&chat_disabled=${chatDisabled}`
    this.props.onSearch(params)
  }

  render () {
    const {searchField, searchValue} = this.state
    let disabled = !(searchField || searchValue)
    const disabledClass = disabled ? 'disabled' : ''
    return (
      <div id='cn-school-search' className='margin-bottom'>
        <InputField
          containerClassName='margin-right'
          name='searchValue'
          label='Name'
          onChange={this.onChangeSearchValue.bind(this)}
          placeholder='Search value'
          value={searchValue}
        />
        <CheckboxField
          containerClassName='margin-right'
          name='chat_disabled'
          label='Chat Disabled'
          onChange={(name, value) => this.setState({chatDisabled: value})}
          value={this.state.chatDisabled}
        />
        <button
          className={`button ${disabledClass}`}
          disabled={disabled}
          onClick={this.onSearch.bind(this)}
        > Search
          {this.props.loading ? <Loading style={{color: 'white', marginLeft: '0.5em'}} /> : null}
        </button>
      </div>
    )
  }
}

SchoolSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default SchoolSearch
