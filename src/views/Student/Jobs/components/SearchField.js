import React from 'react'
import PropTypes from 'prop-types'

class SearchField extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showSearchIcon: true
    }
  }

  render () {
    return (
      <input
        className={'jobs-form-input jobs-form-search-field ' + (this.state.showSearchIcon ? '' : 'focus')}
        onChange={(e) => this.props.updateValue(e.target.value)}
        onFocus={() => this.setState({showSearchIcon: false})}
        onBlur={() => this.setState({showSearchIcon: true})}
        style={{
          background: 'url(/src/assets/images/icons/sk-search.png) no-repeat 6px 5px',
          backgroundSize: '12px 12px',
          padding: '0 0 0 24px',
          position: 'relative',
          minHeight: '24px',
          fontSize: '12px'
        }}
        value={this.props.searchQuery}
      />
    )
  }
}

SearchField.propTypes = {
  updateValue: PropTypes.func,
  searchQuery: PropTypes.string
}

export default SearchField
