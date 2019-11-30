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
        className='jobs-form-input jobs-form-search-field'
        onChange={(e) => this.props.updateValue(e.target.value)}
        onFocus={() => this.setState({showSearchIcon: false})}
        onBlur={() => this.setState({showSearchIcon: true})}
        style={{
          background: 'url(/src/assets/images/icons/sk-search.png) no-repeat 7px 9px',
          backgroundSize: '16px 16px',
          padding: '0 0 0 30px',
          position: 'relative'
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
