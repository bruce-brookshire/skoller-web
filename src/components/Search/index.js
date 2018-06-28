import React from 'react'
import PropTypes from 'prop-types'
import SearchResults from './SearchResults'
import {Form, ValidateForm} from 'react-form-library'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: '',
      searched: false
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
    const text = this.state.searchText
    this.props.onSearch(text)
    this.setState({searched: text !== ''})
  }

  /*
  * Render search result component.
  *
  * @return [Component] SearchResults. The component to be rendered.
  */
  renderSearchResults () {
    const {searchResults, searching} = this.props

    const {emptyMessage, searchResultHeaders, searchResultSelect} = this.props
    return (
      <SearchResults
        emptyMessage={emptyMessage}
        loading={searching}
        searchResultHeaders={searchResultHeaders}
        searchResults={this.mapResults(searchResults)}
        disableEmptyMessage={this.state.searchText.length === 0 || !this.state.searched}
        onSelect={searchResultSelect}
      />
    )
  }

  /*
  * Map the search results, highlighting the text.
  *
  * @param [Array] searchResults. Array of search results.
  */
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

  /*
  * Highlight matching text.
  *
  * @param [String] text. The text to highlight with the search text.
  */
  matchText (text) {
    const re = new RegExp(`${this.state.searchText}(.*$)`, 'i')
    const output = re.exec(text)

    if (output && output.index >= 0 && text && text.length > 0 && text !== 'TBA') {
      let first = text.substring(0, output.index)
      let middle = text.substring(output.index, this.state.searchText.length + output.index)
      let last = text.substring(this.state.searchText.length + output.index, text.length)

      return (
        <div>
          <span>{first}</span>
          <span className='highlight'>{middle}</span>
          <span>{last}</span>
        </div>
      )
    }

    return text
  }

  /*
  * Allow the user to search using the enter button.
  *
  * @param [Event] event. On key up on an input field.
  */
  onKeyUp (event) {
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.onSearch()
    }, 800)
  }

  render () {
    const {description, placeholder} = this.props

    return (
      <div className='search-container'>

        <span className='search-description'> {description} </span>

        <div className='search margin-top margin-bottom'>
          <div className='cn-input-container full-width'>
            <input
              className='cn-form-input'
              onChange={(event) => { this.setState({ searchText: event.target.value }) }}
              onKeyUp={this.onKeyUp.bind(this)}
              placeholder={placeholder}
              value={this.state.searchText}
            />
          </div>
        </div>

        {this.renderSearchResults()}
      </div>
    )
  }
}

Search.propTypes = {
  description: PropTypes.string,
  emptyMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  searching: PropTypes.bool,
  searchResults: PropTypes.array,
  searchResultHeaders: PropTypes.array,
  searchResultSelect: PropTypes.func
}

export default ValidateForm(Form(Search, 'form'))
