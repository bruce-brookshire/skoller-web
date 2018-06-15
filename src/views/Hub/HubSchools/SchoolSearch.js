import React from 'react'
import PropTypes from 'prop-types'
import {InputField} from '../../../components/Form'
import Loading from '../../../components/Loading'

class SchoolSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchField: 'name',
      searchValue: ''
    }
  }

  renderValueInput () {
    const {searchValue} = this.state
    return (
      <InputField
        name='searchValue'
        label='Name'
        onChange={this.onChangeSearchValue.bind(this)}
        placeholder='Search value'
        value={searchValue}
      />
    )
  }

  /*
  * Update the search value to query classes.
  */
  onChangeSearchValue (name, value) {
    this.setState({searchValue: value})
  }

  onSearch () {
    const {searchField, searchValue} = this.state
    let params = `${searchField}=${searchValue}`
    this.props.onSearch(params)
  }

  render () {
    const {searchField, searchValue} = this.state
    let disabled = !(searchField || searchValue)
    const disabledClass = disabled ? 'disabled' : ''
    return (
      <div className='row margin-bottom'>
        <div className='col-xs-12 col-sm-6'>
          {this.renderValueInput()}
        </div>
        <div className='col-xs-12 col-sm-6 vertical-align' style={{justifyContent: 'flex-end'}}>
          <button
            className={`button ${disabledClass}`}
            disabled={disabled}
            onClick={this.onSearch.bind(this)}
          > Search
            {this.props.loading ? <Loading style={{color: 'white', marginLeft: '0.5em'}} /> : null}
          </button>
        </div>
      </div>
    )
  }
}

SchoolSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

export default SchoolSearch
