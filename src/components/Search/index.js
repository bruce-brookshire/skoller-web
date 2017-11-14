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
      const {emptyMessage, searchResultHeaders, searchResultSelect} = this.props
      return (
        <SearchResults
          emptyMessage={emptyMessage}
          searchResultHeaders={searchResultHeaders}
          searchResults={this.mapResults(searchResults)}
          onSelect={searchResultSelect}
        />
      )
    }
  }

  mapResults (searchResults) {
    return searchResults.map(result => {
      Object.keys(result).forEach(key => {
        if (key !== 'id') {
          result[key] = this.matchText(result[key])
        }
      })
      return result
    })
  }

  matchText (text) {
    const re = new RegExp(`^${this.state.form.searchText}(.*$)`, "i")
    const output = re.exec(text)
    return output && output[1]
      ? <div><span className='highlight'>{text.substring(0, this.state.form.searchText.length)}</span><span>{output[1]}</span></div>
      : text
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
        </div>

        {this.renderSearchResults()}
      </div>
    )
  }
}

export default ValidateForm(Form(Search, 'form'))
