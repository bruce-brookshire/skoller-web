import React from 'react'
import PropTypes from 'prop-types'
import FlexTable from '../FlexTable'
import Loading from '../Loading'

class SearchResults extends React.Component {
  render () {
    const {disableEmptyMessage, emptyMessage, loading,
       searchResultHeaders, searchResults} = this.props
    return (
      <div className="search-result">
        <FlexTable
          className='cn-add-class-grid'
          headers={searchResultHeaders}
          rows={searchResults}
          disabled={true}
          disableEmptyMessage={disableEmptyMessage}
          canSelect={true}
          emptyMessage={emptyMessage}
          loading={loading}
          onSelect={this.props.onSelect}
          canDelete={false}
        />
      </div>
    )
  }
}

SearchResults.propTypes = {
  disableEmptyMessage: PropTypes.bool,
  emptyMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  loading: PropTypes.bool,
  onSelect: PropTypes.func,
  searchResultHeaders: PropTypes.array,
  searchResults: PropTypes.array
}

export default SearchResults
