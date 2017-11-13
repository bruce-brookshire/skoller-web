import React from 'react'
import SearchResults from './SearchResults'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../Form'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {
        searchText: ''
      },
      searched: true
    }
  }

  /*
  * Update the form search field value.
  *
  * @param [Event] event. Onchange event.
  * @return null.
  */
  setSearchValue (event) {
    this.setState({searchText: event.target.value})
  }

  /*
  * Query classes by search parameter. Set the result of the query in state.
  *
  * @return null.
  */
  onSearch () {
    this.props.onSearch(this.state.searchText)
    this.setState({searched: true})
  }

  /*
  * Render search result component.
  *
  * @return [Component] SearchResults. The component to be rendered.
  */
  renderSearchResults () {
    const {searchResults, searching} = this.props

    if (searchResults && this.state.searched && !searching) {
      const {searchResultHeaders, searchResultSelect} = this.props
      return (
        <SearchResults
          searchResultHeaders={searchResultHeaders}
          searchResults={searchResults}
          onSelect={searchResultSelect}
        />
      )
    }
  }

  /*
  * Allow the user to search using the enter button.
  *
  * @param [Event] event. On key up on an input field.
  */
  onKeyUp (event) {
    if (event.keyCode === 13) {
      this.searchButton.click()
    }
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty, description, placeholder} = this.props

    return (
      <div className='search-container'>

        <span className='search-description'> {description} </span>

        <div className='search margin-top margin-bottom'>
          <InputField
            containerClassName='search-input'
            error={formErrors.searchText}
            name="searchText"
            onBlur={() => console.log('onBlur')}
            onChange={updateProperty}
            onFocus={() => console.log('onFocus')}
            placeholder={placeholder}
            value={form.searchText}
          />
          <button ref={(component) => { this.searchButton = component }} className='search-button button margin-left' onClick={() => this.onSearch()}>Search</button>
        </div>

        {this.renderSearchResults()}
      </div>
    )
  }
}

export default ValidateForm(Form(Search, 'form'))
