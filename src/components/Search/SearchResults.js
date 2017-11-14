import React from 'react'
import FlexTable from '../FlexTable'

class SearchResults extends React.Component {

  // /*
  // * Row data to be passed to the grid
  // *
  // * @return [Array]. Array of formatted row data.
  // */
  // getRows() {
  //   const {searchResults} = this.props;
  //   return searchResults.map((item, index) =>
  //     this.mapRow(item, index)
  //   );
  // }
  //
  // /*
  // * Formats row data to be passed to the grid for display
  // *
  // * @param [Object] item. Search result object to be formatted.
  // * @param [Number] index. Index of search result object in search result array.
  // * @return [Object] row. Object of formatted row data for display in grid.
  // */
  // mapRow(item, index) {
  //   const { searchResultHeaders } = this.props;
  //   const row = {id: item.id || item.objectId};
  //
  //   searchResultHeaders.forEach(header => {
  //     const keys = header.field.split('.');
  //     const field = keys[0];
  //
  //     let value = item;
  //
  //     for (let i=0; i< keys.length; i++) {
  //       if (!value){
  //         value = null;
  //         break;
  //       } else {
  //         value=value[keys[i]];
  //       }
  //     }
  //
  //     row[field] = value;
  //   });
  //
  //   return row;
  // }

  render () {
    const {emptyMessage, searchResultHeaders, searchResults} = this.props
    return (
      <div className="search-result">
        <FlexTable
          className='cn-add-class-grid'
          headers={searchResultHeaders}
          rows={searchResults}
          disabled={true}
          canSelect={true}
          emptyMessage={emptyMessage}
          onSelect={this.props.onSelect}
          canDelete={false}
        />
      </div>
    )
  }
}

export default SearchResults
